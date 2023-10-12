const stringToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  }

const getCourseTimes = (course) => {
    const term = course.term.split(' ')[0]
    const [days, time] = course.meets.split(' ');
    const [start, end] = time.split('-').map(stringToMinutes)
    ;
    return [ term, days, start, end ];
}

const Conflict = (courseOne, courseTwo) => {
    if (courseOne === courseTwo) return false;
    if (!courseOne.meets || !courseTwo.meets) return false;
    

    const  [term1, days1, start1, end1 ] = getCourseTimes(courseOne);
    const  [term2, days2, start2, end2 ]= getCourseTimes(courseTwo);

    if (term1 === term2 && start1 < end2 && start2 < end1){
        for (let day of days1) {
            if (days2.includes(day)){
                return true;
            }
    }}

    return false
}

export default function hasConflict (course, selectedCourses){
    for (let selectedCourse of selectedCourses) {
        if (Conflict(course, selectedCourse)) {
            return true;
        }
    }
    return false;
}

