import React, { Component } from 'react'
import Layout from '../shared/Layout'
import PhysicalForm from '../shared/PhysicalForm'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import messages from '../../messages'

class CreatePhysical extends Component {
  constructor (props) {
    super(props)
    this.state = {
      physical: {
        date: '',
        height: '',
        weight: '',
        bloodPressure: '',
        heartRate: ''
      },
      createdPhysicalId: null,
      patient: this.props.match.params.id,
      patientObj: this.props.location.state.patient
    }
  }
  handleSubmit = event => {
    event.preventDefault()
    const { alert } = this.props
    axios({
      method: 'post',
      url: `${apiUrl}/physicals`,
      data: {
        physical: this.state.physical,
        patient: this.state.patient
      },
      headers: {
        Authorization: 'Token token=' + this.props.user.token
      }
    })
      .then(res => {
        this.setState({ createdPhysicalId: res.data.physical._id })
      })
      .catch(() => {
        alert(messages.error, 'danger')
        this.setState({
          physical: {
            date: '',
            height: '',
            weight: '',
            bloodPressure: '',
            heartRate: ''
          }
        })
      })
  }

  handleChange = event => {
    const updateField = {
      [event.target.name]: event.target.value
    }

    const editedPhysical = Object.assign(this.state.physical, updateField)

    this.setState({ physical: editedPhysical })
  }

  render () {
    const { createdPhysicalId, physical, patient, patientObj } = this.state
    if (createdPhysicalId) {
      return <Redirect to={{
        pathname: `/patients/${patient}/physicals/${createdPhysicalId}`,
        state: { patient: patientObj } }} />
    }
    return (
      <Layout>
        <PhysicalForm
          physical={physical}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          cancelPath='/'
        />
      </Layout>
    )
  }
}

export default withRouter(CreatePhysical)
