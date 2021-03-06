import {Client} from "ssh2";

export function OSConnect(server, callback) {
  console.info(server)
  var conn = new Client();
  conn.on("ready", function () {
    callback(conn);
  }).on('error', function (err) {
    console.log("connect error: " + err);
  }).on('end', function () {
    console.log("connect end!");
  }).on('close', function (had_error) {
    console.log("connect close");
  }).connect(server);
}