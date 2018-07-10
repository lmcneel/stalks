import Component from '../index.js';
import React from 'react';
import {  mount , shallow  } from 'enzyme';
describe('src-index', () =>{
    it('should render without error', ()=>{
        expect(shallow(<Component/>).find('form.component').exists()).toBe(true);
    });
});