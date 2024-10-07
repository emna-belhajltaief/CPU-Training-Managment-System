import { useEffect, useState } from "react";
import membersData from "@data/Inscription-CPU 2024.json";
import "./members.css";
import { IoFilter } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";

const Members = () => {
  const [showfilter, setshowfilter] = useState(false);
  const [filters, setFilters] = useState([{ criteria: "Nom", mode: "Equals", arg: "" }]);
  const [members, setMembers] = useState([]);
  const [Filtredmembers, setFiltredMembers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    setMembers(membersData);
    setFiltredMembers(membersData);
  }, []);

  const filter = (members) => {
    return members.filter(member => {
      return filters.every(({ criteria, mode, arg }) => {
        const value = member[criteria];
        if (value === undefined) return false;
        if (arg === "") return true;

        switch (mode) {
          case "Ends with":
            return value.toString().endsWith(arg);
          case "Starts with":
            return value.toString().startsWith(arg);
          case "Equals":
            if (typeof value === 'boolean') {
              return value === (arg === 'true');
            }
            return value.toString() === arg;
          case "Contains":
            return value.toString().includes(arg);
          default:
            return true;
        }
      });
    });
  };

  const sortMembers = (members) => {
    let sortedMembers = [...members];
    if (sortConfig.key) {
      sortedMembers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedMembers;
  };

  useEffect(() => {
    const filtered = filter(members);
    const sorted = sortMembers(filtered);
    setFiltredMembers(sorted);
  }, [filters, members, sortConfig]);

  const handleAddFilter = () => {
    setFilters([...filters, { criteria: "Nom", mode: "Equals", arg: "" }]);
  };

  const handleFilterChange = (index, field, value) => {
    const newFilters = [...filters];
    newFilters[index][field] = value;
    setFilters(newFilters);
  };

  const handleRemoveFilter = (index) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleResetFilters = () => {
    setFilters([{ criteria: "Nom", mode: "Equals", arg: "" }]);
    setSortConfig({ key: null, direction: 'ascending' });
  };

  return (
    <div className="members-container">
      <div>
        <button onClick={() => setshowfilter(!showfilter)}>
          <IoFilter />
          Filtrer
        </button>
      </div>
      <div className={`filter-menu ${showfilter ? 'open' : ''}`}>
        <div>
          {filters.map((filter, index) => (
            <div className="filter-row" key={index}>
              <select
                value={filter.criteria}
                onChange={(e) => handleFilterChange(index, 'criteria', e.target.value)}
                title="Select an option"
              >
                <option value="Nom">Nom</option>
                <option value="Prénom">Prénom</option>
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="Adherent">Adherent</option>
                <option value="Nivau d'étude">{"Nivau d'étude"}</option>
                <option value="Skills">Skills</option>
              </select>
              <select
                value={filter.mode}
                onChange={(e) => handleFilterChange(index, 'mode', e.target.value)}
                title="Select an option"
              >
                <option value="Equals">Equals</option>
                <option value="Contains">Contains</option>
                <option value="Starts with">Starts with</option>
                <option value="Ends with">Ends with</option>
              </select>
              <input
                value={filter.arg}
                onChange={(e) => handleFilterChange(index, 'arg', e.target.value)}
              />
              <button onClick={() => handleRemoveFilter(index)}>
                <FaRegTrashAlt />
              </button>
            </div>
          ))}
          <button onClick={handleAddFilter}>Add Filter</button>
          <button onClick={handleResetFilters}>Reset Filters</button>
        </div>
      </div>
      <table className="table table-responsive">
        <thead>
          <tr>
            {Filtredmembers.length > 0 &&
              Object.keys(members[0]).map((key, index) => (
                <th key={index} onClick={() => handleSort(key)}>
                  {key} {sortConfig.key === key ? (sortConfig.direction === 'ascending' ? <FaSortAmountUp /> : <FaSortAmountDownAlt />) : ''}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {Filtredmembers.map((member, index) => (
            <tr key={index}>
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
