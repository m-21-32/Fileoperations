const fs = require('fs');
 
const content = 'Some content!';

fs.writeFile('example.txt', content, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});
// Read a file
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    console.log('File content:', data);
});
 
fs.unlink('./server/upload/my.csv',function(err){
    if(err) return console.log(err);
    console.log('file deleted successfully');
}); 



