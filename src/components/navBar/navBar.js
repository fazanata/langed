import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import VarContext from '../../context'
import coins from '../../assets/coins.png'

function NavBar() {
    const { varUser, setVarUser } = useContext(VarContext)

    let user = varUser['user']
    let count = varUser['count']
    let lesson = varUser['lesson']
    let name_lesson = varUser['name_lesson']

    return (
        <>

            <nav class="navbar navbar-expand-lg navbar-dark bg-primary" >
                <div class="container-fluid">
                    <Link to="/" class="navbar-brand" href="#">О программе</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link to="/puzzleTask" class="nav-link active" aria-current="page">Собери слова</Link>
                            </li>


                            <li class="nav-item">
                                
                                    <Link to="/findWordImage" class="nav-link">Найди картинки</Link>
                                  
                            </li>
                            <li class="nav-item">
                                
                                <div class="nav-link">{user}, ваши очки: { count }<img src={coins} height="30px" />   </div>
                              
                            </li>
                            <li class="nav-item">
                                
                                <div class="nav-link"> Урок:<b> {name_lesson} - {lesson} </b></div>
                              
                            </li>
                        </ul>
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>

        </>
    );
}

export default NavBar;



