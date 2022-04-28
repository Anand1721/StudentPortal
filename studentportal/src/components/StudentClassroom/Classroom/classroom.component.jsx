import { Component } from "react";
import StudentClassComponent from "../ClassComponent/classcomponent.component";
import './classroom.styles.css';

class StudentClassroom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            token: '',
            usertype: '',
            SubjectName: '',
            Code: '',
            Codes: [],
            classroomData: []
        }
    }

    async componentDidMount () {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', this.props.token);
        const requestOptions = {
            method: 'GET',
            headers: myHeaders
        }
        try {
            const response = await fetch('http://127.0.0.1:3000/student/get-classroom-codes', requestOptions)
            const data = await response.json()
            await this.setState({ Codes: data })
            try {
                const body = JSON.stringify({
                    Codes: this.state.Codes
                })
                const reqOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body
                }
                const res = await fetch('http://127.0.0.1:3000/student/get-classrooms', reqOptions)
                const classroomData = await res.json()
                await this.setState({ classroomData })
            } catch (e) {
                console.log(e)
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState({ [event.target.name]: event.target.value })
    }

    handleJoin = async (event) => {
        event.preventDefault()
        try {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', this.props.token);
            const body = JSON.stringify({
                Code: this.state.Code,
                Usertype: 'student'
            })
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body
            }
            await fetch('http://127.0.0.1:3000/student/join-classroom', requestOptions)
            const reqOptions = {
                method: 'GET',
                headers: myHeaders
            }
            const r = await fetch('http://127.0.0.1:3000/student/get-classroom-codes', reqOptions)
            const d = await r.json()
            await this.setState({ Codes: d })
            const b = JSON.stringify({
                Codes: this.state.Codes
            })
            const rOptions = {
                method: 'POST',
                headers: myHeaders,
                body: b
            }
            const re = await fetch('http://127.0.0.1:3000/student/get-classrooms', rOptions)
            const classroomData = await re.json()
            await this.setState({ classroomData, Code: '' })
        } catch (e) {
            console.log(e)
        }
    }

    render () {
        return (
            <div>
                <div className='search-bar-cls'>
                    <label className='search-label'>Classroom Code: </label>
                    <input className='text-search' type='text' name='Code' onChange={this.handleChange}/>
                    <button className='btn-search' type='submit' onClick={this.handleJoin}>Join</button>
                </div>
                <div className='student-classroom-div'>
                    {
                        this.state.classroomData.map((classroom) => {
                            return (
                                <StudentClassComponent 
                                    key={classroom._id} 
                                    _id={classroom._id}
                                    Code={classroom.Code}
                                    SubjectName={classroom.SubjectName} 
                                    FacultyName={classroom.FacultyName}
                                    userID={classroom.userID}
                                    token={this.props.token}
                                    toggle={this.props.toggle}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default StudentClassroom;