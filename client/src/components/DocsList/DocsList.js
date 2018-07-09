import React from 'react';
import PropTypes from 'prop-types';
import API from '../../utils/API';
import CollapseRow from '../CollapseRow';

const propTypes = {
    title: PropTypes.string,
    article: PropTypes.array,
    image: PropTypes.string,
    keywords: PropTypes.array,
    language: PropTypes.string,
    helpful: PropTypes.number,
};
/**
 * DocsList class
 */
class DocsList extends React.Component {
  /**
   * Constructor method for docs list
   * @param {*} props
   */
    constructor(props) {
        super(props);
        this.state = {
            docs: [],
        };
        this.loadDocs = this.loadDocs.bind(this);
    }
/**
 * Loading Docs
 */
    componentDidMount() {
        this.loadDocs();
    };

   /**
   * LoadDocs function
   */
    loadDocs() {
        API.getDocs()
            .then((res) =>
                this.setState({
                    docs: res.data,
                }),
        )
            .catch((err) => console.log(err));
    };
    /**
   * Render function
   * @return {JSX}
   */
    render() {
        return (
            <div>
                {this.state.docs.map((docs) => (
                    <CollapseRow
                        key={docs._id}
                        title={docs.title}
                        article={docs.article}
                        url={docs.url}
                    />
                ))}
            </div>
        );
    }
}
DocsList.propTypes = propTypes;
export default DocsList;
