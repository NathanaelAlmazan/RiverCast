import os
import joblib
import numpy as np

from sklearn.preprocessing import StandardScaler


def scale_input(x: np.ndarray[np.float32]):
    assert x.shape[1] == 5

    # load scaler
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'lib', 'input_scaler.joblib')
    input_scaler: StandardScaler = joblib.load(path)

    return input_scaler.transform(x)

def scale_label(x: np.ndarray[np.float32]):
    assert x.shape[1] == 2

    # load scaler
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'lib', 'label_scaler.joblib')
    label_scaler: StandardScaler = joblib.load(path)

    return label_scaler.inverse_transform(x)
