import { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/home-page.page';
import LoginPage from './pages/LoginPage/login-page.page';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      token: '',
      usertype: ''
    }
  }

  checkUser = async (username, password, usertype) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },                          
      body: JSON.stringify({ "username": username, "password": password, "usertype": usertype })
    }                                          
    try {
        const response = await fetch('http://127.0.0.1:3000/user-login', requestOptions)
        const data = await response.json()
        this.setState({ token: data.token })
        if (data.token) {
            await this.setState({ username: data.user.username, password: data.user.password, token: data.token, usertype })
            localStorage.setItem('username', this.state.username)
            localStorage.setItem('token', this.state.token)
            localStorage.setItem('usertype', this.state.usertype)
            this.props.history.push("/home");                                                                                                                                                                                                         
        } else {
            this.setState({ username: '', password: '', token: '', usertype: '' })
        }
    } catch (e) {
        this.setState({ username: '', password: '', token: '', usertype: '' })
        console.log(e)
    }
  }

  render () {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LoginPage checkUser={this.checkUser} />
          </Route>
          <Route exact path="/home">
            {
              localStorage.getItem('token') ?
              <HomePage username={this.state.username} token={this.state.token} usertype={this.state.usertype} /> :
              <Redirect to='/' />
            }
          </Route>
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);