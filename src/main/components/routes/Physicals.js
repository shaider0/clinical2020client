import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import Layout from '../shared/Layout'
import messages from '../../messages'

class Physicals extends Component {
  constructor (props) {
    super(props)

    this.state = {
      physicals: [],
      patient: ''
    }
  }

  componentDidMount () {
    this.setState({ patient: this.props.location.state.patient })
    const { alert } = this.props
    axios({
      method: 'get',
      url: `${apiUrl}/physicals`,
      headers: {
        Authorization: 'Token token=' + this.props.user.token
      },
      params: {
        id: this.props.match.params.id
      }
    })
      .then(res => {
        this.setState({ physicals: res.data.physicals })
      })
      .catch(() => {
        alert(messages.error, 'danger')
      })
  }
  render () {
    const { patient } = this.state
    const physicals = this.state.physicals.map(physical => (
      <li key={physical._id}>
        <Link to={{
          pathname: '/patients/' + this.props.match.params.id + '/physicals/' + physical._id,
          state: { patient } }}>{physical.date || 'unknown'}</Link>
      </li>
    ))
    return (
      <Layout>
        <Link to={{
          pathname: `/patients/${this.props.match.params.id}/create-physical`,
          state: { patient } }} className="plus">
        +
        </Link>
        <h3 style={{ marginTop: '20px' }}>All Physical Exams For Patient {this.state.patient.studyId}</h3>
        <ul>
          {physicals}
        </ul>
        <Link to={`/patients/${this.props.match.params.id}`}>
        Back to Patient Information
        </Link>
      </Layout>
    )
  }
}

export default withRouter(Physicals)
