#!/usr/bin/env node

import readline from "readline";
import { MemosController } from "./memos_controller.js";
import { program } from "commander";

const interpretCommandInput = async () => {
  program
    .version("0.0.1")
    .option("-l, --list", "List all memos")
    .option("-r, --reference", "Show content of selected memo")
    .option("-d, --delete", "Delete selected memo")
    .parse(process.argv);

  const memosController = await MemosController.build();
  const options = program.opts();
  if (options.list) {
    await memosController.list();
  } else if (options.reference) {
    await memosController.reference();
  } else if (options.delete) {
    await memosController.delete();
  } else {
    await readStandardInput(memosController);
  }
};

const readStandardInput = async (memosController) => {
  process.stdin.setEncoding("utf8");

  const lines = [];
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  reader.on("line", (line) => {
    lines.push(line);
  });

  reader.on("close", async () => {
    await memosController.create(lines);
  });
};

interpretCommandInput();
