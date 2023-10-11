import "./CourseList.css";

export default function courseCard({ course }) {
  return (
      <div className="card-body">
        <h5 className="card-title">
          {" "}
          {course.term} CS {course.number}{" "}
        </h5>
        <p className="card-text">{course.title}</p>
        <p className="card-text">{course.meets}</p>
      </div>
  );
}
