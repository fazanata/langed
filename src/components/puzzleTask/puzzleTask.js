import React, { useContext, useState, useEffect, Suspense } from "react";
import "./puzzleTask.css";
import PuzzleWord from "./puzzleWord/puzzleWord";
import VarContext from "../../context";
import API from "../../utils/API";

function PuzzleTask() {
  const { varUser, setVarUser } = useContext(VarContext);

  const [words, setWords] = useState(null);
  const [shWords, setShWords] = useState(null);

  let les = varUser["lesson"];
  console.log("n les=", les);

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

    const fetchData = async () => {
      //setLoading(true);
      await API.get(getFetchUrl()).then((response)=>{
        //setWords(response.data.map((s) => s))
        
        console.log('res=', response.data)
        setWords(response.data)
        console.log('words=', words)
        setShWords(shuffle(words));
        //setLoading(false);
      }).catch((e)=>{
       /* HANDLE THE ERROR (e) */
      });
  }
  fetchData();

/*
    async function fetchData() {
      let result = await API.get(getFetchUrl());
          result = await result.data
          //setWords(result.data.map((s) => s));
          setWords(result.data)
          //
          //console.log('res w=', words)
  
    }

      fetchData();
      */
  }, [les]);

  if(words === null) {
    return (
      <div>загрузка данных...</div>
    )
  }

  return (
    <>
      <div className="mainTask">Собери слова! Получи по 3 очка за каждое слово и 10 очков за всё задание!<font size="-4"color="red">Посказка забирает 1 очко!</font></div>
      {words && words.map((word, id) => (
        <PuzzleWord key={id} word={word.word_eng.trim()} word_rus={word.word_rus} />
      ))}
    </>
  );
}



export default React.memo(PuzzleTask);
