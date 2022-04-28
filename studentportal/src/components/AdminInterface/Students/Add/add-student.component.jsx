import { Component } from 'react';
import './add-student.styles.css';

class AddStudent extends Component {
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
            StudentPhotoToSend: '',
            SchoolMarksheet: '',
            SchoolMarksheetToSend: '',
            StudentPhotoPath: ''
        }
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState({ [event.target.name]: event.target.value })
    }

    handleChangeDP = (event) => {
        this.setState({ 
            StudentPhoto: URL.createObjectURL(event.target.files[0]),
            StudentPhotoToSend: event.target.files[0]
        })
    }

    handleChangeMarksheet = (event) => {
        this.setState({ 
            SchoolMarksheet: URL.createObjectURL(event.target.files[0]),
            SchoolMarksheetToSend: event.target.files[0]
        })
    }
    
    handleClear = async () => {
        await this.setState({
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
            StudentPhotoToSend: '',
            SchoolMarksheet: '',
            SchoolMarksheetToSend: ''
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        var userID = '1'
        var flag
        var StudentStatus = 'Active'
        const { Name, Gender, DOB, Age, Nationality, NativeState, PlaceOfBirth, Hosteler, Religion, FatherName, FatherQualification, MotherName, MotherQualification } = this.state
        const { RegistrationNumber, AdmissionYear, CourseName, CourseDuration, AdmittedQuota, DifferentlyAbled, Sportsperson, Defence, NCC, SchoolMarks, School, Board, Percentage } = this.state
        const { MobileNumber, ParentMobileNumber, PermanentAddress, Email, BloodGroup, Height, Weight, StudentPhoto, StudentPhotoToSend, SchoolMarksheetToSend } = this.state
        const { username, password, ConfirmPassword } = this.state
        try {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', this.props.token);
            if (password !== ConfirmPassword) {
                throw new Error("Passwords don't match!")
            }
            const body = JSON.stringify({
                username,
                password,
                usertype: 'student'
            })
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body
            }
            const response = await fetch('http://127.0.0.1:3000/admin/add-student-login', requestOptions)
            const data = await response.json()
            userID = data._id
            try {
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Authorization', this.props.token);
                const body = JSON.stringify({
                    Name, 
                    Gender, 
                    DOB, 
                    Age, 
                    Nationality,
                    NativeState, 
                    PlaceOfBirth, 
                    Hosteler, 
                    Religion,
                    StudentStatus,
                    FatherName, 
                    FatherQualification, 
                    MotherName, 
                    MotherQualification,
                    userID
                })
                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body
                }
                await fetch('http://127.0.0.1:3000/admin/add-student-basic-details', requestOptions)
            } catch (e) {
                await this.handleClear()
                flag = 0
                alert(e)
            }
            try {
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Authorization', this.props.token);
                const body = JSON.stringify({
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
                    Percentage,
                    userID
                })
                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body
                }
                await fetch('http://127.0.0.1:3000/admin/add-student-admission-details', requestOptions)
            } catch (e) {
                await this.handleClear()
                flag = 0
                alert(e)
            }
            try {
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Authorization', this.props.token);
                const body = JSON.stringify({
                    MobileNumber, 
                    ParentMobileNumber, 
                    PermanentAddress,
                    Email, 
                    BloodGroup, 
                    Height, 
                    Weight,
                    userID
                })
                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body
                }
                await fetch('http://127.0.0.1:3000/admin/add-student-other-details', requestOptions)
            } catch (e) {
                await this.handleClear()
                flag = 0
                alert(e)
            }
            try {
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Authorization', this.props.token);
                const body = JSON.stringify({
                    StudentPhoto, 
                    RegistrationNumber,
                    Name,
                    MobileNumber,
                    CourseName,
                    userID
                })
                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body
                }
                await fetch('http://127.0.0.1:3000/admin/add-student-profile', requestOptions)
            } catch (e) {
                await this.handleClear()
                flag = 0
                alert(e)
            }
            try {
                const myHeaders = new Headers();
                myHeaders.append('Authorization', this.props.token);
                myHeaders.append('Cache-control', 'no-cache');
                let formData = new FormData()
                formData.append("StudentPhoto", StudentPhotoToSend)
                const requestOptions = {
                    method: 'PATCH',
                    headers: myHeaders,
                    body: formData
                }
                await fetch(`http://127.0.0.1:3000/admin/add-student-photo/${userID}`, requestOptions)
            } catch (e) {
                await this.handleClear()
                flag = 0
                alert(e)
            }
            try {
                const myHeaders = new Headers();
                myHeaders.append('Authorization', this.props.token);
                let formData = new FormData()
                formData.append('SchoolMarksheet', SchoolMarksheetToSend)
                const requestOptions = {
                    method: 'PATCH',
                    headers: myHeaders,
                    body: formData
                }
                await fetch(`http://127.0.0.1:3000/admin/add-school-marksheet/${userID}`, requestOptions)
            } catch (e) {
                await this.handleClear()
                flag = 0
                console.log(e)
            }
            await this.handleClear()
            flag = 1
        } catch (e) {
            await this.handleClear()
            alert(e)
        }
        if (flag === 1) {
            alert("Student created successfully!")
        } else {
            if (userID !== '1') {
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
                    try {
                        const myHeaders = new Headers();
                        myHeaders.append('Content-Type', 'application/json');
                        myHeaders.append('Authorization', this.props.token);
                        const requestOptions = {
                            method: 'DELETE',
                            headers: myHeaders
                        }
                        await fetch(`http://127.0.0.1:3000/admin/delete-student/${userID}`, requestOptions)
                        alert("An error occured!")
                        await this.handleClear()
                    } catch (e) {
                        alert(e)
                    }
                } catch (e) {
                    alert(e)
                }
            }
        }
        await this.handleClear()
    }

    render() {
        return (
            <div className='add-student'>
                <form onSubmit={this.handleSubmit}>
                    <h5 className='h5'>Basic Details:</h5>
                    <div className='form-basic-details'>
                        <div>
                            <div className='form-content'>
                                <label htmlFor='Name'>Name:</label>
                                <input type='text' onChange={this.handleChange} name='Name' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='Gender'>Gender:</label>
                                <input type='text' onChange={this.handleChange} name='Gender' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='DOB'>Date Of Birth:</label>
                                <input type='text' onChange={this.handleChange} name='DOB' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='Age'>Age:</label>
                                <input type='text' onChange={this.handleChange} name='Age' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='Nationality'>Nationality:</label>
                                <input type='text' onChange={this.handleChange} name='Nationality' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='NativeState'>Native State:</label>
                                <input type='text' onChange={this.handleChange} name='NativeState' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='PlaceOfBirth'>Place Of Birth:</label>
                                <input type='text' onChange={this.handleChange} name='PlaceOfBirth' required/>
                            </div>
                        </div>
                        <div>
                            <div className='form-content'>
                                <label htmlFor='Hosteler'>Hosteler:</label>
                                <input type='text' onChange={this.handleChange} name='Hosteler' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='Religion'>Religion:</label>
                                <input type='text' onChange={this.handleChange} name='Religion' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='FatherName'>Father's Name:</label>
                                <input type='text' onChange={this.handleChange} name='FatherName' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='FatherQualification'>Father's Qualification:</label>
                                <input type='text' onChange={this.handleChange} name='FatherQualification' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='MotherName'>Mother's Name:</label>
                                <input type='text' onChange={this.handleChange} name='MotherName' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='MotherQualification'>Mother's Qualification:</label>
                                <input type='text' onChange={this.handleChange} name='MotherQualification' required/>
                            </div>
                        </div>
                    </div>
                    <h5 className='h5'>Admission Details:</h5>
                    <div className='form-admission-details'>
                        <div>
                            <div className='form-content'>
                                <label htmlFor='RegistrationNumber'>Registration Number:</label>
                                <input type='text' onChange={this.handleChange} name='RegistrationNumber' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='AdmissionYear'>Admission Year:</label>
                                <input type='text' onChange={this.handleChange} name='AdmissionYear' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='CourseName'>Course Enrolled:</label>
                                <input type='text' onChange={this.handleChange} name='CourseName' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='CourseDuration'>Course Duration:</label>
                                <input type='text' onChange={this.handleChange} name='CourseDuration' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='AdmittedQuota'>Admitted Quota:</label>
                                <input type='text' onChange={this.handleChange} name='AdmittedQuota' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='DifferentlyAbled'>Differently Abled:</label>
                                <input type='text' onChange={this.handleChange} name='DifferentlyAbled' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='Sportsperson'>Sportsperson:</label>
                                <input type='text' onChange={this.handleChange} name='Sportsperson' required/>
                            </div>
                        </div>
                        <div className='adjust-right-admission'>
                            <div className='form-content'>
                                <label htmlFor='Defence'>Defence:</label>
                                <input type='text' onChange={this.handleChange} name='Defence' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='NCC'>NCC:</label>
                                <input type='text' onChange={this.handleChange} name='NCC' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='SchoolMarks'>12th Marks:</label>
                                <input type='text' onChange={this.handleChange} name='SchoolMarks' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='School'>School:</label>
                                <input type='text' onChange={this.handleChange} name='School' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='Board'>Board:</label>
                                <input type='text' onChange={this.handleChange} name='Board' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='Percentage'>Percentage:</label>
                                <input type='text' onChange={this.handleChange} name='Percentage' required/>
                            </div>
                        </div>
                    </div>
                    <h5 className='h5'>Other Details:</h5>
                    <div className='form-other-details'>
                        <div>
                            <div className='form-content'>
                                <label htmlFor='MobileNumber'>Mobile Number:</label>
                                <input type='text' onChange={this.handleChange} name='MobileNumber' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='ParentMobileNumber'>Parent's Mobile Number:</label>
                                <input type='text' onChange={this.handleChange} name='ParentMobileNumber' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='PermanentAddress'>Permanent Address:</label>
                                <input type='text' onChange={this.handleChange} name='PermanentAddress' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='Email'>Email:</label>
                                <input type='text' onChange={this.handleChange} name='Email' required/>
                            </div>
                        </div>
                        <div className='adjust-right-admission'>
                            <div className='form-content'>
                                <label htmlFor='BloodGroup'>Blood Group:</label>
                                <input type='text' onChange={this.handleChange} name='BloodGroup' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='Height'>Height:</label>
                                <input type='text' onChange={this.handleChange} name='Height' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='Weight'>Weight:</label>
                                <input type='text' onChange={this.handleChange} name='Weight' required/>
                            </div>
                        </div>
                    </div>
                    <h5 className='h5'>Account Details:</h5>
                    <div className='form-account-details'>
                        <div className='form-content'>
                            <label htmlFor='username'>Username:</label>
                            <input type='text' onChange={this.handleChange} name='username' required/>
                        </div>
                        <div className='form-content'>
                            <label htmlFor='password'>Password:</label>
                            <input type='password' onChange={this.handleChange} name='password' required/>
                        </div>
                        <div className='form-content'>
                            <label htmlFor='ConfirmPassword'>Confirm Password:</label>
                            <input type='password' onChange={this.handleChange} name='ConfirmPassword' required/>
                        </div>
                    </div>
                    <h5 className='h5'>Other:</h5>
                    <div className='form-other'>
                        <h5><u>Student's Photo:</u></h5>
                        <input type='file' accept='image/*' onChange={this.handleChangeDP} />
                        <img className='img-other' src={this.state.StudentPhoto} alt='' />
                        <h5><u>Student's 12th Marksheet:</u></h5>
                        <input type='file' accept='image/*' onChange={this.handleChangeMarksheet} />
                        <img className='img-other' src={this.state.SchoolMarksheet} alt='' />
                    </div>
                    <div className='div-submit'>
                        <button className='btn-submit' type='submit'>Add Student</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddStudent;