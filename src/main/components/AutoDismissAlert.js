import React from 'react'
import Alert from 'react-bootstrap/Alert'

class AutoDismissAlert extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      show: true
    }
  }

  componentDidMount () {
    this.timer = setInterval(() => {
      this.setState({ show: false })
    }, 3000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  handleClose = () => this.setState({ show: false })

  render () {
    const { alert } = this.props
    return (
      <Alert
        dismissible
        show={this.state.show}
        variant={alert.type}
        onClose={this.handleClose}
      >
        <div className="container">
          <Alert.Heading className="alert">
            {alert.message}
          </Alert.Heading>
        </div>
      </Alert>
    )
  }
}

export default AutoDismissAlert
