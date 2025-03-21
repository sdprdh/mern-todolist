import app from './app.js';
import './src/config/db.js';

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
