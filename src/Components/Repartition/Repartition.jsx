import { useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Repartition.css";
import { FaPrint } from "react-icons/fa";

function Repartition() {
  const [activeTab, setActiveTab] = useState("salle");

  // State to store participant inputs
  const [participantsInputs, setParticipantsInputs] = useState({
    salle: {},
    group: {},
    groupSalle: {},
  });

  const personnelData = [
    { id: 1, prenom: "Mark", nom: "Otto", role: "Formateur" },
    { id: 2, prenom: "Jacob", nom: "Thornton", role: "Formateur" },
    { id: 3, prenom: "Larry", nom: "Smith", role: "Assistant" },
    { id: 4, prenom: "Larry", nom: "the Bird", role: "Assistant" },
  ];

  const participantsSalle = [
    { id: 1, prenom: "Yaakoub", nom: "9amar eddin" },
    { id: 2, prenom: "5aled", nom: "Kachmiri" }
  ];

  const participantsGroup = [
    { id: 1, prenom: "Yaakoub", nom: "9amar eddin", groupe: "" },
    { id: 2, prenom: "5aled", nom: "Kachmiri", groupe: "" }
  ];

  const participantsGroupSalle = [
    { id: 1, prenom: "Yaakoub", nom: "9amar eddin", groupe: "", salle: "" },
    { id: 2, prenom: "5aled", nom: "Kachmiri", groupe: "", salle: "" }
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (id, field, value) => {
    setParticipantsInputs((prevInputs) => ({
      ...prevInputs,
      [activeTab]: {
        ...prevInputs[activeTab],
        [id]: {
          ...prevInputs[activeTab][id],
          [field]: value,
        },
      },
    }));
  };

  const printElement = (elementId) => {
    const printContents = document.getElementById(elementId).innerHTML;
    const newWindow = window.open('', '', 'width=600,height=400');
    newWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        </head>
        <body>
          <table class="table table-striped">
            ${printContents}
          </table>
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  const renderParticipantsTable = () => {
    const participants = activeTab === "salle" ? participantsSalle :
      activeTab === "group" ? participantsGroup :
      participantsGroupSalle;

    return (
      <>
        <table className="table table-striped" id="participantsTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Prenom</th>
              <th>Nom</th>
              {activeTab === "salle" && <th>Salle</th>}
              {activeTab === "group" && <th>Groupe</th>}
              {activeTab === "groupSalle" && (
                <>
                  <th>Groupe</th>
                  <th>Salle</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {participants.map((row) => (
              <tr key={row.id}>
                <th>{row.id}</th>
                <td>{row.prenom}</td>
                <td>{row.nom}</td>
                {activeTab === "salle" && (
                  <td>
                    <input
                      placeholder="Salle"
                      value={participantsInputs.salle[row.id]?.salle || ""}
                      onChange={(e) =>
                        handleInputChange(row.id, "salle", e.target.value)
                      }
                    />
                  </td>
                )}
                {activeTab === "group" && (
                  <td>
                    <input
                      placeholder="Groupe"
                      value={participantsInputs.group[row.id]?.groupe || ""}
                      onChange={(e) =>
                        handleInputChange(row.id, "groupe", e.target.value)
                      }
                    />
                  </td>
                )}
                {activeTab === "groupSalle" && (
                  <>
                    <td>
                      <input
                        placeholder="Groupe"
                        value={participantsInputs.groupSalle[row.id]?.groupe || ""}
                        onChange={(e) =>
                          handleInputChange(row.id, "groupe", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        placeholder="Salle"
                        value={participantsInputs.groupSalle[row.id]?.salle || ""}
                        onChange={(e) =>
                          handleInputChange(row.id, "salle", e.target.value)
                        }
                      />
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-warning" onClick={() => printElement("participantsTable")}>
          <FaPrint /> Print
        </button>
      </>
    );
  };

  return (
    <div>
      <NavBar />
      <div className="Repartition_content">
        <div>
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" onClick={() => handleTabChange("salle")}>
                Repartir par salle
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" onClick={() => handleTabChange("group")}>
                Repartir par Grp
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" onClick={() => handleTabChange("groupSalle")}>
                Repartir par Grp et salle
              </a>
            </li>
          </ul>
        </div>

        <h3 style={{ color: "white" }}>Resources Humaines Senior</h3>
        {/* Static Personnel Table */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Prenom</th>
              <th>Nom</th>
              <th>Role</th>
              <th>Salle</th>
            </tr>
          </thead>
          <tbody>
            {personnelData.map((person) => (
              <tr key={person.id}>
                <th>{person.id}</th>
                <td>{person.prenom}</td>
                <td>{person.nom}</td>
                <td>{person.role}</td>
                <td><input placeholder="Salle" /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ color: "white" }}>Repartition</h3>
        {/* Dynamic Participant Table */}
        {renderParticipantsTable()}
      </div>
    </div>
  );
}

export default Repartition;
