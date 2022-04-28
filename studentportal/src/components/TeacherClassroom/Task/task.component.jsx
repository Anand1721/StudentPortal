import { Component } from 'react';
import { ReactComponent as Back } from '../../../assets/back.svg';
import { ReactComponent as Edit } from '../../../assets/edit-white.svg';
import { ReactComponent as EditBlack } from '../../../assets/edit.svg';
import { ReactComponent as Save } from '../../../assets/save-white.svg';
import { ReactComponent as SaveBlack } from '../../../assets/save.svg';
import { ReactComponent as RightArrow } from '../../../assets/right-arrow-black.svg';
import './task.styles.css';

class Task extends Component {
    constructor (props) {
        super(props);
        this.state = {
            edit: false,
            TaskCode: '',
            TaskTitle: '',
            EditDescription: false,
            TaskDescription: '',
            CreatedOn: '',
            Code: '',
            SubjectName: '',
            FacultyName: '',
            userID: '',
            submissions: [],
            showArrow: false
        }
    }

    async componentDidMount() {
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
        try {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json')
            myHeaders.append('Authorization', this.props.token);
            const requestOptions = {
                method: 'GET',
                headers: myHeaders
            }
            const response = await fetch(`http://127.0.0.1:3000/teacher/${this.state.TaskCode}/get-submissions`, requestOptions)
            const submissions = await response.json()
            await this.setState({ submissions })
        } catch (e) {
            console.log(e)
        }
    }

    handleHover = async () => {
        this.state.showArrow === false ?
        await this.setState({ showArrow: true }) :
        await this.setState({ showArrow: false })
    }

    handleChangeTextArea = async (event) => {
        await this.setState({ TaskDescription: event.target.value })
    }

    handleClickEditDescription = async () => {
        await this.setState({ EditDescription: true })
    }

    handleClickSaveDescription = async () => {
        try {
            const { TaskDescription } = this.state
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json')
            myHeaders.append('Authorization', this.props.token);
            const body = JSON.stringify({
                TaskDescription
            })
            const requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body
            }
            await fetch(`http://127.0.0.1:3000/teacher/${this.state.TaskCode}/update-task-description`, requestOptions)
            await this.setState({ EditDescription: false })
        } catch (e) {
            console.log(e)
        }
    }

    render () {
        return (
            <div className='task-div'>
                <div>
                    {this.state.edit === false ?
                        <h1 className='title'>
                            <div>
                                <Back className='back' onClick={async () => await this.props.toggle(1, this.state.Code, this.state.SubjectName, this.state.FacultyName, this.state.userID, '', '', '', '')} />
                                {this.state.TaskTitle}
                            </div>
                            <div>
                                <Edit className='edit-title' onClick={this.toggleEdit} />
                            </div>
                        </h1> :
                        <h1 className='title'>
                            <div>
                                <Back className='back' onClick={async () => await this.props.toggle(1, this.state.Code, this.state.SubjectName, this.state.FacultyName, this.state.userID, '', '', '', '')} />
                                <input className='edit-input-subject-name' type='text' value={this.state.SubjectName} onChange={this.handleChange} onKeyDown={this.handleEnter} />
                            </div>
                            <div>
                                <Save className='save-title' onClick={this.changeSubjectName} />
                            </div>
                        </h1>
                    }
                    <div className='content'>
                        <div className='task-content-left'>
                            {this.state.EditDescription === false ?
                                <div>
                                    <h3 className='task-heading'>Task Description<EditBlack className='edit-description' onClick={this.handleClickEditDescription} /></h3>
                                    <div className='task-description'>
                                        <p className='task-p'>{this.state.TaskDescription}</p>
                                    </div> 
                                </div> :
                                <div>
                                    <h3 className='task-heading'>Task Description<SaveBlack className='save-description' onClick={this.handleClickSaveDescription} /></h3>
                                    <div className='task-description'>
                                        <textarea className='task-ta' rows='15' cols='135' value={this.state.TaskDescription} onChange={this.handleChangeTextArea} ></textarea>
                                    </div> 
                                </div>
                            }
                            
                        </div>
                        <div className='task-content-right'>
                            <h3 className='task-heading'>Submission Status</h3>
                            <div className='submission-status'>
                                {this.state.submissions.map((submission) => {
                                    if (submission.SubmissionStatus === 'false') {
                                        return (
                                            <div key={submission._id} className='submissions r'>
                                                <h3 id='submissions-h3-red' key={submission._id}>{submission.Username}</h3>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={submission._id} className='submissions g' onMouseOver={this.handleHover} onMouseLeave={this.handleHover} onClick={()=> window.open(`http://127.0.0.1:3000/student/get-assignment/${submission.TaskCode}/${submission.userID}`, `_blank`)}>
                                                <a id='submissions-a-green' target='_blank' rel='noreferrer' href={`http://127.0.0.1:3000/student/get-assignment/${submission.TaskCode}/${submission.userID}`} key={submission._id}>{submission.Username}</a>
                                                <RightArrow/>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Task;