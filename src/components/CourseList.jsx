import './CourseList.css'
import CourseCard from './CourseCard'

export default function courseList({courses}) {
   return (
      <div className="course-list">
      {Object.values(courses).map((course)=><CourseCard course={course}/>)}
      </div>) 
}