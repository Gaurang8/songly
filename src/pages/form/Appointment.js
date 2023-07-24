import React from "react";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import './appointment.css'

function Appointment() {
  return (
    <>
      <div className="appointment-fillup">
     <div>
     <div className="appoint-input-field">
          <input type="text" placeholder="Customer Name" />
        </div>
        <div className="appoint-input-field">
          <input type="tel" placeholder="Customer Number" />
        </div>
        <div className="appoint-input-field">
          <select
            name=""
            id=""
            required
            // onChange={(e) => {
            //   const selectedOptions = Array.from(e.target.selectedOptions);
            //   // console.log(selectedOptions.map(option => option.value));
            //   setFacilities(selectedOptions.map((option) => option.value));
            // }}
          >
            <option value="Service-Name" selected disabled>Service Name</option>
            <option value="spa">spa</option>
            <option value="spa">spa</option>
            <option value="spa">spa</option>
            <option value="spa">spa</option>
          </select>
          <div className="appoint-inp-icon"><ExpandMoreOutlinedIcon/></div>
        </div>
        <div className="appoint-input-field">
          <select
            name=""
            id=""
            required
            // onChange={(e) => {
            //   const selectedOptions = Array.from(e.target.selectedOptions);
            //   // console.log(selectedOptions.map(option => option.value));
            //   setFacilities(selectedOptions.map((option) => option.value));
            // }}
          >
            <option value="Select-duration"selected disabled>Select Duration</option>
            <option value="">1 haur</option>
            <option value="">2 haur</option>
            <option value="">3 haur</option>
            <option value="">4 haur</option>
          </select>
          <div className="appoint-inp-icon"><ExpandMoreOutlinedIcon/></div> 
        <div className="appoint-input-field">
          <select
            name=""
            id=""
            required
            // onChange={(e) => {
            //   const selectedOptions = Array.from(e.target.selectedOptions);
            //   // console.log(selectedOptions.map(option => option.value));
            //   setFacilities(selectedOptions.map((option) => option.value));
            // }}
          >
            <option value="staff-Name" selected disabled>Staff Name</option>
            <option value="">sona</option>
            <option value="">mona</option>
            <option value="">sona</option>
            <option value="">mona</option>
          </select>
          <div className="appoint-inp-icon"><ExpandMoreOutlinedIcon/></div>
        </div>
      </div>
      </div>
     <div>
      <div className="appoint-input-field">
        <input type="time" placeholder="Time in" />
      </div>
    
      <div className="appoint-input-field">
          <select
            name=""
            id=""
            required
            // onChange={(e) => {
            //   const selectedOptions = Array.from(e.target.selectedOptions);
            //   // console.log(selectedOptions.map(option => option.value));
            //   setFacilities(selectedOptions.map((option) => option.value));
            // }}
          >
            <option value="payment-mode" selected disabled>Payment Mode</option>
            <option value="">UPI</option>
            <option value="">Net Banking</option>
            <option value="">Debit Card</option>
            <option value="">Other</option>
          </select>
          <div className="appoint-inp-icon"><ExpandMoreOutlinedIcon/></div>
        </div>
        <div className="appoint-input-field">
        <input type="number" placeholder="Membership Number" />
        <div className="appoint-inp-icon"><AddIcon/></div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Appointment;
