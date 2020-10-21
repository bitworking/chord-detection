import React, { useEffect, useState } from 'react';

export const WebMidi = ({
  onMessage,
  onConnect,
  onDisconnect,
}: {
  onMessage?: (data: Uint8Array) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
}) => {
  const [inputs, setInputs] = useState<WebMidi.MIDIInput[]>([]);
  const [selected, setSelected] = useState(0);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    (async () => {
      const access = await navigator.requestMIDIAccess();
      const set = () => {
        const inputs = access.inputs.values();
        setInputs(Array.from(inputs));
      };

      set();

      access.onstatechange = () => {
        set();
      };
    })();
  }, []);

  const toggle = () => {
    if (!connected) {
      if (onConnect) {
        onConnect();
      }
      setConnected(true);
      if (onMessage) {
        inputs[selected].onmidimessage = (e) => onMessage(e.data);
      }
    } else {
      inputs[selected].onmidimessage = () => {};
      setConnected(false);
      if (onDisconnect) {
        onDisconnect();
      }
    }
  };

  return (
    <>
      <select
        onChange={(e) => setSelected(parseInt(e.currentTarget.value, 10))}
        defaultValue={selected}
        disabled={connected}
      >
        {inputs.map((input, index) => (
          <option key={index} value={index}>
            {input.name}
          </option>
        ))}
      </select>
      <button onClick={() => toggle()}>
        {connected ? 'Disconnect USB MIDI' : 'Connect USB MIDI'}
      </button>
    </>
  );
};
