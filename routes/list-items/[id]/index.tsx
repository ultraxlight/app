import { Handlers } from "$fresh/server.ts";
import ListItem from "list-items/mod.ts";
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

  async POST(req, ctx) {
    const id = ctx.params.id;
    const form = await req.formData();
    const title = form.get("title")?.toString();
    const is_done = Boolean(form.get("is_done"));

    if (id && title) {
      const newLI = await ListItem(Storage).update(id, { title, is_done });
    }

    const headers = new Headers();
    headers.set("location", req.headers.get("referer") || req.url);

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
