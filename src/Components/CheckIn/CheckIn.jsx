import React,{useState} from 'react'
import membersData from "@data/Inscription-CPU 2024.json";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';



const CheckIn = () => {
    const [users, setUsers] = useState(membersData); // Initialize state with the imported JSON data

    // Handler to toggle the checkbox state for "Adherent" or "Paid"
    const handleCheckboxChange = (index, field) => {
      const updatedUsers = users.map((user, i) => 
        i === index ? { ...user, [field]: !user[field] } : user
      );
      setUsers(updatedUsers);
    };
  
    const handleDelete = (index) => {
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);
    };
  
    return (
      <div className="user-table-container">
        <h4 style={{color:'aliceblue',}}>Check In List : </h4>
        <table className="custom-table table-responsive">
          <thead>
            <tr>
              <th>Presence</th>
              <th>Nom </th>
               <th>Prénom</th>
              <th>Phone</th>
              <th>Mail</th>
              {/* <th>Etude</th> */}
              <th>Adherent</th>
              <th>Paid</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td><input type="checkbox" /></td>
                <td>{user.Nom}</td>
                <td>{user.Prénom}</td>
                <td>{user.Phone}</td>
                <td>{user.Email}</td>
                {/* <td>` {user.Niveau d''études} `</td> */}
                <td>
                  <input 
                    type="checkbox" 
                    checked={user.adherent} 
                    onChange={() => handleCheckboxChange(index, 'adherent')}
                  />
                </td>
                <td>
                  <input 
                    type="checkbox" 
                    checked={user.paid} 
                    onChange={() => handleCheckboxChange(index, 'paid')}
                  />
                </td>
                <td><FaEdit className="edit-icon" /></td>
                <td><FaTrashAlt className="delete-icon" onClick={() => handleDelete(index)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
export default CheckIn
