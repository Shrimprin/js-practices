import { Memo } from "./memo.js";

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

  reference = async () => {};

  delete = async () => {};
}
