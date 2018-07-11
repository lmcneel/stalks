import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Petfolio from './../pages/Petfolio';
import Trading from './../pages/Trading';
import {mount , shallow} from 'enzyme';




it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// 
// describe('app routes' , ()=>{
//   it('should have a petfolio route',()=>{
//     const wrapper = mount (<App/>);
//     expect(wrapper.find(Petfolio).toHaveLength(1));
//   });
// });