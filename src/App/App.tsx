import React, { useRef, useState } from "react";


const App = () => {
  const [text, setText] = useState("");
  const [path, setPath] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);


  return <div>
    <div>
      <button onClick={async () => {
        const chars = text.split('');
        let i = 0;

        const audio = audioRef.current;

        if (audio == null) {
          return;
        }

        audio.oncanplay = () => {
          console.log(chars[i]);
          audio.play();
        }

        audio.onended = () => {
          ++i;
          if (i >= chars.length) {
            return;
          }
          setTimeout(() => {
            audio.src = `public/${chars[i]}.mp3`;
          }, 50);
        }
        
        audio.src = `public/${chars[i]}.mp3`;

      }}>
        再生
      </button>
    </div>
    <div>
      <textarea defaultValue={text} onChange={(e) => {
        setText(e.target.value);
      }}>
      </textarea>
    </div>

    <audio ref={audioRef}></audio>
  </div>
}

export default App;

function playAllSound(audios: HTMLAudioElement[]) {

}
