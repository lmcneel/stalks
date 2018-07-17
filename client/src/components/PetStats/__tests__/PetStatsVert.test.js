import React from 'react';
import ReactDOM from 'react-dom';
import Component from './../PetStatsVert';
describe('PetStatsVert', ()=>{
    it('renders without error', ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<Component/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
