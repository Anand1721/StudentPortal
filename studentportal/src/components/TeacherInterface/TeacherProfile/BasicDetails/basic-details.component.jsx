import { Component } from "react";
import './basic-details.styles.css';

class TeacherDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            Gender: '',
            DOB: '',
            Age: '',
            Nationality: '',
            PlaceOfBirth: '',
            Religion: '',
            MobileNumber: '',
            Email: '',
            PermanentAddress: '',
            BloodGroup: ''
        }
    }

    async componentDidMount () {
        try {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', this.props.token);
            const requestOptions = {
                method: 'GET',
                headers: myHeaders
            }
            var response = await fetch('http://127.0.0.1:3000/teacher/get-basic-details', requestOptions)
            const { Name, Gender, DOB, Age, Nationality, PlaceOfBirth, Religion } = await response.json()
            this.setState({
                Name,
                Gender,
                DOB,
                Age,
                Nationality,
                PlaceOfBirth,
                Religion
            })
            response = await fetch('http://127.0.0.1:3000/teacher/get-other-details', requestOptions)
            const { MobileNumber, Email, PermanentAddress, BloodGroup } = await response.json()
            this.setState({
                MobileNumber,
                Email,
                PermanentAddress,
                BloodGroup
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { Name, Gender, DOB, Age, Nationality, PlaceOfBirth, Religion, MobileNumber, Email, PermanentAddress, BloodGroup } = this.state;
        return (
            <div className='teacher-profile'>
                <h4 className='heading'>Basic Details</h4>
                <div className='align'>
                    <ul className='data list-one' type='none'>
                        <li><span className='span'>Name:</span>{Name}</li>
                        <li><span className='span'>Gender:</span>{Gender}</li>
                        <li><span className='span'>Date of Birth:</span>{DOB}</li>
                        <li><span className='span'>Age:</span>{Age}</li>
                        <li><span className='span'>Nationality:</span>{Nationality}</li>
                        <li><span className='span'>Place of Birth:</span>{PlaceOfBirth}</li>
                        <li><span className='span'>Religion:</span>{Religion}</li>
                    </ul>
                    <ul className='data list-two' type='none'>
                        <li><span className='span'>Mobile Number:</span>{MobileNumber}</li>
                        <li><span className='span'>Email:</span>{Email}</li>
                        <li><span className='span'>Permanent Address:</span>{PermanentAddress}</li>
                        <li><span className='span'>Blood Group:</span>{BloodGroup}</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default TeacherDetails;