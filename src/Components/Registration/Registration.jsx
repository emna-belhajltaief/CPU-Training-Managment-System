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
                // Fetching training participation data
                const { data: formations, error } = await supabase
                    .from("training_participation")
                    .select("*")
                    .eq("training_id", formationId);

                if (error) {
                    console.log("Error fetching formations", error.message);
                    return;
                }

                // Fetch additional member data (first_name, last_name) from club_members
                const updatedFormation = await Promise.all(formations.map(async (member) => {
                    const { data: memberData, error: memberError } = await supabase
                        .from("club_members")
                        .select("*")
                        .eq("id", member.member_id); // Assuming `member_id` links to club_members

                    if (memberError) {
                        console.log(`Error fetching member ${member.member_id}`, memberError.message);
                        return member; // Return original member if error occurs
                    }

                    // Add first_name and last_name to the member data
                    return {
                        ...member,
                        firstname: memberData[0]?.firstname || 'N/A',
                        lastname: memberData[0]?.lastname || 'N/A',
                    };
                }));

                setFormation(updatedFormation);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchMembers();
    }, [formationId]);

    return (
        <div>
            <h1 style={{ color: 'white' }}>Registration</h1>
            <div>
                <button className="btn btn-secondary mb-2" onClick={handleADD}>
                    <IoMdPersonAdd />
                    Add Member
                </button>
            </div>
            <div>
                <table className="table table-striped" border={2} style={{ backgroundColor: 'whitesmoke' }}>
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Level in Subject</th>
                            <th scope="col">Has Paid</th>
                            <th scope="col">Group Number</th>
                            <th scope="col">Training Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Formation.map((member) => (
                            <tr scope="row" key={member.id}>
                                <td>{member.id}</td>
                                <td>{member.firstname}</td> {/* Display first name */}
                                <td>{member.lastname}</td>  {/* Display last name */}
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
