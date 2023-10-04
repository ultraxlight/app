import { Handlers, PageProps } from "$fresh/server.ts";
import ListItem from "https://denopkg.com/ultraxlight/lists@main/src/list-items/list-item/mod.ts";
import DeleteListItem from "../../islands/DeleteListItem.tsx";

export default function Lists(props: PageProps) {
  const items = ListItem.getAll();

  return (
    <section>
      <h1>Lists</h1>
      <ul>
        {items.map((item) => (
          <li>
            {typeof item.title === 'string' ? item.title : ''}
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
