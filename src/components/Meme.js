import { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";

export default function Meme() {
  const [memeImage, setMemeImage] = useState({
    topText: "",
    MiddleText1: "",
    MiddleText2: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"
  });

  const [allMemes, setAllMemes] = useState([]);
  const nodeRef = useRef(null);
  /**
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */

  useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  }, []);

  /* also can use .then as below
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);
*/
  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMemeImage((prevMeme) => ({
      ...prevMeme,
      randomImage: url
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMemeImage((prevText) => {
      return {
        ...prevText,
        [name]: value
      };
    });
  }

  return (
    <main>
      <div className="form">
        <input
          className="form--text"
          placeholder="Top text"
          name="topText"
          value={memeImage.topText}
          onChange={handleChange}
        />
        <input
          className="form--text"
          placeholder="Bottom text"
          name="bottomText"
          value={memeImage.bottomText}
          onChange={handleChange}
        />
        <input
          className="form--text"
          placeholder="Middle text 1 (Optional)"
          name="MiddleText1"
          value={memeImage.MiddleText1}
          onChange={handleChange}
        />
        <input
          className="form--text"
          placeholder="Middle text 2 (Optional)"
          name="MiddleText2"
          value={memeImage.MiddleText2}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
        <h4 className="reminder">
          *you may drag the text to fit different meme image
        </h4>
      </div>

      <div className="meme">
        <img
          className="meme--image"
          src={memeImage.randomImage}
          alt="random meme"
        />
        <Draggable defaultPosition={{ x: 0, y: 0 }} nodeRef={nodeRef}>
          <h2 ref={nodeRef} className="meme--text top">
            {memeImage.topText}
          </h2>
        </Draggable>

        <Draggable defaultPosition={{ x: 0, y: 0 }} nodeRef={nodeRef}>
          <h2 ref={nodeRef} className="meme--text bottom">
            {memeImage.bottomText}
          </h2>
        </Draggable>

        <Draggable defaultPosition={{ x: 0, y: 0 }} nodeRef={nodeRef}>
          <h2 ref={nodeRef} className="meme--text middle-1">
            {memeImage.MiddleText1}
          </h2>
        </Draggable>

        <Draggable defaultPosition={{ x: 0, y: 0 }} nodeRef={nodeRef}>
          <h2 ref={nodeRef} className="meme--text middle-2">
            {memeImage.MiddleText2}
          </h2>
        </Draggable>
      </div>
    </main>
  );
}
