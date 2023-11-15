import { AppProps } from "$fresh/server.ts";

/*
if (process.env.NODE_ENV==='development') {
  // Must use require here as import statements are only allowed
  // to exist at top-level.
  require("preact/debug");
}
*/

export default function App({ Component }: AppProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ultralight</title>
        <link rel="stylesheet" href="/sakura.css" />
        <link rel="stylesheet" href="/main.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
