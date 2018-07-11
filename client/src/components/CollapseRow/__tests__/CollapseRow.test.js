import Component from '../CollapseRow.js';
import React from 'react';
import {  mount , shallow  } from 'enzyme';

//
describe('CollapseRow' , () => {
    //
     it('exists' , () =>{
        const mountWrapper = mount(<div className = "collapse-component"/>);

        expect(mountWrapper.find('.collapse-component').exists()).toBe(false);
     });

    it('collapses correctly' , () =>{
        const shallowWrapper = shallow(<Component/>);

       expect(shallowWrapper.state().collapse).toBe(false);
    });
});