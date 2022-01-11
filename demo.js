'use strict';

const { readFileSync, writeFileSync } = require('fs');
// const { parseSceneLBA2 } = require('./dist/scene');
const { parseSceneLBA2 } = require('./dist/scene');
const { HqrReader } = require('./dist/hqr/hqr_reader');
const { readFromBuffer } = require('./dist/hqr/array_buffer');
const { parseScript: origParseScript } = require('./dist/script/parser');
const { parseScript } = require('./dist/script');

const FILE_PATH = process.env.HOME + '/Games/LBA2/RANDOMIZER/SCENE.ORIG.HQR';
const buffer = readFromBuffer(readFileSync(FILE_PATH));
const p = (new HqrReader(buffer)).hqr;

function raw(cmd) {
  return cmd.raw;
}

async function heh({ hqr }) {
  const mismatches = [];
  for (let i=1; i < hqr.offsets.length; i++) {
    const offset = hqr.offsets[i];
    const buffer = hqr.entries[offset].block.original;
    const { actors } = await parseSceneLBA2(buffer, i);
    const script = [];
    // console.log(`scene ${i}`);
    for (const actor of actors) {
      // console.log(`${actor.index}`);
      const { lifeScript } = actor;
      const { commands } = origParseScript(actor.index, 'life', lifeScript);
      const a = JSON.stringify(commands.map(raw).filter(cmd => cmd !== undefined), null, 1);
      writeFileSync(`/tmp/${i}.${actor.index}.a.json`, a);
      try {
        const otherCommands = parseScript(lifeScript);
        const b = JSON.stringify(otherCommands.commands.map(raw).filter(cmd => cmd !== undefined), null, 1);
        writeFileSync(`/tmp/${i}.${actor.index}.b.json`, b);
        if (a !== b) {
          console.log(`mismatch on ${i} ${actor.index}`);
          mismatches.push([i, actor.index]);
        }
      } catch (e) {
        let x=0;
        console.error(e);
        while (commands.map(raw).filter(cmd => cmd !== undefined)[x].every((cmd, y) => console.log(cmd, e.state.commands.map(raw)[x][y], x, y) || cmd === e.commands.map(raw)[x][y])) { x++ }
        e.success = commands.filter(cmd => cmd.raw !== undefined).slice(Math.min(x, x - 1), e.commands.length);
        e.failed = e.commands.slice(Math.min(x, x - 1), e.commands.length);
        e.scene = { index: i, actorIndex: actor.index};
        e.errorIndex = x;
        throw e
      }
    }
    // console.log();
  }
  console.log(mismatches);
}

heh(new HqrReader(buffer));
