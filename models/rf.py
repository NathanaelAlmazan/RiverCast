import os
import joblib
import numpy as np

from .utils import scale_input, scale_label
from sklearn.ensemble import RandomForestRegressor


class RandomForest:
    def __init__(self):
        # load the models
        base_path = os.path.dirname(os.path.abspath(__file__))
        self.nangka_regressor: RandomForestRegressor = joblib.load(os.path.join(base_path, 'lib', 'nangka_regr.joblib'))
        self.sto_nino_regressor: RandomForestRegressor = joblib.load(os.path.join(base_path, 'lib', 'sto_nino_regr.joblib'))

        self.feature_importances = None

    def predict(self, x: np.ndarray[np.float32], length=7):
        # check input size
        assert x.shape[-1] == 5

        x = scale_input(x)  # normalization

        # predict nangka river level
        nangka_pred = self.nangka_regressor.predict(x)
        nangka_pred = np.reshape(nangka_pred, (-1, 1))

        # get feature importance
        self.feature_importances = self.nangka_regressor.feature_importances_

        # predict sto nino river level
        x = np.hstack((x, nangka_pred))  # include nangka pred as parameter

        sto_nino_pred = self.sto_nino_regressor.predict(x)
        sto_nino_pred = np.reshape(sto_nino_pred, (-1, 1))

        pred = np.hstack((nangka_pred, sto_nino_pred))
        pred = pred[-length:]  # get the last output only
        pred = scale_label(pred)  # inverse normalization

        return pred
    
    def get_feature_importances(self):
        return self.feature_importances
