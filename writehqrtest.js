'use strict';

const { readFile, writeFile } = require('fs').promises;
const { HqrReader, HqrWriter } = require('./dist/hqr/hqr_reader');
const { readFromBuffer } = require('./dist/hqr/array_buffer');

const FILE_PATH = process.env.HOME + '/Games/LBA2/RANDOMIZER/SCENE.ORIG.HQR';

function compare(a, b) {
  console.log('a', a.buffer);
  console.log('b', b.buffer);

  return a.every((val, i) => {
    const result = val === b[i];
    if (!result) {
      console.log('meh', i, val, b[i]);
    }
    return result;
  });
}

async function main() {
  const readBuffer = readFromBuffer(await readFile(FILE_PATH));
  console.log(0, readBuffer.byteLength);
  const reader = new HqrReader(readBuffer);

  const writer = new HqrWriter(reader.hqr);
  const writeBuffer = writer.buffer;

  console.log(0, writeBuffer.byteLength);
  const readView = new Uint8Array(readBuffer, 0, writeBuffer.byteLength);
  const writeView = new Uint8Array(writeBuffer);
  writeFile('read.json', JSON.stringify(Array.from(readView), null, 1));
  writeFile('write.json', JSON.stringify(Array.from(writeView), null, 1));
  console.log(compare(readView, writeView));
}

main()
