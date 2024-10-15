import React from 'react';
import { useNavigate } from 'react-router-dom';
import {IoMdPersonAdd} from "react-icons/io";
import './Registration.css';

const Registration = () => {
    const navigate = useNavigate();

    const handleADD = () =>{
        navigate('/RegistrationForm');
    }
    return (
   <div>
    <h1>Registration </h1>
    <p style={{color:'white'}}>Not  completeted !</p>
    <div>
    <button onClick={handleADD} >
          <IoMdPersonAdd />
            Add Member
          </button>
    </div>
    <div>
        <table border={2} style={{backgroundColor:'whitesmoke'}}>
        <thead>
            <tr>
                <th> id </th>
                <th>..................</th>
                <th>..................</th>
                <th> ................ </th>
                <th> .................</th>

            </tr>
        </thead>
        <tbody>
            <tr>**********************</tr>
            <tr>**********************</tr>
            <tr>**********************</tr>
        </tbody>
        </table>
    </div>
   </div>
)}
export default Registration;
