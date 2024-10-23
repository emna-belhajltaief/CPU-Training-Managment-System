import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import supabase from '../../../superbaseClient';

import "./memberDetailForm.css"
const MemberDetailForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const location = useLocation();
    const { state } = location;

    
    const [memberData, setMemberData] = useState(state?.member || {
        LastName: '',
        FistName: '',
        Email: '',
        Phone: '',
        Adherent: '',
        StudyLevel: ''
    });
    const formFields = [
        {
            "name": "FirstName",
            "placeholder": "Nom",
            "value": "memberData.FirstName"
        },
        {
            "name": "LastName",
            "placeholder": "Prénom",
            "value": "memberData.LastName"
        },
        {
            "name": "Email",
            "placeholder": "Email",
            "value": "memberData.Email"
        },
        {
            "name": "Phone",
            "placeholder": "Phone",
            "value": "memberData.Phone"
        },
        {
            "name": "Adherent",
            "placeholder": "Type de Membre",
            "value": "memberData.Adherent",
            "type": "select",
            "options": [
                {
                    name: "Actif",
                    value: 'FAUX'
                },
                {
                    name: "Adherent",
                    value: 'VRAI'
                },
            ]
        },
        {
            "name": "StudyLevel",
            "placeholder": "Niveau d'études",
            "value": "memberData.StudyLevel"
        }
    ]

    const handleChange = (e, field) => {
        setMemberData({ ...memberData, [field.name]: e.target.value });
    }
    const handleSave = async () => {

        const { data, error } = await supabase
            .from('Active_Members')
            .update(memberData)
            .eq('ID', id)
            .select()

        console.log(data);

        if (error) {
            console.error('Error fetching trainings:', error);
        }
        else {
            navigate('/members'); // Navigate back to members list after saving
        }
    };

    const handleCancel = () => {
        navigate('/members'); // Navigate back to members list without saving
    };

    return (
        <div className="member-detail-container">
            <h2>Member Information</h2>
            <form className="member-form">
                {formFields.map((field, index) => (
                    <div key={index} className="form-group">
                        <label htmlFor={field.name}>{field.placeholder}</label>
                        {field.type === "select" ? (
                            <select
                                className="select"
                                id={field.name}
                                name={field.name}
                                defaultValue={eval(field.value)}>
                                {field.options.map((option, index) => (
                                    <option key={index} value={option.value}>{option.name}</option>
                                ))}
                            </select>
                        ) :
                            <input
                                id={field.name}
                                name={field.name}
                                placeholder={field.placeholder}
                                onChange={(e) => handleChange(e, field)}
                                defaultValue={eval(field.value)} // Use memberData to set the default value
                            />}

                    </div>

                ))}
                <div className="form-actions">
                    <button type="button" className="save-button" onClick={handleSave}>Save</button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default MemberDetailForm;