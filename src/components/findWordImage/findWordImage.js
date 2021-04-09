import React, { useState, useContext, useEffect } from "react";
import "./findWordImage.css";
import VarContext from "../../context";
import API from "../../utils/API";
import ImagesTask from "./ImagesTask"




function FindWordImage() {
  const { varUser, setVarUser } = useContext(VarContext);
  let les = varUser["lesson"];

  const [words, setWords] = useState([]);
  

  //выбираем слова по уроку

  useEffect(() => {
    function getFetchUrl() {
      return `lesson/listWords.php?idl=${les}`;
    }


    const fetchData = async () => {
      //setLoading(true);
      await API.get(getFetchUrl())
        .then((response) => {
          setWords(response.data)
        })
        .catch((e) => {
          
        });
    };
    fetchData();

  }, [les]);


  return (
    <>
      {words.length >0 && 
          <ImagesTask words={words} />}
      
    </>
  );
}

export default FindWordImage;
