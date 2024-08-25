import numpy as np
import random
from scipy.optimize import minimize 

class KernelLogisticRegression:
    def __init__(self, kernel, **kernel_kwargs):
        self.kernel = kernel
        self.kernel_kwargs = kernel_kwargs
    
    def fit(self, X, y):
        self.X_train = X 
        #computing the kernel matrix - which is an NxN matrix 
        km = self.kernel(X, X, **self.kernel_kwargs)
        #initializing random weight vector - v0
        v0 = np.random.rand(X.shape[0])
        #minimize the self.loss function return value by adjusting the v paramater
        #for starters: take the v parameter as v0
        result = minimize(lambda v: self.loss(km, y, v), x0 = v0)
        self.v = result.x
        
    def predict(self, X):
        km = self.kernel(self.X_train, X, **self.kernel_kwargs)
        km_transpose = km.T
        return 1*((km_transpose@self.v)>0)
    
    def score(self, X, y):
        y_hat = self.predict(X)
        return (y_hat==y).mean()
    
    def sigmoid(self, z):
        return 1 / (1 + np.exp(-z))
                
    def logistic_loss(self, y_hat, y):
        return -y * np.log(self.sigmoid(y_hat)) - (1 - y)*np.log(1 - self.sigmoid(y_hat))
    
    def loss(self, X, y, w):
        y_hat = X@w
        return self.logistic_loss(y_hat, y).mean()
    
    '''
    def pad(self, X):
        return np.append(X, np.ones((X.shape[0], 1)), 1)
    '''