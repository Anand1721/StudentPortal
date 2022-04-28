import { Paper, Tab, Tabs } from '@material-ui/core';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FormInput from '../FormInput/form-input.component';
import './sign-in.styles.css';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: '',
            Password: '',
            value: 0,
            Usertype: 'admin'
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        await this.props.checkUser(this.state.Username, this.state.Password, this.state.Usertype)
        this.props.history.push("/home")
    }

    handleChange = async (event) => {
        const { value, name } = event.target
        await this.setState({ [name]: value })
    }

    handleChangeTab = async (event, value) => {
        event.preventDefault()
        if (value === 0) {
            await this.setState({ value, Usertype: 'admin' })
        } else if (value === 1) {
            await this.setState({ value, Usertype: 'student' })
        } else if (value === 2) {
            await this.setState({ value, Usertype: 'teacher' })
        }
    }

    render () {
        return (
            <div className='sign-in'>
                <Paper square>
                    <Tabs
                        value={this.state.value}
                        textColor="secondary"
                        indicatorColor="secondary"
                        onChange={this.handleChangeTab}
                    >
                        <Tab label="Admin"/>
                        <Tab label="Student"/>
                        <Tab label="Teacher"/>
                    </Tabs>
                    <div className='signin-content'>
                        {this.state.value === 0 || this.state.value ?
                            <div>
                                <h2 className="h2">{this.state.Usertype.toString().charAt(0).toUpperCase() + this.state.Usertype.toString().slice(1)} Login</h2>
                                <form className="sign-in-form" onSubmit={this.handleSubmit}>
                                    <div className="fi1">
                                        <FormInput className="txt" name="Username" type="text" handleChange={this.handleChange} value={this.state.Username} required/>
                                    </div>
                                    <div className="fi2">
                                        <FormInput className="txt" name="Password" type="password" handleChange={this.handleChange} value={this.state.Password} required/>
                                    </div>
                                    <div className="container3">
                                        <button type="submit" className="submit"><b>Log in</b></button>
                                    </div>
                                </form>
                            </div> : null
                        }
                    </div>
                </Paper>
            </div>
        )
    }
}

export default withRouter(SignIn);