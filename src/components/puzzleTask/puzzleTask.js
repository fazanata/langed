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


    async function fetchData() {
      const result = await API.get(getFetchUrl());
          setWords(result.data.map((s) => s));
          //setShWords(shuffle(words));
          console.log('res w=', words)
  
    }

      fetchData();

  }, [les]);

  if(words === null) {
    return (
      <div>загрузка данных...</div>
    )
  }

  return (
    <>
      <div className="mainTask">Собери слова:</div>
      {words && words.map((word) => (
        <PuzzleWord word={word.word_eng.trim()} word_rus={word.word_rus} />
      ))}
    </>
  );
}



export default PuzzleTask;
