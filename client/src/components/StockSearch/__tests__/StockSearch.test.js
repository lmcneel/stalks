import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import React from 'react';
import ReactDOM from 'react-dom';
// import {mount, shallow} from 'enzyme';
import Component from './../StockSearch';

describe('StockSearch', ()=>{
    it('renders without error', ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<Component/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});