import React from 'react';

export const PetPic = (props) => {
    return (
      <div>
        <img src={props.children} width="250px" alt="user's pet" />
      </div>
    );
};
