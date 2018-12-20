const supertest = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');

const host = 'http://localhost:8080';

const should = chai.should();
const server = require('../../src/app');

chai.use(chaiHttp);

global.chai = chai;
global.should = should;
global.server = server;
global.host = host;
global.request = supertest(server);
global.expect = chai.expect;
global.nock = nock;
