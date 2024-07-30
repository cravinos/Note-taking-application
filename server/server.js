const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const pageRoutes = require('./routes/pages');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/Take-2-Project', { useNewUrlParser: true, useUnifiedTopology: true });
app.use('/api/pages', pageRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
