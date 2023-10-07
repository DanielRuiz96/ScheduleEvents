import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export default function Login(props){
    const [loginForm,setLoginform] = useState({
        username:"",
        email:"",
        password:"",
    })


    const onChangeForm =(label,event)=>{
        switch(label){
            case "username":
                setLoginform({...loginForm,username: event.target.value})
                break
            case "email":
                setLoginform({...loginForm,email: event.target.value})
                break
            case "password":
                setLoginform({...loginForm,password: event.target.value})
                break
            
        }
    }

    const onSubmitHandler = async(event)=>{
        event.preventDefault()
        // console.log(loginForm);
        fetch('http://localhost:5000/user/login',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(loginForm)
        })
        .then(response =>response.json())
        .then(data =>{
            if (data.access_token) {
               
                const accessToken = data.access_token
                const tokenType = data.token_type
                const userId = data.user_id

                localStorage.setItem('access_token',accessToken)
                localStorage.setItem('access_token_type',tokenType)
                localStorage.setItem('user_id',userId)

                swal({ text: 'Login successful!', icon: 'success' })
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                swal({ text: data.message || 'Login failed', icon: 'error' })
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }

    return(
        <React.Fragment>
            <div>
                <h1 className="text-3x1 font-bold text-center mb-4 cursor-pointer">
                    Welcome to App a3Sec
                </h1>
                <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer mx-auto">
                    Please login to your account!
                </p>
            </div>

            <form onSubmit={onSubmitHandler}>
                <div className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                        onChange={(event)=>{
                            onChangeForm("username",event)
                        }}
                    />

                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                        onChange={(event)=>{
                            onChangeForm("email",event)
                        }}
                    />

                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                        onChange={(event)=>{
                            onChangeForm("password",event)
                        }}
                    />
                </div>
                <div className="text-center mt-6">
                    <button type="submit" className="py3 w-64 text-xl text-white bg-yellow-400 rounded-2xl hover:bg-yellow-300 active:bg-yellow-500 outline-none">Sign In</button>
                    
                    <p className="mt-4 text-sm">You don't an account?{" "} 
                        <Link to="/register"
                            onClick={()=>{
                                props.setPage("register")
                            }}
                        >
                            <span className="underline cursor-pointer">Register</span>
                        </Link>{" "}
                        or{" "}
                        <Link to="/forgot"
                            onClick={()=>{
                                props.setPage("forgot")
                            }}
                        >
                           <span className="underline cursor-pointer">Change Password</span> 
                        </Link>
                        
                    </p>
                </div>
            </form>
        </React.Fragment>
    )
}