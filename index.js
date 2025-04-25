const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const showsRoutes = require('./routes/shows');
const songsRoutes = require('./routes/songs'); // <-- NEW LINE
const authRoutes = require('./routes/auth.routes');
const favouritesRoutes = require('./routes/favourites.routes');
const commentsRoutes = require('./routes/comments.routes');



app.use('/api/favourites', favouritesRoutes);
app.use('/api/shows', showsRoutes);
app.use('/api/songs', songsRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/comments', commentsRoutes);


app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/shows', showsRoutes);
app.use('/api/songs', songsRoutes); // <-- NEW LINE

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
