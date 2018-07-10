import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.string,
    ]),
};

const PetPic = (props) => {
    return (
      <div>
        <img src={props.children} width="250px" alt="user's pet" />
      </div>
    );
};
PetPic.propTypes = propTypes;
export {PetPic};
