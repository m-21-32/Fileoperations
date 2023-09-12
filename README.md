# Fileoperations

Writing Content to a File: In this part of the code, a variable content is defined with the value 'Some content!'.
The fs.writeFile function is used to write the content to a file named example.txt.
If there are any errors during the write operation, they are logged to the console.
If the write operation is successful, it logs "file written successfully" to the console.

Reading Content from a File:  
In this part of the code, the fs.readFile function is used to read the contents of the example.txt file in UTF-8 encoding.
If there are any errors during the read operation, they are logged to the console.
If the read operation is successful, it logs the file's content to the console.

Deleting a File: In this part of the code, the fs.unlink function is used to delete a file located at ./server/upload/my.csv.
If there are any errors during the delete operation, they are logged to the console.
If the delete operation is successful, it logs "file deleted successfully" to the console.
