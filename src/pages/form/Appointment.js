// write a reeat js app to perform the following task as shown below 
// 1. create two button and increment and count by one with each click
// 2. display alert as an effect on specified condition
// 2.1 effect should be triggeren only when page render first time
// 2.2 effect should be triggeren every time when buttom click




import React, {useState,useEffect } from 'react'
import './appointment.css'

const Appointment = () => {
   
  const [qauntity, setQauntity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleQauntity = (e) => {
    setQauntity(e.target.value);
  };

  useEffect(() => {
    alert("welcome")
  }, []);

  useEffect(() => {
    alert(`page render ${qauntity} times`)
  }, [qauntity]);

  return (
    <div>
      <h2>{`total Quantity : ${qauntity}`}</h2>
      <h2>{`total Price : ${totalPrice}`}</h2>
      <input
        type="number"
        value={qauntity}
        onChange={(e) => handleQauntity(e)}
      />

      <hr/>

       <button onClick={()=>setQauntity(qauntity+1)}>{`increment time ${qauntity}`}</button>
       <button onClick={()=>setQauntity(qauntity-1)}>{`decrement time ${qauntity}`}</button>

    </div>
  )
}

export default Appointment
