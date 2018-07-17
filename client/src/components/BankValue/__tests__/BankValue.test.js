import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import {mount, shallow} from 'enzyme';
import Component from './../BankValue';
import React from 'react';
import ReactDOM from 'react-dom';
describe('Bank Value', ()=>{
    it('renders without error', ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<Component/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
describe('stockStats', ()=>{
    const wrapper = mount(<Component/>);
    // it('exists', ()=>{
    //     expect(wrapper.find('.stockStats').exists()).toBe(true);
    // });
    it('contains properties', ()=>{
        expect(wrapper.find(wrapper.props().BankValue).exists()).toBe(true);
        // const wrapper = mount(<Component bar = 'baz'/>);
        // expect(wrapper.props().bar).toBe('baz');
    });
    it('can set properties', ()=>{
        // const wrapper = mount(<Component bar = 'baz'/>);
        // expect(wrapper.props().BankValue).toBe('no effing clue');
        wrapper.setProps({BankValue: 'foo'});
        expect(wrapper.props().BankValue).toBe('foo');
    });
});
