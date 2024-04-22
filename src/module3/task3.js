const csv = require('csvtojson');
const fs = require("fs");

const csvFilePath = './src/module3/csv/data.csv';
const txtFilePath = './src/module3/text/data.text';

const csvReadStream = fs.createReadStream(csvFilePath, { encoding: 'utf8' });
const txtWriteStream = fs.createWriteStream(txtFilePath, { encoding: 'utf8' });

async function readCsvWriteText() {
  csvReadStream.pipe(csv())
    .on('error', (err) => {
        console.error('Error converting CSV to JSON:', err);
    })
    .pipe(txtWriteStream)
    .on('error', (err) => {
        console.error('Error writing to TXT file:', err);
    })
    .on('finish', () => {
        console.log('Conversion completed successfully.');
    });
}

readCsvWriteText();