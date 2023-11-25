import { Handlers } from "$fresh/server.ts";
import List from "lists/mod.ts";
import ListItem from "list-items/mod.ts";
import Storage from "./db.ts";
import ListItemStorage from "../list-items/db.ts";

export const handler: Handlers = {
  async POST(req) {
    const form = await req.formData();
    const title = form.get("title")?.toString();
    const item = form.get("item")?.toString();

    const headers = new Headers();

    let newList;

    if (title) {
      newList = await List(Storage).create(title);
      headers.set("location", req.url.replace("/api", "") + "/" + newList?.id);
    } else if (item) {
      const listId = req.headers.get("referer")?.split("/").reverse()[0];

      if (!listId) {
        throw Error("Missing list ID");
      }

      const existingList = await List(Storage).get(listId);

      if (!existingList) {
        throw Error(`No list found with ID ${listId}`);
      }

      // Create Item
      const newItem = await ListItem(ListItemStorage).create({ title: item });

      // Add to list
      await List(Storage).addItem(existingList.id, newItem.id);

      headers.set("location", req.url.replace("/api", "") + "/" + listId);
    }

    return new Response(null, {
      status: 302,
      headers,
    });
  },
};
