import React from 'react';
import ReactDOM from 'react-dom';
import Component from './../WatchlistTicker';
describe('WatchlistTicker', ()=>{
    it('renders without error', ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<Component/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
