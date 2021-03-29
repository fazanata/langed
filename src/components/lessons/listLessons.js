import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import API from '../../utils/API'
import './listLessons.css'


function ListLessons(props) {

  let section = props.match.params.ids
  

  const [lessons, setLessons] = useState([]);

  useEffect(() => {

    function getFetchUrl() {
      return `lesson/readSection.php?ids=${section}`;
    }
    async function fetchData() {
      const result = await API.get(getFetchUrl())
      setLessons(result.data.map(s => s))
    }

    fetchData()

  }, [section]);

  return (
    <>
      <div>

        {lessons && lessons.map(item => (
          <div>
            <div className="lessonName">
              <br />
              <Link to={`/lesson/${item.idl}`} href={item.idl}>{item.name_lesson}</Link>
            </div>
            <div>
              <img src={item.img_lesson} class="img-thumbnail" alt="oops" />
            </div>
          </div>
        ))}

      </div>

    </>
  );
}

export default ListLessons;
