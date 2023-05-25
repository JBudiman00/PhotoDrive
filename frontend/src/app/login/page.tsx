"use client";
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

axios.defaults.withCredentials = true;

export default function Login() {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [status, setStatus] = useState("");
    const router = useRouter();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        axios.post("http://localhost:8000/users/login", JSON.stringify({
            username: email,
            password: pw
            }),{
            headers: {
              "Content-Type": "application/json"
            },
          }).then((response: any) => {
            console.log(response);
            setStatus("Logging in");
            router.push('/home');
        }).catch(error => {
            console.log(error.response.data.message);
            setStatus(error.response.data.message);
          });
    }

    const errorHandle = () => {
        if(status == ""){
            return;
        }

        return (
            <div className="justify-self-center bg-[#FFCDD2] text-[#B71C1C] rounded-lg align-middle py-2 px-2 mt-6">
                {status}
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-74px)] items-center justify-center">
            <div className="flex flex-col bg-[#F1F6F9] h-1/2 w-1/3 items-center">
                <p className="text-3xl text-center font-bold py-3">Login</p>
                <form onSubmit={handleSubmit}>
                    <div className="h-4"></div>
                    <div className="flex flex-row">
                        <p className="text-lg w-1/3">Email</p>
                        <input 
                            type="text" 
                            className="bg-[#D9D9D9] rounded-xl w-2/3" 
                            onChange={(e) => setEmail(e.target.value)}    
                        />
                    </div>
                    <div className="h-4"></div>
                    <div className="flex flex-row">
                        <p className="text-lg w-1/3">Password</p>
                        <input 
                            type="text" 
                            className="bg-[#D9D9D9] rounded-xl w-2/3"
                            onChange={(e) => setPw(e.target.value)}
                        />
                    </div>
                    {errorHandle()}
                    <div className="h-6"></div>
                    <div className="grid grid-cols-3">
                        <input type="submit" className="col-start-2 text-lg text-[#F1F6F9] bg-[#212A3E] rounded-xl px-1 py-1"/>
                    </div>
                </form>
                <div className="self-center justify-self-center pt-3">
                    <p>Don't have an account? <Link href="/signup" className="text-[#3A85F5]">Sign up</Link></p>
                </div>
            </div>
        </div>
    )
}