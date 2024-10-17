// /api/send-certificates.js

import nodemailer from 'nodemailer';
import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false, // Disable bodyParser for file uploads
    },
};

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to parse form data' });
            }

            const { email, firstName, lastName, emailBody } = fields;
            const certificatePath = files.certificateFile.filepath;
            const pdfPath = files.pdfFile?.filepath; // Optional PDF path

            // Configure your email transporter
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER, // Your email
                    pass: process.env.EMAIL_PASS, // Your email password
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER, // Sender email
                to: email, // Recipient's email
                subject: 'Your Training Certificate', // Email subject
                html: `
                    <p>Hello ${firstName} ${lastName},</p>
                    <p>${emailBody}</p>
                    <img src="cid:unique@certificate" alt="Certificate" />
                `,
                attachments: [
                    {
                        filename: 'certificate.jpg',
                        path: certificatePath,
                        cid: 'unique@certificate', // Content-ID for embedding
                    },
                ],
            };

            if (pdfPath) {
                mailOptions.attachments.push({
                    filename: 'training_summary.pdf',
                    path: pdfPath,
                });
            }

            try {
                await transporter.sendMail(mailOptions);
                res.status(200).json({ message: 'Certificates sent successfully!' });
            } catch (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ error: 'Failed to send email' });
            }
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
};

export default handler;
