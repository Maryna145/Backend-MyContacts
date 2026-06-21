import express from 'express'
import {getContacts, createContact, updateContact, deleteContact, getContactByID} from "../controllers/contactController.js"
import {validateToken} from "../middleware/validateTokenHandler.js";

const router = express.Router()

router.use(validateToken)
router.route("/").get(getContacts).post(createContact)
router.route("/:id").put(updateContact).get(getContactByID).delete(deleteContact)

export default router