import pandas as pd

# Load the CSV file with the correct encoding
file_path = 'starostne_skupine.csv'
df = pd.read_csv(file_path, encoding='utf-8')  # Update the encoding if needed

# Extract relevant columns for age groups and population
age_columns = ['2023H2 0-4 let', '2023H2 5-9 let', '2023H2 10-14 let', '2023H2 15-19 let']
total_population_column = '2023H2 Starost - SKUPAJ'

#keep only the rows with contents of first column 'Spol - SKUPAJ' and 'OBČINE'
df = df[df.iloc[:, 0].isin(['Spol - SKUPAJ', 'OBČINE'])]

# Sum the population in the specified age groups
df['0-20 let'] = df[age_columns].sum(axis=1)

# Calculate the ratio of the sum of ages 0-20 to the total population for each občine
df['Ratio 0-20 let'] = df['0-20 let'] / df[total_population_column]

# Create a new DataFrame with relevant information
result_df = df[['OBČINE', 'Ratio 0-20 let']]

# Normalize the ratio to [0, 1]
result_df['Ratio 0-20 let'] = (result_df['Ratio 0-20 let'] - result_df['Ratio 0-20 let'].min()) / (result_df['Ratio 0-20 let'].max() - result_df['Ratio 0-20 let'].min())

# Save the result to a new CSV file
result_file_path = 'starostne_skupine_clean.csv'
result_df.to_csv(result_file_path, index=False)

print(f"Results saved to {result_file_path}")