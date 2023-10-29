// import { Partial } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";
// import List from "https://denopkg.com/ultraxlight/lists@main/src/lists/list/mod.ts";
// import DeleteListItem from "../../islands/DeleteListItem.tsx";
// import EditListItem from "../../islands/EditListItem.tsx";
// import Storage from './db.ts'

export default function Add() {
  return (
    <Partial name="lists-add">
      <form>
        <input type="text" name="title" />
      </form>
    </Partial>
  );
}
