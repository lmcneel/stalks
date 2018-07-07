import React, {Component} from 'react';
import Marquee from 'react-text-marquee';
//import './StockTicker.css';


const StockTicker = (props) => {
    return (
        <div className='ticker'>
            <Marquee text={props.children} />;
        </div>
    );
};

export default StockTicker;
