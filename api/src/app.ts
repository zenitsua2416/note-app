import express from "express";

import "module-alias/register";

import { add } from "@/math";

const app = express();

let count = 1;

app.get("/api", (_, res) => {
  res.send(`This is the ${count} request.`);
  count = add(count, 1);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

export { app };
