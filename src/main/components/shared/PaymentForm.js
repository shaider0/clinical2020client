import React from 'react'
import { Link } from 'react-router-dom'

const PaymentForm = ({ cancelPath, payment, handleSubmit, handleChange, completedFields }) => (

  <form onSubmit={handleSubmit}>
    <label>Date</label>
    <input
      name="date"
      type="string"
      value={payment.date}
      onChange={handleChange}
    />
    <label>Number of Fields Completed</label>
    <input
      name="completedFields"
      type="number"
      value={payment.completedFields}
      onChange={handleChange}
    />
    <label>Assumed Minutes Per Field</label>
    <input
      name="minutesPerField"
      type="number"
      value={payment.minutesPerField}
      onChange={handleChange}
    />
    <label>Billable Hours</label>
    <input
      name="billableHours"
      type="number"
      value={payment.billableHours}
      onChange={handleChange}
    />
    <label>Hourly Rate For Data Entry</label>
    <input
      name="hourlyRate"
      type="number"
      value={payment.hourlyRate}
      onChange={handleChange}
    />
    <label>Invoice Total</label>
    <input
      name="invoiceTotal"
      type="number"
      value={payment.invoiceTotal}
      onChange={handleChange}
    />
    <button className = "formButton" type="submit">Submit</button>
    <Link className = "formButton" to={cancelPath}>Cancel</Link>
  </form>
)

export default PaymentForm
