import{notesStore} from '../services/notesStore.js'

export class IndexController {
    index = async (req, res) => {
        res.render("index", {data: await notesStore.all()});
    };

    indexSortedByFinishDate = async (req, res) => {
        res.render("index", {data: await notesStore.allSortedByFinishDate()});
    };

    indexSortedByFinishDateShowFinished = async (req, res) => {
        res.render("index", {data: await notesStore.allSortedByFinishDateShowFinished()});
    };

    indexSortedByCreatedDate = async (req, res) => {
        res.render("index", {data: await notesStore.allSortedByCreatedDate()});
    };

    indexSortedByCreatedDateShowFinished = async (req, res) => {
        res.render("index", {data: await notesStore.allSortedByCreatedDateShowFinished()});
    };

    indexSortedByImportance = async (req, res) => {
        res.render("index", {data: await notesStore.allSortedByImportance()});
    };

    indexSortedByImportanceShowFinished = async (req, res) => {
        res.render("index", {data: await notesStore.allSortedByImportanceShowFinished()});
    };

    indexShowFinished = async (req, res) => {
        res.render("index", {data: await notesStore.getFinished()});
    };

    showNewNote(req, res) {
        res.render("note", {new:true});
    };

    createNote = async (req, res) => {
        await notesStore.add(req.body.name, req.body.title , req.body.text , req.body.prio, req.body.toDoUntil, req.body.finished);
        res.render("index", {data: await notesStore.all()});
    };

    updateNote = async (req, res) => {
        await notesStore.update(req.params.id, req.body.name, req.body.title , req.body.text , req.body.prio, req.body.toDoUntil, req.body.finished);
        res.render("index", {data: await notesStore.all()});
    };

    updateNoteFinishedState =  async (req, res) => {
        await notesStore.updateFinishedState(req.params.id, req.body.finished)
        res.render("index", {data: await notesStore.all()});
    };

    getNote = async (req, res) => {
        res.render("note", await notesStore.get(req.params.id));
    };
}

export const indexController = new IndexController();
