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

// https://learn.sparkfun.com/tutorials/midi-ble-tutorial/all
const parseMessage = (data: DataView, onMessage: (data: Uint8Array) => void = console.log) => {
  // active sensing?
  if (data.buffer.byteLength === 3 && data.getUint8(2) === 254) {
    return;
  }

  const bufferSize = data.buffer.byteLength;

  //Pointers used to search through payload.
  let lPtr = 2;
  let rPtr = 0;
  //lastStatus used to capture runningStatus
  let lastStatus: number;

  while (1) {
    lastStatus = data.getUint8(lPtr);
    if (lastStatus < 0x80) {
      //Status message not present, bail
      return;
    }
    //Point to next non-data byte
    rPtr = lPtr;
    while (rPtr < bufferSize - 1 && data.getUint8(rPtr + 1) < 0x80) {
      rPtr++;
    }
    //look at l and r pointers and decode by size.
    if (rPtr - lPtr < 1) {
      //Time code or system
      onMessage(Uint8Array.from([lastStatus, 0, 0]));
    } else if (rPtr - lPtr < 2) {
      onMessage(Uint8Array.from([lastStatus, data.getUint8(lPtr + 1), 0]));
    } else if (rPtr - lPtr < 3) {
      onMessage(Uint8Array.from([lastStatus, data.getUint8(lPtr + 1), data.getUint8(lPtr + 2)]));
    } else {
      //Too much data
      //If not System Common or System Real-Time, send it as running status
      switch (data.getUint8(lPtr) & 0xf0) {
        case 0x80:
        case 0x90:
        case 0xa0:
        case 0xb0:
        case 0xe0:
          for (let i = lPtr; i < rPtr; i = i + 2) {
            onMessage(Uint8Array.from([lastStatus, data.getUint8(i + 1), data.getUint8(i + 2)]));
          }
          break;
        case 0xc0:
        case 0xd0:
          for (let i = lPtr; i < rPtr; i = i + 1) {
            onMessage(Uint8Array.from([lastStatus, data.getUint8(i + 1), 0]));
          }
          break;
        default:
          break;
      }
    }
    //Point to next status
    lPtr = rPtr + 2;
    if (lPtr >= bufferSize) {
      //end of packet
      return;
    }
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
