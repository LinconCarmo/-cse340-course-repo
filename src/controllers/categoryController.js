import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId
} from '../models/categories.js';

const buildCategories = async (req, res, next) => {
    try {
        const categories = await getAllCategories();

        res.render('categories', { title: 'Categories', categories });
    } catch (error) {
        next(error);
    }
};

const buildCategoryDetail = async (req, res, next) => {
    const categoryId = Number(req.params.id);

    if (!Number.isInteger(categoryId) || categoryId < 1) {
        return res.status(404).render('404', { title: 'Page Not Found' });
    }

    try {
        const category = await getCategoryById(categoryId);

        if (!category) {
            return res.status(404).render('404', { title: 'Page Not Found' });
        }

        const projects = await getProjectsByCategoryId(categoryId);

        res.render('category', {
            title: category.name,
            category,
            projects
        });
    } catch (error) {
        next(error);
    }
};

export { buildCategories, buildCategoryDetail };
