import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
} from "@coreui/react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "src/utils/firebase";

function Event() {
  const [validated, setValidated] = useState(false);
  const [eventData, setEventData] = useState({ role: "participant" });
  const [society, setSociety] = useState([]);
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (form.checkValidity() !== false) {
      try {
        await addDoc(collection(db, "event"), {
          ...eventData,
        });
      } catch (e) {
        console.error("error", e);
      }
    }
  };

  useEffect(() => {
    const getSocieties = async () => {
      let societyArray = [];
      const societies_refs = await getDocs(collection(db, "society"));
      societies_refs.forEach((society) =>
        societyArray.push(society.data()?.name)
      );
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
            setEventData({ ...eventData, society: e.target.value });
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
        <CFormLabel htmlFor="validationCustom01">Event Name</CFormLabel>
        <CFormInput
          type="name"
          id="validationCustom01"
          defaultValue=""
          required
          onChange={(e) => {
            setEventData({ ...eventData, name: e.target.value });
          }}
        />
        <CFormFeedback invalid>Enter name of the event.</CFormFeedback>
      </CCol>
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustomUsername">Event Date</CFormLabel>
        <CFormInput
          type="date"
          id="validationCustomUsername"
          defaultValue=""
          aria-describedby="inputGroupPrepend"
          required
          onChange={(e) => {
            setEventData({ ...eventData, date: e.target.value });
          }}
        />
        <CFormFeedback invalid>Enter date of the event.</CFormFeedback>
      </CCol>
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom03">Event Start Timing</CFormLabel>
        <CFormInput
          type="time"
          id="validationCustom03"
          required
          onChange={(e) => {
            setEventData({
              ...eventData,
              time: e.target.value,
            });
          }}
        />
        <CFormFeedback invalid>Enter Start Timing of the event.</CFormFeedback>
      </CCol>
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom04">Event Type</CFormLabel>
        <CFormSelect
          id="validationCustom04"
          onChange={(e) => {
            setEventData({ ...eventData, eventType: e.target.value });
          }}
        >
          <option disabled selected>
            Choose...
          </option>
          <option>Sports</option>
          <option>Educational</option>
          <option>Cultural</option>
          <option>Other</option>
        </CFormSelect>
        <CFormFeedback invalid>Select type of the Event.</CFormFeedback>
      </CCol>
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustom05">Event Venue</CFormLabel>
        <CFormInput
          type="text"
          id="validationCustom05"
          required
          onChange={(e) => {
            setEventData({ ...eventData, venue: e.target.value });
          }}
        />
        <CFormFeedback invalid>
          Please provide a venue for the Event.
        </CFormFeedback>
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
