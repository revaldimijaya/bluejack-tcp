import { Accordion, Button } from "react-bootstrap"
import NavBar from "../components/NavBar"
import { gql, useQuery, useMutation } from '@apollo/client'
import { useState, useEffect } from "react"
import axios from 'axios'
import $ from 'jquery'

function VotePage() {
    // const [votes, setVotes] = useState([
    //     {student_id: "2301873473", up: false, description: ""},
    //     {student_id: "2323444422", up: false, description: ""},
    //     {student_id: "2344233424", up: false, description: ""}
    // ]);

    const storage = localStorage.getItem('user')
    const user = JSON.parse(storage)
    const semesterId = 'e22236e3-72ff-4786-b4ac-b33c9c7fc82a'
    const url = 'https://laboratory.binus.ac.id/lapi/api/Binusmaya/GetStudentGroupsByNIM/'
    const [course, setCourse] = useState()
    const [votes, setVotes] = useState([])
    const [axiosWait, setAxiosWait] = useState(false)

    const fetchCourse = async () => {
        console.log('called')
        const params = {
            'semesterId': semesterId,
            'binusianNumber': user['User']['UserName']
        }
        setAxiosWait(true)
        await axios.get(url, { params })
            .then((res) => {
                setCourse(res.data.filter(function (data) {
                    return data.StudentGroupDetail.Group.Id === "004428a3-2d9c-eb11-90f0-d8d385fce79e"
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
        votes.forEach((vote)=>{
            if(vote.up){
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
    }

    const editVote = (event, id, index) => {
        event.preventDefault();
        let desc = $('.txt-area-' + index).val()
        update_vote({
            variables: {
                voted: id,
                voter: user['User']['UserName'],
                description: desc
            }
        });

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

    // const update_show_state = (index) => {
    //     setShowArea(flag=>flag.map((x,idx)=>idx === index ? !x : x))
    // }

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
            let textarea = $('<textarea></textarea>').val(value).addClass('txt-area-' + idx)
            $('.btn-show-txt-area-' + idx).append(textarea)
        }
    }

    if (error) return `Submission error! ${error.message}`;

    if (vote_result.loading || loading || update_info.loading || delete_info.loading || axiosWait) {
        return <div>Loading..</div>
    }

    if (vote_result.error) return `Fetch error! ${vote_result.error.message}`;
    // const characters = data.charactersByIds
    // if (characters[0].id == null){
    //     return (
    //         <div>
    //             No Favoritos
    //         </div>
    //     )
    // }

    const checkForm = ()=>{
        if(votes.length - 1 === vote_result.data.votes.votes.length)
            return null
        else{
            return (
                <form>
                    <Accordion defaultActiveKey="0">
                        {votes?.map((s, index) => {
                            if(vote_result.data.votes.votes?.some(vote => vote.studentID_voted === s.StudentNumber) || s.StudentNumber === user['User']['UserName'])
                            return
                            else
                            return (
                                <Accordion.Item eventKey={index} key={s.StudentNumber}>
                                    <Accordion.Header>
                                        <div className="d-flex justify-content-between w-100">
                                            <div>
                                                <img src={`https://laboratory.binus.ac.id/lapi/API/Account/GetThumbnail?id=${s.PictureId}`} alt="" />
                                                <div>{s.Name}</div>
                                            </div>
                                            <div>
                                                <label htmlFor="">UP</label>
                                                <input type="checkbox" checked={s.up} id="" onChange={(e) => {
                                                    setVotes((currentVote) => currentVote.map(x => x.StudentNumber === s.StudentNumber ? {
                                                        ...x,
                                                        up: e.target.checked
                                                    } : x))
                                                }} />
                                            </div>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <textarea className="w-100" name="" id="" cols="30" rows="10" onChange={(e) => {
                                            setVotes((currentVote) => currentVote.map(x => x.StudentNumber === s.StudentNumber ? {
                                                ...x,
                                                description: e.target.value
                                            } : x))
                                        }} placeholder="Description">
                                            {s.description}
                                        </textarea>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )
                        })}

                    </Accordion>
                    <div className="d-flex justify-content-end">
                        <button onClick={submitVote} className="btn btn-primary">Vote</button>
                    </div>
                </form>
            )
        }
    }

    return (
        <div >
            <NavBar />
            <div className="container m-auto my-4">
                {checkForm()}
                <br />
                <Accordion defaultActiveKey="0">
                    {vote_result.data.votes.votes?.map((vote, index) => {
                        let className = 'btn-show-txt-area-' + index
                        let student = votes.filter(function (data) {
                            return data.StudentNumber === vote.studentID_voted
                            })[0]
                        return (
                            <Accordion.Item eventKey={index}>
                                <Accordion.Header>
                                    <div className="d-flex justify-content-between w-100">
                                        <div style={{ maxWidth: "150px" }}>
                                            <div>
                                                <img src={`https://laboratory.binus.ac.id/lapi/API/Account/GetThumbnail?id=${
                                                    student.PictureId
                                                }`} alt="" />
                                            </div>
                                            <div>{student.Name}</div>
                                            <div>{vote.date}</div>
                                        </div>
                                    </div>

                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className={className} onClick={() => handleClick(index)}>
                                        <div>
                                            {vote.description}
                                        </div>

                                    </div>
                                    <div>
                                        <Button variant="primary" onClick={(e) => editVote(e, vote.studentID_voted, index)}>Update</Button>
                                        <Button variant="danger" onClick={(e) => removeVote(e, vote.studentID_voted)}>Delete</Button>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    })}
                </Accordion>
            </div>
        </div>
    )

}

export default VotePage