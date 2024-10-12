import { BsQrCode } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import "./FormulaireFormation.css";
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

function FormulaireFormation() {
  const [Titre, setTitre] = useState("");
  const [Domaine, setDomaine] = useState("");
  const [Local, setLocal] = useState("");
  const [Date, setDate] = useState("");
  const [formateurs, setFormateurs] = useState([{ id: 1, value: "" }]);
  const [assistants, setAssistants] = useState([{ id: 1, value: "" }]);
  const [receptionists, setReceptionists] = useState([{ id: 1, value: "" }]);
  const [coffeeBreaks, setCoffeeBreaks] = useState([{ id: 1, value: "" }]);
  const [logo, setLogo] = useState(null);

  // Function to handle input change
  const handleInputChange = (e, index, setFieldFunc, fields) => {
    const newFields = [...fields];
    newFields[index].value = e.target.value;
    setFieldFunc(newFields);
  };

  const handleSubmit = (e) => {
    //add to data base code should go here
    e.preventDefault();

    const formData = `
      Formation: ${Titre}
      Domaine: ${Domaine}
      Local: ${Local}
      Date: ${Date}
      Formateurs: ${formateurs.map((f) => f.value).join(", ")}
      Assistants: ${assistants.map((a) => a.value).join(", ")}
      Receptionists: ${receptionists.map((r) => r.value).join(", ")}
      Coffee Breaks: ${coffeeBreaks.map((cb) => cb.value).join(", ")}
    `;

    alert(formData);
  };

  // Handlers for single value inputs
  const handleTitleChange = (e) => {
    setTitre(e.target.value);
  };

  const handleDomainChange = (e) => {
    setDomaine(e.target.value);
  };

  const handleLocalChange = (e) => {
    setLocal(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to add a new field in the respective section
  const addField = (setFieldFunc, fields) => {
    setFieldFunc([...fields, { id: fields.length + 1, value: "" }]);
  };

  const removeField = (index, setFieldFunc, fields) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFieldFunc(updatedFields);
  };

  const renderFieldSection = (label, icon, fields, setFieldFunc) => (
    <div className="Field">
      <label>{label} {icon}:</label>
      {fields.map((field, index) => (
        <div key={field.id} style={{ display: "flex", marginBottom: "1rem" }}>
          <input
            placeholder="Nom et prénom"
            value={field.value}
            onChange={(e) => handleInputChange(e, index, setFieldFunc, fields)}
            className="input_formulaire_formation"
            style={{ flex: 4, marginRight: "1%" }}
          />
          <button
            type="button"
            className="btn btn-secondary"
            style={{ flex: 1, marginRight: "1%" }}
            onClick={() => addField(setFieldFunc, fields)}
          >
            <IoMdPersonAdd />
          </button>
          <button
            type="button"
            className={`btn btn-danger ${
              fields.length <= 1 ? "disabled-button" : ""
            }`}
            disabled={fields.length <= 1}
            style={{ flex: 1 }}
            onClick={() => removeField(index, setFieldFunc, fields)}
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
              placeholder="exemple : introduction C++"
              onChange={handleTitleChange} className="input_formulaire_formation"
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
                    onChange={handleDomainChange}
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
                    onChange={handleDomainChange}
                  />
                  Robotique {<RiRobot2Fill />}
                </label>
              </div>
            </div>
          </div>

          <div className="Field">
            <label>Local {<FaHouse />} :</label>
            <input placeholder="exemple : ISIMM" className="input_formulaire_formation" onChange={handleLocalChange}></input>
          </div>

          <div className="Field">
            <label>Date {<CiCalendarDate />} :</label>
            <input type="date" className="input_formulaire_formation" onChange={handleDateChange}></input>
          </div>

          {/* Render Field Sections */}
          {renderFieldSection("Formateur", <GiTeacher />, formateurs, setFormateurs)}
          {renderFieldSection("Assistant", <MdAssistantPhoto />, assistants, setAssistants)}
          {renderFieldSection("Reception", <FaPersonCircleCheck />, receptionists, setReceptionists)}
          {renderFieldSection("Pause Café", <FaCoffee />, coffeeBreaks, setCoffeeBreaks)}

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
            <a href="#">
              Google Forum <BsQrCode />
            </a>
          </div>

          <div className="Field">
            <button type="submit" className="btn btn-success mb-2">
              Submit
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

export default FormulaireFormation;
