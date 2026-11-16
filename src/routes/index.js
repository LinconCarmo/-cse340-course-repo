import express from 'express';
import { buildHome } from '../controllers/homeController.js';
import {
    buildOrganizations,
    buildOrganizationDetail
} from '../controllers/organizationController.js';
import {
    buildProjects,
    buildProjectDetail
} from '../controllers/projectController.js';
import {
    buildCategories,
    buildCategoryDetail
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', buildHome);
router.get('/organizations', buildOrganizations);
router.get('/organization/:id', buildOrganizationDetail);
router.get('/projects', buildProjects);
router.get('/project/:id', buildProjectDetail);
router.get('/categories', buildCategories);
router.get('/category/:id', buildCategoryDetail);

export default router;
