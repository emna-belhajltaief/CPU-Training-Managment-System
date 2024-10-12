import  { useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Repartition.css";

function Repartition() {
  const [activeTab, setActiveTab] = useState("salle");

  // Data for each tab
  const salleData = [
    { id: 1, prenom: "yaakoub", nom: "Otto", salle: "" },
    { id: 2, prenom: "hassen", nom: "Thornton", salle: "" },
    { id: 3, prenom: "salem", nom: "the Bird", salle: "" },
  ];

  const groupData = [
    { id: 1, prenom: "Mark", nom: "Otto", groupe: "" },
    { id: 2, prenom: "Jacob", nom: "Thornton", groupe: "" },
    { id: 3, prenom: "Larry", nom: "Smith", groupe: "" },
  ];

  const groupSalleData = [
    { id: 1, prenom: "Mark", nom: "Otto", groupe: "", salle: "" },
    { id: 2, prenom: "Jacob", nom: "Thornton", groupe: "", salle: "" },
    { id: 3, prenom: "Larry", nom: "Smith", groupe: "", salle: "" },
  ];

  // Handler for changing active tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Render data based on active tab
  const renderTable = () => {
    if (activeTab === "salle") {
      return (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Prenom</th>
              <th scope="col">Nom</th>
              <th scope="col">Salle</th>
            </tr>
          </thead>
          <tbody>
            {salleData.map((row) => (
              <tr key={row.id}>
                <th scope="row">{row.id}</th>
                <td>{row.prenom}</td>
                <td>{row.nom}</td>
                <td><input placeholder="Salle"></input></td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (activeTab === "group") {
      return (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Prenom</th>
              <th scope="col">Nom</th>
              <th scope="col">Groupe</th>
            </tr>
          </thead>
          <tbody>
            {groupData.map((row) => (
              <tr key={row.id}>
                <th scope="row">{row.id}</th>
                <td>{row.prenom}</td>
                <td>{row.nom}</td>
                <td><input placeholder="Groupe"></input></td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (activeTab === "groupSalle") {
      return (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Prenom</th>
              <th scope="col">Nom</th>
              <th scope="col">Groupe</th>
              <th scope="col">Salle</th>
            </tr>
          </thead>
          <tbody>
            {groupSalleData.map((row) => (
              <tr key={row.id}>
                <th scope="row">{row.id}</th>
                <td>{row.prenom}</td>
                <td>{row.nom}</td>
                <td><input placeholder="Groupe"></input></td>
                <td><input placeholder="Salle"></input></td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
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
        <h3 style={{color:"white"}}>Resources Humaines Sinior </h3>

<table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Prenom</th>
      <th scope="col">Nom</th>
      <th scope="col">Role</th>
      <th scope="col">Salle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>Formateur</td>
      <td><input></input></td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>formateur</td>
      <td><input></input></td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>Smith</td>
      <td>assistant</td>
      <td><input></input></td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>assistant</td>
      <td><input></input></td>
    </tr>
  </tbody>
</table>
        <h3 style={{color:"white"}}>Repartition</h3>
        {/* Render the correct table based on activeTab */}
        {renderTable()}

        <button className="btn btn-warning">Print</button>
      </div>
    </div>
  );
}

export default Repartition;
