import React, { Component } from 'react'
import Layout from '../shared/Layout'
import PaymentForm from '../shared/PaymentForm'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import { Redirect, withRouter } from 'react-router-dom'
import messages from '../../messages'

class EditPayment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      payment: {
        date: '',
        completedFields: '',
        minutesPerField: '',
        billableHours: '',
        hourlyRate: '',
        invoiceTotal: ''
      },
      updated: false
    }
  }
  componentDidMount () {
    const { alert } = this.props
    axios({
      method: 'get',
      url: `${apiUrl}/payments/${this.props.match.params.id}`,
      headers: {
        Authorization: 'Token token=' + this.props.user.token
      }
    })
      .then(res => {
        this.setState({ payment: res.data.payment })
      })
      .catch(() => {
        alert(messages.error, 'danger')
        this.setState({
          payment: {
            date: '',
            completedFields: '',
            minutesPerField: '',
            billableHours: '',
            hourlyRate: '',
            invoiceTotal: ''
          }
        })
      })
  }

  // on submit, send a PATCH request to the server
  // set the value of `updated` in the state to `true`
  handleSubmit = async event => {
    event.preventDefault()
    await axios({
      url: `${apiUrl}/payments/${this.props.match.params.id}`,
      method: 'PATCH',
      data: {
        payment: this.state.payment
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

    const editedPayment = Object.assign(this.state.payment, updateField)

    this.setState({ payment: editedPayment })
  }
  render () {
    const { updated, payment } = this.state
    if (updated) {
      return <Redirect to={`/payments/${this.props.match.params.id}`} />
    }

    return (
      <Layout>
        <PaymentForm
          payment={payment}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          cancelPath={`/payments/${this.props.match.params.id}`}
        />
      </Layout>
    )
  }
}

// Wrap with `withRouter` so params can be accessed
export default withRouter(EditPayment)
