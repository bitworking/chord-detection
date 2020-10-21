import { Data } from 'libs/data';

class ChordDetection {
  private data: Data[];
  private readonly notes: string[];

  constructor(data: Data[]) {
    this.data = data;
    this.notes = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'];
  }

  run(pressedNotes: number[]) {
    const notes = pressedNotes.sort((a, b) => a - b);

    const orgRootNote = notes[0];

    // chords from all inversions
    const chords = this.getChords(notes, orgRootNote).filter((chord, index, array) => {
      return array.indexOf(chord) === index;
    });

    // chords from all inversions without the root note
    const notesNoRoot = notes.slice(1);
    const slashedChords = this.getChords(notesNoRoot, orgRootNote).filter((chord, index, array) => {
      const isFirst = array.indexOf(chord) === index;
      if (!isFirst) {
        return false;
      }
      return !this.chordExists(chords, chord);
    });

    return {
      chords,
      slashedChords,
    };
  }

  chordExists(chords: string[], chord: string) {
    return chords.some((currentChord) => currentChord === chord);
  }

  getChords(notes: number[], orgRootNote: number): string[] {
    // get inversions and possible chords from each
    let inversions = this.getNoteInversions(notes);
    return inversions.reduce<string[]>((chords, inversion) => {
      const rootNote = this.getRootNote(inversion);
      const normalizedNotes = this.normalizeNotes(inversion, rootNote);
      const possibleChords = this.getPossibleChords(normalizedNotes, rootNote, orgRootNote % 12);
      return chords.concat(possibleChords);
    }, []);
  }

  getNoteInversions(notes: number[]) {
    return notes.reduce<number[][]>((acc, note, index) => {
      if (index) {
        return [...acc, [...acc[index - 1].slice(1), acc[index - 1][0]]];
      }
      return [notes];
    }, []);
  }

  getRootNote(notes: number[]) {
    return notes[0] % 12;
  }

  // transpose to C, only 1 octave and remove doubles
  normalizeNotes(notes: number[], rootNote: number) {
    const normalized = new Set<number>();
    notes.forEach((note) => {
      normalized.add((note - rootNote) % 12);
    });
    return Array.from(normalized).sort((a, b) => a - b);
  }

  getPossibleChords(normalizedNotes: number[], rootNote: number, slashedRootNote?: number) {
    let chordBitsString = normalizedNotes.reduce((acc, note, index, array) => {
      if (index === 0) {
        return '1';
      }
      const prevNote = array[index - 1];
      const nulls = note - prevNote - 1;
      return `${acc}${'0'.repeat(nulls)}1`;
    }, '');

    chordBitsString = chordBitsString.padEnd(12, '0');

    const chordBits = parseInt(chordBitsString, 2);

    if (isNaN(chordBits)) {
      return [];
    }

    const rootNoteName = this.notes[rootNote];
    const slashedRootNoteName =
      typeof slashedRootNote !== 'undefined' ? this.notes[slashedRootNote] : null;

    return this.data.reduce<string[]>((acc, chord) => {
      if ((chordBits & chord.mask) === chord.bits) {
        let chordName = `${rootNoteName} ${chord.name}`;
        if (slashedRootNoteName && slashedRootNoteName !== rootNoteName) {
          chordName += ` / ${slashedRootNoteName}`;
        }
        return acc.concat(chordName);
      }
      return acc;
    }, []);
  }
}

export { ChordDetection };
