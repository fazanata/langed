import React, { useState, useContext, useEffect } from 'react';
import './findWordImage.css';
import VarContext from '../../context'
import API from '../../utils/API'


function FindWordImage() {


  const { varUser, setVarUser } = useContext(VarContext)

  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgList, setImgList] = useState([])
  const [currentCard, setCurrentCard] = useState(null)

  let les = varUser['lesson']

  let shWords = []
  let cardsVar = []
  let wList = []

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

  //выбираем слова по уроку

  useEffect(() => {

    function getFetchUrl() {
      return `lesson/listWords.php?idl=${les}`;
    }

    async function fetchData(url) {

      let data = "";
      try {
        const response = await API.get(url);
        data = response;
      } catch (e) {
        this.errors.push(e);
      }
      console.log("data res =", data)
      return data;

      //setWords(result.data.map(s => s))

    }
    
    async function getWords() {
      var output = await fetchData(getFetchUrl())
      
        setWords(output.data.map(s => s));
        if (words.length>0) setLoading(true);
        console.log("output.data=", words)
        shWords = shuffle(words)
        console.log('shWords=', shWords)
  
        wList = shWords.map((c, idx) => {
          return { id: idx, eng: c.word_eng, img: c.img_word, answer: '' }
        })
        console.log('wlist=', wList)
        //setImgList(shWords)
  
        cardsVar = shuffle(words).map((c, idx) => {
          return { id: idx, eng: c.word_eng }
        })
  
  
        setImgList(wList);
        //--мешаем карточки
  
      
    }

    getWords();
    console.log('len=', words.length)
    //мешаем карточки
    


  }, [les]);






  function dragStartHandler(e, card) {
    setCurrentCard(card)
  }

  function dragLeaveHandler(e) {
    e.target.style.background = 'lightblue'
  }

  function dragEndHandler(e) {
    e.target.style.background = 'lightblue'


  }

  function dragOverHandler(e) {
    e.preventDefault()
    e.target.style.background = 'lightgray'
  }

  function dropHandler(e, card) {
    e.preventDefault()

    e.target.style.background = 'lightblue'
    console.log(card.eng)
  }

  return (
    <>
      <div className='mainTask'>Найди слова к картинкам:</div>

      <div class="container">
        <div class="row row-cols-5"
          draggable={false}
        >
          {
            wList && wList.map(word =>
              <div class="col"><img src={word.img} class="img-thumbnail" alt="oops" />{word.answer}</div>
            )
          }
        </div>
      </div>

      <div class="container">
        <div class="row row-cols-5">
          {
            cardsVar && cardsVar.map(word =>
              <div class="col"
                onDragStart={(e) => dragStartHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, word)}
                draggable={true}
                className='wordEngl'
              >
                {word.eng}
              </div>
            )
          }
        </div>
      </div>

    </>

  );
}

export default FindWordImage;