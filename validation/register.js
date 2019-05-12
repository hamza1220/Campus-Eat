var Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data, editprofile) {

    if (editprofile === false){
        let errors = {};
        data.name = !isEmpty(data.name) ? data.name : '';
        data.email = !isEmpty(data.email) ? data.email : '';
        data.number= !isEmpty(data.number) ? data.number : '';
        data.password = !isEmpty(data.password) ? data.password  : '';
        data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

        if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
            errors.name = 'Name must be between 2 to 30 chars';
        }
        
        // if(Validator.isEmpty(data.name)) {
        //     errors.name = 'Name field is required';
        // }

        if(!Validator.isEmail(data.email)) {
            errors.email = 'Email is invalid';
        }

        // if(Validator.isEmpty(data.email)) {
        //     errors.email = 'Email is required';
        // }

        // if(Validator.isEmpty(data.number)) {
        //     errors.number = 'Number is required'
        // }

        num = data.number + ''
        // if (num !== ''){
        //     let x = Validator.isLength(num, {min: 11, max: 11})
        //     errors.number = x + ' , ' + num.length
        // }

        if((Validator.isLength(num, {min: 11, max: 11})) === false) {
            errors.number = 'Number should have 11 digits'
        }

        if ((Validator.isNumeric(num, {no_symbols: true})) === false) {
            errors.number = 'Please enter a valid number, e.g 03001234567'
        } 
        

        // if(/^\d+$/.test(data.number)){
        //     errors.number = 'Number cannot contain alphabets'
        // }

        let check2 = true
        pass = data.password + ''
        cpass = data.password_confirm + ''

        if((Validator.isLength(pass, {min: 6, max: 30})) === false) {
            errors.password = 'Password must have minimum 6 chars';
            check2 = false
        }

        // if(Validator.isEmpty(data.password)) {
        //     errors.password = 'Password is required';
        // }

        // if(!Validator.isLength(data.password_confirm, {min: 6, max: 30})) {
        //     errors.password_confirm = 'Password must have minimum 6 chars';
        // }

        if((!Validator.equals(pass, cpass)) && (check2)) {
            errors.password_confirm = 'Password and Confirm Password must match';
            check2 = false
        }

        // if(Validator.isEmpty(data.password_confirm)) {
        //     errors.password_confirm = 'Password is required';
        // }

        return {
            errors,
            isValid: isEmpty(errors)
        }

    }
    else{
        let errors = {};
        data.name = !isEmpty(data.name) ? data.name : '';
        data.email = !isEmpty(data.email) ? data.email : '';
        data.number= !isEmpty(data.number) ? data.number : '';
        data.password = !isEmpty(data.password) ? data.password : '';
        data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

        // if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
        //     errors.name = 'Name must be between 2 to 30 chars';
        // }
        
        if(Validator.isEmpty(data.name)) {
            errors.name = 'Name field is required';
        }

        if(!Validator.isEmail(data.email)) {
            errors.email = 'Email is invalid';
        }

        if(Validator.isEmpty(data.email)) {
            errors.email = 'Email is required';
        }

        if(Validator.isEmpty(data.number)) {
            errors.number = 'Number is required'
        }

        // num = data.number + ''

        // if((Validator.isLength(num, {min: 11, max: 11})) === false) {
        //     errors.number = 'Number should have 11 digits'
        // }

        // if ((Validator.isNumeric(num, [{no_symbols: true}])) === false) {
        //     errors.number = 'Please enter a valid number, e.g 03001234567'
        // } 

        // if(/^\d+$/.test(data.number)){
        //     errors.number = 'Number cannot contain alphabets'
        // }

        // if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        //     errors.password = 'Password must have 6 chars';
        // }

        // if(Validator.isEmpty(data.password)) {
        //     errors.password = 'Password is required';
        // }

        // if(!Validator.isLength(data.password_confirm, {min: 6, max: 30})) {
        //     errors.password_confirm = 'Password must have 6 chars';
        // }
        // let check2 = true
        // pass = data.password + ''
        // cpass = data.password_confirm + ''

        // if((!Validator.equals(pass, cpass)) && (check2)) {
        //     errors.password_confirm = 'Password and Confirm Password must match';
        //     check2 = false
        // }

        // if(Validator.isEmpty(data.password_confirm)) {
        //     errors.password_confirm = 'Password is required';
        // }

        return {
            errors,
            isValid: isEmpty(errors)
        }

    }
}