export const LifeOpcode = [
    // Command
    {
        opcode: 0x00,
        command: 'END',
    },
    // Command
    {
        opcode: 0x01,
        command: 'NOP',
    },
    // If
    {
        opcode: 0x02,
        command: 'SNIF',
        args: ['_Uint16:offset'],
        condition: true,
        operator: true
    },
    // Command
    {
        opcode: 0x03,
        command: 'OFFSET',
    },
    // If
    {
        opcode: 0x04,
        command: 'NEVERIF',
        args: ['_Uint16:offset'],
        condition: true,
        operator: true
    },
    {
        opcode: 0x05,
        command: 'UNKNOWN(0x05)',
    },
    {
        opcode: 0x06,
        command: 'UNKNOWN(0x06)',
    },
    {
        opcode: 0x07,
        command: 'UNKNOWN(0x07)',
    },
    {
        opcode: 0x08,
        command: 'UNKNOWN(0x08)',
    },
    {
        opcode: 0x09,
        command: 'UNKNOWN(0x09)',
    },
    // Parametrized
    {
        opcode: 0x0A,
        command: 'PALETTE',
        args: ['Uint8']
    },
    // Command
    {
        opcode: 0x0B,
        command: 'RETURN',
    },
    // If
    {
        opcode: 0x0C,
        command: 'IF',
        args: ['_Uint16:offset'],
        condition: true,
        operator: true
    },
    {
        opcode: 0x0D,
        command: 'SWIF',
        args: ['_Uint16:offset'],
        condition: true,
        operator: true,
        cmdState: true
    },
    {
        opcode: 0x0E,
        command: 'ONEIF',
        args: ['_Uint16:offset'],
        condition: true,
        operator: true,
        cmdState: true
    },
    // Else
    {
        opcode: 0x0F,
        command: 'ELSE',
        args: ['_Uint16:offset']
    },
    // Command
    {
        opcode: 0x10,
        command: 'ENDIF',
    },
    // Parametrized
    {
        opcode: 0x11,
        command: 'BODY',
        args: ['Uint8:body']
    },
    // Parametrized
    {
        opcode: 0x12,
        command: 'BODY_OBJ',
        args: ['Uint8:actor', 'Uint8:body']
    },
    // Parametrized
    {
        opcode: 0x13,
        command: 'ANIM',
        args: ['Uint16:anim']
    },
    // Parametrized
    {
        opcode: 0x14,
        command: 'ANIM_OBJ',
        args: ['Uint8:actor', 'Uint16:anim']
    },
    // Parametrized
    {
        opcode: 0x15,
        command: 'SET_CAMERA',
        args: ['Uint8:camera', 'Uint8']
    },
    // Parametrized
    {
        opcode: 0x16,
        command: 'CAMERA_CENTER',
        args: ['Uint8']
    },
    // Parametrized
    {
        opcode: 0x17,
        command: 'SET_TRACK',
        args: ['Uint16:number']
    },
    // Parametrized
    {
        opcode: 0x18,
        command: 'SET_TRACK_OBJ',
        args: ['Uint8:actor', 'Uint16:number']
    },
    // Parametrized
    {
        opcode: 0x19,
        command: 'MESSAGE',
        args: ['Uint16:text'],
        cmdState: true
    },
    // Parametrized
    {
        opcode: 0x1A,
        command: 'CAN_FALL',
        args: ['Uint8:fall_type']
    },
    // Dirmode
    {
        opcode: 0x1B,
        command: 'SET_DIRMODE',
        args: ['Uint8:dirmode'],
        dirmode: true
    },
    // Dirmode
    {
        opcode: 0x1C,
        command: 'SET_DIRMODE_OBJ',
        args: ['Uint8:actor', 'Uint8:dirmode'],
        dirmode: true
    },
    // Parametrized
    {
        opcode: 0x1D,
        command: 'CAM_FOLLOW',
        args: ['Uint8:actor']
    },
    // Parametrized
    {
        opcode: 0x1E,
        command: 'SET_HERO_BEHAVIOUR',
        args: ['Uint8:behaviour']
    },
    // Parametrized
    {
        opcode: 0x1F,
        command: 'SET_VAR_CUBE',
        args: ['Uint8:varcube', 'Uint8:var_value']
    },
    // Parametrized
    {
        opcode: 0x20,
        command: 'BEHAVIOUR',
        args: ['Uint8:label']
    },
    // Parametrized
    {
        opcode: 0x21,
        command: 'SET_BEHAVIOUR',
        args: ['Uint16:offset']
    },
    // Parametrized
    {
        opcode: 0x22,
        command: 'SET_BEHAVIOUR_OBJ',
        args: ['Uint8:actor', 'Uint16:label']
    },
    // Command
    {
        opcode: 0x23,
        command: 'END_BEHAVIOUR',
    },
    // Parametrized
    {
        opcode: 0x24,
        command: 'SET_VAR_GAME',
        args: ['Uint8:vargame', 'Uint16:var_value']
    },
    // Parametrized
    {
        opcode: 0x25,
        command: 'KILL_OBJ',
        args: ['Uint8:actor']
    },
    // Command
    {
        opcode: 0x26,
        command: 'SUICIDE',
    },
    // Command
    {
        opcode: 0x27,
        command: 'USE_ONE_LITTLE_KEY',
    },
    // Parametrized
    {
        opcode: 0x28,
        command: 'SUB_MONEY',
        args: ['Int16']
    },
    // Command
    {
        opcode: 0x29,
        command: 'END_LIFE',
    },
    // Command
    {
        opcode: 0x2A,
        command: 'SAVE_CURRENT_TRACK',
    },
    // Command
    {
        opcode: 0x2B,
        command: 'RESTORE_LAST_TRACK',
    },
    // Parametrized(state?)
    {
        opcode: 0x2C,
        command: 'MESSAGE_OBJ',
        args: ['Uint8:actor', 'Uint16:text'],
        cmdState: true
    },
    // Command
    {
        opcode: 0x2D,
        command: 'INC_CHAPTER',
    },
    // Parametrized(state?)
    {
        opcode: 0x2E,
        command: 'FOUND_OBJECT',
        args: ['Uint8:vargame'],
        cmdState: true
    },
    // Parametrized
    {
        opcode: 0x2F,
        command: 'SET_DOOR_LEFT',
        args: ['Int16:distance']
    },
    // Parametrized
    {
        opcode: 0x30,
        command: 'SET_DOOR_RIGHT',
        args: ['Int16:distance']
    },
    // Parametrized
    {
        opcode: 0x31,
        command: 'SET_DOOR_UP',
        args: ['Int16:distance']
    },
    // Parametrized
    {
        opcode: 0x32,
        command: 'SET_DOOR_DOWN',
        args: ['Int16:distance']
    },
    // Parametrized
    {
        opcode: 0x33,
        command: 'GIVE_BONUS',
        args: ['Uint8']
    },
    // Parametrized
    {
        opcode: 0x34,
        command: 'CHANGE_CUBE',
        args: ['Uint8:scene']
    },
    // Parametrized
    {
        opcode: 0x35,
        command: 'OBJ_COL',
        args: ['Uint8']
    },
    // Parametrized
    {
        opcode: 0x36,
        command: 'BRICK_COL',
        args: ['Uint8']
    },
    // Parametrized
    {
        opcode: 0x37,
        command: 'OR_IF',
        args: ['_Uint16:offset'],
        precond: true,
        condition: true,
        operator: true
    },
    // Parametrized
    {
        opcode: 0x38,
        command: 'INVISIBLE',
        args: ['Uint8']
    },
    // Parametrized
    {
        opcode: 0x39,
        command: 'SHADOW_OBJ',
        args: ['Uint8:actor', 'Uint8']
    },
    // Parametrized
    {
        opcode: 0x3A,
        command: 'POS_POINT',
        args: ['Uint8:point']
    },
    // Parametrized
    {
        opcode: 0x3B,
        command: 'SET_MAGIC_LEVEL',
        args: ['Uint8']
    },
    // Parametrized
    {
        opcode: 0x3C,
        command: 'SUB_MAGIC_POINT',
        args: ['Uint8']
    },
    // Parametrized
    {
        opcode: 0x3D,
        command: 'SET_LIFE_POINT_OBJ',
        args: ['Uint8:actor', 'Uint8']
    },
    // Parametrized
    {
        opcode: 0x3E,
        command: 'SUB_LIFE_POINT_OBJ',
        args: ['Uint8:actor', 'Uint8']
    },
    // Parametrized
    {
        opcode: 0x3F,
        command: 'HIT',
        args: ['Uint8:actor', 'Uint8']
    },
    // Parametrized(state?)
    {
        opcode: 0x40,
        command: 'PLAY_VIDEO',
        args: ['string'],
        cmdState: true
    },
    {
        opcode: 0x41,
        command: 'ECLAIR',
        args: ['Uint8']
    },
    {
        opcode: 0x42,
        command: 'INC_CLOVER_BOX',
    },
    {
        opcode: 0x43,
        command: 'SET_USED_INVENTORY',
        args: ['Uint8']
    },
    {
        opcode: 0x44,
        command: 'ADD_CHOICE',
        args: ['Uint16:text']
    },
    {
        opcode: 0x45,
        command: 'ASK_CHOICE',
        args: ['Uint16'],
        cmdState: true
    },
    {
        opcode: 0x46,
        command: 'INIT_BUGGY',
        args: ['Uint8']
    },
    {
        opcode: 0x47,
        command: 'MEMO_SLATE',
        args: ['Uint8']
    },
    {
        opcode: 0x48,
        command: 'SET_HOLO_POS',
        args: ['Uint8']
    },
    {
        opcode: 0x49,
        command: 'CLR_HOLO_POS',
        args: ['Uint8']
    },
    {
        opcode: 0x4A,
        command: 'ADD_FUEL',
        args: ['Uint8']
    },
    {
        opcode: 0x4B,
        command: 'SUB_FUEL',
        args: ['Uint8']
    },
    {
        opcode: 0x4C,
        command: 'SET_FRAGMENT',
        args: ['Uint8', 'Uint8']
    },
    {
        opcode: 0x4D,
        command: 'SET_TELEPORT_ZONE',
        args: ['Uint8', 'Uint8']
    },
    {
        opcode: 0x4E,
        command: 'MESSAGE_ZOE',
        args: ['Uint16:text'],
        cmdState: true
    },
    {
        opcode: 0x4F,
        command: 'FULL_POINT',
    },
    {
        opcode: 0x50,
        command: 'BETA',
        args: ['Int16:angle']
    },
    {
        opcode: 0x51,
        command: 'FADE_TO_PAL',
        args: ['Uint8']
    },
    {
        opcode: 0x52,
        command: 'ACTION',
    },
    {
        opcode: 0x53,
        command: 'SET_FRAME',
        args: ['Uint8']
    },
    {
        opcode: 0x54,
        command: 'SET_SPRITE',
        args: ['Uint16']
    },
    {
        opcode: 0x55,
        command: 'SET_FRAME_3DS',
        args: ['Uint8']
    },
    {
        opcode: 0x56,
        command: 'IMPACT_OBJ',
        args: ['Uint8:actor', 'Uint16', 'Uint16']
    },
    {
        opcode: 0x57,
        command: 'IMPACT_POINT',
        args: ['Uint8', 'Uint16']
    },
    {
        opcode: 0x58,
        command: 'ADD_MESSAGE',
        args: ['Uint16:text'],
        cmdState: true
    },
    {
        opcode: 0x59,
        command: 'BALLOON',
        args: ['Uint8']
    },
    {
        opcode: 0x5A,
        command: 'NO_SHOCK',
        args: ['Uint8']
    },
    {
        opcode: 0x5B,
        command: 'ASK_CHOICE_OBJ',
        args: ['Uint8:actor', 'Uint16'],
        cmdState: true
    },
    {
        opcode: 0x5C,
        command: 'CINEMA_MODE',
        args: ['Uint8:boolean']
    },
    {
        opcode: 0x5D,
        command: 'SAVE_HERO',
    },
    {
        opcode: 0x5E,
        command: 'RESTORE_HERO',
    },
    {
        opcode: 0x5F,
        command: 'ANIM_SET',
        args: ['Uint16:anim']
    },
    {
        opcode: 0x60,
        command: 'RAIN',
        args: ['Uint8']
    },
    {
        opcode: 0x61,
        command: 'GAME_OVER',
    },
    {
        opcode: 0x62,
        command: 'THE_END',
    },
    {
        opcode: 0x63,
        command: 'CONVEYOR',
        args: ['Uint8', 'Uint8']
    },
    {
        opcode: 0x64,
        command: 'PLAY_MUSIC',
        args: ['Uint8'],
        skipSideScenes: true
    },
    {
        opcode: 0x65,
        command: 'TRACK_TO_VAR_GAME',
        args: ['Uint8:vargame']
    },
    {
        opcode: 0x66,
        command: 'VAR_GAME_TO_TRACK',
        args: ['Uint8:vargame']
    },
    {
        opcode: 0x67,
        command: 'ANIM_TEXTURE',
        args: ['Uint8']
    },
    {
        opcode: 0x68,
        command: 'ADD_MESSAGE_OBJ',
        args: ['Uint8:actor', 'Uint16:text']
    },
    {
        opcode: 0x69,
        command: 'BRUTAL_EXIT',
    },
    {
        opcode: 0x6A,
        command: 'REPLACE',
    },
    {
        opcode: 0x6B,
        command: 'LADDER',
        args: ['Uint8', 'Uint8']
    },
    {
        opcode: 0x6C,
        command: 'SET_ARMOR',
        args: ['Uint8']
    },
    {
        opcode: 0x6D,
        command: 'SET_ARMOR_OBJ',
        args: ['Uint8:actor', 'Uint8']
    },
    {
        opcode: 0x6E,
        command: 'ADD_LIFE_POINT_OBJ',
        args: ['Uint8:actor', 'Uint8']
    },
    {
        opcode: 0x6F,
        command: 'STATE_INVENTORY',
        args: ['Uint8', 'Uint8']
    },
    {
        opcode: 0x70,
        command: 'AND_IF',
        args: ['_Uint16:offset'],
        precond: true,
        condition: true,
        operator: true
    },
    {
        opcode: 0x71,
        command: 'SWITCH',
        condition: 'SWITCH'
    },
    {
        opcode: 0x72,
        command: 'OR_CASE',
        argsFirst: true,
        args: ['_Uint16:offset'],
        operator: true
    },
    {
        opcode: 0x73,
        command: 'CASE',
        argsFirst: true,
        args: ['_Uint16:offset'],
        operator: true
    },
    {
        opcode: 0x74,
        command: 'DEFAULT',
    },
    {
        opcode: 0x75,
        command: 'BREAK',
        args: ['_Uint16:offset']
    },
    {
        opcode: 0x76,
        command: 'END_SWITCH',
    },
    {
        opcode: 0x77,
        command: 'SET_SPIKE_ZONE',
        args: ['Uint8', 'Uint8']
    },
    {
        opcode: 0x78,
        command: 'SAVE_BEHAVIOUR',
    },
    {
        opcode: 0x79,
        command: 'RESTORE_BEHAVIOUR',
    },
    {
        opcode: 0x7A,
        command: 'SAMPLE',
        args: ['Uint16'],
        skipSideScenes: true
    },
    {
        opcode: 0x7B,
        command: 'SAMPLE_RND',
        args: ['Uint16'],
        skipSideScenes: true
    },
    {
        opcode: 0x7C,
        command: 'SAMPLE_ALWAYS',
        args: ['Uint16'],
        skipSideScenes: true
    },
    {
        opcode: 0x7D,
        command: 'SAMPLE_STOP',
        args: ['Uint16'],
        skipSideScenes: true
    },
    {
        opcode: 0x7E,
        command: 'REPEAT_SAMPLE',
        args: ['Uint16', 'Uint8'],
        skipSideScenes: true
    },
    {
        opcode: 0x7F,
        command: 'BACKGROUND',
        args: ['Uint8']
    },
    {
        opcode: 0x80,
        command: 'ADD_VAR_GAME',
        args: ['Uint8:vargame', 'Uint16']
    },
    {
        opcode: 0x81,
        command: 'SUB_VAR_GAME',
        args: ['Uint8:vargame', 'Uint16']
    },
    {
        opcode: 0x82,
        command: 'ADD_VAR_CUBE',
        args: ['Uint8:varcube', 'Uint8']
    },
    {
        opcode: 0x83,
        command: 'SUB_VAR_CUBE',
        args: ['Uint8:varcube', 'Uint8']
    },
    {
        opcode: 0x84,
        command: 'UNKNOWN(0x84)',
    },
    {
        opcode: 0x85,
        command: 'SET_RAIL',
        args: ['Uint8', 'Uint8']
    },
    {
        opcode: 0x86,
        command: 'INVERSE_BETA',
    },
    {
        opcode: 0x87,
        command: 'NO_BODY',
    },
    {
        opcode: 0x88,
        command: 'ADD_MONEY',
        args: ['Uint16']
    },
    {
        opcode: 0x89,
        command: 'SAVE_CURRENT_TRACK_OBJ',
        args: ['Uint8:actor']
    },
    {
        opcode: 0x8A,
        command: 'RESTORE_LAST_TRACK_OBJ',
        args: ['Uint8:actor']
    },
    {
        opcode: 0x8B,
        command: 'SAVE_BEHAVIOUR_OBJ',
        args: ['Uint8:actor']
    },
    {
        opcode: 0x8C,
        command: 'RESTORE_BEHAVIOUR_OBJ',
        args: ['Uint8:actor']
    },
    {
        opcode: 0x8D,
        command: 'SPY',
        args: ['Uint8']
    },
    {
        opcode: 0x8E,
        command: 'DEBUG',
    },
    {
        opcode: 0x8F,
        command: 'DEBUG_OBJ',
        args: ['Uint8:actor']
    },
    {
        opcode: 0x90,
        command: 'POPCORN',
    },
    {
        opcode: 0x91,
        command: 'FLOW_POINT',
        args: ['Uint8', 'Uint8']
    },
    {
        opcode: 0x92,
        command: 'FLOW_OBJ',
        args: ['Uint8:actor', 'Uint8']
    },
    {
        opcode: 0x93,
        command: 'SET_ANIM_DIAL',
        args: ['Uint16']
    },
    {
        opcode: 0x94,
        command: 'PCX',
        args: ['Uint16']
    },
    {
        opcode: 0x95,
        command: 'END_MESSAGE',
    },
    {
        opcode: 0x96,
        command: 'END_MESSAGE_OBJ',
        args: ['Uint8:actor']
    },
    {
        opcode: 0x97,
        command: 'PARM_SAMPLE',
        args: ['Uint16', 'Uint8', 'Uint16'],
        skipSideScenes: true
    }, // not sure about this one
    {
        opcode: 0x98,
        command: 'NEW_SAMPLE',
        args: ['Uint16', 'Uint16', 'Uint8', 'Uint16'],
        skipSideScenes: true
    },
    {
        opcode: 0x99,
        command: 'POS_OBJ_AROUND',
        args: ['Uint8:actor', 'Uint8']
    },
    {
        opcode: 0x9A,
        command: 'PCX_MESS_OBJ',
        args: ['Uint8:actor', 'Uint16', 'Uint16']
    }
];
