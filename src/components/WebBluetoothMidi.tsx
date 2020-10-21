import React, { useState } from 'react';

const MIDI_UUID = '03b80e5a-ede8-4b33-a751-6ce34ec4c700';
const MIDI_CHARA_UUID = '7772e5db-3868-4112-a1a9-f2669d106bf3';
let server: BluetoothRemoteGATTServer | undefined;

const connect = async (onMessage?: (data: Uint8Array) => void) => {
  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [MIDI_UUID] }],
      optionalServices: [MIDI_UUID],
    });

    server = !device.gatt?.connected ? await device.gatt?.connect() : device.gatt;
    const service = await server?.getPrimaryService(MIDI_UUID);

    if (service) {
      startMIDIService(service, MIDI_CHARA_UUID, onMessage);
    }
  } catch (error) {
    console.error(error);
  }
};

const disconnect = () => {
  if (server?.connected) {
    server.disconnect();
  }
};

const startMIDIService = async (
  service: BluetoothRemoteGATTService,
  charUUID: string,
  onMessage?: (data: Uint8Array) => void
) => {
  try {
    const characteristic = await service.getCharacteristic(charUUID);
    await characteristic.startNotifications();
    characteristic.addEventListener('characteristicvaluechanged', (e) =>
      // @ts-ignore
      parseMessage(e.currentTarget.value, onMessage)
    );
  } catch (error) {
    console.error(error);
  }
};

const parseMessage = (data: DataView, onMessage?: (data: Uint8Array) => void) => {
  // active sensing
  if (data.buffer.byteLength === 3 && data.getUint8(2) === 254) {
    return;
  }

  const array = new Uint8Array(3);

  for (var i = 2; i < data.buffer.byteLength; i++) {
    array[i - 2] = data.getUint8(i);
  }

  if (onMessage) {
    onMessage(array);
  }
};

export const WebBluetoothMidi = ({
  onMessage,
  onConnect,
  onDisconnect,
}: {
  onMessage?: (data: Uint8Array) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
}) => {
  const [connected, setConnected] = useState(false);

  const toggle = () => {
    if (!connected) {
      if (onConnect) {
        onConnect();
      }
      setConnected(true);
      connect(onMessage);
    } else {
      disconnect();
      setConnected(false);
      if (onDisconnect) {
        onDisconnect();
      }
    }
  };

  return (
    <>
      <button onClick={() => toggle()}>
        {connected ? 'Disconnect Bluetooth MIDI' : 'Connect Bluetooth MIDI'}
      </button>
    </>
  );
};
