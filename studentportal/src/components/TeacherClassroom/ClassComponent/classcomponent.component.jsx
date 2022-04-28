import { Component } from 'react';
import './classcomponent.styles.css';

class ClassComponent extends Component {
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
                {/* eslint-disable-next-line */}
                <h2 className='classroom-h2'><marquee>{this.state.SubjectName}</marquee></h2>
                <p id='fac-label'>
                    <u id='u'>Faculty Name:</u>
                </p>
                <p id='fac-name'>  
                    <span>{this.state.FacultyName}</span>
                </p>
            </div>
        )
    }
}

export default ClassComponent;