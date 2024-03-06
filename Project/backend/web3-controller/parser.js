const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, "deployment_report.txt")
const fileContent = fs.readFileSync(filePath, 'utf-8')

const cleanContent = fileContent.replace(/[^A-Za-z0-9\s]/g, '')

const elementArray = cleanContent.split(/\s+|\n/).map(line => line.trim()).filter(line => line !== '')

const dataArray = [ ]

for(var i=0; i<elementArray.length; i++) {
    if(elementArray[i] === "Replacing"){
        dataArray.push(elementArray[i+1])
        continue
    }
    if(elementArray[i] === "address"){
        dataArray.push(elementArray[i+1])
        continue
    }
}

const obj = {}

for(var i=0; i<dataArray.length; i=i+2) {
    obj[dataArray[i]] = dataArray[i+1]
}

fs.writeFileSync('contract-address.json', JSON.stringify(obj, null, 2))