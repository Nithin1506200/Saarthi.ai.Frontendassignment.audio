import React from "react";
import clock from "./imgs/clock.png";
import "./liststyle.css";
import FlipMove from "react-flip-move";
import longpop from "./imgs/longpop.wav";
function ListItems(props) {
  const items = props.items;

  const listItems = items.map((item) => {
    return (
      <div className="noteslist" key={item.key}>
        <span className="notestime">
          <img src={clock} width="20px" height="20px" alt="clock"></img>
          {Math.floor(item.time / 60)}:{Math.round(item.time % 60)}{" "}
        </span>
        <span className="noteslable">Label:{item.label} </span>
        <button
          id="delete"
          onClick={async () => {
            props.deleteItem(item.key);
            let sound = new Audio(longpop);
            sound.play();
          }}
        >
          delete
        </button>
        <span className="notesnotes">{item.notes} </span>
      </div>
    );
  });
  return (
    <React.Fragment>
      <div className="notessection">
        <h2>MY Notes</h2>
        <div>
          <FlipMove duration={500} easing="ease-in-out">
            {listItems}
          </FlipMove>
        </div>
      </div>
    </React.Fragment>
  );
}
export default ListItems;
