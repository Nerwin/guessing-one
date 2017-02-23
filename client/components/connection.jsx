import React, { PropTypes, Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class Connection extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleConnection = this.handleConnection.bind(this);
        this.state = { login: "", email: "", password: "", confirmation: "", };
    }

    handleRegister(event, instance) {
        event.preventDefault();
        let login = this.state.login;
        let email = this.state.email;
        let password = this.state.password;
        let confirmation = this.state.confirmation;

        if (password === confirmation) {
            Meteor.call('userRegister', { login: login, email: email, password: password }, function (err, result) {
                console.log("userRegister called");
            });
        } else
            console.log("mauvaise confirmation : ", password + " - ", confirmation);

    }

    handleConnection(event, instance) {
        event.preventDefault();

        let email = this.state.email;
        let password = this.state.password;

        Meteor.loginWithPassword(email, password, function (error) {
            console.log("connection with loginWithPassword");
            if (error == 'undefined')
                console.log("you are connected");
        });
    }

    render() {
        return (
        <div className="ui-connection">
			<div className="ui-connection-content">
				<ul className="nav nav-tabs nav-justified">
					  <li className="active link-one"><a href="#login-block" data-toggle="tab"><i className="fa fa-sign-in"></i>Sign In</a></li>
					  <li className="link-two"><a href="#register-block" data-toggle="tab"><i className="fa fa-pencil"></i>Sign Up</a></li>
					  <li className="link-three"><a href="#contact-block" data-toggle="tab"><i className="fa fa-envelope"></i>Contact</a></li>
				</ul>
				<div className="tab-content">
					<div className="tab-pane active fade in" id="login-block">
						<div className="login-block-form">
							<h4>Sign In to your Account</h4>
							<div className="bor bg-green"></div>
							<form className="form" role="form">
								<div className="form-group">
									<label className="control-label">Username</label>
									<input type="text" className="form-control" placeholder="Enter Username"/>
								</div>
								<div className="form-group">
									<label className="control-label">Password</label>
									 <input type="password" className="form-control" placeholder="Enter Password"/>
								</div>
								<div className="form-group">
									<div className="checkbox">
										<label>
											<input type="checkbox"/> Remember
										</label>
									</div>
								</div>
								<div className="form-group">
 									<button type="submit" className="btn btn-red">Sign In</button>&nbsp;
									<button type="submit" className="btn btn-lblue">Reset</button>
								</div>
								<div className="form-group">
									<a href="#" className="black">Forget Password ?</a>
								</div>
							</form>
						</div>
					</div>
					<div className="tab-pane fade" id="register-block">
						<div className="register-block-form">
							<h4>Create a New Account</h4>
							<div className="bor bg-lblue"></div>
							<form className="form" role="form">
								<div className="form-group">
									<label className="control-label">Username</label>
									<input type="text" className="form-control"  placeholder="Enter Username"/>
								</div>
								<div className="form-group">
									<label className="control-label">Email</label>
									<input type="text" className="form-control" placeholder="Enter Email"/>
								</div>
								<div className="form-group">
									<label className="control-label">Password</label>
									<input type="password" className="form-control" placeholder="Enter Password"/>
								</div>
								<div className="form-group">
									<label className="control-label">Confirmation</label>
									<input type="password" className="form-control" placeholder="Confirm Password"/>
								</div>
								<div className="form-group">
									<button type="submit" className="btn btn-red">Submit</button>&nbsp;
									<button type="submit" className="btn btn-lblue">Reset</button>
								</div>
							</form>
						</div>
					</div>
					<div className="tab-pane fade" id="contact-block">
						<div className="contact-block-form">
							<h4>Contact Form</h4>
							<div className="bor bg-purple"></div>
							<form className="form" role="form">
								<div className="form-group">
									<label className="control-label">Name</label>
									<input type="text" className="form-control" placeholder="Enter Name"/>
								</div>
								<div className="form-group">
									<label className="control-label">Email</label>
									<input type="text" className="form-control" placeholder="Enter Email"/>
								</div>
								<div className="form-group">
									<label for="comments" className="control-label">Comments</label>
									<textarea className="form-control" id="comments" rows="5" placeholder="Enter Comments"></textarea>
								</div>
								<div className="form-group">
									<button type="submit" className="btn btn-red">Submit</button>&nbsp;
									<button type="submit" className="btn btn-lblue">Reset</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
        );
    }
}

export default createContainer(() => {
    return {
    };
}, Connection);