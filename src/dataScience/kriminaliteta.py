import pandas as pd

# Importing the dataset
dataset = pd.read_csv('kriminaliteta.csv', sep=',')

print(dataset.columns)

#add a new column with the average of the all but the first column
dataset['Kriminaliteta'] = dataset.iloc[:, 1:].mean(axis=1)

#print row with the highest index
print(dataset.iloc[dataset['Kriminaliteta'].idxmax()])

#print row with the lowest index
print(dataset.iloc[dataset['Kriminaliteta'].idxmin()])

#normalize the Avg column to [0,1]
dataset['Kriminaliteta'] = (dataset['Kriminaliteta'] - dataset['Kriminaliteta'].min()) / (dataset['Kriminaliteta'].max() - dataset['Kriminaliteta'].min())

#the bigger the index, the more criminality, so we want to reverse the index
dataset['Kriminaliteta'] = 1 - dataset['Kriminaliteta']

#print row with the lowest index
print(dataset.iloc[dataset['Kriminaliteta'].idxmin()])

#remove all but the first and the last column
dataset = dataset.iloc[:, [0, -1]]

#export to csv
dataset.to_csv('kriminaliteta_clean.csv', index=False)
