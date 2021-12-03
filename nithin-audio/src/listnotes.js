import React from "react";
function ListItems(props) {
  const items = props.items;
  const listItems = items.map((item) => {
    return (
      <div className="noteslist" key={item.key}>
        <span className="notestime">{item.time} </span>
        <span className="noteslable">{item.label} </span>
        <span className="notesnotes">{item.notes} </span>
        <button
          id="delete"
          onClick={async () => {
            props.deleteItem(item.key);
          }}
        >
          delete
        </button>
      </div>
    );
  });
  return (
    <React.Fragment>
      <h2>MY Notes</h2>
      <div>{listItems}</div>
    </React.Fragment>
  );
}
export default ListItems;
