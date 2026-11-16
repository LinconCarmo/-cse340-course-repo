import db from './db.js';

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM public.category
        ORDER BY name;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getCategoryById = async (categoryId) => {
    const query = `
        SELECT category_id, name
        FROM public.category
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows[0];
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT project.project_id, project.name
        FROM public.project
        JOIN public.project_category USING (project_id)
        WHERE project_category.category_id = $1
        ORDER BY project.name;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows;
};

export { getAllCategories, getCategoryById, getProjectsByCategoryId };
