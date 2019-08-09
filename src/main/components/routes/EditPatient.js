import React, { Component } from 'react'
import Layout from '../shared/Layout'
import PatientForm from '../shared/PatientForm'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import { Redirect, withRouter } from 'react-router-dom'
import messages from '../../messages'

class EditPatient extends Component {
  constructor (props) {
    super(props)

    this.state = {
      patient: {
        site: '',
        studyId: '',
        birthDate: '',
        consentDate: ''
      },
      updated: false
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

  // on submit, send a PATCH request to the server
  // set the value of `updated` in the state to `true`
  handleSubmit = async event => {
    event.preventDefault()
    await axios({
      url: `${apiUrl}/patients/${this.props.match.params.id}`,
      method: 'PATCH',
      data: {
        patient: this.state.patient
      },
      headers: {
        Authorization: 'Token token=' + this.props.user.token
      }
    })
    this.setState({ updated: true })
  }

  handleChange = event => {
    const updateField = {
      [event.target.name]: event.target.value
    }

    const editedPatient = Object.assign(this.state.patient, updateField)

    this.setState({ patient: editedPatient })
  }

  // If update successful, return user to the Patient
  // component
  // Else, TODO
  render () {
    const { updated, patient } = this.state
    if (updated) {
      return <Redirect to={`/patients/${this.props.match.params.id}`} />
    }

    return (
      <Layout>
        <PatientForm
          patient={patient}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          cancelPath={`/patients/${this.props.match.params.id}`}
        />
      </Layout>
    )
  }
}

// Wrap with `withRouter` so params can be accessed
export default withRouter(EditPatient)
