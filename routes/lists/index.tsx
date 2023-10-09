import { PageProps } from "$fresh/server.ts";
import ListItem from "https://denopkg.com/ultraxlight/lists@main/src/list-items/list-item/mod.ts";
import DeleteListItem from "../../islands/DeleteListItem.tsx";
import EditListItem from "../../islands/EditListItem.tsx";
import Storage from '../../db.ts'

export default async function Lists(props: PageProps) {
  const listItems = ListItem(Storage)
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
      <form action="/lists/list-items" method="POST">
        <input name="item" type="text" />
        <button type="submit">Add item</button>
      </form>
    </section>
  );
}
