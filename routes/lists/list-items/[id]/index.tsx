import { Handlers } from "$fresh/server.ts";
import ListItem from "https://denopkg.com/ultraxlight/lists@main/src/list-items/list-item/mod.ts";

export const handler: Handlers = {
  async DELETE(_, ctx) {
    const id = ctx.params.id;

    if (id) {
      ListItem.remove(id);
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

    console.log({ id, title });

    if (id && title) {
      ListItem.update(id, { title });
    }

    const headers = new Headers();
    headers.set("location", "/lists");

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
