import { Component } from 'react';
import './profile.styles.css';
import {ReactComponent as EmptyProfile} from '../../assets/profile_empty.svg';
import {ReactComponent as ArrowDropdown} from '../../assets/arrow_dropdown.svg';
import { withRouter } from 'react-router-dom';

class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            usertype: '',
            token: ''
        }
    }

    async componentDidMount () {
        await this.setState({
            username: localStorage.getItem('username'),
            usertype: localStorage.getItem('usertype'),
            token: localStorage.getItem('token')
        })
    }

    handleLogout = async () => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', this.props.token);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders
        }
        try {
            await fetch(`http://127.0.0.1:3000/${this.props.usertype}-logout`, requestOptions)
            localStorage.removeItem('username')
            localStorage.removeItem('token')
            localStorage.removeItem('usertype')
            this.props.history.push("/");
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className='profile-component'>
                <div className='profile'>
                    <EmptyProfile className='empty-profile'/>
                    <h3 className='own-h3' id='own-h3'>{this.state.username}</h3>
                    <ArrowDropdown className='arrow-dropdown'/>
                </div>
                <div className='dropdown'>
                    <button onClick={this.handleLogout} className='dropdown-item'>Logout</button>
                </div>
            </div>
        )
    }
}

export default withRouter(ProfileComponent);