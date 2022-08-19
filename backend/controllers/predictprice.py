import pickle
import pandas as pd
import numpy as np
import sys
model = pickle.load(open('backend/controllers/StackModel.pkl','rb'))    
input = pd.DataFrame([[sys.argv[1],np.log1p(sys.argv[2]),np.log1p(sys.argv[3]),np.log1p(sys.argv[4])]], columns=['location','total_sqft','bath','bhk'])
print(model.predict(input)) 
sys.stdout.flush()

    