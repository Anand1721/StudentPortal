import { Component } from "react";
import { ReactComponent as Edit } from '../../../../assets/edit.svg';
import { ReactComponent as Save } from '../../../../assets/save.svg';
import './about-student.styles.css';

class NormalAbout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AboutStudent: ''
        }
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
            const response = await fetch('http://127.0.0.1:3000/student/get-about', requestOptions)
            const { AboutStudent } = await response.json()
            this.setState({ AboutStudent })
            this.props.checkEdit('normal')
            await this.props.parentState(AboutStudent)
        } catch (e) {
            console.log(e)
        }
    }

    handleClickEdit = async (event) => {
        this.props.checkEdit('edit')
        await this.props.parentState(this.state.AboutStudent)
    }
    
    render() {
        return (
            <div className='about-student'>
                <h4 id='heading'><div>About Student</div><span className='edit-about'><Edit onClick={this.handleClickEdit} className='edit-icon'/></span></h4>
                <div className=''>
                    <p className='normal-p'>
                        {this.state.AboutStudent}
                    </p>
                </div>
            </div>
        )
    }
}

class EditAbout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AboutStudent: ''
        }
    }

    componentDidMount () {
        this.setState({ AboutStudent: this.props.AboutStudent })
    }

    handleChange = (event) => {
        if (event.target.value.length > 350) {
            event.target.value = event.target.value.substring(0, 350)
        } else {
            this.setState({ AboutStudent: event.target.value })
        }
    }

    handleClickSave = async (event) => {
        event.preventDefault()
        try {
            const { AboutStudent } = this.state
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', this.props.token);
            const body = JSON.stringify({
                AboutStudent
            })
            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body
            }
            await fetch('http://127.0.0.1:3000/student/put-about', requestOptions)
            this.props.checkEdit('normal')
            await this.props.parentState(AboutStudent)
        } catch (e) {
            console.log(e)
        }
    }
    
    render() {
        return (
            <div className='about-student'>
                <h4 id='heading'><div>About Student</div><span className='edit-abt'><Save onClick={this.handleClickSave} className='save-icon'/></span></h4>
                <div className=''>
                    <textarea rows="13" cols="36" className='ta' onChange={this.handleChange} value={this.state.AboutStudent}></textarea>
                </div>
            </div>
        )
    }
}

class AboutStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: 'normal',
            AboutStudent: ''
        }
    }

    checkEdit = (edit) => {
        this.setState({ edit })
    }
    
    parentState = async (AboutStudent) => {
        await this.setState({ AboutStudent })
    }

    render() {
        return (
            this.state.edit === 'normal' ?
            <NormalAbout checkEdit={this.checkEdit} parentState={this.parentState} AboutStudent={this.state.AboutStudent} token={this.props.token} /> :
            <EditAbout checkEdit={this.checkEdit} parentState={this.parentState} AboutStudent={this.state.AboutStudent} token={this.props.token} />
        )
    }
}

export default AboutStudent;