const JSONStream = require("JSONStream");
const ss = require("@sap_oss/node-socketio-stream");

// Can be called anywhere with access to the emitting socket instance
const emitJsonStream = (socket, event, json) => {
  // create destination writable stream
  const destStream = ss.createStream();
  // emit event with stream as payload
  ss(socket).emit(event, destStream);
  // stringify JSON and write to destination stream
  destStream.write(JSON.stringify(json));
};

const registerJsonStreamListener = (socket, event) => {
  // Register the listener
  ss(socket).on(event, (stream) => {
    // Parses the incoming stringified JSON
    // Refer to https://www.npmjs.com/package/JSONStream for usage details
    const parsed = stream.pipe(JSONStream.parse("*"));
    parsed.on("data", (data) => {
      // Do something with your data
    });
  });
};

module.exports = { emitJsonStream, registerJsonStreamListener };
