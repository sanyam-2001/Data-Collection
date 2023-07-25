import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bootstrap from './bootstrap/Bootstrap';
import FormRoutes from './Routes/FormRoutes';


const app = express();
const PORT = process.env.PORT || 5000;
bootstrap(app);

app.get("/healthCheck", (req, res) => {
    res.json({ success: true, code: 200, data: `Service Running on PORT: ${PORT}`, err: null })
});

app.use("/form", FormRoutes);

app.listen(PORT, () => console.log(`PORT: ${PORT}`))