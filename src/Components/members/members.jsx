import { useEffect, useState } from "react";
import membersData from "@data/Inscription-CPU 2024.json";
import "./members.css";
import { IoFilter } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
const Members = () => {
  const [showfilter, setshowfilter] = useState(false);
  const [selectedValue, setSelectedValue] = useState("v");

  const [members, setMembers] = useState([]);
  useEffect(() => {
    setMembers(membersData);
  }, []);
  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };
  return (
    <div className="members-container">
      <div>
        <button
          onClick={() => {
            setshowfilter(!showfilter);
          }}
        >
          <IoFilter />
          Filtrer
        </button>
      </div>
      <div>
        {showfilter && (
            <div>
          <div>
            <p>in this view show records</p> <hr></hr>{" "}
            <select
              value={selectedValue}
              onChange={handleSelectChange}
              title="Select an option"
            >
              <option value="v">Option V</option>
              <option value="a">Option A</option>
              <option value="b">Option B</option>
            </select>
            <select
              value={selectedValue}
              onChange={handleSelectChange}
              title="Select an option"
            >
              <option value="v">Option V</option>
              <option value="a">Option A</option>
              <option value="b">Option B</option>
            </select>
            <input></input>
            <button><FaRegTrashAlt /></button>
          </div>
          <div><a>add filter</a></div>
          </div>
        )}
      </div>
      <table className="table table-responsive">
        <thead>
          <tr scope="col">
            {members.length > 0 &&
              Object.keys(members[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr scope="row" key={index}>
              {Object.keys(member).map((key, index) => (
                <td key={index}>{member[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Members;
