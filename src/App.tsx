import React, { useState } from 'react';
import { WebMidi } from 'components/WebMidi';
import { WebBluetoothMidi } from 'components/WebBluetoothMidi';
import { ChordDetection } from 'libs/ChordDetection';
import { data } from 'libs/data';
import 'App.css';

const pressedNotes = new Set<number>();
const chordDetection = new ChordDetection(data);

const App = () => {
  const [chords, setChords] = useState<string[]>([]);
  const [slashedChords, setSlashedChords] = useState<string[]>([]);

  const onMessage = (data: Uint8Array) => {
    // note on
    if (data[0] === 144 && data[2] > 0) {
      pressedNotes.add(data[1]);
      runDetection(pressedNotes);
    }
    // note off
    else if (data[0] === 128 || (data[0] === 144 && data[2] === 0)) {
      pressedNotes.delete(data[1]);
      runDetection(pressedNotes);
    }
  };

  const runDetection = (pressedNotes: Set<number>) => {
    const pressedNotesArray = Array.from(pressedNotes);

    if (pressedNotesArray.length < 2) {
      setChords([]);
      setSlashedChords([]);
      return;
    }

    const chords = chordDetection.run(pressedNotesArray);

    setChords(chords.chords);
    setSlashedChords(chords.slashedChords);
  };

  return (
    <>
      <div className="controls">
        <WebMidi onMessage={onMessage} />
      </div>
      <div className="controls">
        <WebBluetoothMidi onMessage={onMessage} />
      </div>
      <div className="container-chords">
        <div>{chords.join('\n')}</div>
        <div>{slashedChords.join('\n')}</div>
      </div>
    </>
  );
};

export default App;
