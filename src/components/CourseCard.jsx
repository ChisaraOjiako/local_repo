import React, { useState } from 'react';

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

  return (
    <div className="card-body">
      {editing ? (
        <div>
          <input
            type="text"
            placeholder="New title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="New meets"
            value={editedMeets}
            onChange={(e) => setEditedMeets(e.target.value)}
          />
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
