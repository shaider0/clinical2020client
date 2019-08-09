import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import Layout from '../shared/Layout'
import messages from '../../messages'

class Payments extends Component {
  constructor (props) {
    super(props)

    this.state = {
      payments: []
    }
  }

  componentDidMount () {
    const { alert } = this.props
    axios({
      method: 'get',
      url: `${apiUrl}/payments`,
      headers: {
        Authorization: 'Token token=' + this.props.user.token
      }
    })
      .then(res => {
        this.setState({ payments: res.data.payments })
      })
      .catch(() => {
        alert(messages.error, 'danger')
      })
  }
  render () {
    const payments = this.state.payments.map(payment => (
      <li key={payment._id}>
        <Link to={'/payments/' + payment._id}>{payment.date || 'unknown'}</Link>
      </li>
    ))
    return (
      <Layout>
        <NavLink to ='/create-payment' className="plus">+</NavLink>
        <h3>Payment History </h3>
        <ul>
          {payments}
        </ul>
      </Layout>
    )
  }
}

export default Payments
