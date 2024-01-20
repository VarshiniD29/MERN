import React from 'react' 
import UsersList from '../components/UsersList';


const Users = () => {
    const USERS = [
    {
        id : 'u1',
        name : 'Varshini',
        image : 
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0NY8N0AWyRi3RaLP8Sk_uwK-Wav6fIiftsA&usqp=CAU',
        places: 3
    }
 ];



return <UsersList items = {USERS} />;
};

export default Users ;