#!/usr/bin/env node

import readline from "readline";
import { MemosController } from "./memos_controller.js";
import { program } from "commander";

const interpretCommandInput = () => {
  program
    .version("0.0.1")
    .option("-l, --list", "List all memos")
    .option("-r, --reference", "Show content of selected memo")
    .option("-d, --delete", "Delete selected memo")
    .parse(process.argv);

  const options = program.opts();
  if (options.list) {
    console.log("list");
  } else if (options.reference) {
    console.log("reference");
  } else if (options.delete) {
    console.log("delete");
  } else {
    readStandardInput();
  }
};

const readStandardInput = async () => {
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
};

interpretCommandInput();
