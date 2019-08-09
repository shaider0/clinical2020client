import React from 'react'
import { Link } from 'react-router-dom'

const PatientForm = ({ cancelPath, patient, handleSubmit, handleChange }) => (

  <form onSubmit={handleSubmit}>
    <label>Site Number:</label>
    <input
      name="site"
      type="text"
      value={patient.site}
      onChange={handleChange}
    />
    <label>Study ID:</label>
    <input
      name="studyId"
      type="text"
      value={patient.studyId}
      onChange={handleChange}
    />
    <label>Date of Birth:</label>
    <input
      name="birthDate"
      type="text"
      value={patient.birthDate}
      onChange={handleChange}
    />
    <label>Date Informed Consent Given:</label>
    <input
      name="consentDate"
      type="text"
      value={patient.consentDate}
      onChange={handleChange}
    />
    <button className = "formButton" type="submit">Enroll Patient</button>
    <Link className = "formButton" to={cancelPath}>Cancel</Link>
  </form>
)

export default PatientForm
