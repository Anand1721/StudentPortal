import { Component } from 'react';
import './update-teacher.styles.css';

class UpdateTeacher extends Component {
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
            BloodGroup: '',
            username: '',
            password: '',
            ConfirmPassword: '',
            TeacherPhoto: '',
            TeacherPhotoToSend: '',
            Resume: '',
            ResumeToSend: ''
        }
    }

    handleClear = async () => {
        await this.setState({
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
            BloodGroup: '',
            username: '',
            password: '',
            ConfirmPassword: '',
            TeacherPhoto: '',
            TeacherPhotoToSend: '',
            Resume: '',
            ResumeToSend: ''
        })
    }

    handleChange = async (event) => {
        event.preventDefault()
        await this.setState({ [event.target.name]: event.target.value })
    }

    handleChangeSearch = async (event) => {
        await this.setState({ searchValue: event.target.value })
    }

    handleChangeTP = async (event) => {
        await this.setState({ TeacherPhoto: URL.createObjectURL(event.target.files[0]) })
    }

    handleChangeResume = async (event) => {
        await this.setState({ TeacherResume: URL.createObjectURL(event.target.files[0]) })
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
            const response = await fetch(`http://127.0.0.1:3000/admin/teacher-other-details/${this.state.searchValue}`, requestOptions)
            const { MobileNumber, Email, PermanentAddress, BloodGroup, ID, EducationalQualification, userID } = await response.json()
            await this.setState({
                MobileNumber,
                Email,
                PermanentAddress,
                BloodGroup,
                ID,
                EducationalQualification,
            })
            await this.setState({
                TeacherPhoto: `http://127.0.0.1:3000/admin/get-teacher-photo/${userID}`,
                Resume: `http://127.0.0.1:3000/admin/get-resume/${userID}`
            })
            try {
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Authorization', this.props.token);
                const requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                }
                const response = await fetch(`http://127.0.0.1:3000/admin/teacher-basic-details/${userID}`, requestOptions)
                const { Name, Gender, DOB, Age, Nationality, PlaceOfBirth, Religion } = await response.json()
                await this.setState({
                    Name, 
                    Gender, 
                    DOB, 
                    Age, 
                    Nationality,
                    PlaceOfBirth,
                    Religion
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
                const response = await fetch(`http://127.0.0.1:3000/admin/teacher-profile/${userID}`, requestOptions)
                const { ID, Name, MobileNumber, Email } = await response.json()
                await this.setState({
                    ID,
                    Name,
                    MobileNumber,
                    Email
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
                const response = await fetch(`http://127.0.0.1:3000/admin/teacher-login-details/${userID}`, requestOptions)
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
            const { Name, Gender, DOB, Age, Nationality, PlaceOfBirth, Religion } = this.state
            const { MobileNumber, Email, PermanentAddress, BloodGroup, ID, EducationalQualification } = this.state
            try {
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Authorization', this.props.token);
                const requestOptions = {
                    method: 'GET',
                    headers: myHeaders
                }
                const response = await fetch(`http://127.0.0.1:3000/admin/teacher-other-details/${this.state.searchValue}`, requestOptions)
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
                        await fetch(`http://127.0.0.1:3000/admin/teacher-login-details/${userID}`, requestOptions)
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
                        await fetch(`http://127.0.0.1:3000/admin/teacher-login-details/${userID}`, requestOptions)
                        console.log(userID)
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
                        PlaceOfBirth,
                        Religion
                    })
                    const requestOptions = {
                        method: 'PATCH',
                        headers: myHeaders,
                        body
                    }
                    await fetch(`http://127.0.0.1:3000/admin/teacher-basic-details/${userID}`, requestOptions)
                } catch (e) {
                    alert(e)
                }
                try {
                    const myHeaders = new Headers();
                    myHeaders.append('Content-Type', 'application/json');
                    myHeaders.append('Authorization', this.props.token);
                    const body = JSON.stringify({
                        MobileNumber,
                        Email,
                        PermanentAddress,
                        BloodGroup,
                        ID,
                        EducationalQualification
                    })
                    const requestOptions = {
                        method: 'PATCH',
                        headers: myHeaders,
                        body
                    }
                    await fetch(`http://127.0.0.1:3000/admin/teacher-other-details/${userID}`, requestOptions)
                } catch (e) {
                    alert(e)
                }
                try {
                    const myHeaders = new Headers();
                    myHeaders.append('Content-Type', 'application/json');
                    myHeaders.append('Authorization', this.props.token);
                    const body = JSON.stringify({
                        ID, 
                        Name, 
                        MobileNumber, 
                        Email
                    })
                    const requestOptions = {
                        method: 'PATCH',
                        headers: myHeaders,
                        body
                    }
                    await fetch(`http://127.0.0.1:3000/admin/teacher-profile/${userID}`, requestOptions)
                } catch (e) {
                    alert(e)
                }
                try {
                    const { TeacherPhotoToSend } = this.state
                    const myHeaders = new Headers();
                    myHeaders.append('Authorization', this.props.token);
                    let formData = new FormData()
                    formData.append("TeacherPhoto", TeacherPhotoToSend)
                    const requestOptions = {
                        method: 'PATCH',
                        headers: myHeaders,
                        body: formData
                    }
                    await fetch(`http://127.0.0.1:3000/admin/add-teacher-photo/${userID}`, requestOptions)
                } catch (e) {
                    console.log(e)
                    this.handleClear()
                }
                try {
                    const { Resume } = this.state
                    const myHeaders = new Headers();
                    myHeaders.append('Authorization', this.props.token);
                    let formData = new FormData()
                    formData.append('Resume', Resume)
                    const requestOptions = {
                        method: 'PATCH',
                        headers: myHeaders,
                        body: formData
                    }
                    await fetch(`http://127.0.0.1:3000/admin/add-resume/${userID}`, requestOptions)
                } catch (e) {
                    console.log(e)
                    this.handleClear()
                }
                await this.handleClear()
                alert("Teacher data updated successfully!")
            } catch (e) {
                alert(e)
            }
        }
    }

    render() {
        const { Name, Gender, DOB, Age, Nationality, PlaceOfBirth, Religion, MobileNumber, Email, PermanentAddress, BloodGroup, ID, EducationalQualification, username, password, ConfirmPassword } = this.state
        return (
            <div className='update-teacher'>
                <div className='teacher-update-search-bar'>
                    <label className='search-label'>ID of the teacher to update: </label>
                    <input className='text-search' type='text' onChange={this.handleChangeSearch}/>
                    <button className='btn-search' type='submit' onClick={this.handleSearch}>Search</button>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <h5 className='h5'>Basic Details:</h5>
                    <div className='update-basic-details'>
                        <div className="update-div">
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
                                <label htmlFor='PlaceOfBirth'>Place Of Birth:</label>
                                <input type='text' onChange={this.handleChange} name='PlaceOfBirth' value={PlaceOfBirth} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='Religion'>Religion:</label>
                                <input type='text' onChange={this.handleChange} name='Religion' value={Religion} required/>
                            </div>
                        </div>
                        <div className="update-div">
                            <div className='update-content'>
                                <label htmlFor='MobileNumber'>Mobile Number:</label>
                                <input type='text' onChange={this.handleChange} name='MobileNumber' value={MobileNumber} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='Email'>Email:</label>
                                <input type='text' onChange={this.handleChange} name='Email' value={Email} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='PermanentAddress'>Permanent Address:</label>
                                <input type='text' onChange={this.handleChange} name='PermanentAddress' value={PermanentAddress} required/>
                            </div>
                            <div className='update-content'>
                                <label htmlFor='BloodGroup'>Blood Group:</label>
                                <input type='text' onChange={this.handleChange} name='BloodGroup' value={BloodGroup} required/>
                            </div>
                        </div>
                    </div>
                    <h5 className='h5'>Other Details:</h5>
                    <div className='update-other-details'>
                        <div className="update-div">
                            <div className='update-content'>
                                <label htmlFor='ID'>ID:</label>
                                <input type='text' onChange={this.handleChange} name='ID' value={ID} disabled/>
                            </div>
                            <h5><u>Teacher's Photo:</u></h5>
                            <input type='file' accept='image/*' onChange={this.handleChangeTP} />
                            <img className='img-other' src={this.state.TeacherPhoto} alt='' />
                        </div>
                        <div className="update-div">
                            <div className='update-content'>
                                <label htmlFor='EducationalQualification'>Educational Qualification:</label>
                                <input type='text' onChange={this.handleChange} name='EducationalQualification' value={EducationalQualification} required/>
                            </div>
                            <h5><u>Teacher's Resume:</u></h5>
                            <input type='file' accept='image/*' onChange={this.handleChangeResume} />
                            <img className='img-other' src={this.state.Resume} alt='' />
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
                            <input type='password' onChange={this.handleChange} name='password' value={password} required/>
                        </div>
                        <div className='update-content'>
                            <label htmlFor='ConfirmPassword'>Confirm Password:</label>
                            <input type='password' onChange={this.handleChange} name='ConfirmPassword' value={ConfirmPassword} required/>
                        </div>
                    </div>
                    <div className='div-submit'>
                        <button className='btn-submit' type='submit' onClick={this.handleSubmit}>Update Teacher</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default UpdateTeacher;