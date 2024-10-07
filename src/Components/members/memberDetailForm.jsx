import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const MemberDetailForm = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { state } = location;

    const [memberData, setMemberData] = useState(state?.member || { name: '', email: '', phone: '' });

    const handleSave = () => {
        // Handle saving the updated information
        // You could send a PUT request to your API to update the member data
        navigate('/members'); // Navigate back to members list after saving
    };

    const handleCancel = () => {
        navigate('/members'); // Navigate back to members list without saving
    };

    return (
        <div>
            <h2>Member Information</h2>
            <form>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={memberData.name}
                        onChange={(e) => setMemberData({ ...memberData, name: e.target.value })}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={memberData.email}
                        onChange={(e) => setMemberData({ ...memberData, email: e.target.value })}
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="tel"
                        value={memberData.phone}
                        onChange={(e) => setMemberData({ ...memberData, phone: e.target.value })}
                    />
                </div>
                <button type="button" onClick={handleSave}>Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default MemberDetailForm;