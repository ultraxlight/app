import { Handlers } from "$fresh/server.ts";
import ListItem from "https://denopkg.com/ultraxlight/lists@main/src/list-items/list-item/mod.ts";


export const handler: Handlers = {
  async DELETE(req, ctx) {
    const id = ctx.params.id;

    console.log(ctx)

    if (id) {
      ListItem.remove(id);
    }

    const headers = new Headers();
    headers.set("location", '/lists');

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
