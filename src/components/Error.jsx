import { useState, useEffect } from "react"

function Error({ type, messageState }) {
    const [visible, setVisible] = useState(false)
    const message = messageState[0];
    const setMessage = messageState[1];
    useEffect(() => {
      // message is empty (meaning no errors). Adjust as needed
      if(!message){
       setVisible(false)
       return
      }
      // error exists. Display the message and hide after 5 secs
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        setMessage("")
      }, 5000);
      return () => clearTimeout(timer);
    }, [message]) // executes every time `message` changes. Adjust as needed
    if(!visible) return null
    return (
      <div className="alert alert-danger m-0">
        <strong>{type}:</strong> {message}
      </div>
    )
 }

 export default Error