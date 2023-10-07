import './CourseList.css'
import { useState } from "react";

export default function courseCard({course}){
    const [selected, setSelected] = useState([]);

    const toggleSelected = (item) => setSelected(
    selected.includes(item)
    ? selected.filter(x => x !== item)
    : [...selected, item]
  );
    return(
        <div className= {selected.includes(course) ? 'selected-courses': ''} onClick={() => toggleSelected(course)}>
            <div className='card-body'>
                <h5 className='card-title'> {course.term} CS {course.number} </h5>
                <p className='card-text'>{course.title}</p>
                <p className='card-text'>{course.meets}</p>
            </div>
        </div>

    )
}

