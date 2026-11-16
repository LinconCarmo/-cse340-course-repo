import {
    getAllOrganizations,
    getOrganizationById,
    getProjectsByOrganizationId
} from '../models/organizations.js';

const buildOrganizations = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();

        res.render('organizations', {
            title: 'Our Partner Organizations',
            organizations
        });
    } catch (error) {
        next(error);
    }
};

const buildOrganizationDetail = async (req, res, next) => {
    const organizationId = Number(req.params.id);

    if (!Number.isInteger(organizationId) || organizationId < 1) {
        return res.status(404).render('404', { title: 'Page Not Found' });
    }

    try {
        const organization = await getOrganizationById(organizationId);

        if (!organization) {
            return res.status(404).render('404', { title: 'Page Not Found' });
        }

        const projects = await getProjectsByOrganizationId(organizationId);

        res.render('organization', {
            title: organization.name,
            organization,
            projects
        });
    } catch (error) {
        next(error);
    }
};

export { buildOrganizations, buildOrganizationDetail };
