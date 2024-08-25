import numpy as np
import random
from matplotlib import pyplot as plt

class LinearRegression:
    def __init__(self):
        self.w = np.array([])
        self.score_history = []
        self.P = 0
        self.q = 0
    
    def fit_analytic(self, X, y):
        X_ = np.append(X, np.ones((X.shape[0],1)), axis=1)
        self.w = np.linalg.inv(X_.T@X_)@X_.T@y

    def fit_gradient(self, X, y, max_iter, alpha):
        #creating modified feature matrix X_ with column of 1s
        X_ = np.append(X, np.ones((X.shape[0],1)), axis=1)
        
        #initializing random weight vectors
        self.w = np.random.rand(X_.shape[1])
        self.score_history.append(self.score(X_, y))
        
        #precomputing certain values to reduce time complexity
        self.P = X_.T@X_
        self.q = X_.T@y
        
        for i in range(max_iter):
            gradient = self.gradient()
            self.w -= alpha*gradient
            
            #appending the score history
            self.score_history.append(self.score(X_, y))
            
            #checking for convergence if each element of the gradient is - within
            #a specific tolerance - close enough to an array of zeroes of the same length
            #Simple Words - comparing each element of the gradient to see if it is close enought to 0
            if np.allclose(gradient, np.zeros(len(gradient))):
                break

    def score(self, X, y):
        #using coefficient of determination as our score
        #calculating the numerator
        num = self.predict(X) - y
        num = num ** 2
        num = num.sum()
        #calculating the denominator
        den = y.mean() - y
        den = den ** 2
        den = den.sum()
        c = 1 - (num/den)
        return c
    
    def gradient(self):
        return 2*(self.P@self.w - self.q)
    
    def predict(self, X):
        return X@self.w
    
    def draw_line(self, subplot = None):
        fake_x = np.linspace(0, 1, 101)
        y_vals = fake_x*self.w[0] + self.w[1]
        if(subplot is None):
            plt.plot(fake_x, y_vals, color="black")
        else:
            subplot.plot(fake_x, y_vals, color="black")   
    
    '''
    def draw_line(self, subplot = None):
        fake_x = np.linspace(0, 1, 101)[:,np.newaxis]
        fake_x = np.append(fake_x, np.ones((fake_x.shape[0], 1)), 1)
        y_vals = fake_x@self.w
        if(subplot is None):
            plt.plot(fake_x, y_vals, color="black")
        else:
            subplot.plot(fake_x, y_vals, color="black")
    '''