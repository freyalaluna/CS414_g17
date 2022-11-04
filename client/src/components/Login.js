import React, {useEffect, useState} from 'react';
import {LOG} from '../utils/constants'
import '../static/styles/login.css';

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

export default function Login(props){

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const handleLogin = async(e) => {
        e.preventDefault();

        var hash = bcrypt.hashSync(formData.password, salt);
        console.log(formData, hash);

        await props.accountActions.sendAccountRequest(formData.username, hash);
        
        if(props.requestValidated){
            console.log("Success");
        } else {
            console.log("Failure");
        }
        
    };

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    };

    return(
            <div className='auth-wrapper'>
                <h2>Log In</h2>
                <form onSubmit={handleLogin}>
                    <div className='input-field'>
                        <label>
                            Username:
                            <input type='text' 
                                name='username'
                                placeholder='Enter username'
                                onChange={handleChange}
                                required/>
                        </label>
                    </div>

                    <div className='input-field'>
                        <label>
                            Password:
                            <input 
                                type='password' 
                                name='password'
                                placeholder='Enter password'
                                onChange={handleChange} 
                                required/>
                        </label>
                    </div>

                    <button
                        className='submit-button'
                        type='submit'>
                        Register
                    </button>
                </form>
                <br></br>
                <p className='signup-subscript'>Don't have an account? <a className='subscript-link' href='#'>Click here to sign up.</a>
                </p>
            </div>
    )
}