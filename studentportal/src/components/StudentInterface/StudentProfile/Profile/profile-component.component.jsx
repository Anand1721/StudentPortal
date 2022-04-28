import { Component } from "react";
import './profile-component.styles.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StudentPhoto: '',
            RegistrationNumber: '',
            Name: '',
            MobileNumber: '',
            CourseName: ''
        }
    }

    async componentDidMount () {
        try {
            await this.setState({ StudentPhoto: this.props.StudentPhoto })
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', this.props.token);
            const requestOptions = {
                method: 'GET',
                headers: myHeaders
            }
            const response = await fetch('http://127.0.0.1:3000/student/get-student-profile', requestOptions)
            const { RegistrationNumber, Name, MobileNumber, CourseName, userID } = await response.json()
            await this.setState({
                StudentPhoto: `http://127.0.0.1:3000/student/get-student-photo/${userID}`,
                RegistrationNumber,
                Name,
                MobileNumber,
                CourseName
            })
        } catch (e) {
            console.log(e)
        }
    }

    async componentWillReceiveProps(props) {
        await this.setState({ StudentPhoto: props.StudentPhoto }) 
    }

    render() {
        const { StudentPhoto, RegistrationNumber, Name, MobileNumber, CourseName } = this.state
        return (
            <div className='profile-comp'>
                <h4 id='heading'>Profile</h4>
                <img className='dp' src={StudentPhoto} alt=''></img>
                <div className=''>
                    <h4><u>Roll No.</u> - <span className='profile-details'>{RegistrationNumber}</span></h4>
                    <h4><u>Name</u> - <span className='profile-details'>{Name}</span></h4>
                    <h4><u>Mobile</u> - <span className='profile-details'>{MobileNumber}</span></h4>
                    <h4><u>Course</u> - <span className='profile-details'>{CourseName}</span></h4>
                </div>
            </div>
        )
    }
}

export default Profile;