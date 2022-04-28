import { Component } from "react";
import './other-details.styles.css';

class TeacherOtherDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            EducationalQualification: '',
            DegreeCertificate: '',
            TeacherPhoto: '',
            TeacherPhotoToSend: '',
            Resume: '',
            ResumeToSend: ''
        }
    }

    handleChangePhoto = async (event) => {
        await this.setState({ 
            TeacherPhoto: URL.createObjectURL(event.target.files[0]),
            TeacherPhotoToSend: event.target.files[0]
        })
        await this.props.toggleChangeTeacherPhoto(this.state.TeacherPhoto)
        try {
            const myHeaders = new Headers();
            myHeaders.append('Authorization', this.props.token);
            let formData = new FormData()
            formData.append('TeacherPhoto', this.state.TeacherPhotoToSend)
            const requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: formData
            }
            await fetch(`http://127.0.0.1:3000/teacher/update-teacher-photo`, requestOptions)
        } catch (e) {
            console.log(e)
        }
    }

    handleChangeResume = async (event) => {
        await this.setState({ 
            Resume: URL.createObjectURL(event.target.files[0]),
            ResumeToSend: event.target.files[0]
        })
        try {
            const myHeaders = new Headers();
            myHeaders.append('Authorization', this.props.token);
            let formData = new FormData()
            formData.append('Resume', this.state.ResumeToSend)
            const requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: formData
            }
            await fetch(`http://127.0.0.1:3000/teacher/update-teacher-resume`, requestOptions)
        } catch (e) {
            console.log(e)
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
            const response = await fetch('http://127.0.0.1:3000/teacher/get-other-details', requestOptions)
            const { ID, EducationalQualification, userID } = await response.json()
            this.setState({
                ID,
                EducationalQualification,
                TeacherPhoto: `http://127.0.0.1:3000/teacher/get-teacher-photo/${userID}`,
                Resume: `http://127.0.0.1:3000/teacher/get-resume/${userID}`
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { ID, EducationalQualification,TeacherPhoto, Resume } = this.state
        return (
            <div className='contact-details'>
                <h4 className='heading'>Other Details</h4>
                <div className='align'>
                    <ul className='data list-one' type='none'>
                        <li className='li'><span className='span'>ID:</span>{ID}</li>
                        <li className='li'><span className='span'>Educational Qualification:</span>{EducationalQualification}</li>
                    </ul>
                    <ul className='data list-two' type='none'>
                        <div className='div-align-one'>
                            <h5 className='heading-div'><u>Teacher Photo:</u></h5>
                            <div className='div-align-two'>
                                <input type='file' accept='image/*' onChange={this.handleChangePhoto} />
                                <img className='img-education' src={TeacherPhoto} alt='' />
                            </div>
                        </div>
                        <div className='div-align-one'>
                            <h5 className='heading-div'><u>Resume:</u></h5>
                            <div className='div-align-two'>
                                <input type='file' accept='image/*' onChange={this.handleChangeResume} />
                                <img className='img-education' src={Resume} alt='' />     
                            </div>                       
                        </div>
                    </ul>
                </div>
            </div>
        )
    }
}

export default TeacherOtherDetails;