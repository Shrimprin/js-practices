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
    const content = lines.join("\n");
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
    const promptMessage = "Choose a note you want to see:";
    const selectedMemo = await this.promptSelectMemo(promptMessage);
    console.log(selectedMemo.content);
  };

  delete = async () => {
    const promptMessage = "Choose a note you want to delete::";
    const selectedMemo = await this.promptSelectMemo(promptMessage);
    selectedMemo.destroy();
  };

  promptSelectMemo = async (message) => {
    const memos = await Memo.fetchAll();
    const titles = memos.map((memo) => memo.title);
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "title",
        message: message,
        choices: titles,
      },
    ]);
    const selectedTitle = answer.title;
    return Memo.findBy("title", selectedTitle, memos);
  };
}
