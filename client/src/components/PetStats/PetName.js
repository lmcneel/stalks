import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.string,
    ]),
};
const PetName = (props) => {
    return (
        <div className="petpic">
            <h3>{props.children}</h3>
        </div>
    );
};
PetName.propTypes = propTypes;
export {PetName};
