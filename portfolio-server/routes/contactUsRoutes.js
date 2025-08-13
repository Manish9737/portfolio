const router = require('express').Router();
const { createContact, getAllContacts, getContactById, deleteContact, sendEmailController } = require('../controllers/contactUsController');

router.post('/', createContact)
router.get('/', getAllContacts);
router.get('/:id', getContactById);
router.delete('/:id', deleteContact);

router.post('/send-email', sendEmailController);

module.exports = router