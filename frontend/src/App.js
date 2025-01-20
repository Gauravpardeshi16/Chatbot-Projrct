// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');

    const fetchMessages = async() => {
        const response = await axios.get('http://localhost:5000/api/messages');
        setMessages(response.data);
    };

    const sendMessage = async(e) => {
        e.preventDefault();
        if (!user || !message) return;

        await axios.post('http://localhost:5000/api/messages', { user, message });
        setMessage('');
        fetchMessages();
    };

    useEffect(() => {
        fetchMessages();
    }, []);
    return ( <
        div style = {
            { padding: '20px' } } >
        <
        h1 > Chatbot < /h1> <
        div style = {
            { border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' } } > {
            messages.map(msg => ( <
                div key = { msg.id } >
                <
                strong > { msg.user }: < /strong> {msg.message} <
                /div>
            ))
        } <
        /div> <
        form onSubmit = { sendMessage } >
        <
        input type = "text"
        placeholder = "Your name"
        value = { user }
        onChange = {
            (e) => setUser(e.target.value) }
        required /
        >
        <
        input type = "text"
        placeholder = "Type a message"
        value = { message }
        onChange = {
            (e) => setMessage(e.target.value) }
        required /
        >
        <
        button type = "submit" > Send < /button> <
        /form> <
        /div>
    );
};
export default App;