const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 
const pageRoutes = require('./routes/pages');
const { router: authRoutes } = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/Take-2-Project', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/pages', pageRoutes);
app.use('/api/auth', authRoutes);
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
