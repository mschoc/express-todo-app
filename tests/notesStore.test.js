import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiDom from 'chai-dom';
import jsdom from 'jsdom';
import dotenv from "dotenv";
import {notesStore, NoteStore} from '../services/notesStore.js'
import Datastore from "nedb-promise";

chai.use(chaiHttp);
chai.use(chaiDom);

const should = chai.should();
const expect = chai.expect;


process.env.NODE_ENV = "testing"
dotenv.config({path: `.env-testing`});

// load app after env
const app = (await import('../app.js')).app;
let noteID ='';

describe('notesStore.add Function Test', () => {
    it('should return the following Object Values', async () => {
        const notestore = new NoteStore();
        const response =  await notestore.add('TestName','TestTitel', 'TestText', 5, '29.6.2021, 20:55:46','' );
        expect(response.noteBy).equals("TestName")
        expect(response.noteTitle).equals("TestTitel")
        expect(response.noteText).equals("TestText")
        expect(response.notePrio).equals(5);
        expect(response.toDoUntilDate).equals("29.6.2021, 20:55:46")
        expect(response.finishedState).equals("")
        noteID = response._id;
    });
});

describe('notesStore.update and get Functions Test', () => {
    it('should return the updated Object Values', async () => {
        console.log(noteID);
        const notestore = new NoteStore();
        // update Row
        await notestore.update(noteID, 'TestNameUpdate','TestTitelUpdate', 'TestTextUpdate', 3, '29.6.2021, 02:55:46','on' );
        // get Row
        const response = await notestore.get(noteID);
            console.log(response);
        expect(response.noteBy).equals("TestNameUpdate")
        expect(response.noteTitle).equals("TestTitelUpdate")
        expect(response.noteText).equals("TestTextUpdate")
        expect(response.notePrio).equals(3);
        expect(response.toDoUntilDate).equals("29.6.2021, 02:55:46")
        expect(response.finishedState).equals("on")
        noteID = response._id;
    });
});
