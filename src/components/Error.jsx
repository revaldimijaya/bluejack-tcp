import { useState, useEffect } from "react"

function Error({ type, message }) {
    const [visible, setVisible] = useState(false)
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
      }, 5000);
      return () => clearTimeout(timer);
    }, [message]) // executes every time `message` changes. Adjust as needed
    if(!visible) return null
    return (
       <div>
         <p>
             <strong>{type}:</strong> {message}
         </p>
     </div>
    )
 }

 export default Error