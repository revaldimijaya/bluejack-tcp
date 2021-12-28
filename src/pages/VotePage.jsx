import { Accordion, Button } from "react-bootstrap"
import NavBar from "../components/NavBar"
import {gql, useQuery, useMutation} from '@apollo/client'
import { useState } from "react"
import $ from 'jquery'

function VotePage(){
    const [votes, setVotes] = useState([
        {student_id: "2301873473", up: false, description: ""},
        {student_id: "2323444422", up: false, description: ""},
        {student_id: "2344233424", up: false, description: ""}
    ]);

    // const [showArea, setShowArea] = useState([])
    // setShowArea([false,false,false])

    const submitVote = (event) => {
        event.preventDefault();
        console.log(votes)
        create_vote({
            variables:{
                groupID: 12,
                student_voted: 11,
                studentID_voter:13,
                desc: "test desc"
            }
        });
        
    }

    const editVote = (event, id, desc) => {
        event.preventDefault();
        update_vote({
            variables:{
                id: id,
                description: desc
            }
        });
        
    }
    const removeVote = (event, id) => {
        event.preventDefault();
        delete_vote({
            variables:{
                id: id
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

    const UPDATE_VOTE = gql `
        mutation updateVote($id: ID!, $description: String!){
            updateVote(id: $id, input:{
            description: $description
            })
        }
    `;

    const DELETE_VOTE = gql`
        mutation deleteVote($id: ID!){
            deleteVote(id: $id)
        }
    `;

    const GET_VOTE = gql`
        query getVote($studentID: String!, $groupID: String!){
            votes(studentID: $studentID, groupID: $groupID){
            id
            groupID
            studentID_voted
            studentID_voter
            description
            date
            }
        }
    `;

    const [create_vote, { data, loading, error }] = useMutation(CREATE_VOTE,{
        refetchQueries:[{query: GET_VOTE, variables:{
            studentID: "11",
            groupID: "12"
        }}]
    })
    const [update_vote, update_info] = useMutation(UPDATE_VOTE,{
        refetchQueries:[{query: GET_VOTE, variables:{
            studentID: "11",
            groupID: "12"
        }}]
    })
    const [delete_vote, delete_info] = useMutation(DELETE_VOTE,{
        refetchQueries:[{query: GET_VOTE, variables:{
            studentID: "11",
            groupID: "12"
        }}]
    })
    const vote_result = useQuery(GET_VOTE, {
        variables:{
            studentID: "11",
            groupID: "12"
        }
    })

    const handleClick = async(idx) => {
        console.log(idx)
        console.log('testing ini kepanggil')
    }

    if (error) return `Submission error! ${error.message}`;

    if(vote_result.loading || loading || update_info.loading || delete_info.loading){
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

    return(
        <div>
            <NavBar />
            <form onSubmit={submitVote}>
            <Accordion defaultActiveKey="0">
                {votes.map((v,index) =>{
                    return (
                        <Accordion.Item eventKey={index} key={v.student_id}>
                            <Accordion.Header>
                                <div className="d-flex justify-content-between w-100">
                                    <div>
                                        <img src="" alt="wdawawd" />
                                        <div>{v.student_id}</div>
                                    </div>
                                    <div>
                                        <label htmlFor="">UP</label>
                                        <input type="checkbox" checked={v.up} id="" onChange={(e)=>{
                                            setVotes((currentVote)=> currentVote.map(x => x.student_id === v.student_id ? {
                                                ...x,
                                                up : e.target.checked
                                            } : x))
                                            // e.target.value
                                        }}/>
                                    </div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <textarea className="w-100" name="" id="" cols="30" rows="10" onChange={(e)=>{
                                    setVotes((currentVote)=> currentVote.map(x => x.student_id === v.student_id ? {
                                        ...x,
                                        description : e.target.value
                                    } : x))
                                    // e.target.value
                                }} placeholder="Description">
                                    {v.description}
                                </textarea>
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })}
            
            </Accordion>
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary">Vote</button>
            </div>
            </form>

            <br />
            <Accordion defaultActiveKey="0">
                {vote_result.data.votes?.map((vote,index)=>{
                    return(
                        <Accordion.Item eventKey={index}>
                            <Accordion.Header>
                                <div className="d-flex justify-content-between w-100">
                                    <div>
                                        <img src="" alt="wdawawd" />
                                        <div>{vote.studentID_voted}</div>
                                        <div>{vote.date}</div>
                                    </div>
                                    <div>
                                        <button>Up</button>
                                    </div>
                                </div>
                                
                            </Accordion.Header>
                            <Accordion.Body>
                                {/* if (!showArea[index]) { */}
                                    <div className="btn-show-txt-area" onClick={() => handleClick(index)}>
                                        <div>
                                            {vote.description}
                                        </div>
                                    </div>
                                        
                                {/* } */}
                                {/* else{
                                    <div>
                                        <textarea name="" id="" cols="30" rows="10">
                                            {vote.description}
                                        </textarea>
                                        <div>
                                            <Button variant="primary" onClick={(e)=>editVote(e, vote.id, "update bro")}>Update</Button>
                                            <Button variant="danger" onClick={(e)=>removeVote(e, vote.id)}>Delete</Button> 
                                        </div>
                                    </div>    
                                } */}
                                
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })}
            </Accordion>
        </div>
    )

}

export default VotePage