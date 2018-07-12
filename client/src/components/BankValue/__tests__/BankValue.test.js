import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import Component from './../BankValue';
import React from 'react';
import {mount, shallow} from 'enzyme';
import ReactDOM from 'react-dom';


describe('Bank Value', ()=>{
    it('renders without error', ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<Component/>, div);
        ReactDOM.unmountComponentAtNode(div);      
    });
});
describe('stockStats', ()=>{
    it('exists', ()=>{
        const mountWrapper = mount(<Component/>);
        expect(mountWrapper.find('.stockStats').exists()).toBe(true);
    });
});