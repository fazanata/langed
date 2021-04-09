import React, { useState, useContext, useEffect } from "react";

import "./findWordImage.css";
import VarContext from "../../context";


function ImagesTask({ words }) {
  const { varUser, setVarUser } = useContext(VarContext);
  let count = varUser["count"];
  const [imgList, setImgList] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [cardsVar, setcardsVar] = useState(null);

  const [taskDone, setTaskDone] = useState(false);
//для вывода сообщений по очкам
  const [showInfo, setShowInfo] = useState(false);
  const [TextInfo, setTextInfo] = useState("")

  useEffect(() => {
    function shuffle(arr) {
      var j, temp;
      for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
      return arr;
    }

    let shWords = shuffle(words);
    console.log("shWords=", shWords);
    let wList = shWords.map((c, idx) => {
      return { id: idx, eng: c.word_eng, img: c.img_word, answer: "" };
    });
    let cardsVar = shuffle(words).map((c, idx) => {
      return { id: idx, eng: c.word_eng };
    });
    setcardsVar(cardsVar);
    setImgList(wList);
    console.log("wlist=", wList);
  }, []);

  function dragStartHandler(e, card) {
    setCurrentCard(card);
  }

  function dragLeaveHandler(e) {
    e.target.style.background = "lightblue";
  }

  function dragEndHandler(e) {
    e.target.style.background = "lightblue";

    console.log("чтото делает");
  }

  function dragOverHandler(e) {
    e.preventDefault();
    e.target.style.background = "lightgray";
    //console.log('dragOverHandler=', e.target.className)
  }

  function dragOverHandler2(e, image) {
    if (currentCard.eng === image.eng) {
      //console.log('dragOverHandler=', e.target)
      //e.target.style.background = "lightpink";
    }
    e.preventDefault();
    //e.target.style.background = "lightgray";
  }

  function dropHandler(e, card) {
    e.preventDefault();

    e.target.style.background = "lightblue";
    console.log("тащим", card.eng);
  }

  function dropHandlerImage(e, image) {
    e.preventDefault();
    
    if (currentCard.eng === image.eng) {
      setVarUser((prev) => ({ ...prev, ["count"]: count + 1 }));
      setTextInfo(`Правильно! +1 очко! У вас ${count+1} очков`)

      let newImages = imgList.map((c) => {
        if (c.eng === image.eng) c.answer = image.eng;
        return c;
      });
      console.log(newImages);
      setImgList(newImages);
      setcardsVar(cardsVar.filter((item) => !(item.eng === image.eng)));
      if (cardsVar.length === 0) setTaskDone(true);
      //e.target.style.background = "lightblue";
    }
    else {
        if ( count >0 ) setVarUser((prev) => ({ ...prev, ["count"]: count - 1 }));
        setTextInfo(`Неправильно! -1 очко! У вас ${count-1} очков`)
    }
    let done = true;
    setShowInfo(true);
    setTimeout(() => setShowInfo(false), 3000)
  }

  return (
    <div>
        {showInfo &&
                <div className="showTip" background-color="green">{TextInfo} </div>
        }
        
      <div className={` ${!taskDone ? "task" : "taskDone"}`}>
        {!taskDone
          ? `Найди слова к картинкам:`
          : "Ты справился с заданием! Молодец!"}
      </div>
      <div class="container">
        <div class="row row-cols-5" draggable={false}>
          {imgList &&
            imgList.map((image) => (
              <div
                class="col"
                onDragOver={(e) => dragOverHandler2(e, image)}
                onDrop={(e) => dropHandlerImage(e, image)}
                draggable={false}
              >
                <div className="imageElement">
                  <img src={image.img} class="img-thumbnail" alt="oops" />
                  <div className="imageAnswer">{image.answer}</div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div class="container">
        <div class="row row-cols-5">
          {cardsVar &&
            cardsVar.map((word) => (
              <div
                class="col"
                onDragStart={(e) => dragStartHandler(e, word)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, word)}
                draggable={true}
                className="wordEngl"
              >
                {word.eng}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ImagesTask;
