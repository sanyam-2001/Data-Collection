import nodemailer from 'nodemailer';
const config = {
    service: "gmail",
    auth: {
        user: "rosssam311@gmail.com",
        pass: "zoovkflvimprzseb"
    }
}
const transporter = nodemailer.createTransport(config);

export default transporter;