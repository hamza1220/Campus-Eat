import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// import { registerUser } from '../actions/authentication';
import { editUser } from '../actions/authentication';

import classnames from 'classnames';
import '../App.css'
import logo from './redlogo.png'


class EditProfile extends Component {

    constructor() {
        super();
        this.state = {
            email:'',
            name: '',
            number: '',
            password: '',
            password_confirm: '',
            user_type: '',
            errors: {},
            clicked: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            number: this.state.number,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
            user_type: this.state.user_type
        }
        this.props.editUser(user,this.props.history)

        this.setState({clicked:true}) 
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/') // Not sure of this is correct.
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        // this.setState({email: this.props.auth.user.emai;})
        console.log(this.props.auth.user.email)
        fetch('api/gibprofile', {
          method: 'POST',
          body: JSON.stringify({email: String(this.props.auth.user.email)}),
          headers: {
            "Content-Type": "application/json",
          }
        })
        .then(res => {
            res.json().then(body => {
            console.log(body)
            this.setState({name: body.name, email: body.email, number:body.number, user_type: body.user_type})
            })
        }); 
    }

    

    render() {
        const { errors } = this.state;

        if (this.state.clicked) {
            return <Redirect to='/userscreen'/>;
        }

        return(
        <div className="App">
            <br/> <br/> <br/> <br/>
            <img id="logo" src={logo} width='30%' height="30%" alt="CE Logo"/>
            <br/> 

            <h3 className="heading"> Edit Profile </h3>
            <p className="heading"> Press confirm after making your changes. </p>
            <p className="heading"> Leave the password fields blank if you do not wish to change your password. </p>
            <br/>
            <div className='infocontainer'>

                <form onSubmit={ this.handleSubmit }>
                <label style={{float: 'left'}} >
                    Your name:
                </label>    
                    <div className="form-group">
                            <div>
                                <input
                                type="text"
                                placeholder="Name"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.name
                                })}
                                name="name"
                                required = "required"
                                onChange={ this.handleInputChange }
                                value={ this.state.name }
                                />
                            </div>
                            {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                        <label style={{float: 'left'}}>
                            Email Address:
                        </label>
                            <div >
                                <input
                                type="email"
                                placeholder="Email"
                                required = "required"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.email
                                })}
                                name="email"
                                onChange={ this.handleInputChange }
                                value={ this.state.email }
                                readOnly
                                />
                            </div>
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <label style={{float: 'left'}}>
                            New Number:
                        </label>
                            <div>
                                <input
                                type="text"
                                placeholder="Phone Number eg 03001234567"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.number
                                })}
                                name="number"
                                required = "required"
                                onChange={ this.handleInputChange }
                                value={ this.state.number }
                                />
                            </div>
                        
                        {errors.number && (<div className="invalid-feedback">{errors.number}</div>)}
                    </div>
                    <div className="form-group">
                        <label style={{float: 'left'}}>
                            New Password:
                        </label>
                            <div>
                                <input
                                type="password"
                                placeholder="Password"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.password
                                })}
                                name="password"
                                onChange={ this.handleInputChange }
                                value={ this.state.password }
                                />
                            </div>
                            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <label style={{float: 'left'}}>
                            Confirm Password:
                        </label>    
                            <div>
                                <input
                                type="password"
                                placeholder="Confirm Password"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.password_confirm
                                })}
                                name="password_confirm"
                                onChange={ this.handleInputChange }
                                value={ this.state.password_confirm }
                                />
                            </div>
                        {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="b1">
                            Confirm 
                        </button>
                    </div>
                </form>
            </div>
        </div>
        )
    }
}

EditProfile.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{editUser })((EditProfile))