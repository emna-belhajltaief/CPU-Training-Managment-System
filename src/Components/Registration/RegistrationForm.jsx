import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "./RegistrationForm.css";
import supabase from "../../../superbaseClient";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { formationId } = useParams();
  const [clubMembers, setClubMembers] = useState([]);
  const [memberType, setMemberType] = useState(3); // Default to externe
  const [membersData, setMembersData] = useState([]);
  const [memberData, setMemberData] = useState({
    lastname: "",
    firstname: "",
    email: "",
    phone_num: "",
    member_type: 0,
    study_lvl: "",
    skills: "",
  });
  const [trainingParticipationData, setTrainingParticipationData] = useState({
    training_id: formationId,
    member_id: null,
    training_level: "",
    has_paid: "Yes",
    group_number: null,
    training_room: null,
  });

  const [suggestions, setSuggestions] = useState({
    firstname: [],
    lastname: [],
  });
  const [showSuggestions, setShowSuggestions] = useState({
    firstname: false,
    lastname: false,
  });
  const [loading, setLoading] = useState(false);
  const levels = ["Beginner", "Intermediate", "Advanced"];


  useEffect(() => {
    const fetchClubMembersData = async () => {
      try {
        const { data: club_members, error } = await supabase
          .from('club_members')
          .select('*');

        if (error) {
          console.error('Error fetching club_members:', error);
          return [];
        }
        return club_members;
      } catch (err) {
        console.error('Error fetching data:', err);
        return [{}];
      }
    };

    const getData = async () => {
      const membersData = await fetchClubMembersData();
      setClubMembers(membersData);
    };
    setLoading(true);
    getData();
    setLoading(false);
  }, []);
  useEffect(() => {
    const filteredMembers = clubMembers.filter((member) => member.member_type === memberType);
    setMembersData(filteredMembers);

  }, [clubMembers, memberType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "member_type") {
      const newMemberType = parseInt(value);
      setMemberType(newMemberType);
      setMemberData({
        lastname: "",
        firstname: "",
        email: "",
        phone_num: "",
        member_type: newMemberType,
        study_lvl: "",
        skills: "",
      });
      setSuggestions({ firstname: [], lastname: [] });
      setShowSuggestions({ firstname: false, lastname: false });
    }

    if (name === "firstname" || name === "lastname") {
      handleSuggestions(name, value);
    }
  };

  const handleSuggestions = (field, value) => {
    const filteredSuggestions = membersData
      .filter((member) =>
        member[field].toLowerCase().startsWith(value.toLowerCase())
      )
      .map((member) => `${member.firstname} ${member.lastname}`);

    setSuggestions((prev) => ({ ...prev, [field]: filteredSuggestions }));
    setShowSuggestions((prev) => ({ ...prev, [field]: filteredSuggestions.length > 0 }));
  };

  const handleSelect = (fullName) => {
    const [firstname, lastname] = fullName.split(" ");
    const selectedMember = membersData.find(
      (member) =>
        member.firstname.toLowerCase() === firstname.toLowerCase() &&
        member.lastname.toLowerCase() === lastname.toLowerCase()
    );

    if (selectedMember) {
      setTrainingParticipationData((prev) => ({ ...prev, member_id: selectedMember.id }));
    }

    setShowSuggestions({ firstname: false, lastname: false });
  };

  const handleSave = async () => {
    try {
      let memberId = trainingParticipationData.member_id;

      if (!memberData?.id) {
        const { data: newMember, error: memberError } = await toast.promise(
          supabase
            .from("club_members")
            .insert([memberData])
            .select(),
          {
            success: 'New external member added successfully',
            loading: 'Adding new member...',
            error: 'Error adding new external member.',
          }
        );

        if (memberError) throw memberError;
        else toast.dismiss();
        memberId = newMember[0].id;
      }

      const { error: trainingError } = await toast.promise(
        supabase
          .from("training_participation")
          .insert([{ ...trainingParticipationData, member_id: memberId }]), {
        loading: 'Saving training participation...',
        success: 'Training participation saved successfully',
        error: 'Error saving training participation',
      }
      );

      if (trainingError) throw trainingError;

      resetForm();
    } catch (error) {
      toast.dismiss();
      toast.error('Error saving training participation');
      console.error("Error saving training participation:", error.message);
    }
  };

  const resetForm = () => {
    setMemberData({
      lastname: "",
      firstname: "",
      email: "",
      phone_num: "",
      member_type: 3,
      study_lvl: "",
      skills: "",
    });
    setTrainingParticipationData({
      training_id: formationId,
      member_id: null,
      training_level: "",
      has_paid: "Yes",
      group_number: null,
      training_room: null,
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="member-detail-container">
      <h2>Member Information</h2>
      <form className="member-form">
        <div className="form-group">
          <label htmlFor="member_type">Type de Membre</label>
          <select
            id="member_type"
            name="member_type"
            value={memberData.member_type}
            onChange={handleChange}
          >
            <option value={0}>externe</option>
            <option value={1}>actif</option>
            <option value={2}>adherent</option>
          </select>
        </div>

        {Object.keys(memberData).map((key) =>
          key !== 'id' && key !== "member_type" && key !== "training_level" ? (
            <div className="form-group" key={key}>
              <label htmlFor={key}>
                {key === "phone_num"
                  ? "Phone Number"
                  : key === "study_lvl"
                    ? "Study Level"
                    : key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
              </label>
              <input
                id={key}
                name={key}
                value={memberData[key]}
                onChange={handleChange}
                onBlur={() => setShowSuggestions((prev) => ({ ...prev, [key]: false }))}
                onFocus={() => key in suggestions && setShowSuggestions((prev) => ({ ...prev, [key]: true }))}
                required={key === "firstname" || key === "lastname" || key === "email" || key === "phone_num"}
              />
              {showSuggestions[key] && suggestions[key].length > 0 && (
                <div className="suggestions-popup">
                  {suggestions[key].map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onMouseDown={() => handleSelect(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null
        )}

        <div className="form-group">
          <label htmlFor="training_level">Training Level</label>
          <select
            id="training_level"
            name="training_level"
            value={trainingParticipationData.training_level}
            onChange={(e) => {
              setTrainingParticipationData((prev) => ({ ...prev, training_level: e.target.value }));
            }
            }
          >
            <option value="">Select Level</option>
            {levels.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Payment Status</label>
          <label>
            <input
              type="radio"
              value="Yes"
              checked={trainingParticipationData.has_paid === "Yes"}
              onChange={(e) =>
                setTrainingParticipationData((prev) => ({ ...prev, has_paid: e.target.value }))
              }
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="No"
              checked={trainingParticipationData.has_paid === "No"}
              onChange={(e) =>
                setTrainingParticipationData((prev) => ({ ...prev, has_paid: e.target.value }))
              }
            />
            No
          </label>
        </div>

        <div className="form-actions">
          <button type="button" className="save-button" onClick={handleSave}>Save</button>
          <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;