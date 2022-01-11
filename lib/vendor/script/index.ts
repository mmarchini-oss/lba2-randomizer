// import { LifeOpcode } from './data/lba2/life';
// import { ConditionOpcode } from './data/lba2/condition';

// // const NO_MOVE = 0;
// // const MOVE_MANUAL = 1;
// const MOVE_FOLLOW = 2;
// // const MOVE_TRACK = 3;
// const MOVE_FOLLOW_2 = 4;
// // const MOVE_TRACK_ATTACK = 5;
// const MOVE_SAME_XZ = 6;
// // const MOVE_PINGOUIN = 7;
// // const MOVE_WAGON = 8;
// // const MOVE_CIRCLE = 9;
// // const MOVE_CIRCLE2 = 10;
// const MOVE_SAME_XZ_BETA = 11;
// // const MOVE_BUGGY = 12;
// // const MOVE_BUGGY_MANUAL = 13;

// // #define LT_EQUAL                0
// // #define LT_SUP                  1
// // #define LT_LESS                 2
// // #define LT_SUP_EQUAL            3
// // #define LT_LESS_EQUAL           4
// // #define LT_DIFFERENT            5

// // #define NB_TESTS_LIFE           6


// export class Command {
//   readonly raw: number[];
//   constructor(command: DataView) {
//     this.raw = [];
//     for (let i=0; i < command.byteLength; i++) {
//       this.raw.push(command.getUint8(i));
//     }
//   }

//   get size() {
//     return this.raw.length;
//   }
// }

// const PARAM_SIZE_REGEX = /(U){0,1}[Ii]nt(\d+)/;

// NOTE(mmarchini): CASE condition size is based of SWITCH condition, need context awareness
// export function parseScript(script: DataView): Command[] {
//   let offset = 0;
//   const commands: Command[] = [];
//   // const switchStack: [];

//   function getCommand(script: DataView, offset): Command {
//     let size = 1;
//     const opCode = script.getUint8(offset);
//     const op = LifeOpcode[opCode];
//     try {
//       if (op === undefined) {
//         throw new Error(`unknown opCode ${opCode}`);
//       }
//       if (op.args?.length === 1 && op.args[0] === 'string') {
//         while (script.getUint8(offset + size) !== 0) { size++ }
//         return new Command(new DataView(script.buffer, script.byteOffset + offset, size));
//       }
//       if (op.args && op.argsFirst) {
//         // size += 1;  // 1 byte for condition
//         for (const arg of op.args) {
//           size += Number(arg.match(PARAM_SIZE_REGEX)[2]) / 8;
//         }
//       }
//       if (op.argsFirst || op.condition) {
//         size += 1;  // 1 byte for condition
//       }
//       if (op.condition) {
//         const condition = ConditionOpcode[script.getUint8(offset + 1)];
//         // size += 1;  // 1 byte for condition
//         if (condition.param) {
//           size += Number(condition.param.match(PARAM_SIZE_REGEX)[2]) / 8;
//         }
//         if (op.condition !== 'SWITCH' && condition.operand) {
//           size += Number(condition.operand.match(PARAM_SIZE_REGEX)[2]) / 8;
//           // size += 1;
//         }
//       }
//       if (op.operator) {
//         size += 1;  // 1 byte for operand
//       }
//       if (op.args && !op.argsFirst) {
//         for (const arg of op.args) {
//           size += Number(arg.match(PARAM_SIZE_REGEX)[2]) / 8;
//         }
//       }
//       if (op.dirmode && [MOVE_FOLLOW, MOVE_FOLLOW_2, MOVE_SAME_XZ, MOVE_SAME_XZ_BETA].includes(script.getUint8(offset + size - 1))) {
//         size += 1;
//       }
//     } catch (e) {
//       e.op = op;
//       e.opCode = opCode;
//       throw e;
//     }
//     return new Command(new DataView(script.buffer, script.byteOffset + offset, size));
//   }

//   try {
//     while (offset < script.byteLength) {
//       const command = getCommand(script, offset);
//       commands.push(command);
//       offset += command.size;
//     }
//   } catch (e) {
//     e.commands = commands;
//     throw e;
//   }
//   return commands;
// }

import { last, range } from 'lodash';
import { LifeOpcode } from './data/lba2/life';
import { ConditionOpcode } from './data/lba2/condition';
import { OperatorOpcode } from './data/operator';

const TypeSize = {
    Int8: 1,
    Uint8: 1,
    Int16: 2,
    Uint16: 2,
    Int32: 4,
    Uint32: 4,
};

