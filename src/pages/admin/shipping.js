import React from 'react';

const Shipping = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Shipping Information</h1>
            <form style={{ maxWidth: '400px', marginTop: '2rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Name:</label>
                    <input type="text" name="name" style={{ width: '100%' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Address:</label>
                    <input type="text" name="address" style={{ width: '100%' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>City:</label>
                    <input type="text" name="city" style={{ width: '100%' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Postal Code:</label>
                    <input type="text" name="postalCode" style={{ width: '100%' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Country:</label>
                    <input type="text" name="country" style={{ width: '100%' }} />
                </div>
                <button type="submit">Continue to Payment</button>
            </form>
        </div>
    );
};

export default Shipping;