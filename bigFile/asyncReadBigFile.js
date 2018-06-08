const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    const theBigFile = fs.createReadStream('./big.file');

    theBigFile
        .on('readable', () => {

            while (null !== (chunk = theBigFile.read())) {
                console.log(`Received ${chunk.length} bytes of data.`);
            }

            if(!chunk){
                console.log('All data has been downloaded')
            }
        })
});

server.listen(8001);