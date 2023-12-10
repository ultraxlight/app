// import { useSignal } from "@preact/signals";

export default function ListItem({ id, title, is_done }) {
  // const count = useSignal(0);
  // console.log({is_done})

  return (
    <li>
      <input
        type="checkbox"
        checked={is_done}
        value={is_done}
        onClick={(evt) => {
          console.log({ "aaa": evt.target.checked });
          // debugger
          const fd = new FormData();
          fd.append("is_done", evt.target.checked);
          fetch(`/api/list-items/${id}`, { method: "POST", body: fd });
        }}
      />
      {title}
      {/* <button onClick={() => (count.value += 1)}>+</button> */}
    </li>
  );
}
