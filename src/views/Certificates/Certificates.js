import React, { useEffect, useState } from "react";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
} from "@coreui/react";
import db from "src/utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function Certificates() {
  const [validated, setValidated] = useState(false);
  const [userData, setUserData] = useState("");
  const [userArray, setUserArray] = useState([]);
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (form.checkValidity() !== false) {
      try {
        const getEvents = async () => {
          let usersArray = [];
          const q = query(
            collection(db, "users"),
            where("universityRollNo", "==", userData)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            usersArray.push(doc.data());
          });
          setUserArray(usersArray);
        };
        getEvents();
      } catch (e) {
        console.error("error", e);
      }
    }
  };

  useEffect(() => {
    console.log("user", userArray);
  }, [userArray]);

  return (
    <>
      <CForm
        className="row g-3 needs-validation"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <CCol md={12}>
          <CFormLabel htmlFor="validationCustom01">
            Univerity Roll Number
          </CFormLabel>
          <CFormInput
            type="number"
            id="validationCustom01"
            defaultValue=""
            required
            onChange={(e) => {
              setUserData(e.target.value);
            }}
          />
          <CFormFeedback invalid>
            Enter your University Roll Number.
          </CFormFeedback>
        </CCol>
        <CCol xs={12}>
          <CButton color="primary" type="submit">
            Submit form
          </CButton>
        </CCol>
      </CForm>
      <CCol xs={12}>
        {userArray?.length > 0 && (
          <>
            <br />
            <h2>User Info</h2>
            <CCol xs={12}>
              <h5>Name: {userArray[0]?.name}</h5>
              <h5>Class: {userArray[0]?.class}</h5>
              <br />
            </CCol>
          </>
        )}
      </CCol>
      <CCol xs={12}>
        <br />
        {userArray?.length > 0 && <h2>Certificates</h2>}
        {userArray?.length > 0 &&
          userArray.map((user, index) => (
            <CCol xs={12}>
              <h4>
                {index}. Event Name:{" "}
                {user.eventParticipated.toLocaleUpperCase()}
              </h4>
              <h5>Position attained:{user.position}</h5>
              <br />
            </CCol>
          ))}
      </CCol>
      <CCol xs={12}>
        <br />
        {userArray?.length === 0 && <h2>No Results Available</h2>}
      </CCol>
    </>
  );
}

export default Certificates;
