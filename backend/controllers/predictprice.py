import pickle
import pandas as pd
import sys
model = pickle.load(open('backend/controllers/StackModel.pkl','rb'))    
input = pd.DataFrame([[sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4]]], columns=['location','total_sqft','bath','bhk'])
print(model.predict(input))
sys.stdout.flush()

