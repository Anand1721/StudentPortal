import { Component } from 'react';
import './add-teacher.styles.css';

class AddTeacher extends Component {
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

    handleChange = (event) => {
        event.preventDefault()
        this.setState({ [event.target.name]: event.target.value })
    }

    handleChangeTP = (event) => {
        this.setState({ 
            TeacherPhoto: URL.createObjectURL(event.target.files[0]),
            TeacherPhotoToSend: event.target.files[0]
         })
    }

    handleChangeResume = (event) => {
        this.setState({ 
            Resume: URL.createObjectURL(event.target.files[0]),
            ResumeToSend: event.target.files[0]
        })
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

    handleSubmit = async (event) => {
        event.preventDefault()
        var flag
        var userID = '1'
        const { Name, Gender, DOB, Age, Nationality, PlaceOfBirth, Religion } = this.state
        const { MobileNumber, Email, PermanentAddress, BloodGroup, ID, EducationalQualification, TeacherPhoto, TeacherPhotoToSend, ResumeToSend } = this.state
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
                usertype: 'teacher'
            })
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body
            }
            const response = await fetch('http://127.0.0.1:3000/admin/add-teacher-login', requestOptions)
            const data = await response.json()
            if(data.error || data.errors) {
                throw new Error()
            }
            userID = data._id
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
                    EducationalQualification,
                    userID
                })
                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body
                }
                const data = await fetch('http://127.0.0.1:3000/admin/add-teacher-other-details', requestOptions)
                if(data.error || data.errors) {
                    alert("Error!")
                    throw new Error()
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
                        Religion,
                        userID
                    })
                    const requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body
                    }
                    const data = await fetch('http://127.0.0.1:3000/admin/add-teacher-basic-details', requestOptions)
                    if(data.error || data.errors) {
                        alert("Error!")
                        throw new Error()
                    }
                    try {
                        const myHeaders = new Headers();
                        myHeaders.append('Content-Type', 'application/json');
                        myHeaders.append('Authorization', this.props.token);
                        const body = JSON.stringify({
                            TeacherPhoto, 
                            ID,
                            Name,
                            MobileNumber,
                            Email,
                            userID
                        })
                        const requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body
                        }
                        const data = await fetch('http://127.0.0.1:3000/admin/add-teacher-profile', requestOptions)
                        if(data.error || data.errors) {
                            alert("Error!")
                            throw new Error()
                        }
                        try {
                            const myHeaders = new Headers();
                            myHeaders.append('Authorization', this.props.token);
                            myHeaders.append('Cache-control', 'no-cache');
                            let formData = new FormData()
                            formData.append("TeacherPhoto", TeacherPhotoToSend)
                            const requestOptions = {
                                method: 'PATCH',
                                headers: myHeaders,
                                body: formData
                            }
                            await fetch(`http://127.0.0.1:3000/admin/add-teacher-photo/${userID}`, requestOptions)
                        } catch (e) {
                            flag = 0
                            await this.handleClear()
                        }
                        try {
                            const myHeaders = new Headers();
                            myHeaders.append('Authorization', this.props.token);
                            let formData = new FormData()
                            formData.append('Resume', ResumeToSend)
                            const requestOptions = {
                                method: 'PATCH',
                                headers: myHeaders,
                                body: formData
                            }
                            await fetch(`http://127.0.0.1:3000/admin/add-resume/${userID}`, requestOptions)
                        } catch (e) {
                            flag = 0
                            await this.handleClear()
                        }
                    } catch (e) {
                        flag = 0
                        await this.handleClear()
                    }
                } catch (e) {
                    flag = 0
                    await this.handleClear()
                }
            } catch (e) {
                flag = 0
                await this.handleClear()
            }
            flag = 1
        } catch (e) {
            flag = 0
            await this.handleClear()
        }
        if (flag === 1) {
            alert("Teacher created successfully!")                
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
                    await fetch(`http://127.0.0.1:3000/admin/delete-teacher-photo/${userID}`, requestOptions)
                    await fetch(`http://127.0.0.1:3000/admin/delete-resume/${userID}`, requestOptions)
                    try {
                        const myHeaders = new Headers();
                        myHeaders.append('Content-Type', 'application/json');
                        myHeaders.append('Authorization', this.props.token);
                        const requestOptions = {
                            method: 'DELETE',
                            headers: myHeaders
                        }
                        await fetch(`http://127.0.0.1:3000/admin/delete-teacher/${userID}`, requestOptions)
                        alert("An error occured!")
                        await this.handleClear()
                    } catch (e) {
                        
                    }
                } catch (e) {
                    
                }
            }
        }
        await this.handleClear()
    }

    render() {
        return (
            <div className='add-teacher'>
                <form onSubmit={this.handleSubmit}>
                    <h5 className='h5'>Basic Details:</h5>
                    <div className='form-basic-details'>
                        <div>
                            <div className='form-content'>
                                <label htmlFor='Name'>Name:</label>
                                <input type='text' onChange={this.handleChange} value={this.state.Name} name='Name' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='Gender'>Gender:</label>
                                <input type='text' onChange={this.handleChange} value={this.state.Gender} name='Gender' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='DOB'>Date Of Birth:</label>
                                <input type='text' onChange={this.handleChange} value={this.state.DOB} name='DOB' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='Age'>Age:</label>
                                <input type='text' onChange={this.handleChange} value={this.state.Age} name='Age' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='Nationality'>Nationality:</label>
                                <input type='text' onChange={this.handleChange} value={this.state.Nationality} name='Nationality' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='PlaceOfBirth'>Place Of Birth:</label>
                                <input type='text' onChange={this.handleChange} value={this.state.PlaceOfBirth} name='PlaceOfBirth' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='Religion'>Religion:</label>
                                <input type='text' onChange={this.handleChange} value={this.state.Religion} name='Religion' required/>
                            </div>
                        </div>
                        <div>
                            <div className='form-content'>
                                <label htmlFor='MobileNumber'>Mobile Number:</label>
                                <input type='text' onChange={this.handleChange} value={this.state.MobileNumber} name='MobileNumber' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='Email'>Email:</label>
                                <input type='text' onChange={this.handleChange} value={this.state.Email} name='Email' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='PermanentAddress'>Permanent Address:</label>
                                <input type='text' onChange={this.handleChange} value={this.state.PermanentAddress} name='PermanentAddress' required/>
                            </div>
                            <div className='form-content'>
                                <label htmlFor='BloodGroup'>Blood Group:</label>
                                <input type='text' onChange={this.handleChange} value={this.state.BloodGroup} name='BloodGroup' required/>
                            </div>
                        </div>
                    </div>
                    <h5 className='h5'>Other Details:</h5>
                    <div className='form-other-details'>
                        <div className="other-div">
                            <div className='form-content'>
                                <label htmlFor='ID'>ID:</label>
                                <input type='text' onChange={this.handleChange} value={this.state.ID} name='ID' required/>
                            </div>
                            <h5><u>Teacher's Photo:</u></h5>
                            <input type='file' accept='image/*' onChange={this.handleChangeTP} />
                            <img className='img-other' src={this.state.TeacherPhoto} alt='' />
                        </div>
                        <div className="other-div">
                            <div className='form-content'>
                                <label htmlFor='EducationalQualification'>Educational Qualification:</label>
                                <input type='text' onChange={this.handleChange} value={this.state.EducationalQualification} name='EducationalQualification' required/>
                            </div>
                            <h5><u>Teacher's Resume:</u></h5>
                            <input type='file' accept='image/*' onChange={this.handleChangeResume} />
                            <img className='img-other' src={this.state.Resume} alt='' />
                        </div>
                    </div>
                    <h5 className='h5'>Account Details:</h5>
                    <div className='form-account-details'>
                        <div className='form-content'>
                            <label htmlFor='username'>Username:</label>
                            <input type='text' onChange={this.handleChange} value={this.state.username} name='username' required/>
                        </div>
                        <div className='form-content'>
                            <label htmlFor='password'>Password:</label>
                            <input type='password' onChange={this.handleChange} value={this.state.password} name='password' required/>
                        </div>
                        <div className='form-content'>
                            <label htmlFor='ConfirmPassword'>Confirm Password:</label>
                            <input type='password' onChange={this.handleChange} value={this.state.ConfirmPassword} name='ConfirmPassword' required/>
                        </div>
                    </div>
                    <div className='div-submit'>
                        <button type='submit' className='btn-submit'>Add Teacher</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddTeacher;