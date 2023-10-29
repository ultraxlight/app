import { AppProps } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";

/*
if (process.env.NODE_ENV==='development') {
  // Must use require here as import statements are only allowed
  // to exist at top-level.
  require("preact/debug");
}
*/

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ultralight</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        {/* <Partial name="body"> */}
        <Component />
        {/* </Partial> */}
      </body>
    </html>
  );
}
