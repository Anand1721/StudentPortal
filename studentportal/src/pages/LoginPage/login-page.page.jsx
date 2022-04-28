import { Component } from "react";
import SignIn from "../../components/SignIn/sign-in.component";
import './login-page.styles.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render () {
        return (
            <div>
                <SignIn checkUser={this.props.checkUser} checkAdmin={this.props.checkAdmin} checkTeacher={this.props.checkTeacher} />
            </div>
        )
    }
}

export default LoginPage;