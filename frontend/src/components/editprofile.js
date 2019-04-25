import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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
            errors: {}
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
        
        // fetch('api/user/editprofile', {
        //   method: 'POST',
        //   body: JSON.stringify(user),
        //   headers: {
        //     "Content-Type": "application/json",
        //   }
        // })
        // .then(res => {
        //     res.json().then(body => {
        //     console.log(body)
        //     })
        // });

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
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
        return(
        <div className="App">
            <br/> <br/> <br/> <br/>
            <img id="logo" src={logo} width='30%' height="30%" alt="CE Logo"/>
            <br/> 

            <h3 className="heading"> Edit Profile </h3>
            <br/>
            <div className='infocontainer'>

                <form onSubmit={ this.handleSubmit }>
                    <div className="form-group form-inline">
                    <label>
                        Name    
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
                    </label>
                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>
                    <div className="form-group form-inline">
                        <label>
                        Email
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
                        </label>
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group form-inline">
                        <label>
                        Number
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
                        </label>
                        {errors.number && (<div className="invalid-feedback">{errors.number}</div>)}
                    </div>
                    <div className="form-group form-inline">
                        <label>
                        New Password
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
                        </label>
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group form-inline">
                        <label>
                        Confirm password
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
                        </label>
                        {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="b1">
                            Sign Up
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