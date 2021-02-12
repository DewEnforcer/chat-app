import React from 'react';

const Textarea = ({name, label, error, ...rest}) => {
    return (
        <div className="form-group">
            <label>{label}:</label>
            <textarea className="form-control" name={name} id={name} {...rest}></textarea>
            {error && <div className="error_box">{error}</div>}
        </div>
    );
}
 
export default Textarea;