import express from 'express';

const registerGlobalMiddlewares = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(function (req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type,Accept");

        next();
    });
}
export default registerGlobalMiddlewares;