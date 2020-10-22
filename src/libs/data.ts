export type Data = {
  name: string;
  mask: number;
  bits: number;
};

// 1  2  3  4  5  6  7  8  9  10 11 12
// 1     2  b3 3  4  #4 5  b6 6  b7 7
// 1  b9 9  #9   11 #11   b13 13
// 1  1  1  1  1  1  1  1  1  1  1  1

// https://en.wikibooks.org/wiki/Music_Theory/Complete_List_of_Chord_Patterns
// https://de.wikipedia.org/wiki/Akkordsymbol
// https://stackoverflow.com/questions/25455558/bitfield-mask-operations-with-optional-items
export const data: Data[] = [
  // Major
  {
    // 1 3 5
    name: '',
    mask: 0b111111111111,
    bits: 0b100010010000,
  },
  {
    // 1 3 (5) 7
    name: 'maj7',
    mask: 0b111111101111,
    bits: 0b100010000001,
  },
  {
    // 1 3 (5) 7 9
    name: 'maj9',
    mask: 0b111111101111,
    bits: 0b101010000001,
  },
  {
    // 1 3 (5) 7 (9) 11
    name: 'maj11',
    mask: 0b110111101111,
    bits: 0b100011000001,
  },
  {
    // 1 3 (5) 7 (9) (11) 13
    name: 'maj13',
    mask: 0b110110101111,
    bits: 0b100010000101,
  },
  {
    // 1 3 (5) 6
    name: '6',
    mask: 0b111111101111,
    bits: 0b100010000100,
  },
  {
    // 1 3 (5) 6 9
    name: '6/9',
    mask: 0b111111101111,
    bits: 0b101010000100,
  },
  {
    // 1 3 ♯4 (5) (7) (9) (13)
    name: 'maj♯11',
    mask: 0b110111101010,
    bits: 0b100010100000,
  },
  {
    // TODO: is 7 optional or not?
    // 1 3 (5) ♭6 (7) (9) (11)
    name: 'maj7♭6',
    mask: 0b110110101110,
    bits: 0b100010001000,
  },
  // Dominant/Seventh
  // Normal
  {
    // 1 3 (5) ♭7
    name: '7',
    mask: 0b111111101111,
    bits: 0b100010000010,
  },
  {
    // 1 3 (5) ♭7 9
    name: '9',
    mask: 0b111111101111,
    bits: 0b101010000010,
  },
  {
    // 1 3 (5) ♭7 (9) 11
    name: '11',
    mask: 0b110111101111,
    bits: 0b100011000010,
  },
  {
    // 1 3 (5) ♭7 (9) (11) 13
    name: '13',
    mask: 0b110110101111,
    bits: 0b100010000110,
  },
  {
    // 1 3 (5) ♭7 (9) ♯11 (13)
    name: '7♯11',
    mask: 0b110111101011,
    bits: 0b100010100010,
  },
  // Altered
  {
    // TODO: other optional notes (?)
    // 1 3 (♭5) (5) ♭7 ♭9 (♯9)
    name: '7♭9',
    mask: 0b111011001111,
    bits: 0b110010000010,
  },
  {
    // TODO: other optional notes (?)
    // 1 3 (♭5) (5) ♭7 ♭9 (♯9) 13
    name: '13♭9',
    mask: 0b111011001111,
    bits: 0b110010000110,
  },
  {
    // 1 3 (5) ♭7 ♯9
    name: '7♯9',
    mask: 0b111111101111,
    bits: 0b100110000010,
  },
  {
    // TODO: other optional notes (?)
    // 1 3 (♭5) (♭6) ♭7 (♭9) (♯9)
    name: 'alt7',
    mask: 0b101011010111,
    bits: 0b100010000010,
  },
  // Suspended
  {
    // 1 4 (5)
    name: 'sus4',
    mask: 0b111111101111,
    bits: 0b100001000000,
  },
  {
    // 1 2 (5)
    name: 'sus2',
    mask: 0b111111101111,
    bits: 0b101000000000,
  },
  {
    // 1 4 (5) ♭7
    name: '7sus4',
    mask: 0b111111101111,
    bits: 0b100001000010,
  },
  {
    // 1 4 (5) ♭7 9
    name: '9sus4',
    mask: 0b111111101111,
    bits: 0b101001000010,
  },
  {
    // 1 4 (5) ♭9
    name: '♭9sus',
    mask: 0b111111101111,
    bits: 0b110001000000,
  },
  // Minor
  // Normal
  {
    // 1 ♭3 5
    name: '-',
    mask: 0b111111111111,
    bits: 0b100100010000,
  },
  {
    // 1 ♭3 (5) ♭7
    name: '-7',
    mask: 0b111111101111,
    bits: 0b100100000010,
  },
  {
    // 1 ♭3 (5) 7 (9) (♭13) (13)
    name: '-maj7',
    mask: 0b110111100011,
    bits: 0b100100000001,
  },
  {
    // 1 ♭3 (5) 6
    name: '-6',
    mask: 0b111111101111,
    bits: 0b100100000100,
  },
  {
    // 1 ♭3 (5) ♭7 9
    name: '-9',
    mask: 0b111111101111,
    bits: 0b101100000010,
  },
  {
    // 1 ♭3 (5) ♭7 (9) 11
    name: '-11',
    mask: 0b110111101111,
    bits: 0b100101000010,
  },
  {
    // 1 ♭3 (5) ♭7 (9) (11) 13
    name: '-13',
    mask: 0b110110101111,
    bits: 0b100100000110,
  },
  // Diminished
  {
    // 1 ♭3 ♭5
    name: '°',
    mask: 0b111111111111,
    bits: 0b100100100000,
  },
  {
    // 1 ♭3 ♭5 ♭♭7
    name: '°7',
    mask: 0b111111111111,
    bits: 0b100100100100,
  },
  {
    // 1 ♭3 ♭5 ♭7 (♭9) (9) (11) (13)
    name: '-7♭5',
    mask: 0b100110111011,
    bits: 0b100100100010,
  },
  // Other
  {
    // 1 5
    name: '(no 3)',
    mask: 0b111111111111,
    bits: 0b100000010000,
  },
  {
    // 1 5 7
    name: '(no 3)maj7',
    mask: 0b111111111111,
    bits: 0b100000010001,
  },
  {
    // 1 5 7 9
    name: '(no 3)maj9',
    mask: 0b111111111111,
    bits: 0b101000010001,
  },
  {
    // 1 5 ♭7
    name: '(no 3)7',
    mask: 0b111111111111,
    bits: 0b100000010010,
  },
  {
    // 1 5 ♭7 9
    name: '(no 3)9',
    mask: 0b111111111111,
    bits: 0b101000010010,
  },
  // {
  //   // 1 3
  //   name: '(no 5th)',
  //   mask: 0b111111111111,
  //   bits: 0b100010000000,
  // },
  // {
  //   // 1 ♭3
  //   name: '-(no 5th)',
  //   mask: 0b111111111111,
  //   bits: 0b100100000000,
  // },
  {
    // 1 3 ♯5
    name: '+',
    mask: 0b111111111111,
    bits: 0b100010001000,
  },
  {
    // 1 3 ♯5 7
    name: 'maj7♯5',
    mask: 0b111111111111,
    bits: 0b100010001001,
  },
  // Alterations
  {
    // 1 3 (5) 7 9 ♯11
    name: 'maj7♯4',
    mask: 0b111111101111,
    bits: 0b101010100001,
  },
  {
    // 1 3 ♯5 ♭7
    name: '7♯5',
    mask: 0b111111111111,
    bits: 0b100010001010,
  },
  {
    // 1 3 (5) ♭7 ♯9
    name: '7♯9',
    mask: 0b111111101111,
    bits: 0b100110000010,
  },
  {
    // 1 4 (5) ♭7 ♭9
    name: '♭9sus',
    mask: 0b111111101111,
    bits: 0b110001000010,
  },
  {
    // 1 3 (5) ♭7 ♭9 ♯9 ♯11 b13
    name: 'alt',
    mask: 0b111111101111,
    bits: 0b110110101010,
  },
  // Additions
  {
    // 1 3 (5) 9
    name: 'add9',
    mask: 0b111111101111,
    bits: 0b101010000000,
  },
  {
    // 1 ♭3 (5) 9
    name: '-add9',
    mask: 0b111111101111,
    bits: 0b101100000000,
  },
];
