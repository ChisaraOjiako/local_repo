export default function courseList(courses) {
   return (courses.map((course)=>{
    <p>{course.term} CS {course.number}: {course.title} </p>
   }))
}