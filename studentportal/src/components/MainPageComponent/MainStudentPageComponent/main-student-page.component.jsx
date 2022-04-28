import { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import StudentProfile from "../../StudentInterface/StudentProfile/BasicDetails/basic-details.component";
import './main-student-page.styles.css';
import OtherDetails from "../../StudentInterface/StudentProfile/OtherDetails/other-details.component";
import Profile from "../../StudentInterface/StudentProfile/Profile/profile-component.component";
import AboutStudent from "../../StudentInterface/StudentProfile/AboutStudent/about-student.component";
import AdmissionDetails from "../../StudentInterface/StudentAcademics/AdmissionDetails/admission-details.component";
import EducationDetails from "../../StudentInterface/StudentAcademics/Education/education.component";
import StudentClassroom from "../../StudentClassroom/Classroom/classroom.component";
import StudentClass from "../../StudentClassroom/Class/class.component";
import StudentTask from '../../StudentClassroom/Task/task.component';

class MainStudentPageComponent extends Component {
    constructor() {
        super();
        this.state = {
            value: 0,
            toggleValue: 0,
            Code: '',
            SubjectName: '',
            FacultyName: '',
            userID: '',
            StudentPhoto: '',
            SchoolMarksheet: ''
        }
    }

    handleChange = async (event, value) => {
        await this.setState({ value })
    }

    toggle = async (toggleValue, Code, SubjectName, FacultyName, userID, TaskCode, TaskTitle, TaskDescription, CreatedOn) => {
        await this.setState({ toggleValue, Code, SubjectName, FacultyName, userID, TaskCode, TaskTitle, TaskDescription, CreatedOn })
    }

    toggleChangePhoto = async (StudentPhoto) => {
        await this.setState({ StudentPhoto })
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
                        <Tab label="Academics" />
                        <Tab label="Classroom" />
                    </Tabs>
                    <div className='tab-content'>
                        {this.state.value === 0 ? 
                            <div className='container'>
                                <div className='container1'>
                                    <Profile className='profile-c' token={this.props.token} StudentPhoto={this.state.StudentPhoto}/>
                                    <AboutStudent className='about-s' token={this.props.token}/>
                                </div>
                                <div className='container2'>
                                    <StudentProfile className='student-profile' token={this.props.token}/> 
                                    <OtherDetails className='contact-details' token={this.props.token} toggleChangePhoto={this.toggleChangePhoto}/>
                                </div>
                            </div>:
                            this.state.value === 1 ?
                            <div>
                                <AdmissionDetails token={this.props.token}/>
                                <EducationDetails token={this.props.token}/>
                            </div>:
                            this.state.value === 2 ?
                            <div>
                                {this.state.toggleValue === 0 ?
                                    <StudentClassroom toggle={this.toggle} token={this.props.token} /> :
                                    this.state.toggleValue === 1 ?
                                    <StudentClass toggle={this.toggle} token={this.props.token} Code={this.state.Code} SubjectName={this.state.SubjectName} FacultyName={this.state.FacultyName} userID={this.state.userID} />
                                    : this.state.toggleValue === 2 ?
                                    <StudentTask toggle={this.toggle} token={this.props.token} Code={this.state.Code} SubjectName={this.state.SubjectName} FacultyName={this.state.FacultyName} userID={this.state.userID} TaskCode={this.state.TaskCode} TaskTitle={this.state.TaskTitle} TaskDescription={this.state.TaskDescription} CreatedOn={this.state.CreatedOn} />
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

export default MainStudentPageComponent;