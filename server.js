import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const NODE_ENV = 'production';
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
app.get('/organizations', (req, res) => {
    res.render('organizations', { title: 'Organizations' });
});

// Projects page
app.get('/projects', (req, res) => {
    res.render('projects', { title: 'Projects' });
});

// Categories page
app.get('/categories', (req, res) => {
    res.render('categories', { title: 'Categories' });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});