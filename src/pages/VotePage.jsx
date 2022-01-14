import { Button, OverlayTrigger, Tooltip, Image} from "react-bootstrap"
import Accordion from 'react-bootstrap/Accordion'
import NavBar from "../components/NavBar"
import Error from  "../components/Error"
import { gql, useQuery, useMutation } from '@apollo/client'
import { useState, useEffect } from "react"
import axios from 'axios'
import $ from 'jquery'
import {useParams, Redirect} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

function VotePage() {
    let {id} = useParams();
    const storage = localStorage.getItem('user')
    const user = JSON.parse(storage)
    const semesterId = 'e22236e3-72ff-4786-b4ac-b33c9c7fc82a'
    const url = 'https://laboratory.binus.ac.id/lapi/api/Binusmaya/GetStudentGroupsByNIM/'
    const [course, setCourse] = useState(null)
    const [votes, setVotes] = useState([])
    const messageState = useState("")
    const [axiosWait, setAxiosWait] = useState(false)

    const fetchCourse = async () => {
        const params = {
            'semesterId': semesterId,
            'binusianNumber': user['User']['UserName']
        }
        setAxiosWait(true)
        await axios.get(url, { params })
            .then((res) => {
                setCourse(res.data.filter(function (data) {
                    return data.StudentGroupDetail.Group.Id === id
                })[0])
                setAxiosWait(false)
            })
            .catch((error) => { }
            )
    }

    useEffect(() => {
        fetchCourse()
    }, [])

    useEffect(() => {
        if(course != undefined){
            let students = course.StudentGroupDetail.Group.Students
            students.forEach(function (student) {
                student.up = false
                student.description = ""
            });
            setVotes(students)
        }
    }, [course])

    const submitVote = (event) => {
        event.preventDefault()
        let isVote = false
        votes.forEach((vote)=>{
            if(vote.up && vote.description !== ""){
                isVote = true
                create_vote({
                    variables: {
                        groupID: course.StudentGroupDetail.Group.Id,
                        student_voted: vote.StudentNumber,
                        studentID_voter: user['User']['UserName'],
                        desc: vote.description
                    }
                });
            }
        })
        if (isVote == false){
            messageState[1]("Vote is empty")
        }else{
            setVotes((currentVote) => currentVote.map(x =>{
                x.up = false
                return x
            }))
            messageState[1]("")
        }  
    }

    const editVote = (event, id, index) => {
        event.preventDefault();
        let desc = $('.txt-area-' + index).val()
        if(desc !== ''){
            update_vote({
                variables: {
                    voted: id,
                    voter: user['User']['UserName'],
                    description: desc
                }
            });
        }else{
            $('.txt-area-' + index).addClass('input-error')
        }

    }
    const removeVote = (event, id) => {
        event.preventDefault();
        delete_vote({
            variables: {
                voted: id,
                voter: user['User']['UserName']
            }
        });

    }

    const CREATE_VOTE = gql`
        mutation createNewVote($groupID: ID!, $student_voted: ID!,$studentID_voter: ID!, $desc: String! ){
            createVote( input:{
            groupID: $groupID
            studentID_voted: $student_voted
            studentID_voter: $studentID_voter
            description: $desc
            })
        }
    `;

    const UPDATE_VOTE = gql`
        mutation updateVote($voted: ID!, $voter:ID!, $description: String!){
            updateVote(studentID_voted: $voted,studentID_voter: $voter, input:{
            description: $description
            })
        }
    `;

    const DELETE_VOTE = gql`
        mutation deleteVote($voted: ID!, $voter: ID!){
            deleteVote(studentID_voted: $voted, studentID_voter: $voter)
        }
    `;

    const GET_VOTE = gql`
        query getVote($studentID: String!, $groupID: String!){
            votes(studentID: $studentID, groupID: $groupID){
                votes{
                    groupID
                    studentID_voted
                    studentID_voter
                    description
                    date
                }
                re_voted{
                    groupID
                    studentID_voted
                    studentID_voter
                    description
                    date
                }
            }
        }
    `;

    const [create_vote, { data, loading, error }] = useMutation(CREATE_VOTE, {
        refetchQueries: [{
            query: GET_VOTE, variables: {
                studentID: user['User']['UserName'],
                groupID: course?.StudentGroupDetail.Group.Id
            }
        }]
    })
    const [update_vote, update_info] = useMutation(UPDATE_VOTE, {
        refetchQueries: [{
            query: GET_VOTE, variables: {
                studentID: user['User']['UserName'],
                groupID: course?.StudentGroupDetail.Group.Id
            }
        }]
    })
    const [delete_vote, delete_info] = useMutation(DELETE_VOTE, {
        refetchQueries: [{
            query: GET_VOTE, variables: {
                studentID: user['User']['UserName'],
                groupID: course?.StudentGroupDetail.Group.Id
            }
        }]
    })
    const vote_result = useQuery(GET_VOTE, {
        variables: {
            studentID: user['User']['UserName'],
            groupID: course?.StudentGroupDetail.Group.Id
        }
    })

    const handleClick = async (idx) => {
        // console.log($('.btn-show-txt-area-' + idx).children().is('div'))
        if ($('.btn-show-txt-area-' + idx).children().is('div')) {
            let value = $('.btn-show-txt-area-' + idx).find('div').text()
            $('.btn-show-txt-area-' + idx).empty()
            let textarea = $('<textarea></textarea>').val(value).addClass('txt-area-' + idx).addClass('w-100 ')
            $('.btn-show-txt-area-' + idx).append(textarea)
        }
    }

    if (error) return `Submission error! ${error.message}`;

    if (vote_result.loading || loading || update_info.loading || delete_info.loading || axiosWait) {
        return(
            <div>
                <NavBar />
                Loading..
            </div>
        )   
    }

    if (vote_result.error){
        return(
            <div>
                <NavBar />
                {`No Data: ${vote_result.error.message}`}
            </div>
        )
            
    }

    const checkForm = ()=>{
        if(votes.length - 1 === vote_result.data.votes.votes.length)
            return null
        else{
            return (
                <div>
                <h5 style={{color:'#777777'}}>Unvoted Members</h5>
                <OverlayTrigger
                    placement="right"
                    overlay={
                    <Tooltip style={{maxWidth:"500px", width:"500px"}} id="button-tooltip-2" className="w-100">
                        <p className="text-left">
                        1. Click on a member's block, then the accordion will open and display input field. <br />
                        2. Input his/her contribution in the input field. (required)<br />
                        3. Without closing the accordion, click the vote button to submit your vote. <br />
                        4. The program can only submit 1 vote for 1 member at a time. <br />
                        </p>
                        
                    </Tooltip>}
                >
                    {({ ref, ...triggerHandler }) => (
                    <Button
                        variant="light"
                        ref={ref}
                        {...triggerHandler}
                        className="d-inline-flex align-items-center"
                    > 
                        Help
                    </Button>
                    )}
                </OverlayTrigger>
                <form>
                        {votes?.map((s, index) => {
                            if(vote_result.data.votes.votes?.some(vote => vote.studentID_voted === s.StudentNumber) || s.StudentNumber === user['User']['UserName'])
                            return
                            else
                            return (
                                <Accordion defaultActiveKey={-1} alwaysOpen>
                                <Accordion.Item eventKey={index}>
                                    <Accordion.Header onClick={(e) => {
                                        setVotes((currentVote) => currentVote.map(x => x.StudentNumber === s.StudentNumber ? {
                                            ...x,
                                            up: !x.up
                                        } : x))
                                    }}>
                                        <div className="d-flex justify-content-between w-100">
                                            <div className="d-flex">
                                                <img className="px-2" src={`https://laboratory.binus.ac.id/lapi/API/Account/GetThumbnail?id=${s.PictureId}`} alt="" />

                                                {(() => {
                                                    if (vote_result.data.votes.re_voted?.some(vote => vote.studentID_voter === s.StudentNumber)){
                                                        return (
                                                            <div className="px-2">
                                                                <div className=""><strong>{s.StudentNumber} - {s.Name}</strong></div>
                                                                <div className="py-2" style={{ color:"green" }}>Has Voted You</div>
                                                                
                                                            </div>
                                                            
                                                        )
                                                    }
                                                    
                                                    return <div className="px-2"><strong>{s.StudentNumber} - {s.Name}</strong></div>;
                                                })()}
                                            
                                            </div>
                                            <div>
                                                <input id={s.StudentNumber} type="checkbox" checked={s.up} className="d-none" />
                                            </div>
                                        </div>
                                        
                                    </Accordion.Header>
                                    
                                    
                                    <Accordion.Body>
                                        <textarea className={`w-100 ${messageState[0]!=''?'input-error':''}`} name="" id="" cols="30" rows="10" onChange={(e) => {
                                            setVotes((currentVote) => currentVote.map(x => x.StudentNumber === s.StudentNumber ? {
                                                ...x,
                                                description: e.target.value
                                            } : x))
                                        }} placeholder="Description">
                                            {s.description}
                                        </textarea>
                                    </Accordion.Body>
                                </Accordion.Item>
                                </Accordion>
                            )
                        })}
                    <div className="d-flex justify-content-end">
                        <button onClick={submitVote} className="btn btn-primary my-2 px-3">Vote</button>
                    </div>
                </form>
                </div>
            )
        }
    }

    return (  
        <div >
            <NavBar />
            <h4 className="text-center pt-4" style={{color:'#18181b'}}>{course.CourseCode} - {course.CourseName} - {course.ClassName}</h4>
            <div className="container m-auto my-4">
                {vote_result.data.votes.votes.length > 0 &&
                    <h5 style={{color:'#777777'}}>Voted Members</h5>
                }
                <Accordion defaultActiveKey={['0']}>
                    {vote_result.data.votes.votes?.map((vote, index) => {
                        let className = 'btn-show-txt-area-' + index
                        let student = votes.filter(function (data) {
                            return data.StudentNumber === vote.studentID_voted
                            })[0]
                        return (
                            <Accordion.Item eventKey={index}>
                                <Accordion.Header>
                                    <div className="d-flex justify-content-between w-100">
                                        <div className="d-flex">
                                            <div className="px-2">
                                                <img src={`https://laboratory.binus.ac.id/lapi/API/Account/GetThumbnail?id=${
                                                    student.PictureId
                                                }`} alt="" />
                                            </div>
                                            <div className="d-flex flex-column">
                                                {(() => {
                                                    if (vote_result.data.votes.re_voted?.some(vote => vote.studentID_voter === student.StudentNumber)){
                                                        return (
                                                            <div className="px-2">
                                                                <div className=""><strong>{student.StudentNumber} - {student.Name}</strong></div>
                                                                <div className="py-2" style={{ color:"green" }}>Has Voted You</div>
                                                            </div>
                                                        )
                                                    }
                                                    
                                                    return <div className="px-2"><strong>{student.StudentNumber} - {student.Name}</strong></div>;
                                                })()}

                                                <div className="px-2">{vote.date}</div>

                                            </div>
                                        </div>
                                    </div>

                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className={`${className} justify-content-around `} onClick={() => handleClick(index)}>
                                        <div role="button" className="d-flex justify-content-between w-100">
                                            <div style={{ overflowWrap:"break-word", maxWidth:"95%"}} >
                                                {vote.description}
                                            </div>
                                            <div className="mx-1">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </div>
                                            
                                        </div>

                                    </div>
                                    <div>

                                        <OverlayTrigger
                                        key='bottom'
                                        placement='bottom'
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                Click on description above to edit the description. After finish editing new description, update new description to system by clicking 'Update' button
                                            </Tooltip>
                                        }
                                        >
                                            <Button className="my-2" variant="primary" onClick={(e) => editVote(e, vote.studentID_voted, index)}>Update</Button>
                                        </OverlayTrigger>
                                        
                                        <OverlayTrigger
                                            key='right'
                                            placement='right'
                                            overlay={
                                                <Tooltip id={`tooltip-right`}>
                                                Delete vote for <strong>{vote.studentID_voted}</strong>.
                                                </Tooltip>
                                            }
                                            >
                                            <Button className="mx-2 my-2" variant="danger" onClick={(e) => removeVote(e, vote.studentID_voted)}>Delete</Button>
                                        </OverlayTrigger> 
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    })}
                </Accordion>
                <br />
                {checkForm()}
            </div>
        </div>
    )

}

export default VotePage