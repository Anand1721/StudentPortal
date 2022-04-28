import { Component } from 'react';
import './search-teacher.styles.css';

class SearchTeacher extends Component {
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
            ID: '',
            EducationalQualification: '',
            username: '',
            password: '',
            ConfirmPassword: '',
            TeacherPhoto: '',
            TeacherPhotoToSend: '',
            Resume: '',
            ResumeToSend: '',
            searchValue: ''
        }
    }

    handleChange = async (event) => {
        await this.setState({ searchValue: event.target.value })
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
            ID: '',
            EducationalQualification: '',
            username: '',
            password: '',
            ConfirmPassword: '',
            TeacherPhoto: '',
            TeacherPhotoToSend: '',
            Resume: '',
            ResumeToSend: ''
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
        } catch (e) {
            await this.handleClear()
        }
    }

    render() {
        const { Name, Gender, DOB, Age, Nationality, PlaceOfBirth, Religion, MobileNumber, Email, PermanentAddress, BloodGroup, ID, EducationalQualification } = this.state
        return (
            <div className='search-teacher'>
                <div className='teacher-search-bar'>
                    <label className='search-label'>ID of the teacher: </label>
                    <input className='text-search' type='text' onChange={this.handleChange}/>
                    <button className='btn-search' type='submit' onClick={this.handleSearch}>Search</button>
                </div>
                <h5 className='h5'>Basic Details:</h5>
                <div className='search-basic-details'>
                    <div className="srch-div">
                        <div className='search-content'>
                            <label htmlFor='Name'>Name:</label>
                            <p>{Name}</p>
                        </div>
                        <div className='search-content'>
                            <label htmlFor='Gender'>Gender:</label>
                            <p>{Gender}</p>
                        </div>
                        <div className='search-content'>
                            <label htmlFor='DOB'>Date Of Birth:</label>
                            <p>{DOB}</p>
                        </div>
                        <div className='search-content'>
                            <label htmlFor='Age'>Age:</label>
                            <p>{Age}</p>
                        </div>
                        <div className='search-content'>
                            <label htmlFor='Nationality'>Nationality:</label>
                            <p>{Nationality}</p>
                        </div>
                        <div className='search-content'>
                            <label htmlFor='PlaceOfBirth'>Place Of Birth:</label>
                            <p>{PlaceOfBirth}</p>
                        </div>
                        <div className='search-content'>
                            <label htmlFor='Religion'>Religion:</label>
                            <p>{Religion}</p>
                        </div>
                    </div>
                    <div className="srch-div">
                        <div className='search-content'>
                            <label htmlFor='MobileNumber'>Mobile Number:</label>
                            <p>{MobileNumber}</p>
                        </div>
                        <div className='search-content'>
                            <label htmlFor='Email'>Email:</label>
                            <p>{Email}</p>
                        </div>
                        <div className='search-content'>
                            <label htmlFor='PermanentAddress'>Permanent Address:</label>
                            <p>{PermanentAddress}</p>
                        </div>
                        <div className='search-content'>
                            <label htmlFor='BloodGroup'>Blood Group:</label>
                            <p>{BloodGroup}</p>
                        </div>
                    </div>
                </div>
                <h5 className='h5'>Other Details:</h5>
                <div className='search-other-details'>
                    <div className="srch-div">
                        <div className='search-content'>
                            <label htmlFor='ID'>ID:</label>
                            <p>{ID}</p>
                        </div>
                        <h5><u>Teacher's Photo:</u></h5>
                        <img className='img-other' src={this.state.TeacherPhoto} alt='' />
                    </div>
                    <div className="srch-div">
                        <div className='search-content'>
                            <label htmlFor='EducationalQualification'>Educational Qualification:</label>
                            <p>{EducationalQualification}</p>
                        </div>
                        <h5><u>Teacher's Resume:</u></h5>
                        <img className='img-other' src={this.state.Resume} alt='' />
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchTeacher;