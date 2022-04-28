import { Component } from "react";
import { ReactComponent as Edit } from '../../../../assets/edit.svg';
import { ReactComponent as Save } from '../../../../assets/save.svg';
import './about-teacher.styles.css';

class NormalAbout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AboutTeacher: ''
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
            const response = await fetch('http://127.0.0.1:3000/teacher/get-about', requestOptions)
            const { AboutTeacher } = await response.json()
            this.setState({ AboutTeacher })
            this.props.checkEdit('normal')
            await this.props.parentState(AboutTeacher)
        } catch (e) {
            console.log(e)
        }
    }

    handleClickEdit = async (event) => {
        this.props.checkEdit('edit')
        await this.props.parentState(this.state.AboutTeacher)
    }
    
    render() {
        return (
            <div className='about-teacher'>
                <h4 className='heading'><div>About Teacher</div><span className='edit-about'><Edit onClick={this.handleClickEdit} className='edit-icon'/></span></h4>
                <div className=''>
                    <p className='normal-p'>
                        {this.state.AboutTeacher}
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
            AboutTeacher: ''
        }
    }

    componentDidMount () {
        this.setState({ AboutTeacher: this.props.AboutTeacher })
    }

    handleChange = (event) => {
        if (event.target.value.length > 350) {
            event.target.value = event.target.value.substring(0, 350)
        } else {
            this.setState({ AboutTeacher: event.target.value })
        }
    }

    handleClickSave = async (event) => {
        event.preventDefault()
        try {
            const { AboutTeacher } = this.state
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', this.props.token);
            const body = JSON.stringify({
                AboutTeacher
            })
            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body
            }
            await fetch('http://127.0.0.1:3000/teacher/put-about', requestOptions)
            this.props.checkEdit('normal')
            await this.props.parentState(AboutTeacher)
        } catch (e) {
            console.log(e)
        }
    }
    
    render() {
        return (
            <div className='about-teacher'>
                <h4 className='heading'><div>About Teacher</div><span className='edit-abt'><Save onClick={this.handleClickSave} className='save-icon'/></span></h4>
                <div className=''>
                    <textarea rows="13" cols="36" className='ta' onChange={this.handleChange} value={this.state.AboutTeacher}></textarea>
                </div>
            </div>
        )
    }
}

class AboutTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: 'normal',
            AboutTeacher: ''
        }
    }

    checkEdit = (edit) => {
        this.setState({ edit })
    }
    
    parentState = async (AboutTeacher) => {
        await this.setState({ AboutTeacher })
    }

    render() {
        return (
            this.state.edit === 'normal' ?
            <NormalAbout checkEdit={this.checkEdit} parentState={this.parentState} AboutTeacher={this.state.AboutTeacher} token={this.props.token} /> :
            <EditAbout checkEdit={this.checkEdit} parentState={this.parentState} AboutTeacher={this.state.AboutTeacher} token={this.props.token} />
        )
    }
}

export default AboutTeacher;