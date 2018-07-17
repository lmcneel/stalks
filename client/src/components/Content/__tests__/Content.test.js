import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import {mount/* , shallow*/} from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import Component from './../Content';
describe('Content', ()=>{
    const wrapper = mount(<Component/>);
    it('exists', ()=>{
        expect(wrapper.find('.mt-3').exists()).toBe(true);
    });
    it('renders without error', ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<Component/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('contains properties', ()=>{
        expect(wrapper.find(wrapper.props().Content).exists()).toBe(true);
    });
    it('can set properties', ()=>{
        // expect(wrapper.props().Content).toBe('no effing clue');
        wrapper.setProps({Content: 'foo'});
        expect(wrapper.props().Content).toBe('foo');
    });
});
