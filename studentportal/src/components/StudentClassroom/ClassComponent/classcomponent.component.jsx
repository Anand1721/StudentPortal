/* eslint-disable jsx-a11y/no-distracting-elements */
import { Component } from 'react';
import './classcomponent.styles.css';

class StudentClassComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Code: '',
            SubjectName: '',
            FacultyName: '',
            userID: ''
        }
    }

    async componentDidMount () {
        await this.setState({
            Code: this.props.Code,
            SubjectName: this.props.SubjectName,
            FacultyName: this.props.FacultyName,
            userID: this.props.userID
        })
    }

    render () {
        return (
            <div className='class-component' onClick={async () => await this.props.toggle(1, this.state.Code, this.state.SubjectName, this.state.FacultyName, this.state.userID, '', '', '', '')}>
                <h2 className='classroom-h2'><marquee>{this.state.SubjectName}</marquee></h2>
                <p id='fac-label'>
                    <u id='u'>Faculty Name:</u>
                </p>
                <p id='fac-name'>  
                    {this.state.FacultyName}
                </p>
            </div>
        )
    }
}

export default StudentClassComponent;