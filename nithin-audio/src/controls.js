import React from "react";
import playpause from "./imgs/pause-play-button.png";
import stoplogo from "./imgs/stop.png";
const Controls = (props) => {
  return (
    <div>
      <div className="songinfo">
        <h5>File name : {props.info.name}</h5>
        <h5>
          LastModified : {props.info.lastModified.toString().slice(0, 15)}
        </h5>
        <h5>Size : {props.info.size / 1024}kb</h5>
        <h5>Type : {props.info.type}</h5>
        <h5>Total Duration : {props.totalduration.toFixed(2)}s</h5>
      </div>
      <div className="controlbutton">
        <button onClick={props.stop}>
          <img src={stoplogo} alt="Pause/Play" height="20px" width="20px"></img>
        </button>
        <button onClick={props.playorpause}>
          <img
            src={playpause}
            alt="Pause/Play"
            height="50px"
            width="50px"
          ></img>
        </button>

        <input
          type="range"
          min="1"
          max="100"
          defaultValue="75"
          onChange={(e) => {
            props.volume(e.target.value / 100);
          }}
        ></input>
      </div>
    </div>
  );
};

export default Controls;
