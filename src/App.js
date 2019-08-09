
import './App.scss'
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import Home from './auth/components/Home'
import About from './auth/components/About'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Alert from 'react-bootstrap/Alert'
import AutoDismissAlert from './main/components/AutoDismissAlert'
import CreatePatient from './main/components/routes/CreatePatient'
import Patients from './main/components/routes/Patients'
import Patient from './main/components/routes/Patient'
import EditPatient from './main/components/routes/EditPatient'
import CreatePhysical from './main/components/routes/CreatePhysical'
import Physicals from './main/components/routes/Physicals'
import Physical from './main/components/routes/Physical'
import EditPhysical from './main/components/routes/EditPhysical'
import Payments from './main/components/routes/Payments'
import CreatePayment from './main/components/routes/CreatePayment'
import Payment from './main/components/routes/Payment'
import EditPayment from './main/components/routes/EditPayment'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />

        {alerts.map((alert, index) => (
          <AutoDismissAlert key={index} dismissible alert={alert}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </AutoDismissAlert>
        ))}

        <Route exact path='/' render={() => (
          <Home />
        )} />

        <Route exact path='/about' render={() => (
          <About />
        )} />

        <Route path='/sign-up' render={() => (
          <SignUp alert={this.alert} setUser={this.setUser} />
        )} />
        <Route path='/sign-in' render={() => (
          <SignIn alert={this.alert} setUser={this.setUser} />
        )} />
        <AuthenticatedRoute user={user} path='/sign-out' render={() => (
          <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
        )} />
        <AuthenticatedRoute user={user} path='/change-password' render={() => (
          <ChangePassword alert={this.alert} user={user} />
        )} />

        <AuthenticatedRoute user={user} exact path='/create-patient' render={() => (
          <CreatePatient user={user} alert={this.alert}/>
        )} />
        <AuthenticatedRoute user={user} exact path='/patients' render={() => (
          <Patients user={user} alert={this.alert}/>
        )} />
        <AuthenticatedRoute user={user} exact path='/patients/:id' render={() => (
          <Patient user={user} alert={this.alert}/>
        )} />
        <AuthenticatedRoute user={user} exact path='/patients/:id/edit' render={() => (
          <EditPatient user={user} alert={this.alert}/>
        )} />

        <AuthenticatedRoute user={user} exact path='/patients/:id/create-physical' render={() => (
          <CreatePhysical user={user} alert={this.alert}/>
        )} />
        <AuthenticatedRoute user={user} exact path='/patients/:id/physicals' render={() => (
          <Physicals user={user} alert={this.alert}/>
        )} />
        <AuthenticatedRoute user={user} exact path='/patients/:id/physicals/:id2' render={() => (
          <Physical user={user} alert={this.alert}/>
        )} />
        <AuthenticatedRoute user={user} exact path='/patients/:id/physicals/:id2/edit' render={() => (
          <EditPhysical user={user} alert={this.alert}/>
        )} />

        <AuthenticatedRoute user={user} exact path='/create-payment' render={() => (
          <CreatePayment user={user} alert={this.alert}/>
        )} />
        <AuthenticatedRoute user={user} exact path='/payments' render={() => (
          <Payments user={user} alert={this.alert}/>
        )} />
        <AuthenticatedRoute user={user} exact path='/payments/:id' render={() => (
          <Payment user={user} alert={this.alert}/>
        )} />
        <AuthenticatedRoute user={user} exact path='/payments/:id/edit' render={() => (
          <EditPayment user={user} alert={this.alert}/>
        )} />

      </React.Fragment>
    )
  }
}

export default App
