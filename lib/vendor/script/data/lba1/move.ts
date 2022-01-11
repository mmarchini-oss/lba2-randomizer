export const MoveOpcode = [
    {
        opcode: 0x00,
        command: 'END',
    },
    {
        opcode: 0x01,
        command: 'NOP',
    },
    {
        opcode: 0x02,
        command: 'BODY',
        args: ['Uint8:body']
    },
    {
        opcode: 0x03,
        command: 'ANIM',
        args: ['Uint8:anim']
    },
    {
        opcode: 0x04,
        command: 'GOTO_POINT',
        args: ['Uint8:point']
    },
    {
        opcode: 0x05,
        command: 'WAIT_ANIM',
    },
    {
        opcode: 0x06,
        command: 'LOOP',
    },
    {
        opcode: 0x07,
        command: 'ANGLE',
        args: ['Int16:angle']
    },
    {
        opcode: 0x08,
        command: 'POS_POINT',
        args: ['Uint8:point']
    },
    {
        opcode: 0x09,
        command: 'TRACK',
        args: ['Uint8:number']
    },
    {
        opcode: 0x0A,
        command: 'GOTO',
        args: ['Uint16:offset']
    },
    {
        opcode: 0x0B,
        command: 'STOP',
    },
    {
        opcode: 0x0C,
        command: 'GOTO_SYM_POINT',
        args: ['Uint8:point']
    },
    {
        opcode: 0x0D,
        command: 'WAIT_NUM_ANIM',
        args: ['Uint8', 'Uint8']
    },
    {
        opcode: 0x0E,
        command: 'SAMPLE',
        args: ['Uint16'],
        skipSideScenes: true
    },
    {
        opcode: 0x0F,
        command: 'GOTO_POINT_3D',
        args: ['Uint8:point']
    },
    {
        opcode: 0x10,
        command: 'SPEED',
        args: ['Uint16']
    },
    {
        opcode: 0x11,
        command: 'BACKGROUND',
        args: ['Uint8']
    },
    {
        opcode: 0x12,
        command: 'WAIT_NUM_SECOND',
        args: ['Uint8', 'Uint32']
    },
    {
        opcode: 0x13,
        command: 'NO_BODY',
    },
    {
        opcode: 0x14,
        command: 'BETA',
        args: ['Int16:angle']
    },
    {
        opcode: 0x15,
        command: 'OPEN_LEFT',
        args: ['Int16:distance']
    },
    {
        opcode: 0x16,
        command: 'OPEN_RIGHT',
        args: ['Int16:distance']
    },
    {
        opcode: 0x17,
        command: 'OPEN_UP',
        args: ['Int16:distance']
    },
    {
        opcode: 0x18,
        command: 'OPEN_DOWN',
        args: ['Int16:distance']
    },
    {
        opcode: 0x19,
        command: 'CLOSE',
    },
    {
        opcode: 0x1A,
        command: 'WAIT_DOOR',
    },
    {
        opcode: 0x1B,
        command: 'SAMPLE_RND',
        args: ['Int16'],
        skipSideScenes: true
    },
    {
        opcode: 0x1C,
        command: 'SAMPLE_ALWAYS',
        args: ['Int16'],
        skipSideScenes: true
    },
    {
        opcode: 0x1D,
        command: 'SAMPLE_STOP',
        args: ['Int16'],
        skipSideScenes: true
    },
    {
        opcode: 0x1E,
        command: 'PLAY_VIDEO',
    },
    {
        opcode: 0x1F,
        command: 'REPEAT_SAMPLE',
        args: ['Int16'],
        skipSideScenes: true
    },
    {
        opcode: 0x20,
        command: 'SIMPLE_SAMPLE',
        args: ['Int16'],
        skipSideScenes: true
    },
    {
        opcode: 0x21,
        command: 'FACE_HERO',
        args: ['Uint16']
    },
    {
        opcode: 0x22,
        command: 'ANGLE_RND',
        args: ['Int16', 'Uint16']
    }
];
