export interface Header {
    type: number;
    headerOffset: number;
    offset: number;
    originalSize: number;
    compressedSize: number;
}

export interface Block {
    original: ArrayBuffer;
    compressed?: ArrayBuffer;
}

export interface Entry {
    header: Header;
    block: Block;
}

export interface HQR {
    offsets: number[];
    entries: Record<number, Entry>;
}

export function getHqrSize(hqr: HQR) {
    const { entries } = hqr;
    let size = hqr.offsets.length * 4;
    size += 4  // size
    function reductor(total, offset) {
        const headerSize = 10;
        const blockSize = offset === 0 ? 0 : entries[offset].header.compressedSize;
        return total + headerSize + blockSize;
    }
    size += hqr.offsets.reduce(reductor, 0)  // size
    return size
}

export class HqrReader {
    readonly buffer: ArrayBuffer;
    private _hqr?: HQR;

    constructor(buffer: ArrayBuffer) {
        this.buffer = buffer;
    }

    get hqr() {
        if (!this._hqr) {
            this._hqr = this.readHqr();
        }
        return this._hqr;
    }

    private readOffsets (): number[] {
        const firstOffset = new Int32Array(this.buffer, 0, 1);
        const numEntries = (firstOffset[0] / 4) - 1;
        const idx_array = new Uint32Array(this.buffer, 0, numEntries);

        const offsets = [];
        for (let i = 0; i < idx_array.length; i += 1) {
            offsets.push(idx_array[i]);
        }
        return offsets;
    }

    private readEntry (offset: number): Entry {
        const header = this.readHeader(offset);
        const block = this.readBlock(header);

        return { header, block }
    }

    private readHeader (offset: number) {
        const header = new DataView(this.buffer, offset, 10);
        return {
            headerOffset: offset,
            offset: offset + 10,
            originalSize: header.getUint32(0, true),
            compressedSize: header.getUint32(4, true),
            type: header.getInt16(8, true)
        } as Header;
    }

    private readBlock (header: Header): Block {
        const slice = this.buffer.slice(header.offset, header.offset + header.compressedSize);
        if (header.type > 0) {
            const tgt_buffer = new ArrayBuffer(header.originalSize);
            const source = new Uint8Array(this.buffer, header.offset, header.compressedSize);
            const target = new Uint8Array(tgt_buffer);
            let src_pos = 0;
            let tgt_pos = 0;
            while ((src_pos + 1) <= header.compressedSize) {
                const flag = source[src_pos];

                for (let i = 0; i < 8; i += 1) {
                    src_pos += 1;

                    if ((flag & (1 << i)) !== 0) {
                        target[tgt_pos] = source[src_pos];
                        tgt_pos += 1;
                    } else {
                        const e = (source[src_pos] * 256) + source[src_pos + 1];
                        const len = ((e >> 8) & 0x000F) + header.type + 1;
                        const addr = ((e << 4) & 0x0FF0) + ((e >> 12) & 0x00FF);

                        for (let g = 0; g < len; g += 1) {
                            target[tgt_pos] = target[tgt_pos - addr - 1];
                            tgt_pos += 1;
                        }
                        src_pos += 1;
                    }

                    if ((src_pos + 1) >= header.compressedSize)
                        break;
                }

                src_pos += 1;
            }
            return { original: tgt_buffer, compressed: slice };
        }
        return { original: slice };
    }

    private readHqr(): HQR {
        const offsets = this.readOffsets();
        const entries = {};
        for (const offset of offsets) {
            if (offset === 0) {
                continue;
            }
            entries[offset] = this.readEntry(offset);
        }
        return { offsets, entries }
    };
}

export class HqrWriter {
    readonly hqr?: HQR;

    constructor(hqr: HQR) {
        this.hqr = hqr;
    }

    get buffer(): ArrayBuffer {
        const buffer = new ArrayBuffer(this.getSize());

        this.writeOffsets(buffer);
        this.writeSize(buffer);
        for (const offset of this.hqr.offsets) {
            if (offset === 0) {
                continue;
            }
            this.writeEntry(buffer, this.hqr.entries[offset]);
        }
        return buffer;
    }

    private getSize() {
        return getHqrSize(this.hqr);
    }

    private writeOffsets (buffer: ArrayBuffer) {
        const view = new Uint32Array(buffer, 0, this.hqr.offsets.length);
        for (let index=0; index < this.hqr.offsets.length; index++) {
            view.set([this.hqr.offsets[index]], index);
        }
    }

    private writeSize(buffer: ArrayBuffer) {
        const size = this.getSize();
        const offsetLength = this.hqr.offsets.length;
        const view = new Uint32Array(buffer, offsetLength * 4, 1);
        view.set([size], 0);
    }

    private writeEntry(buffer: ArrayBuffer, entry: Entry) {
        this.writeHeader(buffer, entry.header);
        this.writeBlock(buffer, entry.header, entry.block);
    }

    private writeHeader(buffer, header: Header) {
        const view = new DataView(buffer, header.headerOffset, 10);
        view.setUint32(0, header.originalSize, true);
        view.setUint32(4, header.compressedSize, true);
        view.setUint16(8, header.type, true);
    }

    private writeBlock(buffer, header: Header, block: Block) {
        const view = new Uint8Array(buffer, header.offset, header.compressedSize);
        const array = new Uint8Array(header.type === 0 ? block.original : block.compressed)
        view.set(array, 0)
    }
}

export function recalculateHqrOffsets(hqr: HQR): HQR {

  const recalculatedOffsets: Record<number, number> = {};
  const orderedOffsets = [...(new Set(hqr.offsets))];
  orderedOffsets.sort((a, b) => a - b);

  let currentOffset = (hqr.offsets.length * 4) + 4;
  if (currentOffset !== orderedOffsets[0]) {
      throw new Error(`${currentOffset} !== ${orderedOffsets[0]}`);
  }
  for (let index=0; index < orderedOffsets.length; index++) {
      recalculatedOffsets[orderedOffsets[index]] = currentOffset;
      currentOffset += hqr.entries[orderedOffsets[index]].header.compressedSize + 10;
  }
  if (currentOffset !== getHqrSize(hqr)) {
      throw new Error(`${currentOffset} !== ${getHqrSize(hqr)}`);
  }

  const recalculatedHqr: HQR = {
    offsets: [],
    entries: {}
  }

  for (const offset of hqr.offsets) {
    if (offset === 0) {
        recalculatedHqr.offsets.push(0);
        continue
    }
    const recalculated = recalculatedOffsets[offset];
    recalculatedHqr.offsets.push(recalculated);

    const header: Header = { ...(hqr.entries[offset].header) };
    header.offset = recalculated + 10;
    header.headerOffset = recalculated;
    const block: Block = { ...(hqr.entries[offset].block) }

    recalculatedHqr.entries[recalculated] = {
        header,
        block
    }
  }
  return recalculatedHqr;
}

export function uncompressedHqr(hqr: HQR): HQR {
  const uncompressedHqr: HQR = {
    offsets: [...hqr.offsets],
    entries: {}
  }

  for (const offset of hqr.offsets) {
    if (offset === 0) {
        continue
    }
    const header: Header = { ...(hqr.entries[offset].header) };
    const block: Block = { ...(hqr.entries[offset].block) }
    block.compressed = undefined;
    block.original;
    header.type = 0x0;
    header.compressedSize = header.originalSize;
    uncompressedHqr.entries[offset] = {
        header,
        block
    }
  }
  return recalculateHqrOffsets(uncompressedHqr);
}
