const fs = require('fs')
const file = fs.createReadStream('./little.file')
const destinationFile = fs.createWriteStream('newLittleFile.file')

console.log('ok')


file.pipe(destinationFile)

file.on('pipe', (chunk) => {
    console.log('chunk', chunk)
})

file.on('end', () => {
    console.log('end')
})

file.on('error', (err) => {
    console.log(err)
})

destinationFile.on('pipe', (src) => {
    src.on('data', (chunk) => {
        console.log('chunk', chunk)
    })
})