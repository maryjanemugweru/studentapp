import { toHaveFormValues } from "@testing-library/jest-dom/matchers";
import axios from "axios";
import React , { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegForm = () => {
    const [data, setData] = useState({
        regName: '',
        regEmail: '',
        regPassword: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData ((prev) => {
            return {...prev, [name]: value}
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:4000/api/reg/loginUser',FormValues)
        

        if (response.status === 200){
            const { accessToken, refreshToken } = response.data;

            sessionStorage.setItem('accessToken', accessToken);
            sessionStorage.setItem('refreshToken', refreshToken );
             

            login(accessToken);
            navigate(from, { replace: true});

        }else if (response.status === 401){
            const newAccessToken = await refreshToken();

            if (newAccessToken){
                await handleSubmit(e);
            }else{
                toast.error('Invalid username/password');
            }
        }

        else {
            console.error('Authentication failed');
        }
    }catch(error){
        next(error)
    }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="w-25 p-3 mx-auto">
                    <div className="form-group">
                        <label className="mb-1">Name</label>
                        <input type="text" className="form-control" name="regName" value={data.regName} onChange={handleChange}/><br/>
                    </div>
                    <div className="form-group">
                        <label className="mb-1">Email</label>
                        <input type="email" className="form-control" name="regEmail" value={data.regEmail} onChange={handleChange}/><br/>
                    </div>
                    <div className="form-group">
                        <label className="mb-1">Password</label>
                        <input type="password" className="form-control" name="regPassword" value={data.regPassword} onChange={handleChange}/><br/>
                    </div>
                    <div className="form-check mt-3 text-center">
                        <button type="submit" className="btn btn-primary justify-content-center">Register</button>
                        <ToastContainer/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RegForm;