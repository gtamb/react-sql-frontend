import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]); // store the list of users
    const [name, setName] = useState('');// stor ethe name for new user
    const [email, setEmail] = useState(''); // store the email for new uset
    const [message, setMessage] = useState(''); // success/failure msg

    useEffect(()=> {
        fetchUsers();
    }, []);

    const fetchUsers= () => {
        axios.get('http://localhost:3001/users').then((response) => {
            setUsers(response.data);
        }).catch(error => {
            console.error('There was an error fetching the users:', error);
        });
    };
    const handleAddUser = async (event) => {
        event.preventDefault();

        const userData = {name: name, email:email};
        try{
            const response = await  axios.post('http://localhost:3001/users', userData);
            setMessage(`User added successfully! ID: ${response.data.id}`);
        
            //add new user w/o refetching the entire list
            setUsers([...users, {id: response.data.id, Name: name, Email: email}]);

                  // Clear form fields
            setName('');
            setEmail('');
        }catch(error) {
            console.error('There was an error adding the user:', error);
            setMessage('failed to add user: ' + error.message);
        };
    };

    return ( 
        <div>
            <h1> Users List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name}({user.email})</li>
                ))}
            </ul>
            <h2>Add New User</h2>
            <form onSubmit={handleAddUser}>
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add User</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default Users;
