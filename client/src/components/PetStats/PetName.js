import React from 'react';

export const PetName = (props) => {
    return (
        <div className="petpic">
            <h3>{props.children}</h3>
        </div>
    );
};

