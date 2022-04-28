import { Component } from "react";
import './basic-details.styles.css';

class StudentProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            Gender: '',
            DOB: '',
            Age: '',
            Nationality: '',
            NativeState: '',
            PlaceOfBirth: '',
            StudentStatus: '',
            Hosteler: '',
            Religion: '',
            FatherName: '',
            FatherQualification: '',
            MotherName: '',
            MotherQualification: '',
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
            const response = await fetch('http://127.0.0.1:3000/student/get-basic-details', requestOptions)
            const { Name, Gender, DOB, Age, Nationality, NativeState, PlaceOfBirth, StudentStatus, Hosteler, Religion, FatherName, FatherQualification, MotherName, MotherQualification } = await response.json()
            this.setState({
                Name,
                Gender,
                DOB,
                Age,
                Nationality,
                NativeState,
                PlaceOfBirth,
                StudentStatus,
                Hosteler,
                Religion,
                FatherName,
                FatherQualification,
                MotherName,
                MotherQualification,
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { Name, Gender, DOB, Age, Nationality, NativeState, PlaceOfBirth, StudentStatus, Hosteler, Religion, FatherName, FatherQualification, MotherName, MotherQualification } = this.state;
        return (
            <div className='student-profile'>
                <h4 id='heading'>Basic Details</h4>
                <div className='align'>
                    <ul className='data list-one' type='none'>
                        <li><span className='span'>Name:</span>{Name}</li>
                        <li><span className='span'>Gender:</span>{Gender}</li>
                        <li><span className='span'>Date of Birth:</span>{DOB}</li>
                        <li><span className='span'>Age:</span>{Age}</li>
                        <li><span className='span'>Nationality:</span>{Nationality}</li>
                        <li><span className='span'>Native State:</span>{NativeState}</li>
                        <li><span className='span'>Place of Birth:</span>{PlaceOfBirth}</li>
                    </ul>
                    <ul className='data list-two' type='none'>
                        <li><span className='span'>Student Status:</span>{StudentStatus}</li>
                        <li><span className='span'>Hosteler:</span>{Hosteler}</li>
                        <li><span className='span'>Religion:</span>{Religion}</li>
                        <li><span className='span'>Father's Name:</span>{FatherName}</li>
                        <li><span className='span'>Father's Qualification:</span>{FatherQualification}</li>
                        <li><span className='span'>Mother's Name:</span>{MotherName}</li>
                        <li><span className='span'>Mother's Qualification:</span>{MotherQualification}</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default StudentProfile;