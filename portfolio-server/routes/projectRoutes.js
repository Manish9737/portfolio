const router = require('express').Router();
const upload = require('../config/multer');
const {
  addProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  toggleProjectVisibility,
  toggleProjectFeatured,
} = require('../controllers/projectController');


router.post('/', upload.single("imageUrl"),addProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.patch('/:id', upload.single("imageUrl"), updateProject);
router.delete('/:id', deleteProject);


module.exports = router;
