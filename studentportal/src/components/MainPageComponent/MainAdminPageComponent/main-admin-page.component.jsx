import { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import './main-admin-page.styles.css';
import ManageStudents from "../../AdminInterface/Students/admin-manage-students.component";
import ManageTeachers from "../../AdminInterface/Teachers/admin-manage-teacher.component";

class MainStudentPageComponent extends Component {
    constructor() {
        super();
        this.state = {
            value: 0
        }
    }

    handleChange = async (event, value) => {
        await this.setState({ value })
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
                        <Tab label="Students" />
                        <Tab label="Teachers" />
                    </Tabs>
                    <div className='tab-content-admin'>
                        {this.state.value === 0 ? 
                            <div className='container-admin'>
                                <ManageStudents token={this.props.token}/>
                            </div>:
                            this.state.value === 1 ?
                            <div className='container-admin'>
                                <ManageTeachers token={this.props.token}/>
                            </div>:
                            null
                        }
                    </div>
                </Paper>
            </div>
        )
    }
}

export default MainStudentPageComponent;