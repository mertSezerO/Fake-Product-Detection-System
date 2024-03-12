const fs = require('fs');
const path = require('path');

const reportPath = path.resolve(__dirname,"..", "deployment_report.txt");
const reportContent = fs.readFileSync(reportPath, 'utf-8');

const cleanContent = reportContent.replace(/[^A-Za-z0-9\s]/g, '');

const elementArray = cleanContent.split(/\s+|\n/).map(line => line.trim()).filter(line => line !== '');

const dataArray = elementArray.reduce((acc, current, index, arr) => {
    if (current === "Replacing" || current === "address") {
        acc.push(arr[index + 1]);
    }
    return acc;
}, []);

const obj = {};
for (let i = 0; i < dataArray.length; i += 2) {
    obj[dataArray[i]] = {}
    obj[dataArray[i]].address = dataArray[i + 1];
}

Object.keys(obj).forEach(key => {
    const p = path.resolve(__dirname,"..","..", "build", "contracts", key + ".json");
    const f = fs.readFileSync(p);
    const abi = JSON.parse(f).abi;
    obj[key].abi = abi;
});

fs.writeFileSync('./utils/contract-address.json', JSON.stringify(obj, null, 2));

module.exports = obj;