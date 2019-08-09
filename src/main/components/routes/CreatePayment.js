import React, { Component } from 'react'
import Layout from '../shared/Layout'
import PaymentForm from '../shared/PaymentForm'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import messages from '../../messages'
const moment = require('moment')

class CreatePayment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      payment: {
        date: moment().format('MM-DD-YYYY'),
        completedFields: 0,
        minutesPerField: 10,
        billableHours: 0,
        hourlyRate: 100,
        invoiceTotal: 0
      },
      createdPaymentId: null,
      physicals: [],
      completedFields: 0
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const { alert } = this.props
    axios({
      method: 'post',
      url: `${apiUrl}/payments`,
      data: {
        payment: this.state.payment
      },
      headers: {
        Authorization: 'Token token=' + this.props.user.token
      }
    })
      .then(res => {
        this.setState({ createdPaymentId: res.data.payment._id })
      })
      .catch(() => {
        alert(messages.error, 'danger')
        this.setState({
          payment: {
            date: '',
            completedFields: 0,
            minutesPerField: 0,
            billableHours: 0,
            hourlyRate: 0,
            invoiceTotal: 0
          }
        })
      })
  }

  handleChange = event => {
    const updateField = {
      [event.target.name]: event.target.value
    }

    const editedPayment = Object.assign(this.state.payment, updateField)

    this.setState({ payment: editedPayment })
  }

  componentDidMount () {
    const { alert } = this.props
    axios({
      method: 'get',
      url: `${apiUrl}/physicals-all`,
      headers: {
        Authorization: 'Token token=' + this.props.user.token
      }
    })
      .then(res => {
        this.setState({ physicals: res.data.physicals })
      })
      .then(() => {
        this.state.physicals.forEach((physical) => {
          for (const property in physical) {
            if (property) {
              this.setState((prevstate, props) => {
                return ({ payment: {
                  date: prevstate.payment.date,
                  completedFields: prevstate.payment.completedFields + 1,
                  minutesPerField: prevstate.payment.minutesPerField,
                  billableHours: prevstate.payment.billableHours,
                  hourlyRate: prevstate.payment.hourlyRate,
                  invoiceTotal: prevstate.payment.invoiceTotal
                } })
              })
            }
          }
        })
      })
      .then(() => {
        this.setState((prevstate, props) => {
          return ({ payment: {
            date: prevstate.payment.date,
            completedFields: prevstate.payment.completedFields - (7 * prevstate.physicals.length),
            minutesPerField: prevstate.payment.minutesPerField,
            billableHours: prevstate.payment.billableHours,
            hourlyRate: prevstate.payment.hourlyRate,
            invoiceTotal: prevstate.payment.invoiceTotal
          } })
        })
      })
      .then(() => {
        this.setState((prevstate, props) => {
          return ({ payment: {
            date: prevstate.payment.date,
            completedFields: prevstate.payment.completedFields,
            minutesPerField: prevstate.payment.minutesPerField,
            billableHours: ((prevstate.payment.minutesPerField * prevstate.payment.completedFields) / 60).toFixed(2),
            hourlyRate: prevstate.payment.hourlyRate,
            invoiceTotal: prevstate.payment.invoiceTotal
          } })
        })
      })
      .then(() => {
        this.setState((prevstate, props) => {
          return ({ payment: {
            date: prevstate.payment.date,
            completedFields: prevstate.payment.completedFields,
            minutesPerField: prevstate.payment.minutesPerField,
            billableHours: prevstate.payment.billableHours,
            hourlyRate: prevstate.payment.hourlyRate,
            invoiceTotal: prevstate.payment.hourlyRate * prevstate.payment.billableHours
          } })
        })
      })
      .catch(() => {
        alert(messages.error, 'danger')
      })
  }

  render () {
    const { createdPaymentId, payment, completedFields } = this.state
    if (createdPaymentId) {
      return <Redirect to={`/payments/${createdPaymentId}`} />
    }
    return (
      <Layout>
        <PaymentForm
          payment={payment}
          completedFields={completedFields}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          cancelPath='/payments'
        />
      </Layout>
    )
  }
}

export default CreatePayment
