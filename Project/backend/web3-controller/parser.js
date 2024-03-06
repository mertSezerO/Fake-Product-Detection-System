const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, "deployment_report.txt")
const fileContent = fs.readFileSync(filePath, 'utf-8')

const cleanContent = fileContent.replace(/[^A-Za-z0-9\s]/g, '')

const elementArray = cleanContent.split(/\s+|\n/).map(line => line.trim()).filter(line => line !== '');

const dataArray = elementArray.reduce((acc, current, index, arr) => {
    if (current === "Replacing" || current === "address") {
        acc.push(arr[index + 1]);
    }
    return acc;
}, []);

const obj = {};
for (let i = 0; i < dataArray.length; i += 2) {
    obj[dataArray[i]] = dataArray[i + 1];
}

fs.writeFileSync('contract-address.json', JSON.stringify(obj, null, 2))