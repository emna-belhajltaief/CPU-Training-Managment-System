import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import membersData from '@data/register.json'; // Adjust path as needed
import './RegistrationForm.css';


const RegistrationForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const { state } = location;

    const [memberData, setMemberData] = useState(state?.member || {
        lastname: '',
        firstname: '',
        email: '',
        phone_num: '',
        member_type: false,
        study_lvl: '',
        skills: '',
        training_level: ''
    });
    const levels = ['Beginner','Intermediate','Advanced'];

    const [suggestions, setSuggestions] = useState({ firstname: [], lastname: [] });
    const [showSuggestions, setShowSuggestions] = useState({ firstname: false, lastname: false });

    useEffect(() => {
        const fetchMemberData = () => {
            const member = membersData.find(m => m.id === parseInt(id));
            if (member) {
                setMemberData(member);
            }
        };

        if (!state?.member) {
            fetchMemberData();
        }
    }, [id, state?.member]);

    const handleChange = (e, field) => {
        const { value } = e.target;
        setMemberData({ ...memberData, [field.name]: value });

        // Update suggestions based on input
        if (field.name === 'firstname') {
            if (value.trim() === "") {
                setSuggestions(prev => ({ ...prev, firstname: [] }));
                setShowSuggestions({ ...showSuggestions, firstname: true });
            } else {
                const filteredSuggestions = membersData
                    .filter(member => member.firstname.toLowerCase().startsWith(value.toLowerCase()))
                    .map(member => `${member.firstname} ${member.lastname}`);
                
                setSuggestions(prev => ({ 
                    ...prev, 
                    firstname: filteredSuggestions.length > 0 ? filteredSuggestions : [] 
                }));
                setShowSuggestions({ ...showSuggestions, firstname: true });
            }
        } else if (field.name === 'lastname') {
            if (value.trim() === "") {
                setSuggestions(prev => ({ ...prev, lastname: [] }));
                setShowSuggestions({ ...showSuggestions, lastname: true });
            } else {
                const filteredSuggestions = membersData
                    .filter(member => member.lastname.toLowerCase().startsWith(value.toLowerCase()))
                    .map(member => `${member.firstname} ${member.lastname}`);
                
                setSuggestions(prev => ({ 
                    ...prev, 
                    lastname: filteredSuggestions.length > 0 ? filteredSuggestions : [] 
                }));
                setShowSuggestions({ ...showSuggestions, lastname: true });
            }
        }
    };

    const handleSelect = (fullName) => {
        const [firstname, lastname] = fullName.split(' ');

        const selectedMember = membersData.find(member => 
            member.firstname === firstname && member.lastname === lastname
        );

        if (selectedMember) {
            setMemberData({
                firstname: selectedMember.firstname,
                lastname: selectedMember.lastname,
                email: selectedMember.email,
                phone_num: selectedMember.phone_num,
                member_type: selectedMember.member_type,
                study_lvl: selectedMember.study_lvl,
                skills: selectedMember.skills
            });
        }

        setShowSuggestions({ firstname: false, lastname: false });
    };

    const handleSave = () => {
        console.log('Updated member data:', memberData);
        navigate('/members'); // Navigate back to members list after saving
    };

    const handleCancel = () => {
        navigate('/members'); // Navigate back to members list without saving
    };

    return (
        <div className="member-detail-container">
            <h2>Member Information</h2>
            <form className="member-form">
                <div className="form-group">
                    <label htmlFor="firstname">Firstname</label>
                    <input
                        id="firstname"
                        name="firstname"
                        placeholder="Firstname"
                        onChange={(e) => handleChange(e, { name: 'firstname' })}
                        value={memberData.firstname}
                        onBlur={() => setShowSuggestions({ ...showSuggestions, firstname: false })}
                        onFocus={() => setShowSuggestions({ ...showSuggestions, firstname: true })}
                    />
                   {showSuggestions.firstname && (
                        <div className="suggestions-popup">
                            {suggestions.firstname.length > 0 ? (
                                suggestions.firstname.map((name, index) => (
                                    <div
                                        key={index}
                                        className="suggestion-item"
                                        onMouseDown={() => handleSelect(name)} // Use onMouseDown to prevent blur before click
                                    >
                                        {name}
                                    </div>
                                ))
                            ) : (
                                <div className="suggestion-item no-suggestion">No person found</div>
                            )}
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="lastname">Lastname</label>
                    <input
                        id="lastname"
                        name="lastname"
                        placeholder="Lastname"
                        onChange={(e) => handleChange(e, { name: 'lastname' })}
                        value={memberData.lastname}
                        onBlur={() => setShowSuggestions({ ...showSuggestions, lastname: false })}
                        onFocus={() => setShowSuggestions({ ...showSuggestions, lastname: true })}
                    />
                    {showSuggestions.lastname && (
                        <div className="suggestions-popup">
                            {suggestions.lastname.length > 0 ? (
                                suggestions.lastname.map((name, index) => (
                                    <div
                                        key={index}
                                        className="suggestion-item"
                                        onMouseDown={() => handleSelect(name)} // Use onMouseDown to handle selection
                                    >
                                        {name}
                                    </div>
                                ))
                            ) : (
                                <div className="no-suggestion">No person found</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Other form fields */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={memberData.email}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone_num">Phone</label>
                    <input
                        id="phone_num"
                        name="phone_num"
                        placeholder="Phone"
                        value={memberData.phone_num}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="member_type">Type de Membre</label>
                    <select
                        className="select"
                        id="member_type"
                        name="member_type"
                        value={memberData.member_type}
                        onChange={(e) => handleChange(e, { name: 'member_type' })}>
                        <option value={0}>externe</option>
                        <option value={1}>actif</option>
                        <option value={2}>adherent</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="study_lvl">Niveau d'études</label>
                    <input
                        id="study_lvl"
                        name="study_lvl"
                        placeholder="Niveau d'études"
                        value={memberData.study_lvl}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="skills">Skills</label>
                    <input
                        id="skills"
                        name="skills"
                        placeholder="Skills"
                        value={memberData.skills}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="training_level">Training Level</label>
                    <select
                        id="training_level"
                        name="training_level"
                        onChange={(e) => handleChange(e, 'training_level')}
                        value={memberData.training_level}
                    >
                        <option value="">Select your level</option>
                        {levels.map((level, index) => (
                            <option key={index} value={level}>{level}</option>
                        ))}
                    </select>
                </div>

                <div className="form-actions">
                    <button type="button" className="save-button" onClick={handleSave}>Save</button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};


export default RegistrationForm
