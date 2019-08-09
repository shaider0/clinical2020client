import React, { Component } from 'react'
import Layout from '../shared/Layout'
import PhysicalForm from '../shared/PhysicalForm'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import { Redirect, withRouter } from 'react-router-dom'
import messages from '../../messages'

class EditPhysical extends Component {
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
      updated: false,
      patient: this.props.location.state.patient
    }
  }
  componentDidMount () {
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

  // on submit, send a PATCH request to the server
  // set the value of `updated` in the state to `true`
  handleSubmit = async event => {
    event.preventDefault()
    await axios({
      url: `${apiUrl}/physicals/${this.props.match.params.id2}`,
      method: 'PATCH',
      data: {
        physical: this.state.physical
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

    const editedPhysical = Object.assign(this.state.physical, updateField)

    this.setState({ physical: editedPhysical })
  }

  // If update successful, return user to the Physical
  // component
  // Else, TODO
  render () {
    const { updated, physical, patient } = this.state
    if (updated) {
      return <Redirect to={{
        pathname: `/patients/${this.props.match.params.id1}/physicals/${this.props.match.params.id2}`,
        state: { patient } }} />
    }

    return (
      <Layout>
        <PhysicalForm
          physical={physical}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          cancelPath={'/patients/'}
          id={this.props.match.params.id1}
        />
      </Layout>
    )
  }
}

// Wrap with `withRouter` so params can be accessed
export default withRouter(EditPhysical)
