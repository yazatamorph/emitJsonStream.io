# emitJsonStream.io

Simple helper to emit a JSON-like source object as a stream with Socket.io, created mainly for my own convenience when pushing massive JSON objects back and forth (and probably not really recommended). Extends the [@sap-oss/node-socketio-stream](https://www.npmjs.com/package/@sap_oss/node-socketio-stream) package.

## emitJsonStream(socket, event, json)

- socket: the Socket.io `socket` object
- event: the String event name to emit
- json: a JSON-like object to stream

This helper creates a writable destination stream and emits it on the socket with the provided event. It then writes the stringified JSON(-like) object to the destination stream, thus passing it to the receiving socket.

Example usage, assuming a typical http server setup:

```js
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  socket.on("received-event", () => {
    // Using emitJsonStream to respond
    emitJsonStream(socket, "emitted-event", {
      this: "is",
      a: "JSON-like",
      object: "see?",
    });
  });
});
```
