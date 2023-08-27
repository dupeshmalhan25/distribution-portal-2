import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "src/utils/firebase";

const Dashboard = () => {
  const [user, setSociety] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getSocieties = async () => {
      let societyArray = [];
      const societies_refs = await getDocs(collection(db, "users"));
      societies_refs.forEach((society) => societyArray.push(society.data()));
      setSociety(societyArray);
    };
    getSocieties();
  }, []);
  useEffect(() => {
    const getEvents = async () => {
      let societyArray = [];
      const societies_refs = await getDocs(collection(db, "event"));
      societies_refs.forEach((society) => societyArray.push(society.data()));
      setEvents(societyArray);
    };
    getEvents();
  }, []);
  console.log(events, user);
  return (
    <>
      <table>
        <tr>
          <th>Society Name</th>
          <th>Event Name</th>
          <th>No. of Participants</th>
          <th>Date</th>
        </tr>
        {events.map(({ name, date, society }) => (
          <tr>
            <td>{society}</td>
            <td>{name}</td>
            <td>
              {user?.filter((user) => user.eventParticipated === name)?.length}
            </td>
            <td>{date}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Dashboard;
