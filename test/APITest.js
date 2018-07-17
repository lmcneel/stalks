const expect  = require('chai').expect;
const request = require('request');

it('Main page content', function(done) {
    request('http://localhost:3001/api/docs' , function(error, response, body) {
        expect(body).to.equal('Hello World');
        done();
    });
});