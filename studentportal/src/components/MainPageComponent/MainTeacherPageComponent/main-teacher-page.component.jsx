import { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import './main-teacher-page.styles.css';
import TeacherDetails from "../../TeacherInterface/TeacherProfile/BasicDetails/basic-details.component";
import TeacherProfile from "../../TeacherInterface/TeacherProfile/Profile/teacher-profile-component.component";
import AboutTeacher from "../../TeacherInterface/TeacherProfile/AboutTeacher/about-teacher.component";
import TeacherOtherDetails from "../../TeacherInterface/TeacherProfile/OtherDetails/other-details.component";
import Classroom from "../../TeacherClassroom/Classroom/classroom.component";
import Class from "../../TeacherClassroom/Class/class.component";
import Task from "../../TeacherClassroom/Task/task.component";

class MainTeacherPageComponent extends Component {
    constructor() {
        super();
        this.state = {
            value: 0,
            toggleValue: 0,
            Code: '',
            SubjectName: '',
            FacultyName: '',
            userID: '',
            TaskCode: '',
            TaskTitle: '',
            TaskDescription: '',
            CreatedOn: '',
            TeacherPhoto: ''
        }
    }

    handleChange = async (event, value) => {
        await this.setState({ value })
    }

    toggle = async (toggleValue, Code, SubjectName, FacultyName, userID, TaskCode, TaskTitle, TaskDescription, CreatedOn) => {
        await this.setState({ toggleValue, Code, SubjectName, FacultyName, userID, TaskCode, TaskTitle, TaskDescription, CreatedOn })
    }

    toggleChangeTeacherPhoto = async (TeacherPhoto) => {
        await this.setState({ TeacherPhoto })
    }

    render() {
        return (
            <div className="main-page">
                <Paper square>
                    <Tabs
                        value={this.state.value}
                        textColor="secondary"
                        indicatorColor="secondary"
                        onChange={this.handleChange}
                    >
                        <Tab label="Profile" />
                        <Tab label="Classroom" />
                    </Tabs>
                    <div className='tab-content'>
                        {this.state.value === 0 ? 
                            <div className='own-container'>
                                <div className='own-container1'>
                                    <TeacherProfile token={this.props.token} TeacherPhoto={this.state.TeacherPhoto}/>
                                    <AboutTeacher token={this.props.token} />
                                </div>
                                <div className='own-container2'>
                                    <TeacherDetails token={this.props.token} />
                                    <TeacherOtherDetails token={this.props.token} toggleChangeTeacherPhoto={this.toggleChangeTeacherPhoto}/>
                                </div>
                            </div>:
                            this.state.value === 1 ?
                            <div>
                                {this.state.toggleValue === 0 ?
                                    <Classroom toggle={this.toggle} token={this.props.token} /> :
                                    this.state.toggleValue === 1 ?
                                    <Class toggle={this.toggle} token={this.props.token} Code={this.state.Code} SubjectName={this.state.SubjectName} FacultyName={this.state.FacultyName} userID={this.state.userID} />
                                    : this.state.toggleValue === 2 ?
                                    <Task toggle={this.toggle} token={this.props.token} Code={this.state.Code} SubjectName={this.state.SubjectName} FacultyName={this.state.FacultyName} userID={this.state.userID} TaskCode={this.state.TaskCode} TaskTitle={this.state.TaskTitle} TaskDescription={this.state.TaskDescription} CreatedOn={this.state.CreatedOn} />
                                    : null
                                }
                            </div> :
                            null
                        }
                    </div>
                </Paper>
            </div>
        )
    }
}

export default MainTeacherPageComponent;