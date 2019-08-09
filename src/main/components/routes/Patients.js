import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import Layout from '../shared/Layout'
import messages from '../../messages'

class Patients extends Component {
  constructor (props) {
    super(props)

    this.state = {
      patients: []
    }
  }

  componentDidMount () {
    const { alert } = this.props
    axios({
      method: 'get',
      url: `${apiUrl}/patients`,
      headers: {
        Authorization: 'Token token=' + this.props.user.token
      }
    })
      .then(res => {
        this.setState({ patients: res.data.patients })
      })
      .catch(() => {
        alert(messages.error, 'danger')
      })
  }
  render () {
    const patients = this.state.patients.map(patient => (
      <li key={patient._id}>
        <Link to={'/patients/' + patient._id}>{patient.studyId || 'unknown'}</Link>
      </li>
    ))
    return (
      <Layout>
        <NavLink to ='/create-patient' className="plus">+</NavLink>
        <h3>All Patients: </h3>
        <div className="patient-listing">
          <ul>
            {patients}
          </ul>
        </div>
      </Layout>
    )
  }
}

export default Patients
