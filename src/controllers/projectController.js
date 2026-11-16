import {
    getAllProjects,
    getProjectById,
    getCategoriesByProjectId
} from '../models/projects.js';

const buildProjects = async (req, res, next) => {
    try {
        const projects = await getAllProjects();

        res.render('projects', {
            title: 'Upcoming Service Projects',
            projects
        });
    } catch (error) {
        next(error);
    }
};

const buildProjectDetail = async (req, res, next) => {
    const projectId = Number(req.params.id);

    if (!Number.isInteger(projectId) || projectId < 1) {
        return res.status(404).render('404', { title: 'Page Not Found' });
    }

    try {
        const project = await getProjectById(projectId);

        if (!project) {
            return res.status(404).render('404', { title: 'Page Not Found' });
        }

        const categories = await getCategoriesByProjectId(projectId);

        res.render('project', {
            title: project.name,
            project,
            categories
        });
    } catch (error) {
        next(error);
    }
};

export { buildProjects, buildProjectDetail };
