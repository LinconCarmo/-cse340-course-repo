import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { testConnection } from './src/models/db.js';
import router from './src/routes/index.js';

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

app.use((error, req, res, next) => {
    console.error('Application error:', error);

    if (res.headersSent) {
        return next(error);
    }

    res.status(500).render('500', { title: 'Server Error' });
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