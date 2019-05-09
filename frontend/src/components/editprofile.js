import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// import { registerUser } from '../actions/authentication';
import { editUser } from '../actions/authentication';

import classnames from 'classnames';
import '../App.css'
import logo from './redlogo.png'

import Validator from 'validator';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css' 


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
            succ: false
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

        let testsPassed = true

        if(!Validator.isLength(this.state.name, { min: 2, max: 30 })) {
            testsPassed = false
            toast.error("Name must be between 2 and 30 characters", {
              position: toast.POSITION.TOP_CENTER,
            })

        }

        if((Validator.isLength(this.state.number, {min: 11, max: 11})) === false){
            testsPassed = false
            toast.error("Length of number should be 11", {
              position: toast.POSITION.TOP_CENTER,
            })
        } 
        // console.log("length is 11")
        if ((Validator.isNumeric(this.state.number, {no_symbols: true})) === false) {
            // console.log('Please enter a valid number, e.g 03001234567')
            testsPassed = false
            toast.error("Please enter a valid number, e.g 03001234567", {
              position: toast.POSITION.TOP_CENTER,
            })
        }

        if (this.state.password !== '' || this.state.password_confirm !== '') {

            if(!Validator.isLength(this.state.password, {min: 6, max: 30})) {
                testsPassed = false
                toast.error("Password must have 6 chars.", {
                position: toast.POSITION.TOP_CENTER,
                })
            }

            if((!Validator.equals(this.state.password, this.state.password_confirm))) {
                testsPassed = false
                toast.error("Password and Confirm Password must match", {
                position: toast.POSITION.TOP_CENTER,
                })
            }
        }

        if (testsPassed) {
            this.setState({succ:true})
            const user = {
                name: this.state.name,
                email: this.state.email,
                number: this.state.number,
                password: this.state.password,
                password_confirm: this.state.password_confirm,
                user_type: this.state.user_type
            }
            this.props.editUser(user,this.props.history)
        }

        // this.setState({clicked:true}) 

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
        fetch('api/giveprofile', {
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

        toast.configure({
            autoClose: 8000,
            draggable: true,
        });

        if (this.state.succ) {
            toast.error("Profile Updated Successfully. Happy Ordering!", {
                autoClose: 4000,
                position: toast.POSITION.TOP_CENTER,
            })

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