export function parseScript(script: DataView) {
    const state = {
        comportement: -1,
        track: -1,
        opMap: {},
        ifStack: [],
        switchStack: [],
        offset: 0,
        commands: [],
        choice: null
    };
    try {
      while (state.offset < script.byteLength) {
        checkEndIf(state);
        state.opMap[state.offset] = state.commands.length;
        const code = script.getUint8(state.offset);
        const op = LifeOpcode[code];
        const beginOffset = state.offset;
        const command = parseCommand(state, script, op)
        command.raw = range(beginOffset, state.offset).map((value) => script.getUint8(value));
        state.commands.push(command);
      }
    } catch(e) {
      e.state = state;
      console.error(e);
      throw e;
    }
    return {
      opMap: state.opMap,
      commands: state.commands
    };
}

function checkEndIf(state) {
    while (state.ifStack.length > 0 && state.offset === last(state.ifStack)) {
        // state.commands.push({ op: getLifeOpcode(0x10) });
        state.ifStack.pop();
    }
}

interface Cmd {
    op: any;
    args?: any;
    raw?: any;
}

function parseCommand(state, script, op) {
    state.offset += 1;
    const cmd : Cmd = {
        op,
    };
    if (op.argsFirst) {
        parseArguments(state, script, op, cmd);
    }
    parseCondition(state, script, op, cmd);
    if (!op.argsFirst) {
        parseArguments(state, script, op, cmd);
    }
    if (op.condition && !op.precond && cmd.args) {
        state.ifStack.push(cmd.args[0].value);
    } else if (op.command === 'ELSE') {
        state.ifStack[state.ifStack.length - 1] = cmd.args[0].value;
    }
    if (op.command === 'SWITCH') {
        state.switchStack.push(-1);
    } else if (op.command === 'BREAK' || op.command === 'CASE') {
        state.switchStack[state.switchStack.length - 1] =
            Math.max(
                state.switchStack[state.switchStack.length - 1],
                cmd.args[0].value
            );
    } else if (op.command === 'END_SWITCH') {
        state.switchStack.pop();
    }
    return cmd;
}

function parseCondition(state, script, op, cmd) {
    let condition;
    if (op.condition) {
        const code = script.getUint8(state.offset);
        condition = ConditionOpcode[code];
        cmd.condition = {
            op: condition,
            operandType: getLbaType(condition.operand)
        };
        state.offset += 1;
        if (condition.param) {
            cmd.condition.param = parseValue(state, script, condition.param);
        }
        if (op.command === 'SWITCH') {
            state.switchCondition = condition;
        }
    } else if (op.operator) {
        condition = state.switchCondition;
    }
    if (op.operator) {
        const code = script.getUint8(state.offset);
        const operator = OperatorOpcode[code];
        cmd.operator = { op: operator };
        state.offset += 1;
        cmd.operator.operand = parseValue(state, script, condition.operand);
    }
}

function parseArguments(state, script, op, cmd) {
    if (op.args) {
        cmd.args = [];
        for (let i = 0; i < op.args.length; i += 1) {
            cmd.args.push(parseValue(state, script, op.args[i]));
        }
        if (op.command === 'SET_DIRMODE' || op.command === 'SET_DIRMODE_OBJ') {
            const mode = (last(cmd.args) as any).value;
            if (mode === 2 || mode === 4 || mode === 6 || mode === 10 || mode === 11) {
                cmd.args.push({
                    value: script.getUint8(state.offset, true),
                    type: 'actor',
                    hide: false
                });
                state.offset += 1;
            } else if (mode === 9) {
                cmd.args.push({
                    value: script.getUint8(state.offset, true),
                    type: 'number',
                    hide: false
                });
                state.offset += 1;
            }
        }
    }
}

function parseValue(state, script, spec) {
    const [t, lbaType] = spec.split(':');
    let type = t;
    let hide = false;
    if (type[0] === '_') {
        type = type.substr(1);
        hide = true;
    }
    let value;
    if (type === 'string') {
        value = '';
        let char;
        do {
            char = script.getUint8(state.offset);
            if (char !== 0) {
                value += String.fromCharCode(char);
            }
            state.offset += 1;
        } while (char !== 0);
    } else {
        value = script[`get${type}`](state.offset, true);
        state.offset += TypeSize[type];
    }
    return {
        type: lbaType,
        value,
        hide
    };
}

function getLbaType(spec) {
    const value = spec.split(':');
    return value[1];
}
