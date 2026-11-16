import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT project.project_id, project.name, project.project_date,
               organization.organization_id, organization.name AS organization_name
        FROM public.project
        JOIN public.organization USING (organization_id)
        WHERE project.project_date >= CURRENT_DATE
        ORDER BY project.project_date, project.project_id
        LIMIT 5;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getProjectById = async (projectId) => {
    const query = `
        SELECT project.project_id, project.name, project.description,
               project.project_date, organization.organization_id,
               organization.name AS organization_name
        FROM public.project
        JOIN public.organization USING (organization_id)
        WHERE project.project_id = $1;
    `;

    const result = await db.query(query, [projectId]);

    return result.rows[0];
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT category.category_id, category.name
        FROM public.category
        JOIN public.project_category USING (category_id)
        WHERE project_category.project_id = $1
        ORDER BY category.name;
    `;

    const result = await db.query(query, [projectId]);

    return result.rows;
};

export { getAllProjects, getProjectById, getCategoriesByProjectId };
