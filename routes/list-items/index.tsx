import { Handlers } from "$fresh/server.ts";
import ListItem from "https://denopkg.com/ultraxlight/lists@0.2.1/src/list-items/list-item/mod.ts";
import Storage from "./db.ts";

export const handler: Handlers = {
  async POST(req) {
    const form = await req.formData();
    const title = form.get("item")?.toString();

    if (title) {
      await ListItem(Storage).create(title);
    }

    const headers = new Headers();
    headers.set("location", req.url.replace("/list-items", ""));

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
