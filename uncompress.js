'use strict';

const { readFile, writeFile } = require('fs').promises;
const { HqrReader, HqrWriter, uncompressedHqr } = require('./dist/hqr/hqr_reader');
const { readFromBuffer } = require('./dist/hqr/array_buffer');

const FILE_PATH = process.env.HOME + '/Games/LBA2/RANDOMIZER/SCENE.ORIG.HQR';

async function main() {
  const readBuffer = readFromBuffer(await readFile(FILE_PATH));
  const reader = new HqrReader(readBuffer);

  const writer = new HqrWriter(uncompressedHqr(reader.hqr));
  const writeBuffer = writer.buffer;
  console.log(readBuffer.byteLength, writeBuffer.byteLength);
  // const writer = new HqrWriter(reader.hqr);
  await writeFile(process.env.HOME + '/Games/LBA2/RANDOMIZER/SCENE.HQR', Buffer.from(writer.buffer));
}

main()
