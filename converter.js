const fs = require('fs');
const bs58 = require('bs58');
const dotenv = require('dotenv').config();

function convertToJson(filename){
if (!process.env.PRIVATE_KEY) {
    throw new Error("private key is not defined in .env file. Please define it as PRIVATE_KEY=your_private_key in .env file.");
}

const privateKeyArray = Array.from(bs58.decode(process.env.PRIVATE_KEY));
const privateKeyJson = JSON.stringify(privateKeyArray);

fs.writeFile(filename, privateKeyJson, err => {
    if (err) throw err;
    console.log("Private key has been converted to id.json file.");
});
}


function convertToPrivateKey(filepath){
fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) throw err;
    const privateKeyArray = JSON.parse(data);
    const privateKey = bs58.encode(Buffer.from(privateKeyArray)).toString();
    console.log("Private key is: ", privateKey);
});
}


convertToPrivateKey('id.json')
// convertToJson('id.json')


