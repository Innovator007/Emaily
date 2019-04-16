import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
    return (
        <div>
            <label>{label}</label>
            <input id={label} {...input} style={{ marginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom: '20px',fontSize: "14px" }}>
                {touched && error}            
            </div>
        </div>
    );
}