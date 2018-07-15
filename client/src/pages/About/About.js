import React, {Component} from 'react';
import Container from "../../components/Container";
import Images from "../../components/Images";
import data from "../../data.json";

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('./assets/people', false, '/\.jpg/'));
console.log(images);

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
              src={data.image}
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

