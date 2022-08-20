import pickle
import pandas as pd
import numpy as np
import math
import sys
model = pickle.load(open('backend/controllers/StackModel.pkl', 'rb'))
input = pd.DataFrame([[sys.argv[1], math.log(sys+1), math.log(
    sys +1 ), math.log(sys + 1)]], columns=['location', 'total_sqft', 'bath', 'bhk'])
print(model.predict(input))
sys.stdout.flush()
