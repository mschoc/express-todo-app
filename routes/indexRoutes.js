import express from 'express';

const router = express.Router();
import {indexController} from '../controller/indexController.js';

router.get("/", indexController.index.bind(indexController));

router.post("/sortedByFinishDate", indexController.indexSortedByFinishDate);
router.post("/sortedByFinishDate/showFinished", indexController.indexSortedByFinishDateShowFinished);

router.post("/sortedByCreatedDate", indexController.indexSortedByCreatedDate);
router.post("/sortedByCreatedDate/showFinished", indexController.indexSortedByCreatedDateShowFinished);

router.post("/sortedByImportance", indexController.indexSortedByImportance);
router.post("/sortedByImportance/showFinished", indexController.indexSortedByImportanceShowFinished);

router.post("/showFinished", indexController.indexShowFinished);

router.get("/notes", indexController.showNewNote);
router.get("/notes/:id/", indexController.getNote);
router.post("/notes", indexController.createNote);
router.post("/notes/:id/", indexController.updateNote);
router.post("/update/:id/", indexController.updateNoteFinishedState);


export const indexRoutes = router;
