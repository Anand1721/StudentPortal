import { Component } from "react";
import './teacher-profile-component.styles.css';

class TeacherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TeacherPhoto: '',
            ID: '',
            Name: '',
            MobileNumber: '',
            Email: ''
        }
    }

    async componentDidMount () {
        try {
            await this.setState({ TeacherPhoto: this.props.TeacherPhoto })
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', this.props.token);
            const requestOptions = {
                method: 'GET',
                headers: myHeaders
            }
            const response = await fetch('http://127.0.0.1:3000/teacher/get-teacher-profile', requestOptions)
            const { ID, Name, MobileNumber, Email, userID } = await response.json()
            this.setState({
                TeacherPhoto: `http://127.0.0.1:3000/teacher/get-teacher-photo/${userID}`,
                ID,
                Name,
                MobileNumber,
                Email
            })
        } catch (e) {
            console.log(e)
        }
    }
    
    async componentWillReceiveProps(props) {
        await this.setState({ TeacherPhoto: props.TeacherPhoto }) 
    }

    render() {
        const { TeacherPhoto, ID, Name, MobileNumber, Email } = this.state
        return (
            <div className='profile-comp'>
                <h4 className='heading'>Profile</h4>
                <img className='dp' src={TeacherPhoto} alt=''></img>
                <div className=''>
                    <h4><u>ID</u> - <span className='profile-details'>{ID}</span></h4>
                    <h4><u>Name</u> - <span className='profile-details'>{Name}</span></h4>
                    <h4><u>Mobile</u> - <span className='profile-details'>{MobileNumber}</span></h4>
                    <h4><u>Course</u> - <span className='profile-details'>{Email}</span></h4>
                </div>
            </div>
        )
    }
}

export default TeacherProfile;