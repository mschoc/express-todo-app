import Datastore from 'nedb-promise';

export class Note {
    constructor(noteBy, noteTitle, noteText, notePrio, toDoUntilDate, finishedDate, finished) {

        let tempDateTime = new Date();

        this.noteBy = noteBy;
        this.noteTitle = noteTitle;
        this.noteText = noteText;
        this.notePrio = notePrio;
        this.toDoUntilDate = toDoUntilDate;
        this.noteCreateDate = tempDateTime.toLocaleString();
        this.finishedDate = finishedDate;
        this.finishedState = finished;
    }
}

export class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    async add(pnoteBy, pnoteTitle, pnoteText, pnotePrio, ptoDoUntilDate, pchecked) {
        let tempFinishedDateTime = "";
        if(pchecked=='on'){
            tempFinishedDateTime = new Date();
            tempFinishedDateTime = tempFinishedDateTime.toLocaleString();
        }else{
            pchecked='';
        }
        let note = new Note(pnoteBy, pnoteTitle, pnoteText, pnotePrio, ptoDoUntilDate,tempFinishedDateTime, pchecked);
        return await this.db.insert(note);
    }

    async update(id, pnoteBy, pnoteTitle, pnoteText, pnotePrio, ptoDoUntilDate, pchecked) {
        let tempCreateDateTime = new Date();
        let tempFinishedDateTime = "";
        if(pchecked=='on'){
            tempFinishedDateTime = new Date();
            tempFinishedDateTime = tempFinishedDateTime.toLocaleString();
        }else{
            pchecked='';
        }
        await this.db.update({_id: id}, { $set:{noteBy:pnoteBy,noteTitle:pnoteTitle, noteText:pnoteText, notePrio:pnotePrio,toDoUntilDate:ptoDoUntilDate, noteCreateDate:tempCreateDateTime.toLocaleString(), finishedDate:tempFinishedDateTime, finishedState:pchecked}});
    }

    async updateFinishedState(id, pchecked) {
        let tempFinishedDateTime = "";
        console.log(pchecked);
        if(pchecked=='on'){
            tempFinishedDateTime = new Date();
            tempFinishedDateTime = tempFinishedDateTime.toLocaleString();
        }else{
            pchecked='';
        }
        this.db.update({_id: id}, { $set:{finishedDate:tempFinishedDateTime, finishedState:pchecked}});
    }

    async get(id) {
        return await this.db.findOne({_id: id}, (err, note) => {
            if (err) {
                return callback(err);
            }
            return callback(null, note);
        });
    }

    async all() {
        return await this.db.find({});
    }

    async allSortedByFinishDate() {
        return await this.db.cfind({}).sort({ toDoUntilDate: 1 }).exec();
    }

    async allSortedByFinishDateShowFinished(){
        return await this.db.cfind({finishedState: "on"}).sort({ toDoUntilDate: 1 }).exec();
    }

    async allSortedByCreatedDate() {
        return await this.db.cfind({}).sort({ noteCreateDate: 1 }).exec();
    }

    async allSortedByCreatedDateShowFinished() {
        return await this.db.cfind({finishedState: "on"}).sort({ noteCreateDate: 1 }).exec();
    }

    async allSortedByImportance() {
        return await this.db.cfind({}).sort({ notePrio: -1 }).exec();
    }

    async allSortedByImportanceShowFinished() {
        return await this.db.cfind({finishedState: "on"}).sort({ notePrio: -1 }).exec();
    }

    async getFinished() {
        return await this.db.find({finishedState: "on"});
    }

}

export const notesStore = new NoteStore();
