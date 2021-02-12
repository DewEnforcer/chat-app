import React, { Component } from 'react';

const Select = ({name, label, error, genres, ...rest}) => {
    return (
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select className="form-control" id={name} name={name} {...rest}>
            {genres.map((genre) => {
                return <option key={genre._id} value={genre._id}>{genre.name}</option>
            })}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
    </div>
    );
}
 
export default Select;