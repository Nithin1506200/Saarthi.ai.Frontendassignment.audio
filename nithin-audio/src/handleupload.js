import { useState } from "react";
import WaveSurfer from "wavesurfer.js";
import cursor from "wavesurfer.js/dist/plugin/wavesurfer.cursor";
import markers from "wavesurfer.js/dist/plugin/wavesurfer.markers";
const Audioplayer = () => {
  let [myaudio, setAudio] = useState(0);
  let aud = new Audio(myaudio);
  const [wavesurfer, setwave] = useState("");
  let playpause = () => {
    console.log(wavesurfer);
  };
  function intwav(e) {
    console.log(wavesurfer);
    // wavesurfer.playPause();
  }
  return (
    <div>
      <h1> Upload your Audio file</h1>
      <input
        type="file"
        accept="audio/mp3,audio/wav,audio/*"
        onChange={async (e) => {
          setAudio(URL.createObjectURL(e.target.files[0]));
          //aud = new Audio(myaudio);
          // console.log(aud);
          setwave(
            WaveSurfer.create({
              container: "#waveform",
              waveColor: "cyan",
              progressColor: "#000088",
              backgroundColor: "grey",
              barHeight: 2,
              mediaControls: true,
              plugins: [
                cursor.create({
                  showTime: true,
                  opacity: 1,

                  customShowTimeStyle: {
                    "background-color": "red",

                    color: "white",
                    padding: "2px",
                    "font-size": "20px",
                  },
                }),

                markers.create({
                  markers: [
                    {
                      time: 5.5,
                      label: "V1",
                      color: "#ff990a",
                    },
                    {
                      time: 10,
                      label: "V2",
                      color: "#00ffcc",
                      position: "top",
                    },
                  ],
                }),
              ],
            })
          );
          console.log(wavesurfer);
          // wavesurfer.load(URL.createObjectURL(e.target.files[0]));
          intwav(e);
        }}
        name="myaudio"
      />
      <audio src={myaudio} controls></audio>

      <div className="controls-container">
        <button className="pause-play" onClick={playpause}></button>
      </div>
    </div>
  );
};
export default Audioplayer;
