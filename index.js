import "module-alias/register.js";
import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

const server = import("#server/http.js");

process.env.DEBUG && console.log("\n** DEBUG MODE ENABLED **");

const port = process.env.PORT || 4501;
server.then((s) =>
  s.default.listen(port, () => console.log(`\n** Running on port ${port} **\n`))
);
