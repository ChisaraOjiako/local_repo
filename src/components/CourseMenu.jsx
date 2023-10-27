import Banner from "./Banner";
import CourseList from "./CourseList";
import { useState } from "react";
// import { useJsonQuery } from '../utilities/fetch';
import { useDbData, useDbUpdate } from '../utilities/firebase';


export default function Main(){
    const [data, error] = useDbData('/');
    
    if (error) return <h1>Error loading user data: {`${error}`}</h1>;
    if (!data) return <h1>No user data found</h1>;

    const terms = {
        Fall: <CourseList courses = {data.courses} term = "Fall"/>,
        Winter: <CourseList courses = {data.courses} term = "Winter"/>,
        Spring: <CourseList courses = {data.courses} term = "Spring"/>
      };
    
    const MenuButton = ({term, selection, setSelection}) => (
    <div>
        <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
        onChange={() => setSelection(term)} />
        <label className="btn btn-success mb-1 p-2" htmlFor={term} data-cy={term}>
        { term }
        </label>
    </div>
    );
    
    const MenuSelector = ({selection, setSelection}) => (
        <div className="btn-group">
          { 
            Object.keys(terms).map(term => <MenuButton key={term} term={term} selection={selection} setSelection={setSelection} />)
          }
        </div>
      );
    
    const Menu = ({selection}) => (
        <div className="card" >
        { terms[selection] }
        </div>
    );
    
    const CourseMenu = () => {
        const [selection, setSelection] = useState(() => Object.keys(terms)[0]);

        return (
            <div>
                <Banner title = {data.title}/>       
                <MenuSelector selection={selection} setSelection={setSelection} />
                <Menu selection={selection} />
            </div>
        );
    }

    return <CourseMenu/>
    
} 