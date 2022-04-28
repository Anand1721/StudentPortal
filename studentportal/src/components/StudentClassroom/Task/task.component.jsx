import { Component } from 'react';
import { ReactComponent as Back } from '../../../assets/back.svg';
import { ReactComponent as Edit } from '../../../assets/edit-white.svg';
import './task.styles.css';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

class StudentTask extends Component {
    constructor (props) {
        super(props);
        this.state = {
            id: '',
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
            Assignment: '',
            AssignmentName: '',
            AssignmentToSend: ''
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
            CreatedOn: this.props.CreatedOn,
        })
        try { 
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', this.props.token);
            const requestOptions = {
                method: 'GET',
                headers: myHeaders
            }
            const response = await fetch('http://127.0.0.1:3000/student/get-other-details', requestOptions)
            const { userID } = await response.json()
            const res = await fetch(`http://127.0.0.1:3000/student/get-assignment/${this.state.TaskCode}/${userID}`, requestOptions)
            const data = await res.blob()
            await this.setState({
                Assignment: data
            })
        } catch (e) {
            console.log(e)
        }
    }

    handleChangeAssignment = async (event) => {
        try {
            await this.setState({ 
                Assignment: URL.createObjectURL(event.target.files[0]),
                AssignmentName: event.target.files[0].name,
                AssignmentToSend: event.target.files[0]
            })
        } catch (e) {
            console.log(e)
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const myHeaders = new Headers();
            myHeaders.append('Authorization', this.props.token);
            let formData = new FormData()
            formData.append('Submission', this.state.AssignmentToSend)
            const requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: formData
            }
            await fetch(`http://127.0.0.1:3000/student/add-assignment/${this.state.TaskCode}/${this.state.AssignmentName}`, requestOptions)
            alert("Assignment submitted successfully!")
        } catch (e) {
            console.log(e)
        }
    }

    handleOpenAssignment = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', this.props.token);
            const requestOptions = {
                method: 'GET',
                headers: myHeaders
            }
            const response = await fetch(`http://127.0.0.1:3000/student/get-id`, requestOptions)
            const id = await response.json()
            await this.setState({ id })
        } catch (e) {
            alert(e)
        }
    }

    render () {
        return (
            <div className='student-task-div'>
                <div>
                    <h1 className='title'>
                        <div>
                            <Back className='back' onClick={async () => await this.props.toggle(1, this.state.Code, this.state.SubjectName, this.state.FacultyName, this.state.userID, '', '', '', '')} />
                            {this.state.TaskTitle}
                        </div>
                        <div>
                            <Edit className='edit-title' onClick={this.toggleEdit} />
                        </div>
                    </h1>
                    <div className='content'>
                        <div className='task-content-left'>
                            <div>
                                <h3 className='task-heading'>Task Description</h3>
                                <div className='task-description'>
                                    <p className='task-p'>{this.state.TaskDescription}</p>
                                </div> 
                            </div>     
                        </div>
                        <div className='task-content-right'>
                            <h3 className='task-heading'>Submission</h3>
                            <div className='submission'>
                                <label className='assignment-name'>{this.state.AssignmentName}</label>
                                <div className='doc-div' onClick={this.handleOpenAssignment}>
                                    <a target='_blank' rel='noreferrer' href={`http://127.0.0.1:3000/student/get-assignment-by-id/${this.state.TaskCode}/${this.state.id}`}>
                                        {this.state.AssignmentName}
                                    </a>
                                    <Document id='doc-pdf' file={this.state.Assignment}>
                                        <Page pageNumber={1} />
                                    </Document>
                                </div>
                                <div className="file-input">
                                    <input type="file" id="file" className="file" name="file" accept='.pdf' onChange={this.handleChangeAssignment}/>
                                    <label htmlFor="file">Select file</label>
                                </div>
                                <label onClick={this.handleSubmit} className='lbl-submit-assignment'>Submit</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentTask;