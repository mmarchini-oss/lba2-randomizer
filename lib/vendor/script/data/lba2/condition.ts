export const ConditionOpcode = [
    {
        opcode: 0x00,
        command: 'COL',
        operand: 'Uint8:actor'
    },
    {
        opcode: 0x01,
        command: 'COL_OBJ',
        param: 'Uint8:actor',
        operand: 'Uint8:actor'
    },
    {
        opcode: 0x02,
        command: 'DISTANCE',
        param: 'Uint8:actor',
        operand: 'Uint16:distance',
    },
    {
        opcode: 0x03,
        command: 'ZONE',
        operand: 'Uint8:sceneric_zone',
    },
    {
        opcode: 0x04,
        command: 'ZONE_OBJ',
        param: 'Uint8:actor',
        operand: 'Uint8:sceneric_zone'
    },
    {
        opcode: 0x05,
        command: 'BODY',
        operand: 'Uint8:body'
    },
    {
        opcode: 0x06,
        command: 'BODY_OBJ',
        param: 'Uint8:actor',
        operand: 'Uint8:body'
    },
    {
        opcode: 0x07,
        command: 'ANIM',
        operand: 'Uint16:anim'
    },
    {
        opcode: 0x08,
        command: 'ANIM_OBJ',
        param: 'Uint8:actor',
        operand: 'Uint16:anim'
    },
    {
        opcode: 0x09,
        command: 'CURRENT_TRACK',
        operand: 'Uint8:track'
    },
    {
        opcode: 0x0A,
        command: 'CURRENT_TRACK_OBJ',
        param: 'Uint8:actor',
        operand: 'Uint8:track'
    },
    {
        opcode: 0x0B,
        command: 'VAR_CUBE',
        param: 'Uint8:varcube',
        operand: 'Uint8:var_value'
    },
    {
        opcode: 0x0C,
        command: 'CONE_VIEW',
        param: 'Uint8:actor',
        operand: 'Uint16:angle'
    },
    {
        opcode: 0x0D,
        command: 'HIT_BY',
        operand: 'Uint8:actor'
    },
    {
        opcode: 0x0E,
        command: 'ACTION',
        operand: 'Uint8:number'
    },
    {
        opcode: 0x0F,
        command: 'VAR_GAME',
        param: 'Uint8:vargame',
        operand: 'Uint16:var_value'
    },
    {
        opcode: 0x10,
        command: 'LIFE_POINT',
        operand: 'Uint16:number'
    },
    {
        opcode: 0x11,
        command: 'LIFE_POINT_OBJ',
        param: 'Uint8:actor',
        operand: 'Uint16:number'
    },
    {
        opcode: 0x12,
        command: 'KEYS',
        operand: 'Uint8:number'
    },
    {
        opcode: 0x13,
        command: 'MONEY',
        operand: 'Uint16:number'
    },
    {
        opcode: 0x14,
        command: 'HERO_BEHAVIOUR',
        operand: 'Uint8:behaviour'
    },
    {
        opcode: 0x15,
        command: 'CHAPTER',
        operand: 'Uint8:number'
    },
    {
        opcode: 0x16,
        command: 'DISTANCE_3D',
        param: 'Uint8:actor',
        operand: 'Uint16'
    },
    {
        opcode: 0x17,
        command: 'MAGIC_LEVEL',
        operand: 'Uint8:number'
    },
    {
        opcode: 0x18,
        command: 'MAGIC_POINTS',
        operand: 'Uint8:number'
    },
    {
        opcode: 0x19,
        command: 'USING_INVENTORY',
        param: 'Uint8:vargame',
        operand: 'Uint8:boolean'
    },
    {
        opcode: 0x1A,
        command: 'CHOICE',
        operand: 'Uint16:choice_value'
    },
    {
        opcode: 0x1B,
        command: 'FUEL',
        operand: 'Uint8:number'
    },
    {
        opcode: 0x1C,
        command: 'CARRIED_BY',
        operand: 'Uint8:actor'
    },
    {
        opcode: 0x1D,
        command: 'CDROM',
        operand: 'Uint8:number'
    },
    {
        opcode: 0x1E,
        command: 'LADDER',
        operand: 'Uint8:number'
    },
    {
        opcode: 0x1F,
        command: 'RND',
        param: 'Uint8:number',
        operand: 'Uint8:number'
    },
    {
        opcode: 0x20,
        command: 'RAIL',
        param: 'Uint8:number',
        operand: 'Uint8:number'
    },
    {
        opcode: 0x21,
        command: 'BETA',
        operand: 'Uint16:angle'
    },
    {
        opcode: 0x22,
        command: 'BETA_OBJ',
        param: 'Uint8:actor',
        operand: 'Uint16:angle',
    },
    {
        opcode: 0x23,
        command: 'CARRIED_BY_OBJ',
        param: 'Uint8:actor',
        operand: 'Uint8:actor'
    },
    {
        opcode: 0x24,
        command: 'ANGLE',
        param: 'Uint8:actor',
        operand: 'Uint16:angle'
    },
    {
        opcode: 0x25,
        command: 'DISTANCE_MESSAGE',
        param: 'Uint8:actor',
        operand: 'Uint16:distance'
    },
    {
        opcode: 0x26,
        command: 'HIT_OBJ_BY',
        param: 'Uint8:actor',
        operand: 'Uint8:actor'
    },
    {
        opcode: 0x27,
        command: 'REAL_ANGLE',
        param: 'Uint8:actor',
        operand: 'Uint16:angle'
    },
    {
        opcode: 0x28,
        command: 'DEMO',
        operand: 'Uint8:boolean'
    },
    {
        opcode: 0x29,
        command: 'COL_DECORS',
        operand: 'Uint8:boolean'
    },
    {
        opcode: 0x2A,
        command: 'COL_DECORS_OBJ',
        param: 'Uint8:actor',
        operand: 'Uint8:boolean'
    },
    {
        opcode: 0x2B,
        command: 'PROCESSOR',
        operand: 'Uint8:number'
    },
    {
        opcode: 0x2C,
        command: 'OBJECT_DISPLAYED',
        param: 'Uint8:number',
        operand: 'Uint8:boolean'
    },
    {
        opcode: 0x2D,
        command: 'ANGLE_OBJ',
        param: 'Uint8:actor',
        operand: 'Uint16:angle'
    }
];
