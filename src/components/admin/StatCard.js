import React from 'react';

const StatCard = () => {
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '24px',
            maxWidth: '300px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
            <h2 style={{ margin: '0 0 12px 0' }}>Stat Title</h2>
            <p style={{ fontSize: '2rem', margin: 0 }}>123</p>
            <span style={{ color: '#888' }}>Description</span>
        </div>
    );
};

export default StatCard;