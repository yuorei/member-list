"use client";
import React from 'react';

const Login = () => {
    const handleSlackLogin = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const url = process.env.NEXT_PUBLIC_API_URL;
        try {
            const response = await fetch(`${url}/login/?code=${code}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                if (data.is_registered as boolean) {
                    window.location.href = "/";
                    return
                } else {
                    window.location.href = "/registered";
                }
            } else {
                console.error('Failed to start Slack authentication');
                window.location.href = "/login";
            }
        } catch (error) {
            console.error('Failed to start Slack authentication:', error);
            window.location.href = "/login";
        }
    };

    handleSlackLogin();
    return (
        <div>
            <button onClick={handleSlackLogin}>リダイレクトされない場合はこちらをクリックしてください。</button>
        </div>
    );
};

export default Login;
