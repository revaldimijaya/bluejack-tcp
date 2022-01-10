import React, { useState, useEffect } from 'react' 
import NavBar from "../components/NavBar"
import axios from 'axios'
import { Link } from 'react-router-dom';

function HomePage() {
    const storage = localStorage.getItem('user')
    const user = JSON.parse(storage)
    const semesterId = 'e22236e3-72ff-4786-b4ac-b33c9c7fc82a'
    const url = 'https://laboratory.binus.ac.id/lapi/api/Binusmaya/GetStudentGroupsByNIM/'
    const [courses, setCourses] = useState([])

    const fetchCourse = async() => {
        const params = {
            'semesterId': semesterId,
            'binusianNumber': user['User']['UserName']
        }

        const result = await axios.get(url, { params })
            .then((res) => {
                setCourses(res.data)
            })
            .catch((error) => {}
        ) 

        return result
    } 

    useEffect(()=>{
        fetchCourse()
    }, [])

    return (
        <div>
            <NavBar />
            <div className="container d-flex justify-content-evenly align-items-stretch flex-wrap mt-4">
                {courses?.map(course=> {
                    const groupId = course["StudentGroupDetail"]["Group"]["Id"];
                    const url = `/vote/${groupId}`;
                    return  <div className="card mb-4 mt-4" style={{ width: '45%' }} key={course.CourseCode}>
                                <div className="card-body">
                                    <h5 className="card-title">{course.CourseCode} - {course.ClassName} </h5>
                                    <p className="card-text">{course.CourseName}</p>
                                    <Link to={url} className="btn btn-primary">View Group</Link>
                                </div>
                            </div>
                })}
            </div>
            
        </div>
    )
}


export default HomePage