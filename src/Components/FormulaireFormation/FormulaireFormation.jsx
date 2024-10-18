import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { BsQrCode } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { GrWorkshop } from "react-icons/gr";
import { FaHouse } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { GiTeacher } from "react-icons/gi";
import { MdAssistantPhoto } from "react-icons/md";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { FaCoffee } from "react-icons/fa";
import { GrTechnology } from "react-icons/gr";
import { useState } from "react";
import { IoPersonRemove } from "react-icons/io5";
import { FaCode } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";
import { BeatLoader } from "react-spinners";
import supabase from "../../../superbaseClient";
import "./FormulaireFormation.css";
import PropTypes from 'prop-types';

function FormulaireFormation({ mode }) {
  const [loading, setLoading] = useState(false);
  const { formationId } = useParams();
  const [seniorMembers, setSeniorMembers] = useState([{}]);
  const [formData, setFormData] = useState({
    name: "",
    training_branch: "",
    description: "",
    date: "",
    address: "",
    tutor_ids: [0],
    tutor_assistants_ids: [0],
    receptionists_ids: [0],
    coffeeBreaks_assistants_ids: [0],
    logo_url: "/images/CpuBlack.png",
    prix_member_actif: 0,
    prix_member_adherant: 0,
  });

  useEffect(() => {
    const fetchFormateurs = async () => {
      try {
        const { data: senior_members, error } = await supabase
          .from("senior_members")
          .select("*");

        if (error) {
          console.log("Error fetching formateurs", error.message);
          return [];
        }
        setSeniorMembers(senior_members);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    const fetchFormateurData = async () => {
      if (mode === "edit" && formationId) {
        try {
          const { data, error } = await supabase
            .from("trainings")
            .select("*")
            .eq("id", formationId)
            .single();

          if (error) {
            console.error("Error fetching training data:", error.message);
            return;
          }

          setFormData({
            name: data.name,
            training_branch: data.training_branch,
            description: data.description,
            date: data.date,
            address: data.address,
            tutor_ids: data.tutor_ids,
            tutor_assistants_ids: data.tutor_assistants_ids,
            receptionists_ids: data.receptionists_ids,
            coffeeBreaks_assistants_ids: data.coffeeBreaks_assistants_ids,
            logo_url: data.logo_url,
            prix_member_actif: data.prix_member_actif,
            prix_member_adherant: data.prix_member_adherant,
          });
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      }
    };

    fetchFormateurs();
    fetchFormateurData();
  }, [mode, formationId]);

  // Function to handle input change
  const handleInputChange = (e, index, label) => {
    const newValue = parseInt(e.target.value) || 0;
    const updatedFields = [...formData[label]];
    updatedFields[index] = newValue;
    setFormData({ ...formData, [label]: updatedFields });
  };

  const handlePrixMemberActifChange = (e) => {
    setFormData({ ...formData, prix_member_actif: e.target.value });
  };

  const handlePrixMemberAdherantChange = (e) => {
    setFormData({ ...formData, prix_member_adherant: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "edit") {
        const { error } = await supabase
          .from("trainings")
          .update({
            name: formData.name,
            training_branch: formData.training_branch,
            description: formData.description,
            date: formData.date,
            address: formData.address,
            tutor_ids: formData.tutor_ids,
            tutor_assistants_ids: formData.tutor_assistants_ids,
            receptionists_ids: formData.receptionists_ids,
            coffeeBreaks_assistants_ids: formData.coffeeBreaks_assistants_ids,
            logo_url: formData.logo_url,
            prix_member_actif: formData.prix_member_actif,
            prix_member_adherant: formData.prix_member_adherant,
          })
          .eq("id", formationId);

        if (error) {
          alert("Error updating training!");
          console.error("Error updating training:", error.message);
        } else {
          alert("Training updated successfully!");
        }
      } else {
        const newTrainingData = {
          name: formData.name,
          training_branch: formData.training_branch,
          description: formData.description,
          date: formData.date,
          address: formData.address,
          tutor_ids: formData.tutor_ids.length ? formData.tutor_ids : null,
          tutor_assistants_ids: formData.tutor_assistants_ids.length
            ? formData.tutor_assistants_ids
            : null,
          receptionists_ids: formData.receptionists_ids.length
            ? formData.receptionists_ids
            : null,
          coffeeBreaks_assistants_ids: formData.coffeeBreaks_assistants_ids
            .length
            ? formData.coffeeBreaks_assistants_ids
            : null,
          logo_url: formData.logo_url,
          prix_member_actif: formData.prix_member_actif,
          prix_member_adherant: formData.prix_member_adherant,
        };

        const { error } = await supabase
          .from("trainings")
          .insert([newTrainingData]);

        if (error) {
          alert("Error adding training!");
          console.error("Error adding training:", error.message);
        } else {
          alert("Training added successfully!");
          setFormData({
            name: "",
            training_branch: "",
            description: "",
            date: "",
            address: "",
            tutor_ids: [0],
            tutor_assistants_ids: [0],
            receptionists_ids: [0],
            coffeeBreaks_assistants_ids: [0],
            logo_url: "/images/CpuBlack.png",
            prix_member_actif: 0,
            prix_member_adherant: 0,
          });
        }
      }
    } catch (err) {
      alert("Error processing request!");
      console.error("Error processing request:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handlers for single value inputs
  const handleTitleChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };
  const handleDescriptionChange = (e) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const handleTrainingBranchChange = (e) => {
    setFormData({ ...formData, training_branch: e.target.value });
  };

  const handleAddressChange = (e) => {
    setFormData({ ...formData, address: e.target.value });
  };

  const handleDateChange = (e) => {
    setFormData({ ...formData, date: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo_url: reader.result });
        //setFormData({ ...formData, logo_url: "reader.result" });
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to add a new field in the respective section
  const addField = (label, fields) => {
    setFormData({
      ...formData,
      [label]: [...fields, 0],
    });
  };

  const removeField = (index, label, fields) => {
    const updatedFields = fields.filter((_, i) => index !== i);
    console.log("index: ", index);

    console.log("old fields: ", fields);
    console.log("new fields: ", updatedFields);
    setFormData({
      ...formData,
      [label]: updatedFields,
    });
  };

  const renderFieldSection = (label, icon, fields) => (
    <div className="Field">
      <label>
        {label} {icon}:
      </label>
      {fields.map((field, index) => (
        <div key={index} style={{ display: "flex", marginBottom: "1rem" }}>
          {/* <input
            placeholder="Nom et prénom"
            value={field.value}
            onChange={(e) => handleInputChange(e, index, setFieldFunc, fields)}
            className="input_formulaire_formation"
            style={{ flex: 4, marginRight: "1%" }}
          /> */}
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => handleInputChange(e, index, label, fields)}
            value={field}
          >
            <option value={0}>Select {label}</option>
            {seniorMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.firstname} {member.lastname}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ flex: 1, marginRight: "1%" }}
            onClick={() => addField(label, fields)}
          >
            <IoMdPersonAdd />
          </button>
          <button
            type="button"
            className={`btn btn-danger ${fields.length <= 1 ? "disabled-button" : ""
              }`}
            disabled={fields.length <= 1}
            style={{ flex: 1 }}
            onClick={() => removeField(index, label, fields)}
          >
            <IoPersonRemove />
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="Formulaire ">
        <form onSubmit={handleSubmit}>
          <h1 className="Formation-title">Formulaire Du Formation</h1>

          <div className="Field">
            <label>Titre de formation {<GrWorkshop />} :</label>
            <input
              required
              value={formData.name}
              placeholder="exemple : introduction C++"
              onChange={handleTitleChange}
              className="input_formulaire_formation"
            ></input>
          </div>
          <div className="Field">
            <label>Description {<GrWorkshop />} :</label>
            <input
              required
              value={formData.description}
              placeholder="Courte description de la formation"
              onChange={handleDescriptionChange}
              className="input_formulaire_formation"
            ></input>
          </div>

          <div className="Field">
            <label>Domaine de formation:</label>
            <div style={{ display: "flex", gap: "5%" }}>
              <div>
                <label>
                  <input
                    type="radio"
                    name="Domaine"
                    value="Developement"
                    checked={formData.training_branch === "Developement"}
                    onChange={handleTrainingBranchChange}
                  />
                  Developement {<FaCode />}
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="Domaine"
                    value="Robotique"
                    checked={formData.training_branch === "Robotique"}
                    onChange={handleTrainingBranchChange}
                  />
                  Robotique {<RiRobot2Fill />}
                </label>
              </div>
            </div>
          </div>

          <div className="Field">
            <label>address {<FaHouse />} :</label>
            <input
              required
              placeholder="exemple : ISIMM"
              className="input_formulaire_formation"
              value={formData.address}
              onChange={handleAddressChange}
            ></input>
          </div>

          <div className="Field">
            <label>Date {<CiCalendarDate />}:</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={handleDateChange}
              className="input_formulaire_formation"
            />
          </div>

          {/* Render Field Sections */}

          {renderFieldSection("tutor_ids", <GiTeacher />, formData.tutor_ids)}
          {renderFieldSection(
            "tutor_assistants_ids",
            <MdAssistantPhoto />,
            formData.tutor_assistants_ids
          )}
          {renderFieldSection(
            "receptionists_ids",
            <FaPersonCircleCheck />,
            formData.receptionists_ids
          )}
          {renderFieldSection(
            "coffeeBreaks_assistants_ids",
            <FaCoffee />,
            formData.coffeeBreaks_assistants_ids
          )}

          <div className="Field">
            <label className="form-label">
              Logo Formation {<GrTechnology />} :
            </label>
            <input

              accept=".png, .jpg, .jpeg"
              type="file"
              className="form-control"
              onChange={handleImageChange}

            />
          </div>
          <div className="Field">
            <label className="form-label">
              Prix membre actif {<GrTechnology />} :
            </label>
            <input
              type="number"
              className="form-control"
              onChange={handlePrixMemberActifChange}
            />
          </div>
          <div className="Field">
            <label className="form-label">
              Prix membre adherant {<GrTechnology />} :
            </label>
            <input
              type="number"
              className="form-control"
              onChange={handlePrixMemberAdherantChange}
            />
          </div>
          <div className="Field">
            {" "}
            <label>Logo formation :</label>
            <img
              src={formData.logo_url} // Base64 string from the database
              alt="Training Logo"
              style={{ width: "100px", height: "100px" }}

            />
          </div>

          <div className="Field">
            <a href="#">
              Google Forum <BsQrCode />
            </a>
          </div>

          <div className="Field">
            <button
              type="submit"
              className="btn btn-success mb-2"
              disabled={loading}
            >
              {loading ? (
                <BeatLoader></BeatLoader>
              ) : mode === "edit" ? (
                "Update Training"
              ) : (
                "Add Training"
              )}
            </button>
            <button type="button" className="btn btn-danger">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

FormulaireFormation.propTypes = {
  mode: PropTypes.string.isRequired
};

export default FormulaireFormation;
