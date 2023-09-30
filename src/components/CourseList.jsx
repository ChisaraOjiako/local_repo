export default function courseList({courses}) {
   return (
      <div className="CourseList">
      {courses.map((course)=><p>{course.term} CS {course.number}: {course.title} </p>)}
      </div>) 
}