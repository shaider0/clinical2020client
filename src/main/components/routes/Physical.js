import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import Layout from '../shared/Layout'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import messages from '../../messages'

class Physical extends Component {
  constructor (props) {
    super(props)
    this.state = {
      physical: null,
      deleted: false,
      patient: ''
    }
  }
  componentDidMount () {
    this.setState({ patient: this.props.location.state.patient })
    const { alert } = this.props
    axios({
      method: 'get',
      url: `${apiUrl}/physicals/${this.props.match.params.id2}`,
      headers: {
        Authorization: 'Token token=' + this.props.user.token
      }
    })
      .then(res => {
        this.setState({ physical: res.data.physical })
      })
      .catch(() => {
        alert(messages.error, 'danger')
      })
  }

  destroy = () => {
    axios({
      method: 'delete',
      url: `${apiUrl}/physicals/${this.props.match.params.id2}`,
      headers: {
        Authorization: 'Token token=' + this.props.user.token
      }
    })
      .then(res => {
        this.setState({ deleted: true })
      })
      .catch(console.error)
  }

  render () {
    const { physical, deleted, patient } = this.state

    if (!physical) {
      return (
        <Layout>
          <p>Loading...</p>
        </Layout>
      )
    }

    if (deleted) {
      return <Redirect to={
        { pathname: `/patients/${patient._id}/physicals`,
          state: { msg: 'Physical successfully deleted', patient } }
      } />
    }

    return (
      <Layout>
        <h1>Patient: {this.state.patient.studyId}</h1>
        <h4>Exam Type: Physical Exam</h4>
        <h4>Exam Date: {physical.date || 'unknown'}</h4>
        <p>Height: {physical.height || 'Unknown'}</p>
        <p>Weight: {physical.weight || 'Unknown'}</p>
        <p>Blood Pressure: {physical.bloodPressure || 'Unknown'}</p>
        <p>Heart Rate: {physical.heartRate || 'Unknown'}</p>
        <button className = "formButton" onClick={() => this.destroy(physical._id)}>Delete Record</button>
        <Link className = "formButton" to={{
          pathname: `/patients/${this.props.match.params.id}/physicals/${physical._id}/edit`,
          state: { patient }
        }}>
          Edit Record
        </Link>
        <Link className = "formButton" to={{
          pathname: '/patients/' + this.props.match.params.id + '/physicals',
          state: {
            patient
          }
        }}>Back to all physicals for this patient</Link>
      </Layout>
    )
  }
}

export default withRouter(Physical)
