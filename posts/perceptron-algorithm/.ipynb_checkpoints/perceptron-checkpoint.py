import numpy as np
import random
from matplotlib import pyplot as plt

class Perceptron:
    def __init__(self, w = np.random.rand(3), history = [], y_ = []):
        #initializing random weights 
        self.w = w
        self.history = history
        #the prediction labels
        self.y_ = y_
        
    def fit(self, X, y, max_steps):
        '''
        Finds a weight vector w, which maximizes the accuracy of linear classifier. Stops executing, either when the maximum
        number of steps have been reached, or when perfect accuracy is achieved
        
        Parameters:
            X (n x p - array): Collection of p features for n data points
            y (array): Collection of actual labels - used for training the algorithm 
            max_steps (int): Maximum number of times to run the code
        
        Returns:
            None - all changes are made in the weight vector w of the particular Perceptron object
        '''
        #creating modified feature matrix X_ with column of 1s
        X_ = np.append(X, np.ones((X.shape[0],1)),axis=1)
        for i in range(max_steps):
            #getting the predictions for the current weight vector 
            self.y_ = self.predict(X_)
            #getting the accuracy score for the current prediction labels
            self.history.append(self.score(X_,y))

            #working on the alterations of the weight vectors
            index = random.randint(0, X_.shape[0]-1)
            yPrediction = np.dot(self.w, X_[index,:])
            #changing the output of the dot-product to either 0 or 1
            if(yPrediction>=0):
                yPrediction = 1
            else:
                yPrediction = 0
            #updating the weights based on the sign of yPred and the actual y-label 
            if(yPrediction!=y[index]):
                #since we are dealing with 0s and 1s, rather than -1s and 1s, we need to modify the y
                yModified = 2*y[index] - 1
                self.w = np.add(self.w, yModified*X_[index,:])
            if(self.history[i]==1.0):
                break
                
    #returning predictions for the current weight vector            
    def predict(self, X):
        '''
        Given the current weight vector - w, this function predits the label for each data point in X using weighted sum!
        
        Parameters:
            X (n x p - array): Collection of p features for n data points
        
        Returns:
            yPredVec (array with n entries of either 0 or 1): predicted labels for the each data point in X, based on the 
            current weight 
        '''
        yPredVec = []
        for i in range(X.shape[0]):
            tempCalc = np.dot(self.w, X[i,:])
            if(tempCalc>=0):
                yPredVec.append(1)
            else:
                yPredVec.append(0)
        return yPredVec
        
    #returning accuracy for current weight 
    def score(self, X, y):
        '''
        Based on how many of the predicted labels match with the actual labels, this function returns a score for the 
        current accuracy of the classifier.
        
        Parameters:
            X (n x p - array): Collection of p features for n data points
            y (array): Collection of actual labels - used for training the algorithm 
        
        Returns:
            score (float) - correctly guessed labels/total number of labels
        '''
        score = 0
        for i in range(len(y)):
            if(y[i]==self.y_[i]):
                score+=1
        score = score/len(y)
        return score 
    
    def draw_line(self, w, x_min, x_max):
        x = np.linspace(x_min, x_max, 101)
        y = -(w[0]*x + w[2])/w[1]
        plt.plot(x, y, color = "black")
    
    def visualize_score(self):
        fig = plt.plot(self.history)
        xLab = plt.xlabel("Iteration")
        yLab = plt.ylabel("Accuracy")