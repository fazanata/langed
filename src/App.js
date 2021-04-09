import React, { useContext, useEffect } from "react";
import "./App.css";
import Main from "./components/Main";
import Menu from "./components/menu/menu";
import NavBar from "./components/navBar/navBar";
import VarContext from "./context";
import API from './utils/API'

function App() {
  const { varUser, setVarUser } = useContext(VarContext);
  useEffect(() => {
    //устанавливаем данные пользователя(или загружаем из бд данные текущего пользователя)
    setVarUser((prev) => ({ ...prev, ["count"]: 10 }));
    setVarUser((prev) => ({ ...prev, ["user"]: "User" }));
    setVarUser((prev) => ({ ...prev, ["role"]: "admin" }));
    //берем первый урок в списке для инициализации
    function getFetchUrl() {
      return `lesson/readFirstLesson.php`;
    }
    async function fetchData() {
      const result = await API.get(getFetchUrl())
      setVarUser((prev) => ({ ...prev, ["lesson"]: result.data.idl }));
      setVarUser((prev) => ({ ...prev, ["name_lesson"]: result.data.name_lesson }));

      //console.log('name_lesson=', varUser['name_lesson'])
    }

    fetchData()

  }, []);

  return (
    <>
      
      <NavBar />
      <div class="row">
        <div class="col-sm-2">
          <Menu />
        </div>
        <div class="col-sm-8">
          <Main />
        </div>
      </div>
    </>
  );
}

export default App;
