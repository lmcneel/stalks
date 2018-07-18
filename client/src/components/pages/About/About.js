import React, {Component} from 'react';
import Container from '../../Container';
import Images from '../../Images';
import data from './data.json';
import '../../../assets/scss/_about.scss';

/**
 * Trading Page
 */
class About extends Component {
    
    state = {
        data:data
    };
    render() {
        return (
            <div>
                <div id="">
                <h2>Meet the Team!</h2>
                </div>
                <Container >
            {/* <div className="wrapper"> */}
            <div className = "row">
            {this.state.data.map(data=>(
              <Images
              id={data.id}
              key={data.id}
              img={data.image}
              src={data.image}
              name={data.name}
              title={data.title}
              portfolio={data.portfolio}
            />

            ))}
            </div>
              </Container>
            </div>
        );
    }
}
export default About;


