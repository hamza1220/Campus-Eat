import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../actions/authentication';
import MetaTags from 'react-meta-tags';
import classnames from 'classnames';
import logo from './redlogo.png'
import '../App.css'


class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
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
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(user);
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            if (this.props.auth.user.user_type==="customer"){
                this.props.history.push('/userscreen');
            }
            else{
                this.props.history.push('/')
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            if (this.props.auth.user.user_type==="customer"){
                    this.props.history.push('/userscreen');
            }
            else{
                this.props.history.push('/')
            }
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const {errors} = this.state;
        return(
        <div className="App">
            <MetaTags>
                <meta charSet="utf-8" name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="theme-color" content="#B02737"/>
            </MetaTags>
            <br/> <br/> <br/> <br/>
            <img id="logo" src={logo} width='30%' height="30%" alt="CE Logo"/>
            <br/> 
            <h2 className="heading">Login to Campus Eat and order your food now </h2>
            <br/>
            <div className='infocontainer'>
                <form onSubmit={ this.handleSubmit }>
                    <div className="form-group">
                        <input
                        type="email"
                        placeholder="Email"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.email
                        })}
                        name="email"
                        onChange={ this.handleInputChange }
                        required = "required"
                        value={ this.state.email }
                        />
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
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
                        <button type="submit" className="b1">
                            Login
                        </button>
                    </div>
                </form>

                <Link to={'/forgotpassword'}>
                   <small style={{color: "blue"}}><u>Forgot Password?</u></small>
                </Link>
            </div>
        </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login)