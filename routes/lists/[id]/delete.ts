import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const id = ctx.params.id;
    const url = new URL(req.url);

    await fetch(`${url.origin}/api/lists/${id}`, { method: "DELETE" });

    const headers = new Headers();
    headers.set("location", req.headers.get("referer") || req.url);

    return new Response(null, {
      status: 302,
      headers,
    });
  },
};
