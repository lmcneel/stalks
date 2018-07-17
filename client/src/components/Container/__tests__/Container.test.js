import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import Component from './../Container';
import React from 'react';
import ReactDOM from 'react-dom';
import {mount/* , shallow*/} from 'enzyme';
describe('Container', ()=>{
    const wrapper = mount(<Component/>);
    it('renders without error', ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<Component/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('contains properties', ()=>{
        expect(wrapper.find(wrapper.props().Container).exists()).toBe(true);
    });
    it('can set properties', ()=>{
        // expect(wrapper.props().Container).toBe('no effing clue');
        wrapper.setProps({Container: 'foo'});
        expect(wrapper.props().Container).toBe('foo');
    });
});
