const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const db = require('./db');

// const corsOptions = {
//   origin(origin, callback) {
//     const allowedOrigins = [
//       'https://omea.media/',
//       'https://admin.omea.media',
//       'https://store.omea.media/',
//     ];
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));
const apiRoutes = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Hello, World! we will do greate work with this project');
});

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  db();
});
