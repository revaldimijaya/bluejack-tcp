import React, { useState, useEffect } from 'react' 
import NavBar from "../components/NavBar"

function HomePage() {
    // let {id} = useParams()
    let nim = '2301874784'
    
    const [courses, setCourses] = useState([])

    useEffect(()=>{
        fetch(`https://laboratory.binus.ac.id/lapi/api/Binusmaya/GetStudentGroupsByNIM?semesterId=e22236e3-72ff-4786-b4ac-b33c9c7fc82a
        &binusianNumber=${nim}`)
        .then(res=>res.json())
        .then(data =>{
            setCourses(data)
        })
    }, [])

    return (
        <div>
            <NavBar />
            <div className="container d-flex justify-content-evenly align-items-stretch flex-wrap mt-4">
                {courses?.map(course=> {
                    return  <div className="card mb-4 mt-4" style={{ width: '45%' }} key={course.CourseCode}>
                                <div className="card-body">
                                    <h5 className="card-title">{course.CourseCode}</h5>
                                    <p className="card-text">{course.CourseName}</p>
                                    <a href="/" className="btn btn-primary">View Group</a>
                                </div>
                            </div>
                })}
            </div>
        </div>
    )
}


export default HomePage