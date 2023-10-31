import List from "https://denopkg.com/ultraxlight/lists@0.2.1/src/lists/list/mod.ts";
import ListItem from "https://denopkg.com/ultraxlight/lists@0.2.1/src/list-items/list-item/mod.ts";
import Storage from "../db.ts";
import ListItemStorage from "../../list-items/db.ts";
import { PageProps, RouteContext } from "$fresh/server.ts";

export default async function Add(_: PageProps, ctx: RouteContext) {
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
          <form key={item.id} style={{display: 'flex'}}>
            <input type="checkbox" name="is-done" />
            <input
              style={{ width: "100%", borderWidth: 0 }}
              name={item.id}
              type="text"
              value={item.title}
            />
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
