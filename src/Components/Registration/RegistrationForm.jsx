import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./RegistrationForm.css";
import supabase from "../../../superbaseClient";
import toast from "react-hot-toast";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { formationId } = useParams();
  const [clubMembers, setClubMembers] = useState([]);
  const [memberType, setMemberType] = useState("VRAI"); // Default to Adherent
  const [membersData, setMembersData] = useState([]);
  const [memberData, setMemberData] = useState({
    LastName: "",
    FirstName: "",
    Email: "",
    Phone: "",
    Adherent: 0,
    StudyLevel: ""
  });
  const [trainingParticipationData, setTrainingParticipationData] = useState({
    training_id: formationId,
    member_id: null,
    level_in_subject: "",
    has_paid: "Yes",
    group_number: null,
    training_room: null,
  });

  const [suggestions, setSuggestions] = useState({
    FirstName: [],
    LastName: [],
  });
  const [showSuggestions, setShowSuggestions] = useState({
    FirstName: false,
    LastName: false,
  });
  const [loading, setLoading] = useState(false);
  const levels = ["Beginner", "Intermediate", "Advanced"];


  useEffect(() => {
    const fetchClubMembersData = async () => {
      try {
        const { data: club_members, error } = await supabase
          .from('Active_Members')
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
    const filteredMembers = clubMembers.filter((member) => member.Adherent === memberType);
    setMembersData(filteredMembers);
    console.log(filteredMembers)

  }, [clubMembers, memberType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "Adherent") {
      const newMemberType = value;
      setMemberType(newMemberType);
      setMemberData({
        LastName: "",
        FirstName: "",
        Email: "",
        Phone: "",
        Adherent: newMemberType,
        StudyLevel: ""
      });
      setSuggestions({ firstame: [], LastName: [] });
      setShowSuggestions({ FirstName: false, LastName: false });
    }

    if (name === "FirstName" || name === "LastName") {
      handleSuggestions(name, value);
    }
  };

  const handleSuggestions = (field, value) => {
    const filteredSuggestions = membersData
      .filter((member) =>
        member[field].toLowerCase().startsWith(value.toLowerCase())
      )
      .map((member) => `${member.FirstName} ${member.LastName}`);

    setSuggestions((prev) => ({ ...prev, [field]: filteredSuggestions }));
    setShowSuggestions((prev) => ({ ...prev, [field]: filteredSuggestions.length > 0 }));
  };

  const handleSelect = (fullName) => {
    // Trim the full name and split by spaces, removing extra spaces
    const nameParts = fullName.trim().split(/\s+/); // Split on one or more spaces
  
    let FirstName = nameParts[0]; // First part as first name
    let LastName = nameParts.slice(1).join(" "); // Combine remaining parts as last name
  
    const selectedMember = membersData.find(
      (member) =>
        member.FirstName.toLowerCase() === FirstName.toLowerCase() &&
        member.LastName.toLowerCase() === LastName.toLowerCase()
    );
  
    if (selectedMember) {
      setMemberData(selectedMember);
      setTrainingParticipationData((prev) => ({
        ...prev,
        member_id: selectedMember.ID,
      }));
    }
  
    setShowSuggestions({ FirstName: false, LastName: false });
  };
  

  const handleSave = async () => {
    try {
      let memberId = trainingParticipationData.member_id;

      if (!memberData?.ID) {
        const promise = supabase
          .from("Active_Members")
          .insert([memberData])
          .select();
        toast.promise(promise, {
          success: "Member added successfully",
          loading: "Adding member...",
          error: "Error adding member",
        });
        const { data: newMember, error: memberError } = await promise;

        if (memberError) throw memberError;
        memberId = newMember[0].ID;
      }

      const { error: trainingError } = await supabase
        .from("training_participation")
        .insert([{ ...trainingParticipationData, member_id: memberId }]);

      if (trainingError) throw trainingError;

      toast.success("Training participation saved successfully!");
      resetForm();
    } catch (error) {
      toast.error("Error saving training participation.");
      console.error("Error saving training participation:", error.message);
    }
  };

  const resetForm = () => {
    setMemberData({
      LastName: "",
      FirstName: "",
      Email: "",
      Phone: "",
      Adherent: 0,
      StudyLevel: ""
    });
    setTrainingParticipationData({
      training_id: formationId,
      member_id: null,
      level_in_subject: "",
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
          <label htmlFor="Adherent">Type de Membre</label>
          <select
            id="Adherent"
            name="Adherent"
            value={memberData.Adherent}
            onChange={handleChange}
          >
            <option value={"FAUX"}>actif</option>
            <option value={"VRAI"}>adherent</option>
          </select>
        </div>

        {Object.keys(memberData).map((key) =>
          key !== 'id' && key !== "Adherent" && key !== "level_in_subject" ? (
            <div className="form-group" key={key}>
              <label htmlFor={key}>
                {key === "Phone"
                  ? "Phone Number"
                  : key === "StudyLevel"
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
                required={key === "FirstName" || key === "LastName" || key === "Email" || key === "Phone"}
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
            value={trainingParticipationData.level_in_subject}
            onChange={(e) => {
              setTrainingParticipationData((prev) => ({ ...prev, level_in_subject: e.target.value }));
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