import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import supabase from '../../../superbaseClient';

import "./memberDetailForm.css"
const MemberDetailForm = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { state } = location;

    const [memberData, setMemberData] = useState(state?.member || {
        Nom: '',
        Prénom: '',
        Email: '',
        Phone: '',
        Adherent: false,
        "Niveau d'études": '',
        Skills: ''
    });

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
                    is_active: true,
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
                <div className="form-group">
                    <label>Nom:</label>
                    <input
                        type="text"
                        value={memberData.Nom}
                        onChange={(e) => setMemberData({ ...memberData, Nom: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Prénom:</label>
                    <input
                        type="text"
                        value={memberData.Prénom}
                        onChange={(e) => setMemberData({ ...memberData, Prénom: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={memberData.Email}
                        onChange={(e) => setMemberData({ ...memberData, Email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input
                        type="tel"
                        value={memberData.Phone}
                        onChange={(e) => setMemberData({ ...memberData, Phone: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Adherent:</label>
                    <input
                        type="checkbox"
                        checked={memberData.Adherent}
                        onChange={(e) => setMemberData({ ...memberData, Adherent: e.target.checked })}
                    />
                </div>
                <div className="form-group">
                    <label>Niveau d&apos;études:</label>
                    <input
                        type="text"
                        value={memberData["Niveau d'études"]}
                        onChange={(e) => setMemberData({ ...memberData, "Niveau d'études": e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Skills:</label>
                    <input
                        type="text"
                        value={memberData.Skills}
                        onChange={(e) => setMemberData({ ...memberData, Skills: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Payed:</label>
                    <input
                        type="checkbox"
                        checked={memberData?.Paied || false}
                        onChange={(e) => setMemberData({ ...memberData, Paied: e.target.checked })}
                    />
                </div>
                <div className="form-actions">
                    <button type="button" className="save-button" onClick={handleSave}>Save</button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default MemberDetailForm;