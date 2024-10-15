import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./RegistrationForm.css";
import supabase from "../../../superbaseClient";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { formationId } = useParams();
  const location = useLocation();

  const [MembreType, setMembreType] = useState(1);
  const [MembersData, setMembersData] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null); // State to hold the selected member
  const [memberDataTodb, setMemberDataTodb] = useState({
    training_id: formationId,
    member_id: 1300, // Ensure this matches your schema
    training_level: "Advanced",
    has_paid: "Yes",
    group_number: 1,
    training_room: "C1",
  });


  const [memberData, setMemberData] = useState({
    lastname: "",
    firstname: "",
    email: "",
    phone_num: "",
    member_type: 3, // Default to externe
    study_lvl: "",
    skills: "",
    training_level: "",
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
    const fetchMembersData = async () => {
      setLoading(true);
      try {
        const { data: club_members, error } = await supabase
          .from("club_members")
          .select("*")
          .eq("member_type", MembreType);

        if (error) throw error;

        setMembersData(club_members || []); // Handle empty data
      } catch (err) {
        console.error("Error fetching members:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembersData();
  }, [MembreType]); // Fetch data whenever MembreType changes

  const handleChange = (e, field) => {
    e.preventDefault();
    const { value } = e.target;

    // Update memberData state for the current field
    setMemberData((prevData) => ({ ...prevData, [field.name]: value }));

    // Handle member type changes and reset related fields
    if (field.name === "member_type") {
      const newMemberType = parseInt(value);
      setMembreType(newMemberType);

      // Reset member data and suggestions
      setMemberData({
        lastname: "",
        firstname: "",
        email: "",
        phone_num: "",
        member_type: newMemberType,
        study_lvl: "",
        skills: "",
        training_level: "", // Reset training_level when member_type changes
      });

      setSuggestions({ firstname: [], lastname: [] });
      setShowSuggestions({ firstname: false, lastname: false });
      return; // Return early to avoid further processing
    }

    // Handle training_level changes specifically
    if (field.name === "training_level") {
      // Update the state properly here
      setMemberData((prevData) => ({
        ...prevData,
        training_level: value, // Make sure training_level is being updated correctly
      }));

      // Log the updated memberData after setting the state
      setTimeout(() => {
        console.log("Updated memberData with training_level:", memberData);
      }, 0);

      return; // Early return after handling training_level
    }

    // Handle suggestions based on the member type (non-external members)
    if (memberData.member_type) {
      let filteredSuggestions = [];
      const currentMemberType = memberData.member_type;

      if (field.name === "firstname") {
        filteredSuggestions = MembersData.filter(
          (member) =>
            member.member_type === currentMemberType &&
            member.firstname.toLowerCase().startsWith(value.toLowerCase())
        ).map((member) => `${member.firstname} ${member.lastname}`);

        setSuggestions((prev) => ({
          ...prev,
          firstname: filteredSuggestions,
        }));

        setShowSuggestions((prev) => ({
          ...prev,
          firstname: filteredSuggestions.length > 0,
        }));
      } else if (field.name === "lastname") {
        filteredSuggestions = MembersData.filter(
          (member) =>
            member.member_type === currentMemberType &&
            member.lastname.toLowerCase().startsWith(value.toLowerCase())
        ).map((member) => `${member.firstname} ${member.lastname}`);

        setSuggestions((prev) => ({
          ...prev,
          lastname: filteredSuggestions,
        }));

        setShowSuggestions((prev) => ({
          ...prev,
          lastname: filteredSuggestions.length > 0,
        }));
      }
    }
  };
  const handleTrainingLevelChange = (event) => {
    setMemberDataTodb((prevState) => ({
      ...prevState,
      training_level: event.target.value, // Update training_level based on user selection
    }));
  };


  const handlePaymentChange = (event) => {
    setMemberDataTodb((prevState) => ({
      ...prevState,
      has_paid: event.target.value, // Update has_paid based on user selection
    }));
  };
  const handleSelect = (fullName) => {
    const [firstname, lastname] = fullName.split(" ");
    const selectedMember = MembersData.find(
      (member) =>
        member.firstname.toLowerCase() === firstname.toLowerCase() ||
        member.lastname.toLowerCase() === lastname.toLowerCase()
    );

    if (selectedMember) {
      console.log(selectedMember);
      setMemberData({
        firstname: selectedMember.firstname,
        lastname: selectedMember.lastname,
        email: selectedMember.email,
        phone_num: selectedMember.phone_num,
        member_type: selectedMember.member_type,
        study_lvl: selectedMember.study_lvl,
        skills: selectedMember.skills,
        training_level: memberData.training_level, // Keep training_level as is
      });

      // Update memberDataTodb with the selected member's id
      setMemberDataTodb((prev) => ({
        ...prev,
        member_id: selectedMember.id, // Use member_id
      }));

    }

    // Hide suggestions after selection
    setShowSuggestions({ firstname: false, lastname: false });
  };

  const handleSave = async () => {
    try {
      let memberId;

      // Check if the member is external (assuming member_type === 3)
      if (memberData.member_type === 3) {
        // Insert the new external member into the club_members table
        const { error: memberError, data: newMember } = await supabase
          .from("club_members") // Your actual table for members
          .insert([{
            lastname: memberData.lastname,
            firstname: memberData.firstname,
            email: memberData.email,
            phone_num: memberData.phone_num,
            member_type: memberData.member_type,
            study_lvl: memberData.study_lvl,
            skills: memberData.skills,
          }])
          .select(); // Get the inserted member's data

        // Check for insertion errors
        if (memberError) {
          throw memberError; // Handle the error
        }

        alert("External member added successfully to club_members table!");

        // Now retrieve the member's ID using their phone number
        const { data: retrievedMember, error: selectError } = await supabase
          .from("club_members")
          .select("id")
          .eq("phone_num", memberData.phone_num) // Match phone number
          .single(); // Get single record

        // Check for errors in retrieving the member
        if (selectError || !retrievedMember) {
          throw selectError || new Error("Member not found after insertion.");
        }

        memberId = retrievedMember.id; // Get the member's ID

        // Prepare training participation data
        const trainingParticipationData = {
          training_id: memberDataTodb.training_id,
          member_id: memberId, // Use the new member's ID
          level_in_subject: memberDataTodb.training_level,
          has_paid: memberDataTodb.has_paid,
          group_number: memberDataTodb.group_number,
          training_room: memberDataTodb.training_room,
        };

        // Insert into training_participation table
        const { error: trainingError } = await supabase
          .from("training_participation")
          .insert([trainingParticipationData]);

        // Check for errors in training participation insertion
        if (trainingError) {
          throw trainingError; // Handle the error
        }

        alert("External member added successfully to training_participation table!");

        // Reset the form
        resetForm();
        return; // Exit after adding external member
      }

      // For other member types, ensure member_id is valid
      if (!memberDataTodb.member_id) {
        alert("Please select a member before saving.");
        return; // Exit if member_id is not valid
      }

      // For other member types, save the training participation
      const { error } = await supabase
        .from("training_participation")
        .insert([{
          training_id: memberDataTodb.training_id,
          member_id: memberDataTodb.member_id,
          level_in_subject: memberDataTodb.training_level,
          has_paid: memberDataTodb.has_paid,
          group_number: memberDataTodb.group_number,
          training_room: memberDataTodb.training_room,
        }]);

      // Check for errors in training participation insertion
      if (error) {
        throw error; // Handle the error
      }

      alert("Training added successfully to training_participation table!");

      // Reset the form
      resetForm();

    } catch (error) {
      alert("Error adding training!");
      console.error("Error adding training:", error.message);
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setMemberDataTodb({
      training_id: formationId,
      member_id: 0, // Reset to the default integer value
      training_level: "",
      has_paid: "Yes",
      group_number: 1,
      training_room: "C1",
    });
    setMemberData({
      lastname: "",
      firstname: "",
      email: "",
      phone_num: "",
      member_type: 3, // Default to externe
      study_lvl: "",
      skills: "",
      training_level: "",
    });
  };




  const handleCancel = () => {
    navigate(-1);
  };

  if (loading) {
    return <div>Loading...</div>; // Loading indicator
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
            onChange={(e) => handleChange(e, { name: "member_type" })}
          >
            <option value={3}>externe</option>
            <option value={1}>actif</option>
            <option value={2}>adherent</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="firstname">Firstname</label>
          <input
            autoComplete="off"
            id="firstname"
            name="firstname"
            placeholder="Firstname"
            onChange={(e) => handleChange(e, { name: "firstname" })}
            value={memberData.firstname}
            onBlur={() =>
              setShowSuggestions((prev) => ({ ...prev, firstname: false }))
            }
            onFocus={() => {

              setShowSuggestions((prev) => ({ ...prev, firstname: true }));

            }}
            required // Add required attribute for validation
          />
          {
            showSuggestions.firstname && ( // Only show suggestions if member type is not externe
              <div className="suggestions-popup">
                {suggestions.firstname.length > 0 ? (
                  suggestions.firstname.map((name, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onMouseDown={() => handleSelect(name)}
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

        <div className="form-group">
          <label htmlFor="lastname">Lastname</label>
          <input
            autoComplete="off"
            id="lastname"
            name="lastname"
            placeholder="Lastname"
            onChange={(e) => handleChange(e, { name: "lastname" })}
            value={memberData.lastname}
            onBlur={() =>
              setShowSuggestions((prev) => ({ ...prev, lastname: false }))
            }
            onFocus={() => {
              setShowSuggestions((prev) => ({ ...prev, lastname: true }));

            }}
            required // Add required attribute for validation
          />
          {
            showSuggestions.lastname && ( // Only show suggestions if member type is not externe
              <div className="suggestions-popup">
                {suggestions.lastname.length > 0 ? (
                  suggestions.lastname.map((name, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onMouseDown={() => handleSelect(name)}
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

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => handleChange(e, { name: "email" })}
            value={memberData.email}
            required // Add required attribute for validation
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone_num">Phone Number</label>
          <input
            id="phone_num"
            type="tel"
            name="phone_num"
            placeholder="Phone Number"
            onChange={(e) => handleChange(e, { name: "phone_num" })}
            value={memberData.phone_num}
            required // Add required attribute for validation
          />
        </div>

        <div className="form-group">
          <label htmlFor="study_lvl">Study Level</label>
          <input
            id="study_lvl"
            name="study_lvl"
            placeholder="Study Level"
            onChange={(e) => handleChange(e, { name: "study_lvl" })}
            value={memberData.study_lvl}
          />
        </div>

        <div className="form-group">
          <label htmlFor="skills">Skills</label>
          <input
            id="skills"
            name="skills"
            placeholder="Skills"
            onChange={(e) => handleChange(e, { name: "skills" })}
            value={memberData.skills}
          />
        </div>

        <div className="form-group">
          <label htmlFor="training_level">Training Level</label>
          <select
            id="training_level"
            name="training_level"
            onChange={handleTrainingLevelChange}

            value={memberDataTodb.training_level}
          >
            <option value="">Select Level</option>
            {levels.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select>
          <div>
            <h3>Payment Status</h3>
            <label>
              <input
                type="radio"
                value="Yes"
                checked={memberDataTodb.has_paid === "Yes"}
                onChange={handlePaymentChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="No"
                checked={memberDataTodb.has_paid === "No"}
                onChange={handlePaymentChange}
              />
              No
            </label>
            {/* Other form fields go here */}
          </div>
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
