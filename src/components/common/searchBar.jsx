import React, { Component } from 'react';

const SearchBar = ({onChange, value}) => {
    return (
        <input type="text" className="form-control my-3" onChange={(e) => onChange(e.currentTarget.value)} value={value} placeholder="Search..."/>
    );
}
 
export default SearchBar;