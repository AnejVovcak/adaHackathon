import pandas as pd

# Importing the dataset
dataset = pd.read_csv('gibanje_prebivalstva.csv', sep=',')

# Keep only the first and last column
dataset = dataset.iloc[:, [0, -1]]
print(dataset.columns)
print(dataset.head())

#normalize the second column to [0,1]
dataset.iloc[:, 1] = (dataset.iloc[:, 1] - dataset.iloc[:, 1].min()) / (dataset.iloc[:, 1].max() - dataset.iloc[:, 1].min())

#export to csv
dataset.to_csv('gibanje_prebivalstva_clean.csv', index=False)