process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import dotenv from "dotenv";
dotenv.config();
const express = require("express")
const cors = require('cors')

const jobRoutes = require('./routes/jobs.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/jobs', jobRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})