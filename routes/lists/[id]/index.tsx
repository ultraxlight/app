import List from "lists/mod.ts";
import ListItem from "list-items/mod.ts";
import ListItemStorage from "../../api/list-items/db.ts";
import Storage from "../db.ts";
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
    <section class="list">
      <form action="/lists" method="POST">
        <input
          type="text"
          name="title"
          value={existingList.title}
          aria-label="list name"
        />
      </form>
      {listItems.map((item) =>
        item && (
          <form
            key={item.id}
            style={{ display: "flex" }}
            action={`/api/list-items/${item.id}`}
            method="POST"
          >
            <input
              type="checkbox"
              name="is_done"
              checked={item.is_done}
              aria-label="is done"
            />
            <input
              name="title"
              type="text"
              value={item.title}
              aria-label="list item"
            />
            <button type="submit">Save</button>
            <button type="submit" formaction={`/list-items/${item.id}/delete`} formmethod={'GET'}>
              Delete
            </button>
          </form>
        )
      )}
      <form action="/lists" method="POST">
        <input
          name="item"
          type="text"
          aria-label="new list item"
          autofocus
        />
      </form>
    </section>
  );
}
