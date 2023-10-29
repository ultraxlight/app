import { useSignal } from "@preact/signals";
import { createRef } from "preact";
import List from "https://denopkg.com/ultraxlight/lists@0.2.1/src/lists/list/mod.ts";
import Storage from "../routes/lists/db.ts";

export default function () {
  const title = useSignal("Untitled");
  const content = useSignal("");
  const listId = useSignal(null);
  const titleRef = createRef();
  const contentRef = createRef();

  const db = List(Storage);

  const createList = (title: string) => db.create(title);

  return (
    <form>
      <input
        type="text"
        name="title"
        ref={titleRef}
        style={{ width: "100%", borderWidth: 0 }}
        autoFocus
        value={title.value}
        onChange={(evt) => title.value = evt.target.value}
        onKeyDown={(evt) => {
          if (evt.key === "Enter") {
            if (!listId) {
              createList(title.value);
            }

            contentRef.current.focus();
          }
        }}
      />
      <textarea
        ref={contentRef}
        style={{ width: "100%", borderWidth: 0 }}
        value={content.value}
        onChange={(evt) => content.value = evt.target.value}
      />
    </form>
  );
}
