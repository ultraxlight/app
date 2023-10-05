export default function ({ id }: { id: string }) {
  return (
    <button
      onClick={() =>
        fetch(`/lists/list-items/${id}`, { method: "DELETE" }).then(() =>
          window.location.reload()
        )}
    >
      X
    </button>
  );
}
