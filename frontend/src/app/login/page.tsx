"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        let res = await fetch("http://localhost:8000/user/verify?email="+email+"&password="+pw, {
            method: "GET",
            
        });

        const resJson = await res.json()
        console.log(resJson);
        if(resJson.message === "Login successful"){
            window.location.href='http://localhost:3000/home';
        }
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
                    <div className="h-6"></div>
                    <div className="grid grid-cols-3">
                        <input type="submit" className="col-start-2 text-lg text-[#F1F6F9] bg-[#212A3E] rounded-xl px-1 py-1"/>
                    </div>
                </form>
                <div className="self-center justify-self-center pt-3">
                    <p>Already have an account? <Link href="/login" className="text-[#3A85F5]">Login</Link></p>
                </div>
            </div>
        </div>
    )
}