import React, { Component } from 'react'
import Layout from '../shared/Layout'
import PatientForm from '../shared/PatientForm'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import messages from '../../messages'

class CreatePatient extends Component {
  constructor (props) {
    super(props)
    this.state = {
      patient: {
        site: '',
        studyId: '',
        birthDate: '',
        consentDate: ''
      },
      createdPatientId: null
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const { alert } = this.props
    axios({
      method: 'post',
      url: `${apiUrl}/patients`,
      data: {
        patient: this.state.patient
      },
      headers: {
        Authorization: 'Token token=' + this.props.user.token
      }
    })
      .then(res => {
        this.setState({ createdPatientId: res.data.patient._id })
      })
      .catch(() => {
        alert(messages.error, 'danger')
        this.setState({
          patient: {
            site: '',
            studyId: '',
            birthDate: '',
            consentDate: ''
          }
        })
      })
  }

  handleChange = event => {
    const updateField = {
      [event.target.name]: event.target.value
    }

    const editedPatient = Object.assign(this.state.patient, updateField)

    this.setState({ patient: editedPatient })
  }
  render () {
    const { createdPatientId, patient } = this.state
    if (createdPatientId) {
      return <Redirect to={`/patients/${createdPatientId}`} />
    }
    return (
      <Layout>
        <PatientForm
          patient={patient}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          cancelPath='/patients'
        />
      </Layout>
    )
  }
}

export default CreatePatient
