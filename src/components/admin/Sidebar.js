import React from 'react';

const Sidebar = () => {
    return (
        <div style={{ width: 240, height: '100vh', background: '#f4f4f4', padding: 20 }}>
            <h2>Admin Sidebar</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><a href="/admin/dashboard">Dashboard</a></li>
                <li><a href="/admin/users">Users</a></li>
                <li><a href="/admin/settings">Settings</a></li>
            </ul>
        </div>
    );
};

export default Sidebar;