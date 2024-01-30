#!/usr/bin/env node

import readline from "readline";
import { MemosController } from "./memos_controller.js";

async function readStandardInput() {
  process.stdin.setEncoding("utf8");

  let lines = [];
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  reader.on("line", (line) => {
    lines.push(line);
  });

  reader.on("close", async () => {
    const memosController = await MemosController.build();
    await memosController.create(lines);
  });
}

readStandardInput();
