import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import supabase from '../../../superbaseClient';
import _ from 'lodash';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';

const CheckIn = () => {
  const location = useLocation();
  const { training } = location.state;
  const [originalFormationAttendees, setOriginalFormationAttendees] = useState([]);
  const [formationAttendees, setFormationAttendees] = useState([]);

  useEffect(() => {
    const fetchFormationAttendees = async () => {
      try {
        // Fetching training participation data
        const { data: formations, error } = await toast.promise(
          supabase
            .from("training_participation")
            .select(
              `
              *,
              club_members (
                *
              )`
            )
            .eq("training_id", training.id),
          {
            loading: 'Loading',
            success: 'Trainings fetched successfully',
            error: 'Error fetching trainings',
          }
        );

        if (error) {
          console.log("Error fetching trainings", error.message);
          return;
        }

        const updatedFormation = formations.map(({ club_members, ...rest }) => {
          return {
            ...rest,
            ...club_members,
          };
        });
        setFormationAttendees(updatedFormation);
        setOriginalFormationAttendees(updatedFormation);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchFormationAttendees();
  }, [training.id]);

  // Handler to toggle the checkbox state for "Adherent" or "Paid"
  const handleCheckboxChange = (id, field) => {
    if (field === 'member_type') {
      const updatedFormationAttendees = formationAttendees.map((fa) =>
        fa.id === id
          ? fa.member_type === 2
            ? { ...fa, member_type: 1 }
            : { ...fa, member_type: 2 }
          : fa
      );
      setFormationAttendees(updatedFormationAttendees);
    } else {
      const updatedFormationAttendees = formationAttendees.map((fa) =>
        fa.id === id ? { ...fa, [field]: !fa[field] } : fa
      );
      setFormationAttendees(updatedFormationAttendees);
    }
  };

  // Handler to delete a user with confirmation
  const handleDelete = (id) => {
    const formationAttendee = formationAttendees.find((fa) => fa.id === id);
    const confirmDelete = window.confirm(`Are you sure you want to delete ${formationAttendee.lastname} ${formationAttendee.firstname}?`);
    if (confirmDelete) {
      const updatedFormationAttendees = formationAttendees.filter((fa) => fa.id !== id);
      setFormationAttendees(updatedFormationAttendees);
    }
  };

  // Handler to update an attendee's information in the database
  const handleUpdate = async (id) => {
    const attendeeToUpdate = formationAttendees.find((fa) => fa.id === id);
    const newFormationAttendees = originalFormationAttendees .map((ofa) => ofa.id === id ? attendeeToUpdate : ofa);
    try {
      const { error } = await supabase
        .from('training_participation')
        .update({
          is_present: attendeeToUpdate.is_present,
          member_type: attendeeToUpdate.member_type,
          has_paid: attendeeToUpdate.has_paid,
        })
        .eq('id', id);

      if (error) {
        console.error('Error updating attendee:', error.message);
        toast.error('Error updating attendee');
      } else {
        toast.success('Attendee updated successfully');
        setOriginalFormationAttendees(newFormationAttendees);
      }
    } catch (err) {
      console.error('Error updating attendee:', err);
      toast.error('Error updating attendee');
    }
  };

  return (
    <div className="user-table-container">
      <h4 style={{ color: 'aliceblue' }}>Check In List : </h4>
      <table className="custom-table table-responsive">
        <thead>
          <tr>
            <th>Presence</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Phone</th>
            <th>Mail</th>
            <th>Adherent</th>
            <th>Paid</th>
            <th>Delete</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          {formationAttendees.map((formationAttendee, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox"
                  checked={formationAttendee.is_present}
                  onChange={() => handleCheckboxChange(formationAttendee.id, 'is_present')}
                />
              </td>
              <td>{formationAttendee.lastname}</td>
              <td>{formationAttendee.firstname}</td>
              <td>{formationAttendee.phone_num}</td>
              <td>{formationAttendee.email}</td>
              <td>
                <input
                  type="checkbox"
                  disabled={formationAttendee.member_type === 0}
                  checked={formationAttendee.member_type === 2}
                  onChange={() => handleCheckboxChange(formationAttendee.id, 'member_type')}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={formationAttendee.has_paid}
                  onChange={() => handleCheckboxChange(formationAttendee.id, 'has_paid')}
                />
              </td>
              <td>
                <FaTrashAlt
                  className="delete-icon"
                  onClick={() => handleDelete(formationAttendee.id)}
                />
              </td>
              <td>
                <button
                  className={"btn " + (!_.isEqual(formationAttendee, originalFormationAttendees.find((fa) => fa.id === formationAttendee.id)) ? "btn-secondary" : "btn-outline-secondary")}
                  onClick={() => handleUpdate(formationAttendee.id)}
                  disabled={
                    _.isEqual(formationAttendee, originalFormationAttendees.find((fa) => fa.id === formationAttendee.id))
                  }
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CheckIn;
