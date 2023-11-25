import List from "lists/mod.ts";
import Storage from "../api/lists/db.ts";

export default async function Lists() {
  const listItems = List(Storage);
  const items = await listItems.getAll();

  return (
    <section>
      <h1>Lists</h1>
      <ul>
        {items.map((item) => (
          <li>
            <form action={`/lists/${item.id}/delete`}>
              <a href={`/lists/${item.id}`}>{item.title}</a>
              <button type="submit">Delete</button>
            </form>
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
