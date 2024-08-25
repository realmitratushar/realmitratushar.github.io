import pandas as pd
import numpy as np
import re
import string
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

class HelperClass:
    def __init__(self):
        nltk.download('stopwords', quiet = True)
        nltk.download('punkt', quiet = True)
        nltk.download('wordnet', quiet = True)
        nltk.download('omw-1.4', quiet = True)
        
    def loadData(self):
        columns = ['Sentiment Score', 'Tweet ID', 'Time', 'Query', 'Username', 'Tweet']
        df = pd.read_csv(r"dataset.csv", encoding="latin-1", names = columns)
        df = df[["Sentiment Score", "Tweet"]]
        return df
    
    def prepData(self, dfX, dfY, vectorizer, train = True):
        if train:
            vectorizer.fit(dfX)
        #creating the term document matrix
        counts = vectorizer.transform(dfX)
        X = pd.DataFrame(counts.toarray(), columns = vectorizer.get_feature_names_out())
        X = X.to_numpy()
        y = dfY.to_numpy()
        y = np.where(y == 0, -1, np.where(y == 4, 1, y))
        return X, y
    
    def sentencePredict(self, sentence, vectorizer):
        sentence = self.preprocess(sentence)
        sentence = [sentence]
        #creating the term document matrix for a single sentence
        counts = vectorizer.transform(sentence)
        X = pd.DataFrame(counts.toarray(), columns = vectorizer.get_feature_names_out())
        X = X.to_numpy()
        return X
    
    def preprocess(self, tweets):
        stop_words = set(stopwords.words('english'))
        
        #converting all the textual data to lowercase
        tweets = tweets.lower()
        
        #removing all URLs
        tweets = re.sub(r"http\S+|www\S+|https\S+", "", tweets, flags=re.MULTILINE)
        
        #removing punctuations
        tweets = tweets.translate(str.maketrans("", "", string.punctuation))
        
        #remove user tag references (@) and "#" from tweet
        tweets = re.sub(r"\@\w+|\#", "", tweets)
        
        #removing stopwords
        tweets_tokenized = word_tokenize(tweets)
        filtered_words = [word for word in tweets_tokenized if word not in stop_words]
        
        #lemmatizing
        lemmatizer = WordNetLemmatizer()
        lemma_words = [lemmatizer.lemmatize(w, pos='a') for w in filtered_words]
        
        return " ".join(lemma_words)

    