import { useSignal } from "@preact/signals";
// import TargetedEvent = JSXInternal.TargetedEvent;

export default function ({ id, value }: { id: string; value: string }) {
  const showForm = useSignal(false);
  const newTitle = useSignal(value);

  return (
    <>
      {!showForm.value
        ? <button onClick={() => showForm.value = true}>Edit</button>
        : (
          <form
            style={{
              margin: "-24px",
              backgroundColor: "white",
              position: "absolute",
            }}
          >
            <input
              name="title"
              type="text"
              value={newTitle.value}
              onChange={(evt) =>
                newTitle.value = (evt.target as HTMLInputElement).value}
            />
            <button
              onClick={(evt) => {
                evt.preventDefault();
                fetch(`/lists/list-items/${id}`, {
                  method: "PATCH",
                  body: JSON.stringify({ title: newTitle.value }),
                }).then(() => window.location.reload());
              }}
            >
              Save
            </button>
            <button
              onClick={(evt) => {
                evt.preventDefault();
                showForm.value = false;
                newTitle.value = value;
              }}
            >
              Cancel
            </button>
          </form>
        )}
    </>
  );
}
