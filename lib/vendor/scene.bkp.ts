export function bits(bitfield: number, offset: number, length: number) : number {
    return (bitfield & ((((1 << length) - 1)) << offset)) >> offset;
}

export const parseSceneLBA2 = async (resource: any, index) => {
    const buffer = resource.getEntry(index + 1); // first entry is not a scene

    const data = new DataView(buffer);
    const textBankId = data.getInt8(0);

    const sceneData = {
        index,
        textBankId,
        textIndex: (textBankId * 2) + 6,
        gameOverScene: data.getInt8(1),
        unknown1: data.getUint16(2, true),
        unknown2: data.getUint16(4, true),
        isOutsideScene: data.getInt8(6) === 1,
        buffer,
        actors: [],
        palette: null,
        texts: null,
    };

    let offset = 7 + 49;
    offset = loadHero(sceneData, offset);
    offset = loadActors(sceneData, offset);

    return sceneData;
};

function loadHero(scene, offset) {
    const data = new DataView(scene.buffer);
    const hero = {
        moveScriptSize: 0,
        moveScript: null,
        lifeScriptSize: 0,
        lifeScript: null
    };
    offset += 6;

    hero.moveScriptSize = data.getInt16(offset, true);
    offset += 2;
    if (hero.moveScriptSize > 0) {
        hero.moveScript = new DataView(scene.buffer, offset, hero.moveScriptSize);
    }
    offset += hero.moveScriptSize;

    hero.lifeScriptSize = data.getInt16(offset, true);
    offset += 2;
    if (hero.lifeScriptSize > 0) {
        hero.lifeScript = new DataView(scene.buffer, offset, hero.lifeScriptSize);
    }
    offset += hero.lifeScriptSize;

    scene.actors.push(hero);

    return offset;
}

function loadActors(scene, offset) {
    const data = new DataView(scene.buffer);

    const numActors = data.getInt16(offset, true);
    offset += 2;

    for (let i = 1; i < numActors; i += 1) {
        const actor = {
            sceneIndex: scene.index,
            index: i,
            // dirMode: ActorDirMode.NO_MOVE,
            flags: null,
            entityIndex: -1,
            bodyIndex: -1,
            animIndex: -1,
            spriteIndex: -1,
            pos: null,
            hitStrength: 0,
            extraType: -1,
            angle: 0,
            speed: 0,
            info0: -1,
            info1: -1,
            info2: -1,
            info3: -1,
            followActor: -1,
            extraAmount: -1,
            textColor: null,
            spriteAnim3D: null,
            spriteSizeHit: -1,
            armour: -1,
            life: -1,
            moveScriptSize: 0,
            moveScript: null,
            lifeScriptSize: 0,
            lifeScript: null
        };

        offset += 4;

        actor.entityIndex = data.getInt16(offset, true);
        offset += 2;
        actor.bodyIndex = data.getUint8(offset);
        offset += 1;
        actor.animIndex = data.getInt16(offset, true);
        offset += 2;
        actor.spriteIndex = data.getInt16(offset, true);
        offset += 2;

        // actor.pos = [
        //     ((0x8000 - data.getInt16(offset + 4, true)) + 512) * WORLD_SCALE,
        //     data.getInt16(offset + 2, true) * WORLD_SCALE,
        //     data.getInt16(offset, true) * WORLD_SCALE
        // ];
        offset += 6;

        actor.hitStrength = data.getInt8(offset);
        offset += 1;
        actor.extraType = data.getInt16(offset, true);
        actor.extraType &= ~1;
        offset += 2;
        actor.angle = data.getInt16(offset, true);
        offset += 2;
        // actor.speed = data.getInt16(offset, true) * SPEED_ADJUSTMENT;
        offset += 2;
        // actor.dirMode = data.getInt8(offset);
        offset += 1;

        actor.info0 = data.getInt16(offset, true);
        offset += 2;
        actor.info1 = data.getInt16(offset, true);
        offset += 2;
        actor.info2 = data.getInt16(offset, true);
        offset += 2;
        actor.info3 = data.getInt16(offset, true);
        // if (actor.dirMode === ActorDirMode.FOLLOW ||
        //     actor.dirMode === ActorDirMode.SAME_XZ) {
        //     actor.followActor = actor.info3;
        // }
        offset += 2;

        actor.extraAmount = data.getInt16(offset, true);
        offset += 2;
        // const textColor = data.getInt8(offset);
        offset += 1;
        // actor.textColor = getHtmlColor(scene.palette, (textColor * 16) + 12);

        if (actor.flags.hasSpriteAnim3D) {
            const index = data.getUint32(offset, true);
            offset += 4;
            const fps = data.getInt16(offset, true);
            offset += 2;
            actor.spriteAnim3D = {
                index,
                startFrame: actor.spriteIndex,
                endFrame: actor.spriteIndex,
                fps,
                info: null,     // Will load later (at sprite load time).
            };
        }
        actor.armour = data.getUint8(offset);
        offset += 1;
        actor.life = data.getUint8(offset);
        offset += 1;

        actor.moveScriptSize = data.getInt16(offset, true);
        offset += 2;
        if (actor.moveScriptSize > 0) {
            actor.moveScript = new DataView(scene.buffer, offset, actor.moveScriptSize);
        }
        offset += actor.moveScriptSize;

        actor.lifeScriptSize = data.getInt16(offset, true);
        offset += 2;
        if (actor.lifeScriptSize > 0) {
            actor.lifeScript = new DataView(scene.buffer, offset, actor.lifeScriptSize);
        }
        offset += actor.lifeScriptSize;

        scene.actors.push(actor);
    }

    return offset;
}
