import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export default function Forgot(props){

    const [formForgot, setFormForgot] = useState({
		email: "",
		password: "",
        newpassword :""
	})

    const onChangeForm = (label, event) => {
		switch (label) {
			case "email":
				setFormForgot({ ...formForgot, email: event.target.value })
				break
			case "password":
				setFormForgot({ ...formForgot, password: event.target.value })
				break
			case "newpassword":
				setFormForgot({ ...formForgot, newpassword: event.target.value })
				break
		}
	}

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        //console.log(formForgot);
        try {
            const response = await fetch('http://localhost:5000/user/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formForgot)
            });
    
            const data = await response.json();
    
            if (response.status === 200) {
                swal({ text: "Password updated successfully!", icon: "success" })
    
                setFormForgot({
                    email: "",
                    password: "",
                    newpassword: ""
                })
    
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
    
            } else if (response.status === 400) {
                swal({ text: data.message, icon: 'error' });
            }
        } catch (error) {
            console.error(error);
        }
    }
    

    return(
        <React.Fragment>
            <div>
                <h1 className="text-3x1 font-bold text-center mb-4 cursor-pointer">
                    Do you want to change your password ?
                </h1>
                <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer mx-auto">
                    Now update your password account!
                </p>
            </div>

            <form onSubmit={onSubmitHandler}>
                <div className="space-y-4">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                        onChange={(event) => {
							onChangeForm("email", event)
						}}
                    />

                    <input 
                        type="password" 
                        placeholder="Password Current" 
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                        onChange={(event) => {
							onChangeForm("password", event)
						}}
                    />

                    <input 
                        type="password" 
                        placeholder="New Password" 
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                        onChange={(event) => {
							onChangeForm("newpassword", event)
						}}
                    />
                </div>
                <div className="text-center mt-6">
                    <button type="submit" className="py3 w-64 text-xl text-white bg-yellow-400 rounded-2xl hover:bg-yellow-300 active:bg-yellow-500 outline-none">Update Password</button>
                    
                    <p className="mt-4 text-sm">Already have an account?
                     <Link to="/siging"
                            onClick={()=>{
                                props.setPage("login")
                            }}
                     >
                        <span className="underline cursor-pointer">Sign In</span>
                     </Link>
                    </p>
                </div>
            </form>
        </React.Fragment>
    )
}