import os
import numpy as np
import tensorflow as tf
from .utils import scale_input, scale_label

# constants
NUM_LAYERS = 2
D_MODEL = 16
NUM_HEADS = 4
DFF = 64
PRED_SIZE = 2
DROPOUT_RATE = 0.1


"""
    Positional Embedding and Encoding
"""
def positional_encoding(length, depth):
    depth = depth/2

    positions = np.arange(length)[:, np.newaxis]     # (seq, 1)
    depths = np.arange(depth)[np.newaxis, :]/depth   # (1, depth)

    angle_rates = 1 / (10000**depths)         # (1, depth)
    angle_rads = positions * angle_rates      # (pos, depth)

    pos_encoding = np.concatenate(
        [np.sin(angle_rads), np.cos(angle_rads)],
        axis=-1) 

    return tf.cast(pos_encoding, dtype=tf.float32)

class PositionalEmbedding(tf.keras.layers.Layer):
    def __init__(self, d_model):
        super().__init__()
        self.d_model = d_model
        self.embedding = tf.keras.layers.Dense(d_model)
        self.pos_encoding = positional_encoding(length=64, depth=d_model)

    def call(self, x):
        length = tf.shape(x)[1]
        x = self.embedding(x)
        # This factor sets the relative scale of the embedding and positonal_encoding.
        x *= tf.math.sqrt(tf.cast(self.d_model, tf.float32))
        x = x + self.pos_encoding[tf.newaxis, :length, :]
        return x
    
"""
    Self-Attention Layer
"""
class BaseAttention(tf.keras.layers.Layer):
    def __init__(self, **kwargs):
        super().__init__()
        self.mha = tf.keras.layers.MultiHeadAttention(**kwargs)
        self.layernorm = tf.keras.layers.LayerNormalization()
        self.add = tf.keras.layers.Add()

class CausalSelfAttention(BaseAttention):
    def call(self, x):
        attn_output, attn_scores = self.mha(
            query=x,
            value=x,
            key=x,
            use_causal_mask = True, 
            return_attention_scores=True)
        
        # Cache the attention scores for plotting later.
        self.last_attn_scores = attn_scores

        x = self.add([x, attn_output])
        x = self.layernorm(x)
        return x
    
"""
    Feed Forward Network
"""
class FeedForward(tf.keras.layers.Layer):
    def __init__(self, d_model, dff, dropout_rate=0.1):
        super().__init__()
        self.seq = tf.keras.Sequential([
            tf.keras.layers.Dense(dff, activation='relu'),
            tf.keras.layers.Dense(d_model),
            tf.keras.layers.Dropout(dropout_rate)
        ])
        self.add = tf.keras.layers.Add()
        self.layer_norm = tf.keras.layers.LayerNormalization()

    def call(self, x):
        x = self.add([x, self.seq(x)])
        x = self.layer_norm(x) 
        return x
    
"""
    Decoder Layer
"""
class DecoderLayer(tf.keras.layers.Layer):
    def __init__(self, d_model, num_heads, dff, dropout_rate=0.1):
        super(DecoderLayer, self).__init__()
        
        self.causal_self_attention = CausalSelfAttention(
            num_heads=num_heads,
            key_dim=d_model,
            dropout=dropout_rate)
        
        self.ffn = FeedForward(d_model, dff)

    def call(self, x):
        x = self.causal_self_attention(x=x)

        # Cache the last attention scores for plotting later
        self.last_attn_scores = self.causal_self_attention.last_attn_scores

        x = self.ffn(x)  # Shape `(batch_size, seq_len, d_model)`.
        return x
    
class Decoder(tf.keras.layers.Layer):
    def __init__(self, num_layers, d_model, num_heads, dff, dropout_rate=0.1):
        super(Decoder, self).__init__()

        self.d_model = d_model
        self.num_layers = num_layers

        self.pos_embedding = PositionalEmbedding(d_model=d_model)
        self.dropout = tf.keras.layers.Dropout(dropout_rate)
        self.dec_layers = [DecoderLayer(d_model=d_model, num_heads=num_heads, dff=dff, dropout_rate=dropout_rate) for _ in range(num_layers)]

        self.last_attn_scores = None

    def call(self, x):
        # `x` is token-IDs shape (batch, target_seq_len)
        x = self.pos_embedding(x)  # (batch_size, target_seq_len, d_model)

        x = self.dropout(x)

        for i in range(self.num_layers):
            x = self.dec_layers[i](x)

        self.last_attn_scores = self.dec_layers[-1].last_attn_scores

        # The shape of x is (batch_size, target_seq_len, d_model).
        return x
    
"""
    Transformer Model
"""
class Transformer(tf.keras.Model):
    def __init__(self, num_layers, d_model, num_heads, dff, pred_size, dropout_rate=0.1):
        super().__init__()
        self.decoder = Decoder(num_layers=num_layers, d_model=d_model, num_heads=num_heads, dff=dff, dropout_rate=dropout_rate)
        self.final_layer = tf.keras.layers.Dense(pred_size)

    def call(self, x):
        x = self.decoder(x)  # (batch_size, target_len, d_model)

        # Final linear layer output.
        pred = self.final_layer(x)  # (batch_size, target_len, target_vocab_size)

        # Return the final output and the attention weights.
        return pred
    
"""
    RiverCast Model
"""
class RiverCast:
    def __init__(self):
        self.model = Transformer(
            num_layers=NUM_LAYERS,
            d_model=D_MODEL,
            num_heads=NUM_HEADS,
            dff=DFF,
            pred_size=PRED_SIZE,
            dropout_rate=DROPOUT_RATE)
        
        # build model
        self.model(np.zeros(shape=(64, 30, 5)), training=False)

        # load weights
        path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'lib', 'rivercast_002.h5')
        self.model.load_weights(path)

        self.attn_scores = None

    def predict(self, x: np.ndarray[np.float32], length=7):
        # check input size
        assert x.shape[-1] == 5

        x = scale_input(x)  # normalization

        x = np.array([x[i:i + 30] for i in range(0, length)])

        pred = self.model(x, training=False)
        pred = pred[:, -1, :]  # get the last output only
        pred = scale_label(pred)  # inverse normalization

        # get attention scores
        self.attn_scores = self.model.decoder.dec_layers[-1].last_attn_scores
        self.attn_scores = np.mean(self.attn_scores[0, :, :, :], axis=0)

        return pred
    
    def get_attention_scores(self):
        return self.attn_scores