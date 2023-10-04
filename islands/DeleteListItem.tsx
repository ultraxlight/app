import ListItem from "https://denopkg.com/ultraxlight/lists@main/src/list-items/list-item/mod.ts";

export default function({id}){
  return (
    <button
      onClick={() => fetch(`/lists/list-items/${id}`, {method: 'DELETE'}).then(() => window.location.reload())}
      >X</button>
  )
}
