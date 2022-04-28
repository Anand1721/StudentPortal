import { Component } from "react";
import './other-details.styles.css';

class OtherDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MobileNumber: '',
            ParentMobileNumber: '',
            PermanentAddress: '',
            Email: '',
            BloodGroup: '',
            Height: '',
            Weight: '',
            StudentPhoto: '',
            StudentPhotoToSend: ''
        }
    }

    handleChangePhoto = async (event) => {
        await this.setState({
            StudentPhoto: URL.createObjectURL(event.target.files[0]),
            StudentPhotoToSend: event.target.files[0]
        })
        await this.props.toggleChangePhoto(this.state.StudentPhoto)
        try {
            const myHeaders = new Headers();
            myHeaders.append('Authorization', this.props.token);
            let formData = new FormData()
            formData.append('StudentPhoto', this.state.StudentPhotoToSend)
            const requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: formData
            }
            await fetch(`http://127.0.0.1:3000/student/update-student-photo`, requestOptions)
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
            const response = await fetch('http://127.0.0.1:3000/student/get-other-details', requestOptions)
            const { MobileNumber, ParentMobileNumber, PermanentAddress, Email, BloodGroup, Height, Weight, userID } = await response.json()
            this.setState({
                MobileNumber,
                ParentMobileNumber,
                PermanentAddress,
                Email,
                BloodGroup,
                Height,
                Weight,
                StudentPhoto: `http://127.0.0.1:3000/student/get-student-photo/${userID}`
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { MobileNumber, ParentMobileNumber, PermanentAddress, Email, BloodGroup, Height, Weight, StudentPhoto } = this.state
        return (
            <div className='contact-details'>
                <h4 id='heading'>Other Details</h4>
                <div className='align'>
                    <ul className='data list-one' type='none'>
                        <li><span className='span'>Mobile Number:</span>{MobileNumber}</li>
                        <li><span className='span'>Parent's Mobile Number:</span>{ParentMobileNumber}</li>
                        <span className='span address'>Permanent Address:</span>
                        <li>{PermanentAddress}</li>
                        <li><span className='span'>Email:</span>{Email}</li>
                    </ul>
                    <ul className='data list-two' type='none'>
                        <li><span className='span'>Blood Group:</span>{BloodGroup}</li>
                        <li><span className='span'>Height:</span>{Height} cms</li>
                        <li><span className='span'>Weight:</span>{Weight} kgs</li>
                        <span className='span dc'>Student Photo:</span>
                        <li>
                            <input type='file' accept='image/*' onChange={this.handleChangePhoto} />
                            <img className='img-education' src={StudentPhoto} alt='' />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default OtherDetails;