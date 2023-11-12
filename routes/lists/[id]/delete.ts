import List from "lists/mod.ts";
import ListItem from "list-items/mod.ts";
import ListItemStorage from "../../list-items/db.ts";
import Storage from "../db.ts";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_, ctx) {
    const id = ctx.params.id;

    const headers = new Headers();
    headers.set("location", "/lists");

    if (id) {
      const list = await List(Storage).get(id);

      if (list) {
        const { items } = list;
        items.forEach(async (id) => await ListItem(ListItemStorage).remove(id));
        await List(Storage).remove(id);
      }
    }

    return new Response(null, {
      status: 302,
      headers,
    });
  },
};
