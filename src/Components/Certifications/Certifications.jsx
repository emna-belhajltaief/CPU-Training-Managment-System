import  { useState } from 'react';
import axios from 'axios';
import './Certifications.css';

const Certifications = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [csvFile, setCsvFile] = useState(null);
    const [certificateFile, setCertificateFile] = useState(null);
    const [emailBody, setEmailBody] = useState(''); // State to hold the email body

    // Handle PDF file change
    const handlePdfChange = (event) => {
        setPdfFile(event.target.files[0]);
    };

    // Handle CSV file change
    const handleCsvChange = (event) => {
        setCsvFile(event.target.files[0]);
    };

    // Handle Certificate file change
    const handleCertificateChange = (event) => {
        setCertificateFile(event.target.files[0]);
    };

    // Handle Email Body Change
    const handleEmailBodyChange = (event) => {
        setEmailBody(event.target.value);
    };

    const sendCertificates = async () => {
        if (!csvFile || !certificateFile) {
            alert("Please select a PDF, CSV, and certificate image file.");
            return;
        }

        const formData = new FormData();
        if (pdfFile) {
            formData.append('pdfFile', pdfFile);
        }
        formData.append('csvFile', csvFile);
        formData.append('certificateFile', certificateFile);
        formData.append('emailBody', emailBody); // Add email body to the form data

        try {
            const response = await axios.post('http://localhost:5010/send-certificates', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Certificates sent successfully:', response.data);
        } catch (error) {
            console.error('Error sending certificates:', error);
        }
    };

    return (
        <div className='certifications-container'>
            <h1 className='certifications-title'>Send Certificates</h1>
            <div>
                <label className='certifications-label'>Select a PDF file:</label>
                <input type="file" name="pdfFile" accept="application/pdf" onChange={handlePdfChange} />
            </div>
            <div>
                <label className='certifications-label'>Select a CSV file:</label>
                <input type="file" name="csvFile" accept=".csv" onChange={handleCsvChange} />
            </div>
            <div>
                <label className='certifications-label' >Select the certificate image:</label>
                <input type="file" name="certificateFile" accept="image/*" onChange={handleCertificateChange} />
            </div>
            <div>
                <label className='certifications-label' >Enter the email body:</label>
                <textarea value={emailBody} onChange={handleEmailBodyChange} placeholder="Write your email content here..." />
            </div>
            <button className='sendMail-btn' onClick={sendCertificates}>Send Certificates</button>
        </div>
    );
};

export default Certifications;
