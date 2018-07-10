import Component from '../index.js';
import React from 'react';
import {  mount , shallow  } from 'enzyme';

// describe('mySQL-index', ()=>{

// });

describe('mySQL-index', () =>{
    it('should render without error', ()=>{
        expect(shallow(<Component/>).find('form.component').exists()).toBe(true);
    });
});
