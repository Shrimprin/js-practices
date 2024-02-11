import { Memo } from "./memo.js";
import inquirer from "inquirer";

export class MemosController {
  // コンスタラクタではasync/awaitが使えないため、インスタンス生成用のメソッドを定義
  static build = async () => {
    await Memo.initDb("memo.db");
    return await new MemosController();
  };

  create = async (lines) => {
    const title = lines[0];
    const content = lines.join("\n");
    const memo = new Memo(title, content);
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
    try {
      const selectedMemo = await this.#promptSelectMemo(promptMessage);
      console.log(selectedMemo.content);
    } catch (error) {
      console.error(error.message);
    }
  };

  delete = async () => {
    const promptMessage = "Choose a note you want to delete:";
    try {
      const selectedMemo = await this.#promptSelectMemo(promptMessage);
      selectedMemo.destroy();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        throw error;
      }
    }
  };

  #promptSelectMemo = async (message) => {
    const memos = await Memo.fetchAll();
    const titles = memos.map((memo) => memo.title);
    if (titles.length <= 0) throw new Error("Note is nothing.");
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
