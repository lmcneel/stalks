import React, {Component} from 'react';
import Container from "../../components/Container";
import Images from "../../components/Images";
import data from "../../data.json";
import '../../assets/scss/_about.scss';

/**
 * Trading Page
 */
class About extends Component {
    /** Returns the Trading Center Component
     * @return {About}
     * 
     */
    state = {
        data : data,
      };
    render() {
        return (
            <div>
                <div id="container">
                <h1>Meet the Team!</h1>
                </div>
                <Container >
            {/* <div className="wrapper"> */}
            <div className = "row">
            <div className="col-md-4">
            {this.state.data.map(data=>(
              <Images
              id={data.id}
              key={data.id}
              img={data.image}
              name={data.name}
              title={data.title}
              portfolio={data.portfolio}
            />
        
            ))}
            </div>
            </div>
              </Container>
            </div>
        );
    }
}
export default About;

