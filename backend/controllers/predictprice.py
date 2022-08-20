import pickle
import pandas as pd
import numpy as np
import math
import sys
model = pickle.load(open('backend/controllers/StackModel.pkl', 'rb'))
var1 = sys.argv[1]
var2 = int(sys.argv[2])
var3 = int(sys.argv[3])
var4 = int(sys.argv[4])
input = pd.DataFrame([[sys.argv[1], math.log(var2), math.log(var3), math.log(
    var4)]], columns=['location', 'total_sqft', 'bath', 'bhk'])
print(model.predict(input))
sys.stdout.flush()
