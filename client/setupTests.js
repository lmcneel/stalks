// // const Enzyme = require('enzyme');
// // const EnzymeAdapter = require('enzyme-adapter-react-16');
 
// // Setup enzyme's react adapter
// Enzyme.configure({adapter: new EnzymeAdapter()});
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
