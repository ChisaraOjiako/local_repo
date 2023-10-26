import React, { useState } from 'react';
import "./CourseCard.css"
import {useDbUpdate } from '../utilities/firebase';
import { useAuthState } from '../utilities/firebase';
import { useProfile } from '../utilities/profile';


export default function CourseCard({ course, id }) {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(course.title);
  const [editedMeets, setEditedMeets] = useState(course.meets);
  const [updateData, result] = useDbUpdate(`/courses/${id}`)
  

  const [{ user, isAdmin }, isLoading, error] = useProfile()
  

  const handleEdit = () => {
    user && isAdmin ?
    setEditing(true): setEditing(false)
  };

  const validChange = (meets, title) => { 
    if(meets === editedTitle || title === editedMeets || !verifyMeets(meets) || !verifyTitle(title)){
      console.log("Not A VALID CHANGE")
      return false
    }
    setEditedTitle(title);
    setEditedMeets(meets);
    setEditing(false);
    return true
  }

  const onSubmit = () => {
    if(validChange(editedMeets,editedTitle)){
      
      updateData({
        title: editedTitle,
        meets: editedMeets,
        number: course.number,
        term: course.term
      });
    }
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
  const verifyTitle = (title) => {
    return (title.length >= 2)
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
          {!verifyTitle(editedTitle) && (
      <div className="title-error-message">Course title must be at least 2 characters</div>)}
          <input
            type="text"
            placeholder="New meets"
            value={editedMeets}
            onChange={(e) => setEditedMeets(e.target.value)}
          />
          {!verifyMeets(editedMeets) && (
      <div className="meets-error-message">Meets must contain days and start-end, e.g., MWF 12:00-13:20</div>)}
          <button onClick={onSubmit}>Submit</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <h5 className="card-title">
            {course.term} CS {course.number}
          </h5>
          <p className="card-text">{course.title}</p>
          <p className="card-text">{course.meets}</p>
          {isAdmin?<button onClick={handleEdit}>Edit</button>:null }        
        </div>
      )}
    </div>
  );
}
