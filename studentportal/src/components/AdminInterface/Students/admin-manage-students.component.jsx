import { Component } from 'react';
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import './admin-manage-students.styles.css';
import AddStudent from './Add/add-student.component';
import SearchStudent from './Search/search-student.components';
import UpdateStudent from './Update/update-student.component';
import RemoveStudent from './Remove/remove-student.component';

class ManageStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        }
    }

    handleChange = async (event, value) => {
        await this.setState({ value })
    }

    render() {
        return (
            <div>
                <Paper square>
                    <Tabs
                        orientation="vertical"
                        value={this.state.value}
                        textColor="secondary"
                        indicatorColor="secondary"
                        onChange={this.handleChange}
                    >
                        <Tab disabled/>
                        <Tab label="Add" />
                        <Tab label="Search" />
                        <Tab label="Update" />
                        <Tab label="Remove" />
                        <Tab disabled/>
                        <Tab disabled/>
                        <Tab disabled/>
                        <Tab disabled/>
                        <Tab disabled/>
                        <Tab id='last-tab' disabled/>
                    </Tabs>
                    <div className='admin-tab-content'>
                        {this.state.value === 1 ? 
                            <div className='container-admin-tab'>
                                <AddStudent token={this.props.token} className='.add-student'/>
                            </div>:
                            this.state.value === 2 ?
                            <div className='container-admin-tab'>
                                <SearchStudent token={this.props.token} className='.search-student'/>
                            </div>:
                            this.state.value === 3 ?
                            <div className='container-admin-tab'>
                                <UpdateStudent token={this.props.token} className='.update-student'/>
                            </div>:
                            this.state.value === 4 ?
                            <div className='container-admin-tab'>
                                <RemoveStudent token={this.props.token} className='.remove-student'/>
                            </div>:
                            null
                        }
                    </div>
                </Paper>
            </div>
        )
    }
}

export default ManageStudents;