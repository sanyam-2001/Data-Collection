import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bootstrap from './bootstrap';

const app = express();

bootstrap();
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Execution Service Running on PORT: ${PORT}`));