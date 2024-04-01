const csv = require('csvtojson');
const fs = require("fs")

const csvFilePath = './src/module3/csv/data.csv';
const textFilePath = './src/module3/text/data.text';

async function readCsvWriteText() {
  csv()
    .on('error', (err)=>{
      console.log('error', err)
    })
    .fromFile(csvFilePath)
    .then(result=>{
      for (let i = 0; i < result.length; i++) {
        const stringResult = `line ${i} ${JSON.stringify(result[i])}\n`;
        fs.appendFileSync(
          textFilePath,
          stringResult,
          (err) => console.log(err)
        )
      }
    })
}

readCsvWriteText();