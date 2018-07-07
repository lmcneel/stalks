import axios from 'axios';

export default {
    // Saves an article to the database
    login: function(loginData) {
        return axios.post('/api/login', loginData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    },
};
