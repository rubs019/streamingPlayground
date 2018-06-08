const { Writable, Readable } = require('stream')

let data = null;

const outStream = new Writable({
    decodeStrings : false,
    objectMode : false,
    write : (chunk, encoding, callback) => {
        console.log(chunk.toString())
        data += chunk
        callback()
    },
    writev : (chunk, encoding, callback) => {
        console.log(chunk.toString())
    },
    final : (callback) => {
        console.log('end')
        callback()
    },
    end : (callback) => {
        console.log('end')
        callback
    }
})

const inStream = new Readable({
    objectMode: false,
    read(size) {
        console.log('There is a demand', size)
    },
    destroy(err, callback) {
        throw new Error(err)
    }
})

for (let i=0; i < 10; i++) {
    console.log(i)
    inStream.push(`Ruben${i}`, 'utf-8', true)
}

outStream.on('end', () => {
    console.log('end')
})

// inStream.pipe(outStream)

outStream.write('test')
outStream.write('Rubz')
outStream.end('done')