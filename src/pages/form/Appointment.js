// write a reeat js app to perform the following task as shown below
// 1. create two button and increment and count by one with each click
// 2. display alert as an effect on specified condition
// 2.1 effect should be triggeren only when page render first time
// 2.2 effect should be triggeren every time when buttom click

//

import React, { useState, useEffect } from "react";
import "./appointment.css";

const Appointment = () => {
  return (
    <div>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>

        <div>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" />
        </div>
        <div>
          <label htmlFor="time">Time</label>
          <input type="time" id="time" />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" />
        </div>
        <div>
          <label htmlFor="gender">gender</label>
          < input type="radio" name="gender" value="male"/>Male
          < input type="radio" name="gender" value="female"/>female
          </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea id="message" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Appointment;
