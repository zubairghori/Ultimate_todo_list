const request = require('request'),
    expect = require('chai').expect,
    mongoose = require('mongoose');

describe('ToDo Lists Of Tasks', () => {

    describe('I: GET All The Tasks', () => {

        it('Should Get All The Tasks', (done) => {
            request.get('http://rest-nosql.herokuapp.com/todo/api/v1/tasks', (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe('II: GET Single Task', () => {

        it('Should Get Single Task', (done) => {
            request.get('http://rest-nosql.herokuapp.com/todo/api/v1/tasks/dcuneyb', (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe('III: POST A Task', () => {

        it('Should Post A Task', (done) => {

            request.post({
                url: 'http://rest-nosql.herokuapp.com/todo/api/v1/tasks',
                json: {
                    task_title: "Hello World",
                    task_description: "Bye Everyone",
                    task_done: false
                }
            }, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe('IV: UPDATE A Task', () => {
        it('Should Update A Task', (done) => {
            request.put({
                url: 'http://rest-nosql.herokuapp.com/todo/api/v1/tasks/dcuneyb',
                json: {
                    task_title: "Hello World",
                    task_description: "Bye Everyone",
                    task_done: false
                }
            }, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe('V: DELETE A Task', () => {
        it('Should Delete A Task', (done) => {
            request.delete('http://rest-nosql.herokuapp.com/todo/api/v1/tasks/dcuneyb', (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
});