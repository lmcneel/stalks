import Component from '../TradingCenter.js';
import React from 'react';
import {  mount , shallow  } from 'enzyme';

describe('tradingCenter' , () => {
    it('exists' , ()=>{
        const wrapper = mount(<div className = 'component-name'/>);

        expect(wrapper.find('component-name').exists()).toBe(true);
    });
    it('handles input change' , () =>{

    });
    it('buys shares' , () => {

    });
    it('sells shares' , () =>{

    });
});