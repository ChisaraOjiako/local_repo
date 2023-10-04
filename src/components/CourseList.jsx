import './CourseList.css'
import CourseCard from './CourseCard'

export default function courseList({courses, term}) {
   return (
      <div className="course-list">
      {Object.values(courses).map((course)=>course.term === term ? <CourseCard course={course}/>: null)}
      </div>) 
}