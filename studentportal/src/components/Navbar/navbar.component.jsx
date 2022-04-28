import { Component } from "react";
import { ReactComponent as Logo } from '../../assets/logo.svg';
import ProfileComponent from "../ProfileComponent/profile.component";
import './navbar.styles.css';

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            usertype: '',
            token: '',
            value: 0
        }
    }
    
    async componentDidMount () {
        await this.setState({
            username: localStorage.getItem('username'),
            usertype: localStorage.getItem('usertype'),
            token: localStorage.getItem('token')
        })
    }

    handleClick = async () => {
        await this.setState({ value: 0 })
    }

    render() {
        return (
            <nav className="own-nav">
                <h2 onClick={this.handleClick} id='h2-brand' className='h2-brand'>Student Portal <Logo className='navbar-logo'/></h2>
                <ProfileComponent username={this.state.username} token={this.state.token} usertype={this.state.usertype} />
            </nav>
        )
    }
}

export default Navbar;