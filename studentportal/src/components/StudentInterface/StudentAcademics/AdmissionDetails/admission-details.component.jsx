import { Component } from "react";
import './admission-details.styles.css';

class AdmissionDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RegistrationNumber: '',
            AdmissionYear: '',
            CourseName: '',
            CourseDuration: '',
            AdmittedQuota: '',
            DifferentlyAbled: '',
            Sportsperson: '',
            Defence: '',
            NCC: ''
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
            const response = await fetch('http://127.0.0.1:3000/student/get-admission-details', requestOptions)
            const { RegistrationNumber, AdmissionYear, CourseName, CourseDuration, AdmittedQuota, DifferentlyAbled, Sportsperson, Defence, NCC } = await response.json()
            this.setState({
                RegistrationNumber,
                AdmissionYear,
                CourseName,
                CourseDuration,
                AdmittedQuota,
                DifferentlyAbled,
                Sportsperson,
                Defence,
                NCC
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { RegistrationNumber, AdmissionYear, CourseName, CourseDuration, AdmittedQuota, DifferentlyAbled, Sportsperson, Defence, NCC } = this.state
        return (
            <div className='admission-details'>
                <h4 className='heading'>Admission Details</h4>
                <div className='align'>
                    <ul className='data list-one' type='none'>
                        <li><span className='span'>Registration Number:</span>{RegistrationNumber}</li>
                        <li><span className='span'>Admission Year:</span>{AdmissionYear}</li>
                        <li><span className='span'>Course Enrolled:</span>{CourseName}</li>
                        <li><span className='span'>Course Duration:</span>{CourseDuration}</li>
                        <li><span className='span'>Admitted Quota:</span>{AdmittedQuota}</li>
                        <li><span className='span'>Differently Abled:</span>{DifferentlyAbled}</li>
                    </ul>
                    <ul className='data list-two' type='none'>
                        <li><span className='span'>Sportsperson:</span>{Sportsperson}</li>
                        <li><span className='span'>Defence:</span>{Defence}</li>
                        <li><span className='span'>NCC:</span>{NCC}</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default AdmissionDetails;