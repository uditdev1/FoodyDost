import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../components/Hooks/useAuth.jsx';
import { getAll, toggleBlock } from '../../Services/userService.js';
import classes from './usersPage.module.css';
import Title from '../../components/Title/Title';
import Search from '../../components/Search/Search.jsx';

export default function UsersPage() {
  const [users, setUsers] = useState();
  const { searchTerm } = useParams();
  const auth = useAuth();
  const currUser = useAuth().user;

  useEffect(() => {
    loadUsers();
  }, [searchTerm]);

  const loadUsers = async () => {
    const users = await getAll(searchTerm);
    setUsers(users);
  };

  const handleToggleBlock = async userId => {
    const isBlocked = await toggleBlock(userId);

    setUsers(oldUsers =>
      oldUsers.map(user => (user.id === userId ? { ...user, isBlocked } : user))
    );
  };
  return (
    <div className={classes.container}>
      <div className={classes.list}>
        <Title title="Manage Users" />
        <Search
          searchRoute="/admin/users/"
          defaultRoute="/admin/users"
          placeholder="Search Users"
          margin="0rem 0"
        />
        <div className={classes.list_item}>
          <h3>Name</h3>
          <h3>Email</h3>
          <h3>Address</h3>
          <h3>Admin</h3>
          <h3>Actions</h3>
        </div>
        {users && 
          users.map(user => (
            <div key={user.id} className={classes.list_item}>
              <span>{user.name}</span>
              <span>{user.email}</span>
              <span>{user.address}</span>
              <span>{user.isAdmin ? '✅' : '❌'}</span>
              <span className={classes.actions}>
                <Link  to={'/admin/editUser/' + user.id}>
                {user.id == currUser.id ? "Edit your Profile" : "Edit User"} 
                </Link>
                {auth.user.id !== user.id && (
                  <Link  onClick={() => handleToggleBlock(user.id)}>
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </Link>
                )}
              </span>
            </div>
          ))}
          {users && 
            <ol className={classes.list_item2}>
              {users.map(user => (
                <li key={user.id}>User id : {user.id}
                  <ul>
                    <li>NAME : <b>{user.name}</b></li>
                    <li>EMAIL : {user.email}</li>
                    <li>PHONE NO. : {user.phone}</li>
                    <li>ADDRESS : {user.address}</li>
                    <li>ADMIN : {user.isAdmin ? '✅' : '❌'}</li>
                    <li className={classes.actions}>
                      <Link className={classes.link_button} to={'/admin/editUser/' + user.id}>
                        {user.id == currUser.id ? "Edit your Profile" : "Edit User"} 
                      </Link>
                      {auth.user.id !== user.id && (
                        <Link className={classes.link_button} style={{backgroundColor : "red"}}  onClick={() => handleToggleBlock(user.id)}>
                          {user.isBlocked ? 'Unblock' : 'Block'}
                        </Link>
                      )}
                    </li>
                  </ul>
                </li>
              ))}
            </ol>
          }
      </div>
    </div>
  );
}
