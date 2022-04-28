import { Component } from 'react';
import { ReactComponent as Back } from '../../../assets/back.svg';
import { ReactComponent as Add } from '../../../assets/add.svg';
import { ReactComponent as Edit } from '../../../assets/edit-white.svg';
import { ReactComponent as Save } from '../../../assets/save-white.svg';
import { ReactComponent as Delete } from '../../../assets/delete-white.svg';
import './class.styles.css';
import TaskComponent from '../TaskComponent/task-component.component';

class Class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Code: '',
            SubjectName: '',
            FacultyName: '',
            userID: '',
            edit: false,
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
            const response = await fetch(`http://127.0.0.1:3000/teacher/${this.state.Code}/members`, requestOptions)
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
            const response = await fetch(`http://127.0.0.1:3000/teacher/${this.state.Code}/get-tasks`, requestOptions)
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
            const response = await fetch(`http://127.0.0.1:3000/teacher/${this.state.Code}/get-tasks`, requestOptions)
            const tasks = await response.json()
            await this.setState({ tasks })
        } catch (e) {
            console.log(e)
        }
    }

    handleChange = async (event) => {
        event.preventDefault()
        await this.setState({ SubjectName: event.target.value })
    }

    toggleEdit = async (event) => {
        event.preventDefault()
        this.state.edit === false ?
        await this.setState({ edit: true }) :
        await this.setState({ edit: false })
    }

    changeSubjectName = async (event) => {
        event.preventDefault()
        try {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json')
            myHeaders.append('Authorization', this.props.token)
            const body = JSON.stringify({
                'SubjectName': this.state.SubjectName
            })
            const requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body
            }
            await fetch(`http://127.0.0.1:3000/teacher/${this.state.Code}/change-subject-name`, requestOptions)
            await this.setState({ edit: false })
        } catch (e) {
            console.log(e)
        }
    }

    handleEnter = async (event) => {
        if (event.key === 'Enter') {
            try {
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json')
                myHeaders.append('Authorization', this.props.token)
                const body = JSON.stringify({
                    'SubjectName': this.state.SubjectName
                })
                const requestOptions = {
                    method: 'PATCH',
                    headers: myHeaders,
                    body
                }
                await fetch(`http://127.0.0.1:3000/teacher/${this.state.Code}/change-subject-name`, requestOptions)
                await this.setState({ edit: false })
            } catch (e) {
                console.log(e)
            }
        }
    }

    handleClickAdd = async (event) => {
        event.preventDefault()
        const d = new Date()
        const CreatedOn = d.toLocaleDateString()
        const TaskTitle = prompt("Enter the task title:")
        if (!TaskTitle) {
            return;
        }
        await this.setState({ TaskTitle, CreatedOn })
        try {
            const { TaskTitle, CreatedOn, Code, userID } = this.state
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json')
            myHeaders.append('Authorization', this.props.token);
            const body = JSON.stringify({
                TaskTitle,
                CreatedOn,
                Code,
                userID
            })
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body
            }
            await fetch(`http://127.0.0.1:3000/teacher/add-task`, requestOptions)
            await this.setState({ TaskTitle, CreatedOn })
            try {
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json')
                myHeaders.append('Authorization', this.props.token)
                const requestOptions = {
                    method: 'GET',
                    headers: myHeaders
                }
                const response = await fetch(`http://127.0.0.1:3000/teacher/${this.state.Code}/get-tasks`, requestOptions)
                const tasks = await response.json()
                await this.setState({ tasks })
            } catch (e) {
                console.log(e)
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleDelete = async (event) => {
        event.preventDefault()
        if (window.confirm("Are you sure you want to delete the classroom?")) {    
            try {
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json')
                myHeaders.append('Authorization', this.props.token);
                const requestOptions = {
                    method: 'DELETE',
                    headers: myHeaders
                }
                await fetch(`http://127.0.0.1:3000/teacher/${this.state.Code}/delete-classroom`, requestOptions)
                await this.props.toggle(0, '', '', '', '', '', '', '', '')
            } catch (e) {
                console.log(e)
            }
        }
    }

    render() {
        return (
            <div className='class-div'>
                <div>
                    {this.state.edit === false ?
                        <h1 className='title'>
                            <div>
                                <Back className='back' onClick={async () => await this.props.toggle(0, '', '', '', '', '', '', '', '')} />
                                {this.state.SubjectName} - {this.state.Code}
                            </div>
                            <div>
                                <Edit className='edit-title' onClick={this.toggleEdit} />
                                <Delete className='delete-title' onClick={this.handleDelete} />
                            </div>
                        </h1> :
                        <h1 className='title'>
                            <div>
                                <Back className='back' onClick={async () => await this.props.toggle(0, '', '', '', '', '', '', '', '')} />
                                <input className='edit-input-subject-name' type='text' value={this.state.SubjectName} onChange={this.handleChange} onKeyDown={this.handleEnter} />
                            </div>
                            <div>
                                <Save className='save-title' onClick={this.changeSubjectName} />
                            </div>
                        </h1>
                    }
                    <div className='content'>
                        <div className='content-left'>
                            <h3 className='heading'>Tasks<Add className='add-task' onClick={this.handleClickAdd} /></h3>
                            <div className='tasks'>
                                {
                                    this.state.tasks.map((task) => {
                                        return (
                                            <TaskComponent 
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

export default Class;