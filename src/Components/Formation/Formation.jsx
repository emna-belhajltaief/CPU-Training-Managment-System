
import { useLocation } from 'react-router-dom';
import "./../FormulaireFormation/FormulaireFormation.css";
import { GrWorkshop } from "react-icons/gr";
import { FaHouse } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { GiTeacher } from "react-icons/gi";
import { MdAssistantPhoto } from "react-icons/md";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { FaCoffee } from "react-icons/fa";
import { useState, useEffect } from "react";
import supabase from '../../../superbaseClient';
import { FaCode } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";
function Formation() {
  const location = useLocation();
  const { training } = location.state;
  console.log("trainings", training);
  // const [Titre] = useState("introduction C++");
  // const [Domaine] = useState("Développement"); // Set default value if needed
  // const [Local] = useState("ISIMM C-01");
  // const [Date] = useState("1/1/2024"); // Set default value if needed
  // const [formateurs] = useState([{ id: 1, value: "Mazen Torra" }]);
  // const [assistants] = useState([{ id: 1, value: "Oussama ben slama" }]);
  // const [receptionists] = useState([{ id: 1, value: "Emna ltaief" }]);
  // const [coffeeBreaks] = useState([
  //   { id: 1, value: "Yosr ghanmi" },
  //   { id: 1, value: "Dhia ben hammouda" },
  // ]);
  // const [logo] = useState("./images/CpuBlack.png");
  const [senior_members, setSeniorMembers] = useState([]);
  useEffect(() => {
    async function fetchMembersData() {
      try {
        let { data: club_members, error } = await supabase
          .from('senior_members')
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
    }

    async function getData() {
      const membersData = await fetchMembersData();
      setSeniorMembers(membersData);
    }
    getData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    // Create a string to hold all the information
    const formData = `
      Formation: ${training?.name}
      Domaine: ${training?.training_branch}
      Local: ${training?.address}
      Date: ${training?.date}
      Formateurs: ${training?.tutors_ids.map((f) => f.value).join(", ")}
      Assistants: ${training?.tutor_assistants_ids.map((a) => a.value).join(", ")}
      Receptionists: ${training?.receptionists_ids.map((r) => r.value).join(", ")}
      Coffee Breaks: ${training?.coffeeBreaks_assistants_ids.map((cb) => cb.value).join(", ")}
    `;
    alert(formData); // Show all the information in an alert
  };
  return (
    <div className="Formulaire">
      <form onSubmit={handleSubmit}>
        <h1 className="Formation-title">Formulaire Du Formation</h1>
        <div className="Field">
          <label>Titre de formation {<GrWorkshop />} :</label>
          <input type="text" value={training?.name} readOnly />
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
                  checked={training?.training_branch === "Developement"}
                  readOnly
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
                  checked={training?.training_branch === "Robotique"}
                  readOnly
                />
                Robotique {<RiRobot2Fill />}
              </label>
            </div>
          </div>
        </div>
        <div className="Field">
          <label>Local {<FaHouse />} :</label>
          <input type="text" value={training?.address} readOnly />
        </div>
        <div className="Field">
          <label>Date {<CiCalendarDate />} :</label>
          <input type="date" value={training.date} readOnly />
        </div>
        {/* Formateur Section */}
        <div className="Field">
          <label>Formateur {<GiTeacher />} :</label>
          {training?.tutor_ids.map((tutor_id, index) => {
            const senior_member = senior_members.filter((m) => m.id === tutor_id)[0];
            const full_name = senior_member?.firstname + " " + senior_member?.lastname;
            return (
              <input
                key={index}
                placeholder="Nom et prénom"
                value={full_name}
                readOnly
              />
            )
          })}
        </div>
        {/* Assistant Section */}
        <div className="Field">
          <label>Assistant {<MdAssistantPhoto />} :</label>
          {training?.tutor_assistants_ids.map((assitant_id, index) => {
            const senior_member = senior_members.filter((m) => m.id === assitant_id)[0];
            const full_name = senior_member?.firstname + " " + senior_member?.lastname;
            return (
              <input
                key={index}
                placeholder="Nom et prénom"
                value={full_name}
                readOnly
              />
            )
          })}
        </div>
        {/* Reception Section */}
        <div className="Field">
          <label>Reception {<FaPersonCircleCheck />} :</label>
          {training?.receptionists_ids.map((receptionist_id, index) => {
            const senior_member = senior_members.filter((m) => m.id === receptionist_id)[0];
            const full_name = senior_member?.firstname + " " + senior_member?.lastname;
            return (
              <input
                key={index}
                placeholder="Nom et prénom"
                value={full_name}
                readOnly
              />
            )
          })}
        </div>
        {/* Pause Café Section */}
        <div className="Field">
          <label>Pause Café {<FaCoffee />} :</label>
          {training?.coffeeBreaks_assistants_ids.map((coffeeBreaks_assistants_id, index) => {
            const senior_member = senior_members.filter((m) => m.id === coffeeBreaks_assistants_id)[0];
            const full_name = senior_member?.firstname + " " + senior_member?.lastname;
            return (
              <input
                key={index}
                placeholder="Nom et prénom"
                value={full_name}
                readOnly
              />
            )
          })}
        </div>
        {training?.logo_url && (
          <div className="Field">
            <h3>Prévisualisation du logo :</h3>
            <img
              src={training?.logo_url}
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