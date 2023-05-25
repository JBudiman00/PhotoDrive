'use client';
import { useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    useEffect(() => {
        axios.get("http://localhost:8000/albums", { withCredentials: true })
        .then((response: any) => {
            console.log(response);
        }).catch(error => {
            console.log(error.response.data);
        });
    })

    return (
        <p>Test</p>
    )
}