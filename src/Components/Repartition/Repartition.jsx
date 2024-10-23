import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";
import toast from "react-hot-toast";
import NavBar from "../NavBar/NavBar";
import supabase from "../../../superbaseClient";
import CircleLoader from "react-spinners/CircleLoader";
import { FaPrint } from "react-icons/fa";
import "./Repartition.css";

function Repartition() {
  const { formationId } = useParams();
  const [loading, setLoading] = useState(false);
  const [originalClubMembers, setOriginalClubMembers] = useState([]);
  const [clubMembers, setClubMembers] = useState([]);

  useEffect(() => {
    const fetchClubMembersData = async () => {
      try {
        const { data: clubMembers, error } = await supabase
          .from("training_participation")
          .select(`*, Active_Members (*)`)
          .eq("training_id", formationId);

        if (error) {
          console.error("Error fetching club_members:", error);
          return [];
        }
        const formattedClubMembers = clubMembers.map(({ club_members, ...rest }) => {
          return {
            ...club_members, ...rest
          }
        });
        return formattedClubMembers;
      } catch (err) {
        console.error("Error fetching data:", err);
        return [];
      }
    };

    const getData = async () => {
      setLoading(true);
      const membersData = await fetchClubMembersData();
      setOriginalClubMembers(membersData);
      setClubMembers(membersData);
      console.log("Fetched members data:", membersData);
      setLoading(false);
    };

    getData();
  }, [formationId]);



  const handleUpdate = async (participantId) => {
    const clubMemberToUpdate = clubMembers.find((cm) => cm.id === participantId);
    const newClubMembers = originalClubMembers.map((ocm) => ocm.id === participantId ? clubMemberToUpdate : ocm);
    console.log(clubMemberToUpdate.groupe)
    try {
      const { error } = await supabase
        .from('training_participation')
        .update({
          groupe: clubMemberToUpdate.groupe,
          salle: clubMemberToUpdate.salle,
        })
        .eq('id', participantId);

      if (error) {
        console.error('Error updating attendee:', error.message);
        toast.error('Error updating attendee');
      } else {
        toast.success('Attendee updated successfully');
        setOriginalClubMembers(newClubMembers);
      }
    } catch (err) {
      console.error('Error updating attendee:', err);
      toast.error('Error updating attendee');
    }
  };

  const handleInputChange = (id, field, value) => {
    setClubMembers(
      clubMembers.map((member) => {
        if (member.id === id) {
          member = {
            ...member,
            [field]: value
          };
        }
        return member;
      })
    )
  };



  const printElement = () => {
    const newWindow = window.open("", "", "width=600,height=400");
    // Generate the table rows by mapping over the clubMembers array
    const tableRows = clubMembers.map(participant => {
      return `
      <tr>
      <td>${participant.Active_Members.FirstName}</td>
      <td>${participant.Active_Members.LastName}</td>
      <td>${participant.groupe ? participant.groupe : ""}</td>
      <td>${participant.salle ? participant.salle : ""}</td>
      </tr>
      `;
    }).join("");
    
    // Write the full HTML content to the new window
    newWindow.document.write(`
      <html>
      <head>
      <title>Print</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
      </head>
      <body>
      <b>Liste de présence</b>
      <table class="table table-striped">
      <thead>
      <tr>
      <th>Prenom</th>
      <th>Nom</th>
      <th>Groupe</th>
      <th>Salle</th>
      </tr>
      </thead>
      <tbody>
      ${tableRows}
      </tbody>
      </table>
      </body>
      </html>
      `);
      newWindow.document.close();
      newWindow.print();
      newWindow.close();
  };


  return (
    <div>
      <NavBar />
      <CircleLoader color="#000" loading={loading} size={150} />
      <div className="Repartition_content">
        <div className="d-flex flex-row justify-content-between me-2 ms-2 p-1">
          <h3 style={{ color: "white" }}>Repartition</h3>
          <button className="btn btn-warning" onClick={() => printElement("participantsTable")}>
            <FaPrint /> Print
          </button>
        </div>
        {/* Dynamic Participant Table */}
        <table className="table table-striped" id="participantsTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Prenom</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Groupe</th>
              <th>Salle</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              clubMembers.map((participant, index) => (
                <tr key={participant.id}>
                  <td>{index+1}</td>
                  <td>{participant.Active_Members.FirstName}</td>
                  <td>{participant.Active_Members.LastName}</td>
                  <td>{participant.Active_Members.Email}</td>
                  <td>
                    <input type="text" name="groupe" value={participant.groupe} onChange={
                      (e) => {
                        handleInputChange(participant.id, "groupe", e.target.value)
                      console.log(participant.id.groupe)}
                    } />
                  </td>
                  <td>
                    <input type="text" name="salle" value={participant.salle}
                      onChange={
                        (e) => handleInputChange(participant.id, "salle", e.target.value)
                      } />
                  </td>
                  <td>
                    <button
                      className={"btn " + (!_.isEqual(participant, originalClubMembers.find((cm) => cm.id === participant.id)) ? "btn-secondary" : "btn-outline-secondary")}
                      disabled={_.isEqual(participant, originalClubMembers.find((cm) => cm.ID === participant.id))}
                      onClick={() => handleUpdate(participant.id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div >
  );
}

export default Repartition;
