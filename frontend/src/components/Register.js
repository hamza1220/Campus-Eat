import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import { registerUser } from '../actions/authentication';
import classnames from 'classnames';
import '../App.css'
import logo from './redlogo.png'


class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            number: '',
            password: '',
            password_confirm: '',
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
            user_type: "customer",
        }
        this.props.registerUser(user, this.props.history);
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
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const { errors } = this.state;
        return(
        <div className="App">
                <MetaTags>
                    <meta charSet="utf-8" name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta name="theme-color" content="#B02737"/>
                </MetaTags>
            <br/> <br/> <br/> <br/>
            <img id="logo" src={logo} width='30%' height="30%" alt="CE Logo"/>
            <br/> 

            <h3 className="heading"> Sign Up to Campus Eat and start ordering food </h3>
            <br/>
            <div className='infocontainer'>

                <form onSubmit={ this.handleSubmit }>
                    <div className="form-group">
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
                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
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
                        />
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
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
                        {errors.number && (<div className="invalid-feedback">{errors.number}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                        type="password"
                        placeholder="Password"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.password
                        })}
                        name="password"
                        required = "required"
                        onChange={ this.handleInputChange }
                        value={ this.state.password }
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                        type="password"
                        placeholder="Confirm Password"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.password_confirm
                        })}
                        name="password_confirm"
                        required = "required"
                        onChange={ this.handleInputChange }
                        value={ this.state.password_confirm }
                        />
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

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register))