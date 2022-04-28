import { Component } from 'react';
import { ReactComponent as Back } from '../../../assets/back.svg';
import StudentTaskComponent from '../TaskComponent/task-component.component';
import './class.styles.css';

class StudentClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Code: '',
            SubjectName: '',
            FacultyName: '',
            userID: '',
            members: [],
            tasks: [],
            TaskCode: '',
            TaskTitle: '',
            TaskDescription: '',
            CreatedOn: ''
        }
    }

    async componentDidMount() {
        await this.setState({
            Code: this.props.Code,
            SubjectName: this.props.SubjectName,
            FacultyName: this.props.FacultyName,
            userID: this.props.userID
        })
        try {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json')
            myHeaders.append('Authorization', this.props.token)
            const requestOptions = {
                method: 'GET',
                headers: myHeaders
            }
            const response = await fetch(`http://127.0.0.1:3000/student/${this.state.Code}/members`, requestOptions)
            const members = await response.json()
            await this.setState({ members })
        } catch (e) {
            console.log(e)
        }
        try {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json')
            myHeaders.append('Authorization', this.props.token)
            const requestOptions = {
                method: 'GET',
                headers: myHeaders
            }
            const response = await fetch(`http://127.0.0.1:3000/student/${this.state.Code}/get-tasks`, requestOptions)
            const tasks = await response.json()
            await this.setState({ tasks })
        } catch (e) {
            console.log(e)
        }
    }

    handleToggleTasks = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json')
            myHeaders.append('Authorization', this.props.token)
            const requestOptions = {
                method: 'GET',
                headers: myHeaders
            }
            const response = await fetch(`http://127.0.0.1:3000/student/${this.state.Code}/get-tasks`, requestOptions)
            const tasks = await response.json()
            await this.setState({ tasks })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className='class-div'>
                <div>
                    <h1 className='title'>
                        <div>
                            <Back className='back' onClick={() => this.props.toggle(0, '', '', '', '', '', '', '', '')} />
                            {this.state.SubjectName}
                        </div>
                    </h1>
                    <div className='content'>
                        <div className='content-left'>
                            <h3 className='heading'>Tasks</h3>
                            <div className='tasks'>
                                {
                                    this.state.tasks.map((task) => {
                                        return (
                                            <StudentTaskComponent 
                                                key={task._id}
                                                TaskCode={task.TaskCode}
                                                TaskTitle={task.TaskTitle}
                                                TaskDescription={task.TaskDescription}
                                                CreatedOn={task.CreatedOn}
                                                Code={task.Code}
                                                SubjectName={this.props.SubjectName}
                                                FacultyName={this.props.FacultyName}
                                                userID={task.userID}
                                                token={this.props.token}
                                                toggle={this.props.toggle}
                                                handleToggleTasks={this.handleToggleTasks}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='content-right'>
                            <h3 className='heading'>Members</h3>
                            <div className='members'>
                                {
                                    this.state.members.map((member) => {
                                        if (member.Usertype === 'teacher') {
                                            return (
                                                <h3 id='members-h3-red' key={member._id}>{member.Username}</h3>
                                            )
                                        } else {   
                                            return (
                                                <h3 id='members-h3-green' key={member._id}>{member.Username}</h3>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentClass;