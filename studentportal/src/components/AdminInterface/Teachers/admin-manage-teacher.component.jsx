import { Component } from 'react';
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import './admin-manage-teachers.styles.css';
import AddTeacher from './Add/add-teacher.component';
import SearchTeacher from './Search/search-teacher.components';
import UpdateTeacher from './Update/update-teacher.component';
import RemoveTeacher from './Remove/remove-teacher.component';

class ManageTeachers extends Component {
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
                                <AddTeacher token={this.props.token} className='add-teacher'/>
                            </div>:
                            this.state.value === 2 ?
                            <div className='container-admin-tab'>
                                <SearchTeacher token={this.props.token} className='search-teacher'/>
                            </div>:
                            this.state.value === 3 ?
                            <div className='container-admin-tab'>
                                <UpdateTeacher token={this.props.token} className='update-teacher'/>
                            </div>:
                            this.state.value === 4 ?
                            <div className='container-admin-tab'>
                                <RemoveTeacher token={this.props.token} className='remove-teacher'/>
                            </div>:
                            null
                        }
                    </div>
                </Paper>
            </div>
        )
    }
}

export default ManageTeachers;