import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiDom from 'chai-dom';
import jsdom from 'jsdom';
import dotenv from "dotenv";

chai.use(chaiHttp);
chai.use(chaiDom);

const should = chai.should();
const expect = chai.expect;

process.env.NODE_ENV = "testing"
dotenv.config({path: `.env-testing`});

// load app after env
const app = (await import('../app.js')).app;

describe('GET /', () => {
    it('should return index page', async () => {
        const response = await chai.request(app).get('/');
        response.should.have.status(200);

        const dom = new jsdom.JSDOM(response.text);
        expect(dom.window.document.body.innerHTML).contain("NOTES APP")
    });
});

describe('GET /notes', () => {
    it('should return note create/modify page', async () => {
        const response = await chai.request(app).get('/notes');
        response.should.have.status(200);

        const dom = new jsdom.JSDOM(response.text);
        expect(dom.window.document.body.innerHTML).contain("Create new Note")
    });
});

describe('GET /notes/:id', () => {
    it('should return note create/modify page', async () => {
        const response = await chai.request(app).get('/notes/:id');
        response.should.have.status(200);

        const dom = new jsdom.JSDOM(response.text);
        expect(dom.window.document.body.innerHTML).contain("Modify Note")
    });
});

describe('POST /notes', () => {
    it('should return note create/modify page', async () => {
        const response = await chai.request(app).get('/notes');
        response.should.have.status(200);

        const dom = new jsdom.JSDOM(response.text);
        expect(dom.window.document.body.innerHTML).contain("Create new Note")
    });
});

describe('POST /notes/:id', () => {
    it('should return note create/modify page', async () => {
        const response = await chai.request(app).get('/notes/:id');
        response.should.have.status(200);

        const dom = new jsdom.JSDOM(response.text);
        expect(dom.window.document.body.innerHTML).contain("Modify Note")
    });
});

