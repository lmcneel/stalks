import React, {Component} from 'react';
import Container from '../../components/Container';
import Images from '../../components/Images';
import data from '../../data.json';
import '../../assets/scss/_about.scss';

/**
 * About Page
 */
class About extends Component {
    /**
     * Constructor function for setting state
     * @param {*} props
     */
    constructor(props) {
        super(props);
        this.state = {
            data: data,
        };
    };

    /** Returns the Trading Center Component
     * @return {About}
     */
    render() {
        return (
            <div>
                <div id=''>
                <h2>Meet the Team!</h2>
                </div>
                <Container >
            {/* <div className='wrapper'> */}
            <div className = 'row'>
            {this.state.data.map((data) =>(
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


