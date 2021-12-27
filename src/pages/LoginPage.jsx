import react, { useEffect, useState } from "react"
import {User} from '../models/User'


function LoginPage({setUser}) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                    'Accept' : 'application/json'},
        body: JSON.stringify({ username: '2201746045', password: '' })
    };

    async function loginUser(credentials){
        return fetch("https://laboratory.binus.ac.id/lapi/api/Account/LogOnBinusian", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept' : 'application/json'
            },
            body: JSON.stringify(credentials)
          })
        .then(res => res.json())
        // .then((data) => console.log(data))
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const data = await loginUser({
          username,
          password
        });
        console.log(data)
  
        setUser(data);
      }

    useEffect(()=>{
        
    }, [])
    return (
        
        <div className="d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center align-items-center shadow-sm bg-white rounded" style={{minHeight:"350px", minWidth:"350px"}}>
                
                <div className="form-group p-1">
                    <div className="col-sm-12 d-flex align-items-stretch justify-content-start">
                        <div className="col-sm-2 d-flex justify-content-end">
                            <img src="https://academic-slc.apps.binus.ac.id/assets/ribbon.png" className="img-fluid" alt=""/>
                        </div>
                        <div className="col-sm-8 d-flex justify-content-start p-3">
                            <img src="https://academic-slc.apps.binus.ac.id/assets/logo.png" className="img-fluid" alt=""/>
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                </div>

                <div className="form-group p-1" style={{minWidth:"250px"}}>
                    <input type="text" name="username" className="form-control" placeholder="Username" onChange={e => setUserName(e.target.value)}/>
                </div>
                <div className="form-group p-1" style={{minWidth:"250px"}}>
                    <input type="password" name="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="form-group d-flex justify-content-center p-1" >
                    <button type="submit" className="btn btn-primary d-flex justify-content-center mt-4" style={{minWidth:"250px"}}>Login</button>
                </div>

            </form>
        </div>
    )
}


export default LoginPage