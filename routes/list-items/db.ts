import { get } from "../../db.ts";

const Storage = await get("list-items");

export default Storage;
