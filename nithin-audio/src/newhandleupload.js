import React from "react";
import { useState } from "react";
import WaveSurfer from "wavesurfer.js";
import cursor from "wavesurfer.js/dist/plugin/wavesurfer.cursor";
import markers from "wavesurfer.js/dist/plugin/wavesurfer.markers";
import Controls from "./controls";
import Wave from "./wavecontainer";
import ListItems from "./listnotes";
import addimg from "./imgs/add.png";
import pop from "./imgs/msgpop.mp3";
export class Newwav extends React.Component {
  constructor() {
    super();
    this.state = {
      totalduration: 0,
      wavesurfer: 0,
      currentduration: 0,
      newlable: "",
      newnotes: "",
      mymarkers: [],
      path: "init",
      info: { name: "mymp3", lastModified: 0, size: 0, type: "" },
    };
    this.deleteItems = this.deleteItems.bind(this);
    this.deletemarker = this.deletemarker.bind(this);
    this.updatemarker = this.updatemarker.bind(this);
  }

  addnotesonchange = (event) => {
    //this.state.mymarkers.apped;
    this.setState({ newnotes: event.target.value });
  };
  addlableonchange = (event) => {
    //this.state.mymarkers.apped;
    this.setState({ newlable: event.target.value });
  };
  addnotes = async () => {
    if (this.state.newnotes !== "" && this.state.newlable !== "") {
      this.setState({
        mymarkers: [
          ...this.state.mymarkers,
          {
            time: this.state.wavesurfer.getCurrentTime(),
            label: this.state.newlable,
            color: "black",
            notes: this.state.newnotes,
            key: Date.now(),
          },
        ],
      });
      this.state.wavesurfer.addMarker({
        time: this.state.wavesurfer.getCurrentTime(),
        label: this.state.newlable,
        color: "black",
      });

      this.state.newnotes = "";
      this.state.newlable = "";
      let sound = new Audio(pop);
      sound.play();
    } else {
      alert("notes / lable is empty");
    }
  };
  test = async () => {
    // console.log(this.state.wavesurfer.markers);
    this.state.wavesurfer.load(this.state.path);
    setInterval(() => {
      this.setState({
        totalduration: this.state.wavesurfer.getDuration(),
      });
    }, 1000);

    //console.log(this.state.totalduration);
  };
  playpause = () => {
    this.state.wavesurfer.playPause();
  };
  setvol = (e) => {
    this.state.wavesurfer.setVolume(e);
  };
  stop = () => {
    this.state.wavesurfer.stop();
  };
  getcurrentduration = () => {
    this.setState({
      currentduration: this.state.wavesurfer.getCurrentTime(),
    });
  };
  handleup = (e) => {
    if (this.state.wavesurfer) {
      this.state.wavesurfer.destroy();
    }
    this.setState({
      path: URL.createObjectURL(e.target.files[0]),
      info: {
        name: e.target.files[0].name,
        lastModified: new Date(e.target.files[0].lastModified),
        size: e.target.files[0].size,
        type: e.target.files[0].type,
      },
      wavesurfer: WaveSurfer.create({
        container: "#waveform",
        waveColor: "cyan",
        progressColor: "red",
        backgroundColor: "rgba(128,128,128,.1)",
        barHeight: 2,
        mediaControls: true,
        plugins: [
          cursor.create({
            showTime: true,
            opacity: 1,

            customShowTimeStyle: {
              "background-color": "red",

              color: "white",
              padding: "0",
              "font-size": "20px",
            },
          }),

          markers.create({
            markers: this.state.mymarkers,
          }),
        ],
      }),
    });
    //   this.state.wavesurfer.load(this.state.path);
    // console.log(e.target.files[0]);
    //console.log(this.state.path);
  };
  async deleteItems(keys) {
    const filteredItems = this.state.mymarkers.filter(
      (itemss) => itemss.key !== keys
    );
    this.setState({
      mymarkers: filteredItems,
    });
    setInterval(() => {
      this.state.wavesurfer.clearMarkers();
      this.state.mymarkers.forEach((e) => this.state.wavesurfer.addMarker(e));
    }, 500);
  }
  async deletemarker() {
    this.state.wavesurfer.clearMarkers();
  }
  updatemarker() {
    this.state.wavesurfer.clearMarkers();
    this.state.mymarkers.forEach((e) => this.state.wavesurfer.addMarker(e));
  }
  render() {
    return (
      <div>
        <div className="upload">
          <h1> Upload your Audio file</h1>
          <input
            id="uploadfile"
            type="file"
            accept="audio/mp3,audio/wav,audio/*"
            onChange={(e) => {
              this.handleup(e);

              //   this.state.wavesurfer.load(this.state.path);
            }}
          ></input>
          <button onClick={this.test}>Load</button>
        </div>

        <Wave></Wave>
        <Controls
          info={this.state.info}
          playorpause={this.playpause}
          volume={this.setvol}
          stop={this.stop}
          totalduration={this.state.totalduration}
        ></Controls>
        <div className="notes">
          Add notes at current cursor position:
          <input
            value={this.state.newlable}
            placeholder="lable "
            onChange={this.addlableonchange}
          ></input>
          <input
            value={this.state.newnotes}
            placeholder="Type your notes"
            onChange={this.addnotesonchange}
          ></input>
          <button
            style={{ backgroundColor: "none", border: "none" }}
            onClick={() => {
              this.addnotes();
            }}
          >
            <img style={{ width: "25px", height: "25px" }} src={addimg}></img>
          </button>
          {/*  <button onClick={this.updatemarker}>Update markers</button> */}
        </div>
        <ListItems
          items={this.state.mymarkers}
          deleteItem={this.deleteItems}
        ></ListItems>
      </div>
    );
  }
}

export default Newwav;
