export default function Add() {
  return (
    <form action="/api/lists" method="POST">
      <input
        type="text"
        name="title"
        style={{ width: "100%", borderWidth: 0 }}
        autoFocus
      />
    </form>
  );
}
