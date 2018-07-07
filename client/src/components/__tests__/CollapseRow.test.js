import Component from '../collapseRow/CollapseRow.js';
import React from 'react';
import {  mount , shallow  } from 'enzyme';

describe('CollapseRow' , () => {
    it('collapses correctly' , () =>{
        const wrapper = shallow(<Component/>);

       expect(wrapper.state().collapse).toBe(false);
    }
    )
})