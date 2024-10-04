import { useEffect, useState } from 'react';
import membersData from '@data/Inscription-CPU 2024.json';
import './members.css';
const Members = () => {
    const [members, setMembers] = useState([]);
    useEffect(() => {
        setMembers(membersData);
    }, []);

    return (
        <div className="members-container">
            <table className="members-table">
                <thead>
                    <tr>
                        {members.length > 0 && Object.keys(members[0]).map((key, index) => <th key={index}>{key}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {members.map((member, index) => (
                        <tr key={index}>
                            {Object.keys(member).map((key, index) => <td key={index}>{member[key]}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default Members