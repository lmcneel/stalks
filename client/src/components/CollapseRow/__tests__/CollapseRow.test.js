import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import {mount, shallow} from 'enzyme';
import Component from '../CollapseRow.js';
describe('CollapseRow', () => {
    it('renders without error', ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<Component/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
     it('exists', () =>{
        const mountWrapper = mount(<Component/>);
        expect(mountWrapper.find('.collapse-component').exists()).toBe(true);
     });
    it('collapses correctly', () =>{
        const shallowWrapper = shallow(<Component/>);
       expect(shallowWrapper.state().collapse).toBe(false);
    });
    it('can click button', ()=>{
        const onButtonClick = sinon.spy();
        const wrapper = shallow(
            <Component onButtonClick={onButtonClick} />);
          wrapper.find('button').simulate('click');
          expect(onButtonClick.calledOnce).to.be.true;
    });
});
