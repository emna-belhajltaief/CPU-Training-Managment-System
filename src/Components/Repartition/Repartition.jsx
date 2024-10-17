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
          .select(`*, club_members (*)`)
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



  const handleUpdate = async (id) => {
    const clubMemberToUpdate = clubMembers.find((cm) => cm.id === id);
    const newClubMembers = originalClubMembers.map((ocm) => ocm.id === id ? clubMemberToUpdate : ocm);

    try {
      const { error } = await supabase
        .from('training_participation')
        .update({
          groupe: clubMemberToUpdate.groupe,
          salle: clubMemberToUpdate.salle,
        })
        .eq('id', id);

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
          return {
            ...member,
            [field]: value
          };
        }
        return member;
      })
    )
  };



  const printElement = (elementId) => {
    const printContents = document.getElementById(elementId).innerHTML;
    const newWindow = window.open("", "", "width=600,height=400");
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


  return (
    <div>
      <NavBar />
      <CircleLoader color="#000" loading={loading} size={150} />
      <div className="Repartition_content">
        <div className="d-flex">
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
              clubMembers.map((participant) => (
                <tr key={participant.id}>
                  <td>{participant.id}</td>
                  <td>{participant.firstname}</td>
                  <td>{participant.lastname}</td>
                  <td>{participant.email}</td>
                  <td>
                    <input type="text" name="groupe" value={participant.groupe} onChange={
                      (e) => handleInputChange(participant.id, "groupe", e.target.value)
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
                      disabled={_.isEqual(participant, originalClubMembers.find((cm) => cm.id === participant.id))}
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
