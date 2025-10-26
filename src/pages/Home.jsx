// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/api";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

const Home = () => {
  //required useStates
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  //useEffect to load the api data as soo as the page renders
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError("⚠️ Failed to fetch users. Please try again later.");
      }
    };
    loadUsers();
  }, []);

  //filtering names with the search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //deciding number of users per page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  //functions for page navigation or paginarion
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        User Data Table
      </h1>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> 
          <Table users={currentUsers} />
          <Pagination
            currentPage={currentPage}
            totalUsers={filteredUsers.length}
            usersPerPage={usersPerPage}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </>
      )}
    </div>
  );
};

export default Home;
