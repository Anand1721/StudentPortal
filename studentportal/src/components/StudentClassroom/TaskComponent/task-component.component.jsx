import { Component } from 'react';
import { ReactComponent as Delete } from '../../../assets/delete.svg';
import { ReactComponent as RightArrow } from '../../../assets/right-arrow-black.svg';
import './task-component.styles.css';

class StudentTaskComponent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            TaskCode: '',
            TaskTitle: '',
            TaskDescription: '',
            CreatedOn: '',
            Code: '',
            userID: '',
            tasks: []
        }
    }

    async componentDidMount () {
        await this.setState({
            Code: this.props.Code,
            SubjectName: this.props.SubjectName,
            FacultyName: this.props.FacultyName,
            userID: this.props.userID,
            TaskCode: this.props.TaskCode,
            TaskTitle: this.props.TaskTitle,
            TaskDescription: this.props.TaskDescription,
            CreatedOn: this.props.CreatedOn
        })
    }

    handleDeleteTask = async (event) => {
        event.preventDefault()
        try {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json')
            myHeaders.append('Authorization', this.props.token);
            const requestOptions = {
                method: 'DELETE',
                headers: myHeaders
            }
            await fetch(`http://127.0.0.1:3000/teacher/${this.state.TaskCode}/delete-task`, requestOptions)
            await this.setState({ TaskCode: '', TaskTitle: '', TaskDescription: '', CreatedOn: '' })
            await this.props.handleToggleTasks()
        } catch (e) {
            console.log(e)
        }
    }

    render () {
        return (
            <div className='task-component-div'>
                <div className='first' onClick={async () => await this.props.toggle(2, this.state.Code, this.state.SubjectName, this.state.FacultyName, this.state.userID, this.state.TaskCode, this.state.TaskTitle, this.state.TaskDescription, this.state.CreatedOn)}>
                    <h1 className='task-component-h2'>{this.state.TaskTitle}</h1>
                    <RightArrow />
                </div>
                <div className='second'>
                    <p className='right' onClick={async () => await this.props.toggle(2, this.state.Code, this.state.SubjectName, this.state.FacultyName, this.state.userID, this.state.TaskCode, this.state.TaskTitle, this.state.TaskDescription, this.state.CreatedOn)}>Posted on - {this.state.CreatedOn} </p><Delete className='del-icon' onClick={this.handleDeleteTask} />
                </div>
            </div>
        )
    }
}

export default StudentTaskComponent;