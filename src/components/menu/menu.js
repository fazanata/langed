import React, { useState, useEffect } from 'react'
import API from '../../utils/API'
import {Link} from 'react-router-dom'
import s from './menu.module.scss'


function Menu() {

    const [sections, setSections] = useState();
    const [hasError, setHasError] = useState(false);


    useEffect(() => {

        function getFetchUrl() {
            return 'section/read.php';
          }
        async function fetchData() {
            const result = await API.get(getFetchUrl())
            setSections(result.data.map(s => s))
        }

        fetchData()


    }, [sections]);



    if (!sections) {
        console.log('data is still loading')
    }

    if (hasError) {
        console.log('error when fetching data');

    }


    return (
        <>

            <div>
                <ul>
                    {sections && sections.map(item => (
                        <li key={item.ids}>
                            
                            <Link to={`/section/${item.ids}`} href={item.ids}><div className={s.hoverItem}>{item.name_section} ({item.count})</div></Link>
                        
                        </li>
                    ))}
                </ul>
            </div>

        </>
    );
}

export default Menu;
