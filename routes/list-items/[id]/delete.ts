import ListItems from "list-items/mod.ts";
import Storage from "../../api/list-items/db.ts";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const id = ctx.params.id;

    const headers = new Headers();
    headers.set("location", req.headers.get("referer") || req.url);

    if (id) {
      const listItem = await ListItems(Storage).get(id);

      if (listItem) {
        await ListItems(Storage).remove(id);
      }
    }

    return new Response(null, {
      status: 302,
      headers,
    });
  },
};
