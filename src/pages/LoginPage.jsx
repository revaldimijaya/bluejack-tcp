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
            <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column justify-content-center align-items-center shadow-sm p-3 mb-5 bg-white rounded">
                    <div className="form-group p-1">
                        <img src={require('../images/logo-binus.png')} alt="" srcset="" />
                    </div>

                    <div className="form-group p-1">
                        <input type="text" name="username" className="form-control" placeholder="Username" onChange={e => setUserName(e.target.value)}/>
                    </div>
                    <div className="form-group p-1">
                        <input type="password" name="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="form-group d-flex justify-content-center p-1">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </div>

            </form>
        </div>
    )
}


export default LoginPage