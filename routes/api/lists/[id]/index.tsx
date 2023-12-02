import List from "lists/mod.ts";
import ListItem from "list-items/mod.ts";
import ListItemStorage from "../../list-items/db.ts";
import Storage from "../db.ts";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async DELETE(_, ctx) {
    const id = ctx.params.id;

    if (id) {
      const list = await List(Storage).get(id);

      if (list) {
        const { items } = list;
        items.forEach(async (id) => await ListItem(ListItemStorage).remove(id));
        await List(Storage).remove(id);
      }
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
    // XXX: is this multipart form data or json content?
    const form = await req.formData();
    const title = form.get("title")?.toString();

    if (id) {
      const existingLi = await ListItem(Storage).get(id);
      const update = { ...existingLi, ...{ title } };
      console.log(form.has("is_done"));
      if (form.has("is_done")) {
        console.log(form.get("is_done"));
        update.is_done = ["true", "on"].includes(String(form.get("is_done")))
          ? true
          : false;
      }

      await ListItem(Storage).update(id, update);
    }

    const headers = new Headers();
    headers.set("location", req.headers.get("referer") || req.url);

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
