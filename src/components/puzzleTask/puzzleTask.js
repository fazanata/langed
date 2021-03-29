import React, {useContext, useState, useEffect} from 'react'
import './puzzleTask.css'
import PuzzleWord from './puzzleWord/puzzleWord'
import VarContext from '../../context'
import API from '../../utils/API'

function PuzzleTask() {

    const {varUser, setVarUser} = useContext(VarContext)

    const [words, setWords] = useState([]);

    let les=varUser['lesson']
//выбираем слова по уроку
  useEffect(() => {

    function getFetchUrl() {
      return `lesson/listWords.php?idl=${les}`;
    }
    async function fetchData() {
      const result = await API.get(getFetchUrl())
      setWords(result.data.map(s => s))
    }

    fetchData()

  }, []);

//перемешиваем слова

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

    let shWords = shuffle(words)

    
    

    return (
        <>
            <div className='mainTask'>Собери слова:</div>
            {
                shWords.map(word =>
                    <PuzzleWord word={word.word_eng.trim()} word_rus={word.word_rus} />
                )
            }
        </>
    );
}

export default PuzzleTask;
