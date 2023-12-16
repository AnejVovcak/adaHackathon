import pandas as pd

# Importing the dataset
dataset1 = pd.read_csv('gibanje_prebivalstva_clean.csv', sep=',')
dataset2 = pd.read_csv('bruto_prejeti_dohodek_clean.csv', sep=',')
dataset3 = pd.read_csv('starostne_skupine_clean.csv', sep=',')
dataset4 = pd.read_csv('kriminaliteta_clean.csv', sep=',')

# every dataset has the same number of rows, first column is the same in every dataset
#second column is a number between 0 and 1
print(len(dataset1), len(dataset2), len(dataset3), len(dataset4))

#merge the datasets into one by appending the second column of every dataset to the first one, but keep only the first column of the first dataset
dataset = pd.concat([dataset1.iloc[:, 0], dataset1.iloc[:, 1], dataset2.iloc[:, 1], dataset3.iloc[:, 1], dataset4.iloc[:, 1]], axis=1)

print(dataset.head())

#add a new column with the average of the second, third and fourth column
dataset['Index'] = dataset.iloc[:, 1:4].mean(axis=1)

print(dataset.head())

#print number of rows
print('before',len(dataset))

#export to csv
dataset.to_csv('index.csv', index=False)

#drop rows with index NaN
dataset = dataset.dropna()

#print number of rows
print('after',len(dataset))

#print row with the lowest index
print(dataset.iloc[dataset['Index'].idxmin()])

#print row with the highest index
print(dataset.iloc[dataset['Index'].idxmax()])

#sort by index
dataset = dataset.sort_values(by=['Index'])

#export to csv
dataset.to_csv('index.csv', index=False)
