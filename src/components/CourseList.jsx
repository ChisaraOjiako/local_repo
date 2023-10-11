import "./CourseList.css";
import CourseCard from "./CourseCard";
import { useState } from "react";
import Modal from './Modal';
import Cart from "./Cart";

export default function courseList({ courses, term }) {
  const [selected, setSelected] = useState([]);

  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const toggleSelected = (item) =>
    setSelected(
      selected.includes(item)
        ? selected.filter((x) => x !== item)
        : [...selected, item]
    );
  return (
    <div>
      <div className="course-list">
        {Object.values(courses).map((course) => {
          if (course.term === term) {
            return (
              <div
                className={selected.includes(course) ? "selected-courses" : ""}
                onClick={() => toggleSelected(course)}
              >
                <CourseCard course={course} />
              </div>
            );
          }
        })}
      </div>
      <div>
      <button className="course-plan-button" onClick={openModal}>
        <i className="course-plan-icon">Course Plan</i>
      </button>
      <Modal open={open} close={closeModal}>
        <Cart selectedCourses={selected} />
      </Modal>
      </div>
    </div>
  );
}
