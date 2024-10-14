import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../superbaseClient";
import CircleLoader from "react-spinners/CircleLoader";
import { IoFilter } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";
// import membersData from "@data/Inscription-CPU 2024.json";
// import membersData from "@data/Inscription-CPU 2024-updated.json";
import {IoMdPersonAdd} from "react-icons/io"
import "./members.css";
import NavBar from "../NavBar/NavBar";

const Members = () => {
  const navigate = useNavigate();

  const [fetchingData, setFetchingData] = useState(true);
  const [showfilter, setshowfilter] = useState(false);
  const [filters, setFilters] = useState([{ criteria: "lastname", mode: "Contains", arg: "" }]);
  const [members, setMembers] = useState([]);
  const [Filtredmembers, setFiltredMembers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: 'ascending' });

  useEffect(() => {
    async function fetchMembersData() {
      try {
        let { data: club_members, error } = await supabase
          .from('club_members')
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
      setMembers(membersData);
      setFiltredMembers(membersData);
    }
    setFetchingData(true);
    getData();
    setTimeout(() => setFetchingData(false), 2000);
  }, []);


  // useEffect(() => {
  //   setMembers(membersData);
  //   setFiltredMembers(membersData);
  // }, []);

  const handleDisplayMember = (member) => {

    // Navigate to the member detail page, passing the member's information via state
    navigate(`/members/${member.id}`, { state: { member: member } });

  };

  const filter = (members) => {
    console.log(members)
    try {
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
    } catch {
      return members;
    }
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
    setFilters([...filters, { criteria: "lastname", mode: "Contains", arg: "" }]);
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
    setFilters([{ criteria: "lastname", mode: "Contains", arg: "" }]);
    setSortConfig({ key: null, direction: 'ascending' });
  };

  return (

    <>
    <NavBar></NavBar>
      <div className="members-container">
        <div>
          <button onClick={() => setshowfilter(!showfilter)}>
            <IoFilter />
            Filtrer
          </button>
          <button >
          <IoMdPersonAdd />
            Add Member
          </button>
          
        </div>
        <div>
        
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
                  <option value="lastname">Nom</option>
                  <option value="firstname">Prénom</option>
                  <option value="email">Email</option>
                  <option value="phone_num">Phone</option>
                  <option value="member_type">Adherent</option>
                  <option value="study_lvl">{"Nivau d'étude"}</option>
                  <option value="skills">Skills</option>
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
                <small color="white">({Filtredmembers.length} results found out of {members.length})</small>
                
              </div>
            ))}
            <button onClick={handleAddFilter}>Add Filter</button>
            <button onClick={handleResetFilters}>Reset Filters</button>
          </div>
        </div>
        <table className="custom-table table-responsive">
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
          {Filtredmembers.map((member, memberIndex) => (
  <tr key={memberIndex} onClick={() => handleDisplayMember(member)}>
    {Object.keys(member).map((key, keyIndex) => (
      <td key={keyIndex}>
        {keyIndex === 5
          ? member[key] === 1
            ? "Actif"
            : member[key] === 2
            ? "Aderant"
            : "Externe"
          : member[key]}
      </td>
    ))}
  </tr>
))}


           
          </tbody>
        </table>
      </div>
      <div className="loading-container">
        <CircleLoader
          color="#fff"
          loading={fetchingData}
          size={250}
          speedMultiplier={3}
        />
      </div>
    </>

  );
};

export default Members;
