import { Component } from "react";
import './education.styles.css';

class EducationDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SchoolMarks: '',
            School: '',
            Board: '',
            Percentage: '',
            SchoolMarksheet: ''
        }
    }

    handleChangeMarksheet = (event) => {
        this.setState({ SchoolMarksheet: URL.createObjectURL(event.target.files[0]) })
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
            const { SchoolMarks, School, Board, Percentage, userID } = await response.json()
            this.setState({
                SchoolMarks,
                School,
                Board,
                Percentage,
                SchoolMarksheet: `http://127.0.0.1:3000/student/get-school-marksheet/${userID}`
            })
        } catch (e) {
            console.log(e)
        }
    }

    handleChangeMarksheet = async (event) => {
        await this.setState({
            SchoolMarksheet: URL.createObjectURL(event.target.files[0]),
            SchoolMarksheetToSend: event.target.files[0]
        })
        try {
            const myHeaders = new Headers();
            myHeaders.append('Authorization', this.props.token);
            let formData = new FormData()
            formData.append('SchoolMarksheet', this.state.SchoolMarksheetToSend)
            const requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: formData
            }
            await fetch(`http://127.0.0.1:3000/student/update-school-marksheet`, requestOptions)
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { SchoolMarks, School, Board, Percentage, SchoolMarksheet } = this.state
        return (
            <div className='education-details'>
                <h4 className='heading'>Education</h4>
                <div className='align'>
                    <ul className='data list-one' type='none'>
                        <li><span className='span'>12th Marks:</span>{SchoolMarks}</li>
                        <li><span className='span'>School:</span>{School}</li>
                        <li><span className='span'>Board:</span>{Board}</li>
                        <li><span className='span'>Percentage:</span>{Percentage}</li>
                    </ul>
                    <ul className='data list-two' type='none'>
                        <span className='span'>12th Marksheet:</span>
                        <li>
                            <input type='file' accept='image/*' onChange={this.handleChangeMarksheet} />
                            <img className='img-education' src={SchoolMarksheet} alt='' />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default EducationDetails;