import List from "lists/mod.ts";
import ListItem from "list-items/mod.ts";
import Storage from "../db.ts";
import ListItemStorage from "../../list-items/db.ts";
import { PageProps, RouteContext } from "$fresh/server.ts";

export default async function ListComp(_: PageProps, ctx: RouteContext) {
  const { id } = ctx.params;

  const existingList = Boolean(id) && await List(Storage).get(id);

  if (!existingList) {
    return "No list found";
  }

  const listItems = await Promise.all(
    existingList.items.map(async (item) =>
      await ListItem(ListItemStorage).get(item)
    ),
  );

  return (
    <section>
      <form action="/lists" method="POST">
        <input
          type="text"
          name="title"
          style={{ width: "100%", borderWidth: 0 }}
          value={existingList.title}
        />
      </form>
      {listItems.map((item) =>
        item && (
          <form
            key={item.id}
            style={{ display: "flex" }}
            action={`/list-items/${item.id}`}
            method="POST"
          >
            <input type="checkbox" name="is_done" checked={item.is_done} />
            <input
              style={{ width: "100%", borderWidth: 0 }}
              name="title"
              type="text"
              value={item.title}
            />
            <button type="submit">Save</button>
          </form>
        )
      )}
      <form action="/lists" method="POST">
        <input
          style={{ width: "100%", borderWidth: 0 }}
          name="item"
          type="text"
          autofocus
        />
      </form>
    </section>
  );
}
