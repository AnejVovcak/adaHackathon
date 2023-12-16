import pandas as pd

# Importing the dataset
dataset = pd.read_csv('bruto_prejeti_dohodek.csv', sep=',')

#keep only the rows with contents of first column 'Povprečno na prebivalca, bruto (EUR)' and 'MERITVE'
dataset = dataset[dataset.iloc[:, 0].isin(['Povprečno na prebivalca, bruto (EUR)', 'MERITVE'])]

# Keep only the second and third column
dataset = dataset.iloc[:, 1:3]


print(dataset.columns)
print(dataset.head())

#normalize the third column to [0,1]
dataset.iloc[:, 1] = (dataset.iloc[:, 1] - dataset.iloc[:, 1].min()) / (dataset.iloc[:, 1].max() - dataset.iloc[:, 1].min())

#export to csv
dataset.to_csv('bruto_prejeti_dohodek_clean.csv', index=False)
