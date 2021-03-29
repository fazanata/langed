import React, { useState, useEffect, useContext } from 'react';
import './lesson.css'
import API from '../../utils/API'
import VarContext from '../../context'



function Lesson(props) {

    const {varUser, setVarUser} = useContext(VarContext)

    let idl = props.match.params.idl

    const [les, setLesson] = useState(null);

    useEffect(() => {
        
        function getFetchUrl() {
            return `lesson/readLesson.php?idl=${idl}`;
        }
        async function fetchData() {
            const result = await API.get(getFetchUrl())
            console.log("data=", result.data.idl)

            setVarUser(prev => ({...prev, ['lesson']: result.data.idl}))
            setLesson(result.data)

        }
       
        fetchData()
    }, []);


    return (
        <>
            {les &&
                <div>
                    <div className="lessonName">
                        {les.name_lesson}
                    </div>
                    <div>
                        <img src={les.img_lesson} class="img-fluid" alt="oops" />
                    </div>
                    <div>
                        {les.descr_lesson}
                    </div>
                </div>
            }


        </>
    );
}

export default Lesson;
