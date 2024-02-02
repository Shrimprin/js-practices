import { Memo } from "./memo.js";
import inquirer from "inquirer";

export class MemosController {
  constructor() {}

  // コンスタラクタではasync/awaitが使えないため、インスタンス生成用のメソッドを定義
  static build = async () => {
    await Memo.initDb();
    return await new MemosController();
  };

  create = async (lines) => {
    const id = null;
    const title = lines[0];
    const content = lines.join("¥n");
    const memo = new Memo(id, title, content);
    await memo.save();
  };

  list = async () => {
    const memos = await Memo.fetchAll();
    memos.forEach((memo) => {
      console.log(memo.title);
    });
  };

  reference = async () => {
    const memos = await Memo.fetchAll();
    const titles = memos.map((memo) => memo.title);
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "title",
        message: "Choose a note you want to see:",
        choices: titles,
      },
    ]);
    const selectedTitle = answer.title;
    const selectedMemo = Memo.findBy("title", selectedTitle, memos);
    console.log(selectedMemo.content);
  };

  delete = async () => {
    const memos = await Memo.fetchAll();
    const titles = memos.map((memo) => memo.title);
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "title",
        message: "Choose a note you want to delete::",
        choices: titles,
      },
    ]);
    const selectedTitle = answer.title;
    const selectedMemo = Memo.findBy("title", selectedTitle, memos);
    selectedMemo.destroy();
  };
}
