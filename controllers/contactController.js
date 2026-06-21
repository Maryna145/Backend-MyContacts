import expressAsyncHandler from 'express-async-handler'
import Contact from '../models/contactModel.js';

const getContacts = expressAsyncHandler(async (req, res) => {
    const contacts =await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts)
})
const getContactByID = expressAsyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error ('Could not find contact')
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error ("User don't have permission")
    }
    res.status(200).json(contact)
})
const createContact = expressAsyncHandler(async (req, res) => {
    const {name, phone, email} = req.body
    if (!name || !phone || !email) {
        res.status(400)
        throw new Error("Name, phone number and email is required")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    })
    res.status(201).json(contact)
})
const updateContact = expressAsyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error ('Could not find contact')
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error ("User don't have permission")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new :true}
    )
    res.status(200).json(updatedContact)
})
const deleteContact = expressAsyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error ('Could not find contact')
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error ("User don't have permission")
    }
    await Contact.deleteOne({ _id: req.params.id })
    res.status(200).json(contact)
})
export {getContacts, createContact, updateContact, deleteContact, getContactByID}