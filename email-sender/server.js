const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const csv = require('csv-parser');
const nodemailer = require('nodemailer');
const multer = require('multer');
const sharp = require('sharp'); 
const upload = multer({ dest: 'uploads/' });
const app = express();
const PORT = process.env.PORT || 5010;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cpuisimmbranch@gmail.com',
        pass: 'non' //'dgha hhon ojyz ecja'
    },
});
app.use(cors({
    origin: 'http://localhost:5173'
}));

//Convert names to title case
function convertToTitleCase(str) {
    if (!str) {
        return ""
    }
    return str.toLowerCase().split(' ').map(function (word) {
        return word.charAt(0).toUpperCase().concat(word.substr(1));
     }).join(' ');
  }

// Function to generate the certificate image with the recipient's name
const generateCertificate = async (firstName, lastName, certificateTemplatePath) => {
    const fontPath = path.join(__dirname, 'edwardianscriptitc.ttf');
    const outputPath = path.join(__dirname, 'certificates', `${firstName}_${lastName}_certificate.jpg`);
    
    const fullName = `${firstName} ${lastName}`;
    
    let nameToDisplay = `<tspan x="1000" dy="100">${fullName}</tspan>`;
    const maxLineLength = 40;
    // Break the name into two lines if it's too long
    if (fullName.length > maxLineLength) {
        const firstLine = firstName; //fullName.substring(0, maxLineLength);
        const secondLine = lastName; //fullName.substring(maxLineLength);
        nameToDisplay = `<tspan x="1000" dy="-20">${firstLine}</tspan><tspan x="1000" dy="100">${secondLine.trim()}</tspan>` //Consider changing x if you changed it below (ki tbadl certificate)
        console.log(nameToDisplay);
    }
    // Ensure the certificates folder exists
    if (!fs.existsSync(path.join(__dirname, 'certificates'))) {
        fs.mkdirSync(path.join(__dirname, 'certificates'));
    }
    try {
        // Use sharp to overlay the text on the image
        await sharp(certificateTemplatePath)
            .composite([
                {
                    input: Buffer.from(`
                    <svg width="2000" height="1414">
                       <style>
                            @font-face {
                                font-family: 'edwardianscriptitc';
                                src: url('file://${fontPath}') format('truetype');
                            }
                            .title {
                                fill: #174777;
                                font-size: 140px;
                                font-family: 'edwardianscriptitc';
                                font-weight: bold;
                            }
                        </style>
                        <text text-anchor="middle" x="1000" y="700" class="title">${nameToDisplay}</text>
                    </svg>
                    `),
                    top: 0, // Adjust these values for vertical positioning
                    left: 0  // Adjust these values for horizontal positioning
                }
            ])
            .toFile(outputPath);
        return outputPath; // Return the path to the generated certificate
    } catch (error) {
        console.error('Error generating the certificate:', error);
        throw new Error('Could not generate the certificate');
    }
};
const sendEmail = (email, firstName, lastName, pdfPath, certificatePath, emailBody) => {
    const mailOptions = {
        from: 'cpuisimmbranch@gmail.com',
        to: email,
        subject: 'Your Training Certificate',
        html: `
            <p>Hello ${firstName} ${lastName},</p>
            <p>${emailBody}</p>  <!-- Use the email body here -->
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
            return console.log(`Error sending to ${email}: `, error);
        }
        console.log(`Email sent to ${email}: ` + info.response);
    });
};
// Route for sending certificates
app.post('/send-certificates', upload.fields([{ name: 'pdfFile', maxCount: 1 }, { name: 'csvFile', maxCount: 1 }, { name: 'certificateFile', maxCount: 1 }]), (req, res) => {
    const pdfFile = req.files['pdfFile'] ? req.files['pdfFile'][0] : null; // Make PDF optional
    const csvFile = req.files['csvFile'] ? req.files['csvFile'][0] : null; // Ensure CSV file is present
    const certificateFile = req.files['certificateFile'] ? req.files['certificateFile'][0] : null; // Ensure certificate file is present
    const emailBody = req.body.emailBody; // Get the email body from the request
    // Validate files
    if (!csvFile || !certificateFile) {
        return res.status(400).send('CSV and certificate image files must be uploaded.');
    }
    const pdfPath = pdfFile ? pdfFile.path : null; // Handle optional PDF
    const csvFilePath = csvFile.path;
    const certificateImagePath = certificateFile.path; // Get path of certificate image
    // Process CSV and send emails
    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
            const email = row.email;
            firstName = row._3
            lastName = row._2
            firstName = convertToTitleCase(firstName);
            lastName = convertToTitleCase(lastName);
            console.log(firstName+" " + email + " " +lastName)
            generateCertificate(firstName, lastName, certificateImagePath).then(certificatePath => {
                //sendEmail(email, firstName, lastName, pdfPath, certificatePath, emailBody);
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
// Add a GET route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Email Sender API');
});
// Start the server
app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur http://localhost:${PORT}`);
});