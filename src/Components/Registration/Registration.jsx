import { useNavigate } from 'react-router-dom';
import { IoMdPersonAdd } from "react-icons/io";
import { useParams } from 'react-router-dom';
import './Registration.css';
import supabase from '../../../superbaseClient';
import { useState, useEffect } from 'react';

const Registration = () => {
    const { formationId } = useParams();
    const navigate = useNavigate();
    const [Formation, setFormation] = useState([]);

    const handleADD = () => {
        navigate(`/RegistrationForm/${formationId}`);
    }

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const { data: formations, error } = await supabase
                    .from("training_participation") // Adjust the table name if needed
                    .select("*")
                    .eq("training_id", formationId);

                if (error) {
                    console.log("Error fetching formations", error.message);
                } else {
                    setFormation(formations);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchMembers();
    }, [formationId]);

    return (
        <div>
            <h1>Registration</h1>
            <p style={{ color: 'white' }}>Not completed!</p>
            <div>
                <button onClick={handleADD}>
                    <IoMdPersonAdd />
                    Add Member
                </button>
            </div>
            <div>
                <table border={2} style={{ backgroundColor: 'whitesmoke' }}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Level in Subject</th>
                            <th>Has Paid</th>
                            <th>Group Number</th>
                            <th>Training Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Formation.map((member) => (
                            <tr key={member.id}>
                                <td>{member.id}</td>
                                <td>{member.level_in_subject}</td>
                                <td>{member.has_paid ? 'Yes' : 'No'}</td>
                                <td>{member.group_number}</td>
                                <td>{member.training_room}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Registration;
