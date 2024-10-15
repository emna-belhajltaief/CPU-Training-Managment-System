import React, { useState } from 'react';
import axios from 'axios';

const Certifications = () => {
    const [members, setMembers] = useState([
        { id: 1, first_name: 'Emna', last_name: 'Ltaief', email: 'emna.ltaief750@gmail.com' },
        { id: 2, first_name: 'Emna1', last_name: 'BHL',email:'ltaiefemna45@gmail.com'}
        // Add more members if needed
    ]);
    const [pdfFile, setPdfFile] = useState(null);

    const handlePdfChange = (event) => {
        setPdfFile(event.target.files[0]);
    };

    const sendCertificates = async () => {
        try {
            const formData = new FormData();
            members.forEach(member => {
                formData.append('members[]', JSON.stringify(member)); // Append member data
            });
            if (pdfFile) {
                formData.append('pdf', pdfFile); // Append the PDF file
            }

            const response = await axios.post('http://localhost:5000/send-certificates', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Certificates sent successfully');
        } catch (error) {
            const errorMessage = error.response ? error.response.data : 'Network Error';
            console.error('Error sending certificates:', errorMessage);
            alert(`Error sending certificates: ${errorMessage}`);
        }
    };

    return (
        <div className="App">
            <h1>Générateur de certificats</h1>
            <ul>
                {members.map(member => (
                    <li key={member.id}>{member.first_name} {member.last_name}</li>
                ))}
            </ul>
            <input type="file" accept="application/pdf" onChange={handlePdfChange} />
            <button onClick={sendCertificates}>Envoyer les certificats</button>
        </div>
    );
};

export default Certifications;
