import { Component } from 'react';
import './update-student.styles.css';

class UpdateStudent extends Component {
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
            StudentPhotoToSend: '',
            SchoolMarksheet: '',
            SchoolMarksheetToSend: '',
            StudentPhotoPath: ''
        }
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
            SchoolMarksheetToSend: '',
            StudentPhotoPath: ''
        })
    }

    handleChange = async (event) => {
        event.preventDefault()
        await this.setState({ [event.target.name]: event.target.value })
    }

    handleChangeSearch = async (event) => {
        await this.setState({ searchValue: event.target.value })
    }

    handleChangeDP = async (event) => {
        await this.setState({ 
            StudentPhoto: URL.createObjectURL(event.target.files[0]),
            StudentPhotoToSend: event.target.files[0]
        })
    }

    handleChangeMarksheet = async (event) => {
        await this.setState({ 
            SchoolMarksheet: URL.createObjectURL(event.target.files[0]),
            SchoolMarksheetToSend: event.target.files[0]
        })
    }

    handleSearch = async (event) => {
        event.preventDefault()
        try {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', this.props.token);
            const requestOptions = {
                method: 'GET',
                headers: myHeaders
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
                    headers: myHeaders
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
                this.handleClear()
            }
            try {
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Authorization', this.props.token);
                const requestOptions = {
                    method: 'GET',
                    headers: myHeaders
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
                this.handleClear()
            }
            try {
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Authorization', this.props.token);
                const requestOptions = {
                    method: 'GET',
                    headers: myHeaders
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
            try {
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Authorization', this.props.token);
                const requestOptions = {
                    method: 'GET',
                    headers: myHeaders
                }
                const response = await fetch(`http://127.0.0.1:3000/admin/student-login-details/${userID}`, requestOptions)
                const { username } = await response.json()
                await this.setState({
                    username
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
        if (window.confirm('Submit changes?')) {
            const { Name, Gender, DOB, Age, Nationality, NativeState, StudentStatus, PlaceOfBirth, Hosteler, Religion, FatherName, FatherQualification, MotherName, MotherQualification, RegistrationNumber, AdmissionYear, CourseName, CourseDuration, AdmittedQuota, DifferentlyAbled, Sportsperson, Defence, NCC, SchoolMarks, School, Board, Percentage, MobileNumber, ParentMobileNumber, PermanentAddress, Email, BloodGroup, Height, Weight } = this.state
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
                const { username, password } = this.state
                if (password !== '') {
                    try {
                        const myHeaders = new Headers();
                        myHeaders.append('Content-Type', 'application/json');
                        myHeaders.append('Authorization', this.props.token);
                        const body = JSON.stringify({
                            username,
                            password
                        })
                        const requestOptions = {
                            method: 'PATCH',
                            headers: myHeaders,
                            body
                        }
                        await fetch(`http://127.0.0.1:3000/admin/student-login-details/${userID}`, requestOptions)
                        console.log(userID)
                    } catch (e) {
                        alert(e)
                    }
                } else {
                    try {
                        const myHeaders = new Headers();
                        myHeaders.append('Content-Type', 'application/json');
                        myHeaders.append('Authorization', this.props.token);
                        const body = JSON.stringify({
                            username
                        })
                        const requestOptions = {
                            method: 'PATCH',
                            headers: myHeaders,
                            body
                        }
                        await fetch(`http://127.0.0.1:3000/admin/student-login-details/${userID}`, requestOptions)
                    } catch (e) {
                        alert(e)
                    }
                }
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
                        StudentStatus, 
                        PlaceOfBirth, 
                        Hosteler, 
                        Religion, 
                        FatherName, 
                        FatherQualification, 
                        MotherName, 
                        MotherQualification
                    })
                    const requestOptions = {
                        method: 'PATCH',
                        headers: myHeaders,
                        body
                    }
                    await fetch(`http://127.0.0.1:3000/admin/student-basic-details/${userID}`, requestOptions)
                } catch (e) {
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
                        Percentage
                    })
                    const requestOptions = {
                        method: 'PATCH',
                        headers: myHeaders,
                        body
                    }
                    await fetch(`http://127.0.0.1:3000/admin/student-admission-details/${userID}`, requestOptions)
                } catch (e) {
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
                        Weight
                    })
                    const requestOptions = {
                        method: 'PATCH',
                        headers: myHeaders,
                        body
                    }
                    await fetch(`http://127.0.0.1:3000/admin/student-other-details/${userID}`, requestOptions)
                } catch (e) {
                    alert(e)
                }
                try {
                    const myHeaders = new Headers();
                    myHeaders.append('Content-Type', 'application/json');
                    myHeaders.append('Authorization', this.props.token);
                    const body = JSON.stringify({
                        RegistrationNumber, 
                        Name, 
                        MobileNumber, 
                        CourseName
                    })
                    const requestOptions = {
                        method: 'PATCH',
                        headers: myHeaders,
                        body
                    }
                    await fetch(`http://127.0.0.1:3000/admin/student-profile/${userID}`, requestOptions)
                } catch (e) {
                    alert(e)
                }
                try {
                    const { StudentPhotoToSend } = this.state
                    const myHeaders = new Headers();
                    myHeaders.append('Authorization', this.props.token);
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
                }
                try {
                    const { SchoolMarksheetToSend } = this.state
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
                }
                alert('Student details updated successfully!')
            } catch (e) {
                alert(e)
            }
        }
    }

    render() {
        const { Name, Gender, DOB, Age, Nationality, NativeState, StudentStatus, PlaceOfBirth, Hosteler, Religion, FatherName, FatherQualification, MotherName, MotherQualification, RegistrationNumber, AdmissionYear, CourseName, CourseDuration, AdmittedQuota, DifferentlyAbled, Sportsperson, Defence, NCC, SchoolMarks, School, Board, Percentage, MobileNumber, ParentMobileNumber, PermanentAddress, Email, BloodGroup, Height, Weight, username, password, ConfirmPassword } = this.state
        return (
            <div className='update-student'>
                <div className='update-search-bar'>
                    <label className='search-label'>Registration number of the student to update: </label>
                    <input className='text-search' type='text' onChange={this.handleChangeSearch}/>
                    <button className='btn-search' type='submit' onClick={this.handleSearch}>Search</button>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <h5 className='h5'>Basic Details:</h5>
                    <div className='update-basic-details'>
                        <div>
                            <div className='update-content'>
                                <label htmlFor='Name'>Name:</label>
                                <input type='text' onChange={this.handleChange} name='Name' value={Name} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='Gender'>Gender:</label>
                                <input type='text' onChange={this.handleChange} name='Gender' value={Gender} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='DOB'>Date Of Birth:</label>
                                <input type='text' onChange={this.handleChange} name='DOB' value={DOB} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='Age'>Age:</label>
                                <input type='text' onChange={this.handleChange} name='Age' value={Age} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='Nationality'>Nationality:</label>
                                <input type='text' onChange={this.handleChange} name='Nationality' value={Nationality} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='NativeState'>Native State:</label>
                                <input type='text' onChange={this.handleChange} name='NativeState' value={NativeState} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='StudentStatus'>Student Status:</label>
                                <input type='text' onChange={this.handleChange} name='StudentStatus' value={StudentStatus} required/>
                            </div>
                        </div>
                        <div>
                            <div className='update-content'>
                                <label htmlFor='PlaceOfBirth'>Place Of Birth:</label>
                                <input type='text' onChange={this.handleChange} name='PlaceOfBirth' value={PlaceOfBirth} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='Hosteler'>Hosteler:</label>
                                <input type='text' onChange={this.handleChange} name='Hosteler' value={Hosteler} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='Religion'>Religion:</label>
                                <input type='text' onChange={this.handleChange} name='Religion' value={Religion} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='FatherName'>Father's Name:</label>
                                <input type='text' onChange={this.handleChange} name='FatherName' value={FatherName} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='FatherQualification'>Father's Qualification:</label>
                                <input type='text' onChange={this.handleChange} name='FatherQualification' value={FatherQualification} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='MotherName'>Mother's Name:</label>
                                <input type='text' onChange={this.handleChange} name='MotherName' value={MotherName} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='MotherQualification'>Mother's Qualification:</label>
                                <input type='text' onChange={this.handleChange} name='MotherQualification' value={MotherQualification} required/>
                            </div>
                        </div>
                    </div>
                    <h5 className='h5'>Admission Details:</h5>
                    <div className='update-admission-details'>
                        <div>
                            <div className='update-content'>
                                <label htmlFor='RegistrationNumber'>Registration Number:</label>
                                <input type='text' onChange={this.handleChange} name='RegistrationNumber' value={RegistrationNumber} disabled/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='AdmissionYear'>Admission Year:</label>
                                <input type='text' onChange={this.handleChange} name='AdmissionYear' value={AdmissionYear} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='CourseEnrolled'>Course Enrolled:</label>
                                <input type='text' onChange={this.handleChange} name='CourseEnrolled' value={CourseName} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='CourseDuration'>Course Duration:</label>
                                <input type='text' onChange={this.handleChange} name='CourseDuration' value={CourseDuration} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='AdmittedQuota'>Admitted Quota:</label>
                                <input type='text' onChange={this.handleChange} name='AdmittedQuota' value={AdmittedQuota} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='DifferentlyAbled'>Differently Abled:</label>
                                <input type='text' onChange={this.handleChange} name='DifferentlyAbled' value={DifferentlyAbled} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='Sportsperson'>Sportsperson:</label>
                                <input type='text' onChange={this.handleChange} name='Sportsperson' value={Sportsperson} required/>
                            </div>
                        </div>
                        <div className='adjust-right-admission'>
                            <div className='update-content'>
                                <label htmlFor='Defence'>Defence:</label>
                                <input type='text' onChange={this.handleChange} name='Defence' value={Defence} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='NCC'>NCC:</label>
                                <input type='text' onChange={this.handleChange} name='NCC' value={NCC} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='SchoolMarks'>12th Marks:</label>
                                <input type='text' onChange={this.handleChange} name='SchoolMarks' value={SchoolMarks} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='School'>School:</label>
                                <input type='text' onChange={this.handleChange} name='School' value={School} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='Board'>Board:</label>
                                <input type='text' onChange={this.handleChange} name='Board' value={Board} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='Percentage'>Percentage:</label>
                                <input type='text' onChange={this.handleChange} name='Percentage' value={Percentage} required/>
                            </div>
                        </div>
                    </div>
                    <h5 className='h5'>Other Details:</h5>
                    <div className='update-other-details'>
                        <div>
                            <div className='update-content'>
                                <label htmlFor='MobileNumber'>Mobile Number:</label>
                                <input type='text' onChange={this.handleChange} name='MobileNumber' value={MobileNumber} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='ParentMobileNumber'>Parent's Mobile Number:</label>
                                <input type='text' onChange={this.handleChange} name='ParentMobileNumber' value={ParentMobileNumber} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='PermanentAddress'>Permanent Address:</label>
                                <input type='text' onChange={this.handleChange} name='PermanentAddress' value={PermanentAddress} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='Email'>Email:</label>
                                <input type='text' onChange={this.handleChange} name='Email' value={Email} required/>
                            </div>
                        </div>
                        <div className='adjust-right-admission'>
                            <div className='update-content'>
                                <label htmlFor='BloodGroup'>Blood Group:</label>
                                <input type='text' onChange={this.handleChange} name='BloodGroup' value={BloodGroup} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='Height'>Height:</label>
                                <input type='text' onChange={this.handleChange} name='Height' value={Height} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='Weight'>Weight:</label>
                                <input type='text' onChange={this.handleChange} name='Weight' value={Weight} required/>
                            </div>
                        </div>
                    </div>
                    <h5 className='h5'>Account Details:</h5>
                    <div className='update-account-details'>
                        <div className='update-content'>
                            <label htmlFor='username'>Username:</label>
                            <input type='text' onChange={this.handleChange} name='username' value={username} required/>
                        </div>
                        <div className='update-content'>
                            <label htmlFor='password'>New Password:</label>
                            <input type='password' onChange={this.handleChange} name='password' value={password}/>
                        </div>
                        <div className='update-content'>
                            <label htmlFor='ConfirmPassword'>Confirm Password:</label>
                            <input type='password' onChange={this.handleChange} name='ConfirmPassword' value={ConfirmPassword}/>
                        </div>
                    </div>
                    <h5 className='h5'>Other:</h5>
                    <div className='update-other'>
                        <h5><u>Student's Photo:</u></h5>
                        <input type='file' accept='image/*' onChange={this.handleChangeDP} />
                        <img className='img-other' src={this.state.StudentPhoto} alt='' />
                        <h5><u>Student's 12th Marksheet:</u></h5>
                        <input type='file' accept='image/*' onChange={this.handleChangeMarksheet} />
                        <img className='img-other' src={this.state.SchoolMarksheet} alt='' />
                    </div>
                    <div className='div-submit'>
                        <button className='btn-submit' type='submit' onClick={this.handleSubmit}>Update Student</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default UpdateStudent;