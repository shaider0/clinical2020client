import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import Layout from '../shared/Layout'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import messages from '../../messages'

class Payment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      payment: '',
      deleted: false
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
      })
  }

  destroy = () => {
    axios({
      method: 'delete',
      url: `${apiUrl}/payments/${this.props.match.params.id}`,
      headers: {
        Authorization: 'Token token=' + this.props.user.token
      }
    })
      .then(res => {
        this.setState({ deleted: true })
      })
      .catch(() => {
        alert(messages.error, 'danger')
      })
  }

  render () {
    const { payment, deleted } = this.state

    if (!payment) {
      return (
        <Layout>
          <p>Loading...</p>
        </Layout>
      )
    }

    if (deleted) {
      return <Redirect to={
        { pathname: '/payments', state: { msg: 'Payment successfully deleted' } }
      } />
    }

    return (
      <Layout>
        <h4>Payment Date: {payment.date || 'unknown'}</h4>
        <p>Number of Fields Completed: {payment.completedFields || 'Unknown'}</p>
        <p>Assumed number of minutes to complete 1 field: {payment.minutesPerField || 'Unknown'}</p>
        <p>Total time to enter data (hours): {payment.billableHours || 'Unknown'}</p>
        <p>Hourly rate for data entry: {payment.hourlyRate || 'Unknown'}</p>
        <p>Invoice total: {payment.invoiceTotal || 'Unknown'}</p>

        <button className = "formButton" onClick={() => this.destroy(payment._id)}>Delete This Payment</button>
        <Link className = "formButton" to={'/payments/' + payment._id + '/edit'}>
          Edit Payment Information
        </Link>
        <Link className = "formButton" to='/payments'>Back to all payments</Link>
      </Layout>
    )
  }
}

export default withRouter(Payment)
