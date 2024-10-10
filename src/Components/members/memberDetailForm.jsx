import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import supabase from '../../../superbaseClient';

import "./memberDetailForm.css"
const MemberDetailForm = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { state } = location;

    // eslint-disable-next-line no-unused-vars
    const [memberData, setMemberData] = useState(state?.member || {
        lastname: '',
        fistname: '',
        email: '',
        phone_num: '',
        member_type: false,
        study_lvl: '',
        skills: ''
    });
    const formFields = [
        {
            "name": "firstname",
            "placeholder": "Nom",
            "value": "memberData.firstname"
        },
        {
            "name": "lastname",
            "placeholder": "Prénom",
            "value": "memberData.lastname"
        },
        {
            "name": "email",
            "placeholder": "Email",
            "value": "memberData.email"
        },
        {
            "name": "phone_num",
            "placeholder": "Phone",
            "value": "memberData.phone_num"
        },
        {
            "name": "member_type",
            "placeholder": "Type de Membre",
            "value": "memberData.member_type",
            "type": "select",
            "options": [
                {
                    name: "externe",
                    value: 0
                },
                {
                    name: "actif",
                    value: 1
                },
                {
                    name: "adherent",
                    value: 2
                },
            ]
        },
        {
            "name": "study_lvl",
            "placeholder": "Niveau d'études",
            "value": "memberData.study_lvl"
        },
        {
            "name": "skills",
            "placeholder": "Skills",
            "value": "memberData.skills"
        }
    ]

    const handleChange = (e, field) => {
        setMemberData({ ...memberData, [field.name]: e.target.value });
    }
    const handleSave = async () => {
        const { data, error } = await supabase
            .from('club_members')
            .insert([
                {
                    firstname: "firstname",
                    lastname: "lastname",
                    email: "email",
                    phone_num: "51861346",
                    member_type: "actif",
                    study_lvl: true,
                    skills: "skills",
                },
            ]);
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