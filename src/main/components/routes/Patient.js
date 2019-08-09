import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import Layout from '../shared/Layout'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import messages from '../../messages'

class Patient extends Component {
  constructor (props) {
    super(props)
    this.state = {
      patient: null,
      deleted: false
    }
  }
  componentDidMount () {
    const { alert } = this.props
    axios({
      method: 'get',
      url: `${apiUrl}/patients/${this.props.match.params.id}`,
      headers: {
        Authorization: 'Token token=' + this.props.user.token
      }
    })
      .then(res => {
        this.setState({ patient: res.data.patient })
      })
      .catch(() => {
        alert(messages.error, 'danger')
      })
  }

  destroy = () => {
    axios({
      method: 'delete',
      url: `${apiUrl}/patients/${this.props.match.params.id}`,
      headers: {
        Authorization: 'Token token=' + this.props.user.token
      }
    })
      .then(res => {
        this.setState({ deleted: true })
      })
      // handle the loading... message for deleted patients
      .catch(console.error)
  }

  render () {
    const { patient, deleted } = this.state

    if (!patient) {
      return (
        <Layout>
          <p>Loading...</p>
        </Layout>
      )
    }

    if (deleted) {
      return <Redirect to={
        { pathname: '/patients', state: { msg: 'Patient successfully deleted' } }
      } />
    }

    return (
      <Layout>
        <h3>Patient Info</h3>
        <p><b>Patient{'\''}s Study ID: </b>{patient.studyId || 'unknown'}</p>
        <p><b>Site Number: </b>{patient.site || 'Unknown'}</p>
        <p><b>Date of Birth: </b>{patient.birthDate || 'Unknown'}</p>
        <p><b>Date of Informed Consent: </b>{patient.consentDate || 'Unknown'}</p>
        <button className="formButton" onClick={() => this.destroy(patient._id)}>Delete This Patient</button>
        <Link className = "formButton" to={'/patients/' + patient._id + '/edit'}>Edit Patient Information
        </Link>
        <Link to='/patients' className="formButton">Back to all patients</Link>
        <br />
        <br />
        <h3>Assessments For This Patient</h3>
        <Link className = "formButton" to={{
          pathname: `/patients/${patient._id}/physicals`,
          state: {
            patient
          }
        }}>Physical Exams
        </Link>
      </Layout>
    )
  }
}

export default withRouter(Patient)
