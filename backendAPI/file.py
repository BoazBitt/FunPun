# import csv
#
# # Open the CSV file
# with open('file.csv', 'r') as csv_file:
#     # Create a CSV reader object
#     csv_reader = csv.reader(csv_file)
#     # Create an empty list to store values
#     values = []
#     # Iterate over the rows in the CSV file
#     for row in csv_reader:
#         # Get the value in the second column
#         value = row[1]
#         # Add the value to the list
#         values.append(value)
#     # Create a new file to store the values
#     with open('output.txt', 'w') as txt_file:
#         # Write each value to the file
#         for value in values:
#             txt_file.write(value + '\n')
# Open the output.txt file and read the contents into a list
with open('output.txt', 'r') as txt_file:
    values = txt_file.read().splitlines()

# Create a new JavaScript file
with open('output.js', 'w') as js_file:
    # Write the array declaration and opening bracket
    js_file.write('const export arr = [\n')
    # Iterate over the values list and write each value as a separate array element
    for value in values:
        js_file.write(f"'{value}',\n")
    # Write the closing bracket and export statement
    js_file.write(']\n\nexport default arr;\n')
