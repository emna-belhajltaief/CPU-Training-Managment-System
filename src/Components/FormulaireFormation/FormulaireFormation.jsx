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
  const [Titre,setTitre] =useState ("")
  const [Domaine,setDomaine] =useState ("")
  const [Local, setLocal] = useState("")
  const [Date, setDate] =useState("")
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

const handleSubmit =(e)=>{
    e.preventDefault(); // Prevent the default form submission
  
    // Create a string to hold all the information
    const formData = `
      Formation: ${Titre}
      Domaine: ${Domaine}
      Local: ${Local}
      Date: ${Date}
      Formateurs: ${formateurs.map((f) => f.value).join(', ')}
      Assistants: ${assistants.map((a) => a.value).join(', ')}
      Receptionists: ${receptionists.map((r) => r.value).join(', ')}
      Coffee Breaks: ${coffeeBreaks.map((cb) => cb.value).join(', ')}
    `;
  
    alert(formData); // Show all the information in an alert
}

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
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result); // Set the image source to the result of FileReader
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  // Function to add a new field in the respective section
  const addField = (setFieldFunc, fields) => {
    setFieldFunc([...fields, { id: fields.length + 1, value: "" }]);
  };
  const removeField = (setFieldFunc, fields) => {
    // Create a new array that removes the last element using spread
    const updatedFields = [...fields].slice(0, -1);
    setFieldFunc(updatedFields);
  };

  return (
    <>
      <div className="Formulaire ">
        <form onSubmit={handleSubmit}>
          <h1 className="Formation-title">Formulaire Du Formation</h1>

          <div className="Field">
            <label>Titre de formation {<GrWorkshop />} :</label>
            <input placeholder="exemple : introduction C++" onChange={handleTitleChange}></input>
          </div>

          <div className="Field">
            <label>Domaine de formation:</label>
            <div style={{ display: "flex", gap: "5%" }}>
              <div>
                <label>
                  <input type="radio" name="Domaine" value="Developement"  onChange={handleDomainChange} />
                  Developement {<FaCode />}
                </label>
              </div>
              <div>
                <label>
                  <input type="radio" name="Domaine" value="Robotique"  onChange={handleDomainChange} />
                  Robotique {<RiRobot2Fill />}
                </label>
              </div>
            </div>
          </div>

          <div className="Field">
            <label>Local {<FaHouse />} :</label>
            <input placeholder="exemple : ISIMM C-01"  onChange={handleLocalChange}></input>
          </div>

          <div className="Field">
            <label>Date {<CiCalendarDate />} :</label>
            <input type="date"  onChange={handleDateChange}></input>
          </div>

          {/* Formateur Section */}
          <div className="Field">
            <label>Formateur {<GiTeacher />} :</label>
            {formateurs.map((formateur, index) => (
              <input
                key={formateur.id}
                placeholder="Nom et prénom"
                value={formateur.value}
                onChange={(e) =>
                  handleInputChange(e, index, setFormateurs, formateurs)
                }
              />
            ))}
            <div style={{ display: "flex" }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ flex: 1 }}
                onClick={() => addField(setFormateurs, formateurs)}
              >
                <IoMdPersonAdd />
              </button>
              <button
                type="button"
                className={`btn btn-danger ${
                  formateurs.length <= 1 ? "disabled-button" : ""
                }`}
                disabled={formateurs.length <= 1}
                style={{ flex: 1 }}
                onClick={() => removeField(setFormateurs, formateurs)}
              >
                <IoPersonRemove />
              </button>
            </div>
          </div>

          {/* Assistant Section */}
          <div className="Field">
            <label>Assistant {<MdAssistantPhoto />} :</label>
            {assistants.map((assistant, index) => (
              <input
                key={assistant.id}
                placeholder="Nom et prénom"
                value={assistant.value}
                onChange={(e) =>
                  handleInputChange(e, index, setAssistants, assistants)
                }
              />
            ))}
            <div style={{ display: "flex" }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ flex: 1 }}
                onClick={() => addField(setAssistants, assistants)}
              >
                <IoMdPersonAdd />
              </button>
              <button
                type="button"
                className={`btn btn-danger ${
                  assistants.length <= 1 ? "disabled-button" : ""
                }`}
                disabled={assistants.length <= 1}
                style={{ flex: 1 }}
                onClick={() => removeField(setAssistants, assistants)}
              >
                <IoPersonRemove />
              </button>
            </div>
          </div>

          {/* Reception Section */}
          <div className="Field">
            <label>Reception {<FaPersonCircleCheck />} :</label>
            {receptionists.map((receptionist, index) => (
              <input
                key={receptionist.id}
                placeholder="Nom et prénom"
                value={receptionist.value}
                onChange={(e) =>
                  handleInputChange(e, index, setReceptionists, receptionists)
                }
              />
            ))}
            <div style={{ display: "flex" }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ flex: 1 }}
                onClick={() => addField(setReceptionists, receptionists)}
              >
                <IoMdPersonAdd />
              </button>
              <button
                type="button"
                className={`btn btn-danger ${
                  receptionists.length <= 1 ? "disabled-button" : ""
                }`}
                disabled={receptionists.length <= 1}
                style={{ flex: 1 }}
                onClick={() => removeField(setReceptionists, receptionists)}
              >
                <IoPersonRemove />
              </button>
            </div>
          </div>

          {/* Pause Café Section */}
          <div className="Field">
            <label>Pause Café {<FaCoffee />} :</label>
            {coffeeBreaks.map((coffeeBreak, index) => (
              <input
                key={coffeeBreak.id}
                placeholder="Nom et prénom"
                value={coffeeBreak.value}
                onChange={(e) =>
                  handleInputChange(e, index, setCoffeeBreaks, coffeeBreaks)
                }
              />
            ))}
            <div style={{ display: "flex" }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ flex: 1 }}
                onClick={() => addField(setCoffeeBreaks, coffeeBreaks)}
              >
                <IoMdPersonAdd />
              </button>
              <button
                type="button"
                className={`btn btn-danger ${
                  coffeeBreaks.length <= 1 ? "disabled-button" : ""
                }`}
                disabled={coffeeBreaks.length <= 1}
                style={{ flex: 1 }}
                onClick={() => removeField(setCoffeeBreaks, coffeeBreaks)}
              >
                <IoPersonRemove />
              </button>
            </div>
          </div>

          <div className="Field">
            <label className="form-label">
              Logo Formation {<GrTechnology />} :
            </label>
            <input
              accept=".png, .jpg, .jpeg"
              type="file"
              className="form-control"
              onChange={handleImageChange} // Attach the event handler
            />
          </div>

          <div className="Field">
            <a href="#">
              Google Forum <BsQrCode />
            </a>
          </div>

          <div className="Field">
            <button type="submit" className="btn btn-success mb-2">Submit</button>
            <button type="button" className="btn btn-danger">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormulaireFormation;
