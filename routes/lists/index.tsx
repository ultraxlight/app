import { Handlers } from "$fresh/server.ts";
import List from "https://denopkg.com/ultraxlight/lists@0.2.1/src/lists/list/mod.ts";
import ListItem from "https://denopkg.com/ultraxlight/lists@0.2.1/src/list-items/list-item/mod.ts";
import DeleteListItem from "../../islands/DeleteListItem.tsx";
import EditListItem from "../../islands/EditListItem.tsx";
import Storage from "./db.ts";
import ListItemStorage from "../list-items/db.ts";

export const handler: Handlers = {
  async POST(req) {
    const form = await req.formData();
    const title = form.get("title")?.toString();
    const item = form.get("item")?.toString();

    const headers = new Headers();

    let newList;

    if (title) {
      newList = await List(Storage).create(title);
      headers.set("location", req.url + "/" + newList?.id);
    } else if (item) {
      const listId = req.headers.get("referer")?.split("/").reverse()[0];

      if (!listId) {
        throw Error("Missing list ID");
      }

      const existingList = await List(Storage).get(listId);

      if (!existingList) {
        throw Error(`No list found with ID ${listId}`);
      }

      // Create Item
      const newItem = await ListItem(ListItemStorage).create(item);

      // Add to list
      await List(Storage).addItem(existingList.id, newItem.id);

      headers.set("location", req.url + "/" + listId);
    }

    return new Response(null, {
      status: 302,
      headers,
    });
  },
};

export default async function Lists() {
  const listItems = List(Storage);
  const items = await listItems.getAll();

  return (
    <section>
      <h1>Lists</h1>
      <ul>
        {items.map((item) => (
          <li>
            {typeof item.title === "string" ? item.title : ""}
            <EditListItem id={item.id} value={item.title} />
            <DeleteListItem id={item.id} />
          </li>
        ))}
      </ul>
      {/* <button type="submit">Add item</button> */}
      <a href="/lists/add">Add</a>
      {
        /* <form action="/lists" method="POST">
        <input name="item" type="text" />
        <button type="submit">Add item</button>
      </form> */
      }
    </section>
  );
}
