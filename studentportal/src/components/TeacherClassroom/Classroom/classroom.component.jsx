import { Component } from "react";
import { ReactComponent as Add } from '../../../assets/add.svg';
import ClassComponent from "../ClassComponent/classcomponent.component";
import './classroom.styles.css';

class Classroom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            token: '',
            usertype: '',
            SubjectName: '',
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
            const response = await fetch('http://127.0.0.1:3000/teacher/get-classrooms', requestOptions)
            const data = await response.json()
            data.forEach((classroom) => {
                this.state.classroomData.push(classroom)
            })
            await this.setState({ classroomData: this.state.classroomData })
        } catch (e) {
            console.log(e)
        }
    }

    handleAddClick = async (event) => {
        event.preventDefault()
        const SubjectName = prompt("Enter the subject name:")
        await this.setState({ SubjectName })
        try {
            const { SubjectName } = this.state
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json')
            myHeaders.append('Authorization', this.props.token);
            const body = JSON.stringify({
                SubjectName
            })
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body
            }
            await fetch(`http://127.0.0.1:3000/teacher/add-classroom`, requestOptions)
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', this.props.token);
            const options = {
                method: 'GET',
                headers: myHeaders
            }
            try {
                const response = await fetch('http://127.0.0.1:3000/teacher/get-classrooms', options)
                const data = await response.json()
                await this.setState({ classroomData: [] })
                data.forEach((classroom) => {
                    this.state.classroomData.push(classroom)
                })
                await this.setState({ classroomData: this.state.classroomData })
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

    render () {
        return (
            <div className='classroom-div'>
                {
                    this.state.classroomData.map((classroom) => {
                        return (
                            <ClassComponent 
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
                <Add className='add' onClick={this.handleAddClick} />
            </div>
        )
    }
}

export default Classroom;