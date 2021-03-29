import React, { useState } from 'react';
import './puzzleWord.css';


function PuzzleWord({ word, word_rus }) {

    var arrWord = word.split('');

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

    let shWord = shuffle(arrWord)


    let cList = shWord.map((c, idx) => {
        return { id: idx, order: idx + 1, text: c }
    })


    const [cardList, setCardList] = useState(cList)
    const [currentCard, setCurrentCard] = useState(null)
    const [wordDone, setWordDone] = useState(false)

    function dragStartHandler(e, card) {
        setCurrentCard(card)
    }

    function dragLeaveHandler(e) {
        e.target.style.background = 'lightblue'
    }

    function dragEndHandler(e) {
        e.target.style.background = 'lightblue'
        let w = []
        cardList.map(c => {
            w.push(c.text)
        })

        let str = w.join("")
        if (str === word) setWordDone(true)

    }

    function dragOverHandler(e) {
        e.preventDefault()
        e.target.style.background = 'lightgray'
    }

    function dropHandler(e, card) {
        e.preventDefault()

        setCardList(cardList.map(c => {
            if (c.id === card.id) {
                return { ...c, order: currentCard.order }
            }
            if (c.id === currentCard.id) {
                return { ...c, order: card.order }
            }
            return c
        }))
        e.target.style.background = 'lightblue'

    }

    const sortCards = (a, b) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    return (
        <div className={` ${!wordDone ? 'main' : 'mainDone'}`}>
            <div className={` ${!wordDone ? 'word' : 'wordDone'}`}>
                {!wordDone ? `Собери слово "${word_rus}"` : "Слово собрано! Молодец!"}
            </div>
            {
                cardList.sort(sortCards).map(card =>
                    <div
                        onDragStart={(e) => dragStartHandler(e, card)}
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropHandler(e, card)}
                        draggable={!wordDone ? true : false}
                        className='card'
                    >
                        {card.text}
                    </div>
                )
            }
        </div>
    );
}



export default PuzzleWord;