import React from 'react';

const ProductForm = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Product Form</h1>
            <form>
                <div>
                    <label>
                        Product Name:
                        <input type="text" name="name" />
                    </label>
                </div>
                <div>
                    <label>
                        Price:
                        <input type="number" name="price" />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <textarea name="description" />
                    </label>
                </div>
                <button type="submit">Save Product</button>
            </form>
        </div>
    );
};

export default ProductForm;