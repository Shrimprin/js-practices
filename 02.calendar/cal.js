#!/usr/bin/env node

import minimist from "minimist";
const argv = minimist(process.argv.slice(2));

const today = new Date();
// Dateオブジェクトの月は0~11のため、getMonthした月に１を足すと現実の月と一致する
const month = argv.m || today.getMonth() + 1;
const year = argv.y || today.getFullYear();

const firstDay = new Date(year, month - 1, 1);
const firstDayOfWeek = firstDay.getDay();

const lastDay = new Date(year, month, 0);
const daysInMonth = lastDay.getDate();

// ヘッダー
const yearAndMonth = `      ${month}月 ${year}`;
const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"].join(" ");

// 最初の週のスペースを追加
let calendar = "   ".repeat(firstDayOfWeek);
// 日付をループしてカレンダーに追加
for (let day = 1; day <= daysInMonth; day++) {
  calendar += day.toString().padStart(2, " ") + " ";
  if ((firstDayOfWeek + day) % 7 === 0) calendar += "\n";
}

const output_text = [yearAndMonth, daysOfWeek, calendar].join("\n");
console.log(output_text);
