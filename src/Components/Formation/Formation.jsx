
import "./../FormulaireFormation/FormulaireFormation.css";
import { GrWorkshop } from "react-icons/gr";
import { FaHouse } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { GiTeacher } from "react-icons/gi";
import { MdAssistantPhoto } from "react-icons/md";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { FaCoffee } from "react-icons/fa";
import { useState } from "react";
import { FaCode } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";


function Formation() {
  const [Titre] = useState("introduction C++");
  const [Domaine] = useState("Développement"); // Set default value if needed
  const [Local] = useState("ISIMM C-01");
  const [Date] = useState("1/1/2024"); // Set default value if needed
  const [formateurs] = useState([{ id: 1, value: "Mazen Torra" }]);
  const [assistants] = useState([{ id: 1, value: "Oussama ben slama" }]);
  const [receptionists] = useState([{ id: 1, value: "Emna ltaief" }]);
  const [coffeeBreaks] = useState([
    { id: 1, value: "Yosr ghanmi" },
    { id: 1, value: "Dhia ben hammouda" },
  ]);
  const [logo] = useState("./images/CpuBlack.png");
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    // Create a string to hold all the information
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
    alert(formData); // Show all the information in an alert
  };
  return (
    <div className="Formulaire">
      <form onSubmit={handleSubmit}>
        <h1 className="Formation-title">Formulaire Du Formation</h1>
        <div className="Field">
          <label>Titre de formation {<GrWorkshop />} :</label>
          <input type="text" value={Titre} readOnly />
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
                  checked={Domaine === "Développement"}
                  readOnly
                />
                Développement {<FaCode />}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="Domaine"
                  value="Robotique"
                  checked={Domaine === "Robotique"}
                  readOnly
                />
                Robotique {<RiRobot2Fill />}
              </label>
            </div>
          </div>
        </div>
        <div className="Field">
          <label>Local {<FaHouse />} :</label>
          <input type="text" value={Local} readOnly />
        </div>
        <div className="Field">
          <label>Date {<CiCalendarDate />} :</label>
          <input type="date" value={Date} readOnly />
        </div>
        {/* Formateur Section */}
        <div className="Field">
          <label>Formateur {<GiTeacher />} :</label>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <select
              value={formData.tutor}
              onChange={handleTutorChange}
            >
              <option value={0}>Select Formateur</option>
              {seniorMembers.map((seniorMember) => (
                <option key={seniorMember.id} value={seniorMember.id}>
                  {seniorMember?.firstname} {seniorMember?.lastname}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Assistant Section */}
        <div className="Field">
          <label>Assistant {<MdAssistantPhoto />} :</label>
          {assistants.map((assistant, index) => (
            <input
              key={index}
              placeholder="Nom et prénom"
              value={assistant.value}
              readOnly
            />
          ))}
        </div>
        {/* Reception Section */}
        <div className="Field">
          <label>Reception {<FaPersonCircleCheck />} :</label>
          {receptionists.map((receptionist, index) => (
            <input
              key={index}
              placeholder="Nom et prénom"
              value={receptionist.value}
              readOnly
            />
          ))}
        </div>
        {/* Pause Café Section */}
        <div className="Field">
          <label>Pause Café {<FaCoffee />} :</label>
          {coffeeBreaks.map((coffeeBreak, index) => (
            <input
              key={index}
              placeholder="Nom et prénom"
              value={coffeeBreak.value}
              readOnly
            />
          ))}
        </div>
        {logo && (
          <div className="Field">
            <h3>Prévisualisation du logo :</h3>
            <img
              src={logo}
              alt="Logo Preview"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
        )}
        <div className="Field" style={{ gap: "10px" }}>
          <button type="submit" className="btn btn-primary">
            Edit
          </button>
          <button type="submit" className="btn btn-danger">
            Cancle
          </button>
        </div>
      </form>
    </div>
  );
}
export default Formation;