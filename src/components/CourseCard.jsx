import React, { useState } from 'react';
import "./CourseCard.css"

export default function CourseCard({ course }) {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(course.title);
  const [editedMeets, setEditedMeets] = useState(course.meets);

  const handleEdit = () => {
    setEditing(true);
  };

  const onSubmit = () => {

    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    
    setEditedTitle(course.title);
    setEditedMeets(course.meets);
  };

  const verifyMeets = (meets) => {
    if(meets === ""){
      return true
    }
    const validMeets = /^(M|Tu|W|Th|F)+ \d{2}:\d{2}-\d{2}:\d{2}$/
    console.log(validMeets.test(meets), meets)
    return validMeets.test(meets)

  }

  return (
    <div className="card-body">
      {editing ? (
        <div>
          <input
            type="text"
            placeholder="New title"
            value={editedTitle}
            onChange={(e) => {setEditedTitle(e.target.value)}}
          /> 
          {editedTitle.length < 2 && (
      <div className="title-error-message">Course title must be at least 2 characters</div>)}
          <input
            type="text"
            placeholder="New meets"
            value={editedMeets}
            onChange={(e) => setEditedMeets(e.target.value)}
          />
          {!verifyMeets(editedMeets) && (
      <div className="meets-error-message">Meets must contain days and start-end, e.g., MWF 12:00-13:20</div>)}
          {/* <button onClick={onSubmit}>Submit</button> */}
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <h5 className="card-title">
            {course.term} CS {course.number}
          </h5>
          <p className="card-text">{course.title}</p>
          <p className="card-text">{course.meets}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
}
