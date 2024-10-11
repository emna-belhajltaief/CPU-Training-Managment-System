import NavBar from "../NavBar/NavBar";
import "./Repartition.css"

function Repatition() {

  

  return (
    <div>
      <NavBar></NavBar>
      <div className="Repartition_content">
        <div>
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#">
                Repartir par salle
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Repartir par Grp
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Repartir par Grp et salle
              </a>
            </li>
          </ul>
        </div>

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
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td><input></input></td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td><input></input></td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td><input></input></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Repatition;
