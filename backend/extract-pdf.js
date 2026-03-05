const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('C:\\Users\\Vteca\\project-green\\เกณฑ์การประเมินสำนักงานสีเขียว-ปี-2569-131268.pdf');

pdf(dataBuffer).then(function(data) {
  fs.writeFileSync('C:\\Users\\Vteca\\project-green\\backend\\pdf-output.txt', data.text);
  console.log('PDF extracted to pdf-output.txt');
}).catch(err => {
  console.error('Error extracting PDF:', err);
});
