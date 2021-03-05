const { Readable } = require("stream");
const ss = require("@sap_oss/node-socketio-stream");

const emitJsonStream = (socket, event, json) => {
  // create source readable stream from JSON
  const sourceStream = new Readable();
  sourceStream.push(JSON.stringify(json));
  // create destination writable stream
  const destStream = ss.createStream();
  // emit event with stream as payload
  ss(socket).emit(event, destStream);
  // write source stream to destination stream
  sourceStream.pipe(destStream);
};

module.exports = emitJsonStream;
