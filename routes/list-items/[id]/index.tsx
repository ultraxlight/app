import { Handlers } from "$fresh/server.ts";
import ListItem from "https://denopkg.com/ultraxlight/lists@0.2.1/src/list-items/list-item/mod.ts";
import Storage from "../db.ts";

export const handler: Handlers = {
  async DELETE(_, ctx) {
    const id = ctx.params.id;

    if (id) {
      await ListItem(Storage).remove(id);
    }

    const headers = new Headers();
    headers.set("location", "/lists");

    return new Response(null, {
      status: 303,
      headers,
    });
  },

  async PATCH(req, ctx) {
    const id = ctx.params.id;
    const update = await req.json();
    const title = update.title;

    if (id && title) {
      await ListItem(Storage).update(id, { title });
    }

    const headers = new Headers();
    headers.set("location", "/lists");

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
