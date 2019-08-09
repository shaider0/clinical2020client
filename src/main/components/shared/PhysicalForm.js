import React from 'react'
import { Link } from 'react-router-dom'

const PhysicalForm = ({ cancelPath, physical, handleSubmit, handleChange }) => (

  <form onSubmit={handleSubmit}>
    <label>Date of Observation</label>
    <input
      name="date"
      type="string"
      value={physical.date}
      onChange={handleChange}
    />
    <span className="physical-units">Format: MM/DD/YYYY</span>
    <br/>
    <label>Height</label>
    <input
      name="height"
      type="number"
      value={physical.height}
      onChange={handleChange}
      min="0"
      max="100"
    />
    <span className="physical-units">inches</span>
    <br/>
    <label>Weight</label>
    <input
      name="weight"
      type="number"
      value={physical.weight}
      onChange={handleChange}
      min="0"
      max="500"
    />
    <span className="physical-units">lbs</span>
    <br/>
    <label>Blood Pressure</label>
    <input
      name="bloodPressure"
      type="text"
      value={physical.bloodPressure}
      onChange={handleChange}
    />
    <span className="physical-units">mmHg</span>
    <br/>
    <label>Heart Rate</label>
    <input
      name="heartRate"
      type="Number"
      value={physical.heartRate}
      onChange={handleChange}
      min="0"
      max="200"
    />
    <span className="physical-units">beats per minute</span>
    <br/>
    <button className = "formButton" type="submit">Submit</button>
    <Link className = "formButton" to={cancelPath}>Cancel</Link>
  </form>
)

export default PhysicalForm
