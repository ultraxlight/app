import { get } from "../../db.ts";

const Storage = await get("lists");

console.log(Storage);

export default Storage;
