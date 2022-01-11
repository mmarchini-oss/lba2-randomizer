'use strict';

const { readFileSync } = require('fs');
const { writeFile } = require('fs').promises;
// const { parseSceneLBA2 } = require('./dist/scene');
const { parseSceneLBA2 } = require('./dist/scene');
const { HqrReader, uncompressedHqr, getHqrSize, HqrWriter } = require('./dist/hqr/hqr_reader');
const { readFromBuffer } = require('./dist/hqr/array_buffer');
const { parseScript } = require('./dist/script');

const FILE_PATH = process.env.HOME + '/Games/LBA2/RANDOMIZER/SCENE.ORIG.HQR';
const readBuffer = readFromBuffer(readFileSync(FILE_PATH));

function concatArrayBuffers(views) {
    let length = 0
    for (const v of views)
        length += v.byteLength

    let buf = new Uint8Array(length)
    let offset = 0
    for (const v of views) {
        const uint8view = new Uint8Array(v.buffer, v.byteOffset, v.byteLength)
        buf.set(uint8view, offset)
        offset += uint8view.byteLength
    }

    return buf
}

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

function raw(cmd) {
  return cmd.raw;
}

async function heh(hqr) {
  const origSize = getHqrSize(hqr);
  const scenes = [];
  // for (let i=1; i < hqr.offsets.length; i++) {
  for (let i=1; i < 10; i++) {
    const offset = hqr.offsets[i];
    const buffer = hqr.entries[offset].block.original;
    const { actors } = await parseSceneLBA2(buffer, i);
    const scripts = [];
    for (const actor of actors) {
      const { lifeScript } = actor;
      const { commands } = parseScript(lifeScript);
      scripts.push({ lifeScript, commands, offset })
    }
    scenes.push(scripts)
  }

  const foundObjects = [];
  for(const scene of scenes) {
    for(const { commands } of scene) {
      for (const command of commands) {
        if (command.op.command === 'FOUND_OBJECT') {
          foundObjects.push(command)
        }
      }
    }
  }

  const arrayShuffle = await (await import('array-shuffle')).default;
  const shuffled = await arrayShuffle(foundObjects);
  for(const scene of scenes) {
    for(const { commands } of scene) {
      for (let i=0; i<commands.length; i++) {
        const command = commands[i];
        if (command.op.command === 'FOUND_OBJECT') {
          commands[i] = shuffled.pop();
        }
      }
    }
  }

  for(const scene of scenes) {
    for(const { commands, lifeScript, offset } of scene) {
      const buffer = lifeScript.buffer;
      const beforeLifeScript = new DataView(lifeScript.buffer, 0, lifeScript.byteOffset);
      const afterLifeScript = new DataView(lifeScript.buffer, lifeScript.byteLength + lifeScript.byteOffset, buffer.byteLength - (lifeScript.byteLength + lifeScript.byteOffset));
      const regeneratedLifeScript = new Uint8Array(commands.map(raw).reduce((result, arr) => result.concat(arr), []));

      const newBuffer = concatArrayBuffers([beforeLifeScript, regeneratedLifeScript, afterLifeScript]);
      hqr.entries[offset].block.original = newBuffer.buffer;
    }
  }
  const writer = new HqrWriter(hqr);
  const writerBuffer = writer.buffer;
  console.log(writerBuffer, origSize);
  await writeFile(process.env.HOME + '/Games/LBA2/RANDOMIZER/SCENE.HQR', Buffer.from(writerBuffer));
  // const { lifeScript, commands, offset } = scenes[0][0];
  // const buffer = lifeScript.buffer;
  // const beforeLifeScript = new DataView(lifeScript.buffer, 0, lifeScript.byteOffset);
  // const afterLifeScript = new DataView(lifeScript.buffer, lifeScript.byteLength + lifeScript.byteOffset, buffer.byteLength - (lifeScript.byteLength + lifeScript.byteOffset));
  // const regeneratedLifeScript = new Uint8Array(commands.map(raw).reduce((result, arr) => result.concat(arr), []));

  // const newBuffer = concatArrayBuffers([beforeLifeScript, regeneratedLifeScript, afterLifeScript]);

  // for(const scene of scenes) {
  //   for(scene of)
  // }

  // console.log(0, writeBuffer.byteLength);
  // const readView = new Uint8Array(readBuffer, 0, writeBuffer.byteLength);
  // const writeView = new Uint8Array(writeBuffer);
  // writeFile('read.json', JSON.stringify(Array.from(readView), null, 1));
  // writeFile('write.json', JSON.stringify(Array.from(writeView), null, 1));
  // console.log(compare(readView, writeView));
}

heh(uncompressedHqr(new HqrReader(readBuffer).hqr));
