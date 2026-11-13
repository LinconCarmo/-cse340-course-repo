import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT
            project.project_id,
            project.name,
            project.description,
            organization.name AS organization_name,
            COALESCE(
                array_agg(category.name ORDER BY category.name)
                    FILTER (WHERE category.category_id IS NOT NULL),
                '{}'
            ) AS categories
        FROM public.project
        JOIN public.organization USING (organization_id)
        LEFT JOIN public.project_category USING (project_id)
        LEFT JOIN public.category USING (category_id)
        GROUP BY project.project_id, organization.name
        ORDER BY project.project_id;
    `;

    const result = await db.query(query);

    return result.rows;
};

export { getAllProjects };
