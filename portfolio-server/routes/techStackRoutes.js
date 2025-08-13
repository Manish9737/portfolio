const router = require('express').Router();
const upload = require('../config/multer');
const { getTechStack, addTechStack, deleteTechStack, updateTechStack, getTechStackById } = require('../controllers/techStackController');

router.get('/', getTechStack);
router.post('/', upload.single("icon"), addTechStack);
router.get('/:id', getTechStackById);
router.delete('/:id', deleteTechStack);
router.patch('/:id', upload.single("icon"), updateTechStack);

module.exports = router;