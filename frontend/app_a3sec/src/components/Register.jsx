import React from "react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css"
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function Register(props) {

	const navigate = useNavigate();

	const [formRegister, setFormRegister] = useState({
		username: "",
		email: "",
		password: "",
	})

	const onChangeForm = (label, event) => {
		switch (label) {
			case "username":
				setFormRegister({ ...formRegister, username: event.target.value })
				break
			case "email":
				setFormRegister({ ...formRegister, email: event.target.value })
				break
			case "password":
				setFormRegister({ ...formRegister, password: event.target.value })
				break
		}
	}

	const onSubmitHandler = async (event) => {
        event.preventDefault();
        // console.log(formRegister);
    
        try {
            const response = await fetch('http://localhost:5000/user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formRegister),
            });
    
            const data = await response.json();
    
            if (response.status === 200) {
                swal({ text: 'User created successfully!', icon: 'success' });
    
                setFormRegister({
                    username: '',
                    email: '',
                    password: '',
                });
    
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else if (response.status === 400) {
                swal({ text: data.message, icon: 'error' });
            }
        } catch (error) {
            console.error(error);
        }
    };
    

	return (
		<React.Fragment>
			<div>
				<h1 className="text-3x1 font-bold text-center mb-4 cursor-pointer">
					Create an account
				</h1>
				<p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer mx-auto">
					Welcome to App a3Sec!
				</p>
			</div>

			<form onSubmit={onSubmitHandler}>
				<div className="space-y-4">

					<input
						type="text"
						placeholder="Username"
						className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
						onChange={(event) => {
							onChangeForm("username", event)
						}}
					/>

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
						placeholder="Password"
						className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
						onChange={(event) => {
							onChangeForm("password", event)
						}}
					/>
				</div>
				<div className="text-center mt-6">
					<button type="submit" className="py3 w-64 text-xl text-white bg-yellow-400 rounded-2xl hover:bg-yellow-300 active:bg-yellow-500 outline-none">Create account</button>

					<p className="mt-4 text-sm">
						Already have an account?{" "}
						<Link to={"/sigin"}
							onClick={() => {
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