import numpy as np
import random
from matplotlib import pyplot as plt

class LogisticRegression:
    def __init__(self):
        self.w = np.array([])
        #storing the initial weight vector for visualization purposes
        self.initialW = np.array([])
        self.loss_history = []
        self.score_history = []
        
    def fit(self, X, y, alpha, max_epochs):
        '''
        Performs Regular Gradient Descent on the weight vector "w", and finds a weight
        vector which minimizes the emprical loss as defined by the logistic loss function.
        
        Parameters:
            X (n x p - array): Collection of p features for n data points
            y (array): True Labels - used for training the algorithm 
            alpha (float): Learning Rate - influences how much the weights get changed in each iteration
            max_epochs (int): maximum number of iterations
        
        Returns:
            None - all changes are made in the weight vector w of the particular LogisticRegression object
        '''
        #creating modified feature matrix X_ with column of 1s
        X_ = np.append(X, np.ones((X.shape[0],1)), axis=1)
        #initializing random weight vectors
        self.w = np.random.rand(X_.shape[1])
        self.initialW = self.w.copy() #solely for visualization purposes
        #adding loss+score associated with initialized weight vector to respective vectors
        self.loss_history.append(self.loss(X_,y))
        self.score_history.append(self.score(X_,y))

        for i in range(max_epochs):
            #updating the weight vector - the gradient descent update
            gradient = self.gradient_logistic_loss(X_, y)
            self.w -= alpha*gradient

            #appending the loss and score for the updated weight vector
            self.loss_history.append(self.loss(X_,y))
            self.score_history.append(self.score(X_,y))

            #checking the conditions to terminate the loop - when overall improvement is minimum
            #comparing the latest added loss_history with the second_latest added loss_history
            if np.isclose(self.loss_history[-1], self.loss_history[-2]):
                break
        
    def fit_stochastic(self, X, y, alpha, max_epochs, batch_size, momentum = False):
        '''
        Performs Stochastic Gradient Descent on the weight vector "w", and finds a weight
        vector which minimizes the emprical loss as defined by the logistic loss function.
        Works by dividing the total number of data points into "batches" in each epoch.
        Optional, momentum parameter is either 0.8 or 0 - based on True or False - influences Convergence Speed.
        
        Parameters:
            X (n x p - array): Collection of p features for n data points
            y (array): True Labels - used for training the algorithm 
            alpha (float): Learning Rate - influences how much the weights get changed in each iteration
            max_epochs (int): maximum number of iterations
            batch_size (int): the size of each batch in each epoch - influences how many data points are used in the gradient update, in each iteration (epoch)
            momentum (boolean): if True beta = 0.8 else beta = 0 - influences the performance of Stochastic Gradient Descent - particularly Convergence Speed
        
        Returns:
            None - all changes are made in the weight vector w of the particular LogisticRegression object
        '''
        #creating modified feature matrix X_ with column of 1s 
        X_ = np.append(X, np.ones((X.shape[0],1)), axis=1)
        #initializing random weight vectors
        self.w = np.random.rand(X_.shape[1])
        self.initialW = self.w.copy()
        #adding loss+score associated with initialized weight vector to respective vectors
        self.loss_history.append(self.loss(X_,y))
        self.score_history.append(self.score(X_,y))

        #setting the beta value of momentum - based on momentum True or False
        beta = 0
        if(momentum):
            beta = 0.8

        #creating a temporary variable which stores the previous weight vector - useful for implementing momentum
        prevWeightVec = 0

        #setting n as the number of rows - data points - in our feature matrix X_
        n = X_.shape[0]

        #maximum number of time we are cycling through the data - max_epochs 
        #np.arange is similar to range used in above fit function
        for j in np.arange(max_epochs):
            #creating a list of all possible data points and shuffling
            order = np.arange(n)
            np.random.shuffle(order)

            #this loop goes over the order - total number of rows (data points)
            #and then creates batches out of those orders, where n (total data points) // batch_size + 1
            for batch in np.array_split(order, n // batch_size + 1):
                x_batch = X_[batch,:]
                y_batch = y[batch]
                #performing the stochastic gradient
                gradient = self.gradient_logistic_loss(x_batch, y_batch)
                tempWeightVec = self.w
                self.w -= (alpha * gradient) + (beta * (self.w - prevWeightVec))
                prevWeightVec = tempWeightVec

            #appending the loss and score for the updated weight vector
            self.loss_history.append(self.loss(X_,y))
            self.score_history.append(self.score(X_,y))

            #checking the conditions to terminate the loop - when overall improvement is minimum
            if np.isclose(self.loss_history[-1], self.loss_history[-2]):
                break

    #defining related sigmoid function
    def sigmoid(self, z):
        return 1 / (1 + np.exp(-z))
                
    #choosing logistic loss as the loss function l(w) - function 
    def logistic_loss(self, y_hat, y):
        return -y * np.log(self.sigmoid(y_hat)) - (1 - y)*np.log(1 - self.sigmoid(y_hat))
    
    #defining the gradient of the logistic loss function 
    #Source - Philip Chodrow (Lecture Notes on Gradient Descent 02/22)
    def gradient_logistic_loss(self, X, y):
        #using the actual predictions - rather than 0s and 1s 
        #to utilize the potential of the logistic loss function
        y_hat = X@self.w
        tempYDifference = self.sigmoid(y_hat) - y
        output = np.zeros((X.shape[1],))
        for i in range(X.shape[0]):
            output+=np.dot(tempYDifference[i], X[i])
        output = output/X.shape[0]
        return output

    #defining the empirical risk - Overall Loss - L(w) - function 
    def loss(self, X, y):
        #using the actual predictions - rather than 0s and 1s
        #to utilize the potential of the logistic loss function 
        y_hat = X@self.w
        return self.logistic_loss(y_hat, y).mean()
                
    #returning predictions for the current weight vector - {0,1}           
    def predict(self, X):
        #returning labels of - {0s, 1s} - for our reference 
        yTemp = X@self.w
        yPredVec = 1 * (yTemp>=0)
        return yPredVec
    
    #returning accuracy for current weight 
    def score(self, X, y):
        #this yHat is labels of 0s and 1s for calculation of the score 
        yHat = self.predict(X)
        yCheck = 1*(yHat == y)
        return yCheck.mean()
    
    def draw_line(self, w, x_min, x_max, subplot = None):
        x = np.linspace(x_min, x_max, 101)
        y = -(w[0]*x + w[2])/w[1]
        if(subplot is None):
            plt.plot(x, y, color = "black")
        else:
            subplot.plot(x, y, color = "black")
  