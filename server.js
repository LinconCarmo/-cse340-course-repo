import 'dotenv/config';
import { getAllOrganizations } from './src/models/organizations.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { testConnection } from './src/models/db.js';

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Home page
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

// Organizations page
app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();

    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
});

// Projects page
app.get('/projects', (req, res) => {
    res.render('projects', { title: 'Projects' });
});

// Categories page
app.get('/categories', (req, res) => {
    res.render('categories', { title: 'Categories' });
});

app.listen(PORT, async () => {
    try {
        await testConnection();

        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});