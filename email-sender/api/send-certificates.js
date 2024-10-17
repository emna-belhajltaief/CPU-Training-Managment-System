const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const multer = require('multer');
const sharp = require('sharp');
const csv = require('csv-parser');
const cors = require('CORS')

// Initialize the Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'https://cpu-trainings-managment-system.vercel.app/'
}));


// Set up Multer for file uploads
const upload = multer({ dest: '/tmp/uploads/' }); // Store files in the /tmp directory for serverless environments

// Configure the mail transporter (using environment variables)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Store email credentials in environment variables
        pass: process.env.EMAIL_PASS,
    },
});

// Function to generate the certificate with the recipient's name
const generateCertificate = async (firstName, lastName, certificateTemplatePath) => {
    const fontPath = path.join(__dirname, 'fonts/MonteCarlo-Regular.ttf'); // Font for the certificate
    const outputPath = `/tmp/${firstName}_${lastName}_certificate.jpg`; // Output to /tmp folder

    const fullName = `${firstName} ${lastName}`;

    let nameToDisplay = fullName;
    const maxLineLength = 35;

    // Break the name into two lines if it's too long
    if (fullName.length > maxLineLength) {
        const firstLine = fullName.substring(0, maxLineLength);
        const secondLine = fullName.substring(maxLineLength);
        nameToDisplay = `${firstLine}\n${secondLine.trim()}`;
    }

    try {
        // Use sharp to overlay the text on the certificate image
        await sharp(certificateTemplatePath)
            .composite([
                {
                    input: Buffer.from(`
                    <svg width="1800" height="1200">
                       <style>
                            @font-face {
                                font-family: 'MonteCarlo';
                                src: url('file://${fontPath}') format('truetype');
                            }
                            .title {
                                fill: black;
                                font-size: 109px;
                                font-family: 'MonteCarlo', monospace;
                                font-weight: bold;
                            }
                        </style>
                        <text x="700" y="600" class="title">${nameToDisplay}</text>
                    </svg>
                    `),
                    top: 600,
                    left: 700
                }
            ])
            .toFile(outputPath);

        return outputPath; // Return the generated certificate path
    } catch (error) {
        console.error('Error generating the certificate:', error);
        throw new Error('Could not generate the certificate');
    }
};

// Function to send the email
const sendEmail = (email, firstName, lastName, pdfPath, certificatePath, emailBody) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,  // Sender email (from environment variable)
        to: email,
        subject: 'Your Training Certificate',
        html: `
            <p>Hello ${firstName} ${lastName},</p>
            <p>${emailBody}</p>
            <img src="cid:unique@certificate" alt="Certificate" />
        `,
        attachments: [
            {
                filename: 'certificate.jpg',
                path: certificatePath,
                cid: 'unique@certificate',
            },
        ],
    };

    if (pdfPath) {
        mailOptions.attachments.push({
            filename: 'training_summary.pdf',
            path: pdfPath,
        });
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(`Error sending to ${email}: `, error);
        } else {
            console.log(`Email sent to ${email}: ` + info.response);
        }
    });
};

// Route for sending certificates
app.post('/send-certificates', upload.fields([
    { name: 'pdfFile', maxCount: 1 },
    { name: 'csvFile', maxCount: 1 },
    { name: 'certificateFile', maxCount: 1 }
]), (req, res) => {
    const pdfFile = req.files['pdfFile'] ? req.files['pdfFile'][0] : null; // Optional PDF
    const csvFile = req.files['csvFile'] ? req.files['csvFile'][0] : null; // CSV is required
    const certificateFile = req.files['certificateFile'] ? req.files['certificateFile'][0] : null; // Certificate image is required
    const emailBody = req.body.emailBody; // Custom email body

    // Validate uploaded files
    if (!csvFile || !certificateFile) {
        return res.status(400).send('CSV and certificate image files must be uploaded.');
    }

    const pdfPath = pdfFile ? pdfFile.path : null; // Handle optional PDF file
    const csvFilePath = csvFile.path; // Get the CSV file path
    const certificateImagePath = certificateFile.path; // Get the certificate image path

    // Process the CSV file and send emails
    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
            const email = row.email;
            const firstName = row.first_name;
            const lastName = row.last_name;

            generateCertificate(firstName, lastName, certificateImagePath).then(certificatePath => {
                sendEmail(email, firstName, lastName, pdfPath, certificatePath, emailBody);
            }).catch(error => {
                console.error(`Error generating certificate for ${email}: `, error);
            });
        })
        .on('end', () => {
            console.log('All emails have been sent.');
            res.status(200).send('Emails sent successfully.');
        })
        .on('error', (error) => {
            console.error('Error reading the CSV file:', error);
            res.status(500).send('Error reading the CSV file.');
        });
});

// Export the Express app for serverless deployment
module.exports = app;
