import React from 'react'
import './login.css'
import usernameImg from '../../images/username.png'
import passwordImg from '../../images/password.png'

const Login = () => {
  return (
    <>
        <div className="login-container flex flex-row w-screen h-screen justify-center items-center">
            <div className='login-img w-1/2 h-full'></div>
            <div className='login-form flex flex-col w-1/2 h-full justify-center items-center'>
                <form action='' method='post' className='form flex flex-col justify-center items-center gap-4 '>
                    <div className='heading-box mb-4'>
                        <h3 className='heading text-2xl'>Sign in to your account</h3>
                        <span className='login-subheading text-xs text-slate-800 opacity-50'>You can Login here for your dashboard</span>
                    </div>
                    <div className='inp-username relative w-full leading-10'>
                        <input type='text' name='username' placeholder='Username' className='input w-full pl-9' required/>
                        <img src={usernameImg} alt='username-img' width={"18px"} height={'18px'} className='username-img absolute top-2.5 left-1.5'/>
                    </div>
                    <div className='inp-password relative w-full leading-10 mb-1'>
                        <input type='password' name='password' placeholder='Password' className='input w-full pl-9' required/>
                        <img src={passwordImg} alt='password-img' width={"18px"} height={'18px'} className='password-img absolute top-2.5 left-1.5'/>
                    </div>
                    <div className='extra-facility flex justify-between w-full mb-5'>
                        <div className='remember-me flex justify-center items-center gap-1'>
                            <input type='checkbox' name='remember-me' id='remember-me' className='checkbox'/>
                            <label htmlFor='remember-me' className='remember-me-label'>Remember me</label>
                        </div>
                        <div className='forgot-password'>
                            Forgot Password
                        </div>
                    </div>
                    <div className='btn w-full flex justify-center items-center '>
                        <button type='submit' className='signin-btn w-full leading-9 rounded-lg text-white'>Sign in</button>
                    </div>
                    <div className='or-section flex flex-row justify-center items-center gap-4'>
                        <div className='or-line '></div>
                        <div className='or'>or</div>
                        <div className='or-line'></div>
                    </div>
                    <div className='btn w-full flex justify-center items-cente'>
                        <button type='submit' className='register-btn w-full leading-9 rounded-lg text-white'>Register Spa</button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Login