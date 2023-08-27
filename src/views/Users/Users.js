import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
} from "@coreui/react";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "src/utils/firebase";

function Event() {
  const [validated, setValidated] = useState(false);
  const [userData, setUserData] = useState({ role: "participant" });
  const [society, setSociety] = useState([]);
  const [eventArray, setEventArray] = useState([]);
  const [selectedSociety, setSelectedSociety] = useState("");
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (form.checkValidity() !== false) {
      try {
        await addDoc(collection(db, "users"), {
          ...userData,
        });
      } catch (e) {
        console.error("error", e);
      }
    }
  };

  useEffect(() => {
    const getEvents = async () => {
      let eventsArray = [];
      const q = query(
        collection(db, "event"),
        where("society", "==", selectedSociety)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        eventsArray.push(doc.data());
      });
      setEventArray(eventsArray);
    };
    getEvents();
  }, [selectedSociety]);

  useEffect(() => {
    const getSocieties = async () => {
      let societyArray = [];
      const societies_refs = await getDocs(collection(db, "society"));
      societies_refs.forEach((society) => {
        return societyArray.push(society.data()?.name);
      });
      setSociety(societyArray);
    };
    getSocieties();
  }, []);

  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom04">Society Name</CFormLabel>
        <CFormSelect
          id="validationCustom04"
          onChange={(e) => {
            setSelectedSociety(e.target.value);
          }}
        >
          <option disabled selected>
            Choose...
          </option>
          {society?.length &&
            society?.map((society) => <option>{society}</option>)}
          {/* <option>SCIE</option>
          <option>CSI</option>
          <option>ISTE</option>
          <option>Cultural Committee</option>
          <option>Radio</option>
          <option>CML</option>
          <option>NSS</option>
          <option>NCC</option> */}
        </CFormSelect>
        <CFormFeedback invalid>Select type of the Event.</CFormFeedback>
      </CCol>
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom04">
          Event Participated in
        </CFormLabel>
        <CFormSelect
          id="validationCustom04"
          onChange={(e) => {
            setUserData({ ...userData, eventParticipated: e.target.value });
          }}
        >
          <option disabled selected>
            Choose...
          </option>
          {eventArray?.length &&
            eventArray?.map((event) => <option>{event.name}</option>)}
        </CFormSelect>
        <CFormFeedback invalid>Select your year.</CFormFeedback>
      </CCol>
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
            setUserData({ ...userData, universityRollNo: e.target.value });
          }}
        />
        <CFormFeedback invalid>
          Enter your University Roll Number.
        </CFormFeedback>
      </CCol>
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustomUsername">Name</CFormLabel>
        <CFormInput
          type="text"
          id="validationCustomUsername"
          defaultValue=""
          aria-describedby="inputGroupPrepend"
          required
          onChange={(e) => {
            setUserData({ ...userData, name: e.target.value });
          }}
        />
        <CFormFeedback invalid>Enter your name.</CFormFeedback>
      </CCol>
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom03">Class</CFormLabel>
        <CFormInput
          type="text"
          id="validationCustom03"
          required
          onChange={(e) => {
            setUserData({
              ...userData,
              class: e.target.value.toLocaleUpperCase(),
            });
          }}
        />
        <CFormFeedback invalid>Enter your class.</CFormFeedback>
      </CCol>
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom04">Year</CFormLabel>
        <CFormSelect
          id="validationCustom04"
          onChange={(e) => {
            setUserData({ ...userData, year: e.target.value });
          }}
        >
          <option disabled selected>
            Choose...
          </option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </CFormSelect>
        <CFormFeedback invalid>Select your year.</CFormFeedback>
      </CCol>
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom05">Branch</CFormLabel>
        <CFormInput
          type="text"
          id="validationCustom05"
          required
          onChange={(e) => {
            setUserData({ ...userData, branch: e.target.value });
          }}
        />
        <CFormFeedback invalid>Please provide a valid Branch.</CFormFeedback>
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          Submit form
        </CButton>
      </CCol>
    </CForm>
  );
}

export default Event;
