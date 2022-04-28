import { Component } from "react";
import MainStudentPageComponent from "../../components/MainPageComponent/MainStudentPageComponent/main-student-page.component";
import MainAdminPageComponent from "../../components/MainPageComponent/MainAdminPageComponent/main-admin-page.component";
import Navbar from "../../components/Navbar/navbar.component";
import './home-page.styles.css';
import MainTeacherPageComponent from "../../components/MainPageComponent/MainTeacherPageComponent/main-teacher-page.component";

class HomePage extends Component {
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
    
    render () {
        return (
            <div className="home-page">
                <Navbar username={this.state.username} token={this.state.token} usertype={this.state.usertype} />
                {this.state.usertype === 'student' ?
                    <MainStudentPageComponent token={this.state.token}/> :
                    this.state.usertype === 'admin' ?
                    <MainAdminPageComponent token={this.state.token}/> : 
                    this.state.usertype === 'teacher' ? 
                    <MainTeacherPageComponent token={this.state.token}/> :
                    null
                }
            </div>
        )
    }
}

export default HomePage;