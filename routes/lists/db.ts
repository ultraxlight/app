import { get } from "../../db.ts";

const Storage = await get("lists");

export default Storage;
