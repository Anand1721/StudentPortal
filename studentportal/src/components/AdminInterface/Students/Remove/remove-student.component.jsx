import { Component } from 'react';
import './remove-student.styles.css';

class RemoveStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
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
            RegistrationNumber: '',
            AdmissionYear: '',
            CourseName: '',
            CourseDuration: '',
            AdmittedQuota: '',
            DifferentlyAbled: '',
            Sportsperson: '',
            Defence: '',
            NCC: '',
            SchoolMarks: '',
            School: '',
            Percentage: '',
            MobileNumber: '',
            ParentMobileNumber: '',
            PermanentAddress: '',
            Email: '',
            BloodGroup: '',
            Height: '',
            Weight: '',
            username: '',
            password: '',
            ConfirmPassword: '',
            StudentPhoto: '',
            SchoolMarksheet: ''
        }
    }

    handleClear = async () => {
        await this.setState({
            searchValue: '',
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
            RegistrationNumber: '',
            AdmissionYear: '',
            CourseName: '',
            CourseDuration: '',
            AdmittedQuota: '',
            DifferentlyAbled: '',
            Sportsperson: '',
            Defence: '',
            NCC: '',
            SchoolMarks: '',
            School: '',
            Board: '',
            Percentage: '',
            MobileNumber: '',
            ParentMobileNumber: '',
            PermanentAddress: '',
            Email: '',
            BloodGroup: '',
            Height: '',
            Weight: '',
            username: '',
            password: '',
            ConfirmPassword: '',
            StudentPhoto: '',
            SchoolMarksheet: ''
        })
    }

    handleChange = async (event) => {
        await this.setState({ searchValue: event.target.value })
    }
    
    handleSearch = async (event) => {
        event.preventDefault()
        try {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', this.props.token);
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
            }
            const response = await fetch(`http://127.0.0.1:3000/admin/student-admission-details/${this.state.searchValue}`, requestOptions)
            const { RegistrationNumber, AdmissionYear, CourseName, CourseDuration, AdmittedQuota, DifferentlyAbled, Sportsperson, Defence, NCC, SchoolMarks, School, Board, Percentage, userID } = await response.json()
            await this.setState({
                RegistrationNumber,
                AdmissionYear,
                CourseName,
                CourseDuration,
                AdmittedQuota,
                DifferentlyAbled,
                Sportsperson,
                Defence,
                NCC,
                SchoolMarks,
                School,
                Board,
                Percentage
            })
            try {
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Authorization', this.props.token);
                const requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                }
                const response = await fetch(`http://127.0.0.1:3000/admin/student-basic-details/${userID}`, requestOptions)
                const { Name, Gender, DOB, Age, Nationality, NativeState, StudentStatus, PlaceOfBirth, Hosteler, Religion, FatherName, FatherQualification, MotherName, MotherQualification } = await response.json()
                await this.setState({
                    Name, 
                    Gender, 
                    DOB, 
                    Age, 
                    Nationality, 
                    NativeState, 
                    StudentStatus, 
                    PlaceOfBirth, 
                    Hosteler, 
                    Religion, 
                    FatherName, 
                    FatherQualification, 
                    MotherName, 
                    MotherQualification
                })
            } catch (e) {
                await this.handleClear()
            }
            try {
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Authorization', this.props.token);
                const requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                }
                const response = await fetch(`http://127.0.0.1:3000/admin/student-other-details/${userID}`, requestOptions)
                const { MobileNumber, ParentMobileNumber, PermanentAddress, Email, BloodGroup, Height, Weight } = await response.json()
                await this.setState({
                    MobileNumber, 
                    ParentMobileNumber, 
                    PermanentAddress, 
                    Email, 
                    BloodGroup, 
                    Height, 
                    Weight,
                    StudentPhoto: `http://127.0.0.1:3000/admin/get-student-photo/${userID}`,
                    SchoolMarksheet: `http://127.0.0.1:3000/admin/get-school-marksheet/${userID}`
                })
            } catch (e) {
                await this.handleClear()
            }
            try {
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Authorization', this.props.token);
                const requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                }
                const response = await fetch(`http://127.0.0.1:3000/admin/student-profile/${userID}`, requestOptions)
                const { RegistrationNumber, Name, MobileNumber, CourseName } = await response.json()
                await this.setState({
                    RegistrationNumber, 
                    Name, 
                    MobileNumber, 
                    CourseName
                })
            } catch (e) {
                await this.handleClear()
            }
        } catch (e) {
            await this.handleClear()
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        if (window.confirm('Do you really want to remove this student?')) {
            try {
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Authorization', this.props.token);
                const requestOptions = {
                    method: 'GET',
                    headers: myHeaders
                }
                const response = await fetch(`http://127.0.0.1:3000/admin/student-admission-details/${this.state.searchValue}`, requestOptions)
                const { userID } = await response.json()
                try {
                    const myHeaders = new Headers();
                    myHeaders.append('Content-Type', 'application/json');
                    myHeaders.append('Authorization', this.props.token);
                    const requestOptions = {
                        method: 'DELETE',
                        headers: myHeaders
                    }
                    await fetch(`http://127.0.0.1:3000/admin/delete-student-photo/${userID}`, requestOptions)
                    await fetch(`http://127.0.0.1:3000/admin/delete-school-marksheet/${userID}`, requestOptions)
                } catch (e) {
                    alert(e)
                }
                try {
                    const myHeaders = new Headers();
                    myHeaders.append('Content-Type', 'application/json');
                    myHeaders.append('Authorization', this.props.token);
                    const requestOptions = {
                        method: 'DELETE',
                        headers: myHeaders
                    }
                    await fetch(`http://127.0.0.1:3000/admin/delete-student/${userID}`, requestOptions)
                    alert("Student removed successfully!")
                    this.handleClear()
                } catch (e) {
                    alert(e)
                }
            } catch (e) {
                alert(e)
            }
        }
    }

    render() {
        const { Name, Gender, DOB, Age, Nationality, NativeState, StudentStatus, PlaceOfBirth, Hosteler, Religion, FatherName, FatherQualification, MotherName, MotherQualification, RegistrationNumber, AdmissionYear, CourseName, CourseDuration, AdmittedQuota, DifferentlyAbled, Sportsperson, Defence, NCC, SchoolMarks, School, Board, Percentage, MobileNumber, ParentMobileNumber, PermanentAddress, Email, BloodGroup, Height, Weight } = this.state
        return (
            <div className='remove-student'>
                <div className='remove-search-bar'>
                    <label className='search-label'>Registration number of the student to be removed: </label>
                    <input className='text-search' type='text' onChange={this.handleChange}/>
                    <button className='btn-search' type='submit' onClick={this.handleSearch}>Search</button>
                </div>
                <h5 className='h5'>Basic Details:</h5>
                <div className='remove-basic-details'>
                    <div className='remove-div'>
                        <div className='remove-content'>
                            <label htmlFor='Name'>Name:</label>
                            <p>{Name}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='Gender'>Gender:</label>
                            <p>{Gender}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='DOB'>Date Of Birth:</label>
                            <p>{DOB}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='Age'>Age:</label>
                            <p>{Age}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='Nationality'>Nationality:</label>
                            <p>{Nationality}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='NativeState'>Native State:</label>
                            <p>{NativeState}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='StudentStatus'>Student Status:</label>
                            <p>{StudentStatus}</p>
                        </div>
                    </div>
                    <div className='remove-div'>
                        <div className='remove-content'>
                            <label htmlFor='PlaceOfBirth'>Place Of Birth:</label>
                            <p>{PlaceOfBirth}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='Hosteler'>Hosteler:</label>
                            <p>{Hosteler}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='Religion'>Religion:</label>
                            <p>{Religion}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='FatherName'>Father's Name:</label>
                            <p>{FatherName}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='FatherQualification'>Father's Qualification:</label>
                            <p>{FatherQualification}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='MotherName'>Mother's Name:</label>
                            <p>{MotherName}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='MotherQualification'>Mother's Qualification:</label>
                            <p>{MotherQualification}</p>
                        </div>
                    </div>
                </div>
                <h5 className='h5'>Admission Details:</h5>
                <div className='remove-admission-details'>
                    <div className='remove-div'>
                        <div className='remove-content'>
                            <label htmlFor='RegistrationNumber'>Registration Number:</label>
                            <p>{RegistrationNumber}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='AdmissionYear'>Admission Year:</label>
                            <p>{AdmissionYear}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='CourseName'>Course Enrolled:</label>
                            <p>{CourseName}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='CourseDuration'>Course Duration:</label>
                            <p>{CourseDuration}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='AdmittedQuota'>Admitted Quota:</label>
                            <p>{AdmittedQuota}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='DifferentlyAbled'>Differently Abled:</label>
                            <p>{DifferentlyAbled}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='Sportsperson'>Sportsperson:</label>
                            <p>{Sportsperson}</p>
                        </div>
                    </div>
                    <div className='remove-div'>
                        <div className='remove-content'>
                            <label htmlFor='Defence'>Defence:</label>
                            <p>{Defence}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='NCC'>NCC:</label>
                            <p>{NCC}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='SchoolMarks'>12th Marks:</label>
                            <p>{SchoolMarks}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='School'>School:</label>
                            <p>{School}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='Board'>Board:</label>
                            <p>{Board}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='Percentage'>Percentage:</label>
                            <p>{Percentage}</p>
                        </div>
                    </div>
                </div>
                <h5 className='h5'>Other Details:</h5>
                <div className='remove-other-details'>
                    <div className='remove-div'>
                        <div className='remove-content'>
                            <label htmlFor='MobileNumber'>Mobile Number:</label>
                            <p>{MobileNumber}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='ParentMobileNumber'>Parent's Mobile Number:</label>
                            <p>{ParentMobileNumber}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='PermanentAddress'>Permanent Address:</label>
                            <p>{PermanentAddress}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='Email'>Email:</label>
                            <p>{Email}</p>
                        </div>
                    </div>
                    <div className='remove-div'>
                        <div className='remove-content'>
                            <label htmlFor='BloodGroup'>Blood Group:</label>
                            <p>{BloodGroup}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='Height'>Height:</label>
                            <p>{Height}</p>
                        </div>
                        <div className='remove-content'>
                            <label htmlFor='Weight'>Weight:</label>
                            <p>{Weight}</p>
                        </div>
                    </div>
                </div>
                <h5 className='h5'>Other:</h5>
                <div className='remove-other'>
                    <h5><u>Student's Photo:</u></h5>
                    <img className='img-other' src={this.state.StudentPhoto} alt='' />
                    <h5><u>Student's 12th Marksheet:</u></h5>
                    <img className='img-other' src={this.state.SchoolMarksheet} alt='' />
                </div>
                <div className='div-submit'>
                    <button className='btn-submit' type='submit' onClick={this.handleSubmit}>Remove Student</button>
                </div>
            </div>
        )
    }
}

export default RemoveStudent;