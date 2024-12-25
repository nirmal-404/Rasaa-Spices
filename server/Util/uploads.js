import multer from "multer";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the 'Uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads/images/users');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Helper function to extract the file extension
const getFileExtension = (mimetype) => {
    const mimeTypesMap = {
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/gif': '.gif',
        'application/pdf': '.pdf',
        // Add more MIME types if needed
    };
    return mimeTypesMap[mimetype] || '';
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Use the dynamically created or existing 'Uploads' directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random());
        const extension = getFileExtension(file.mimetype); // Get the file extension
        cb(null, `${uniqueSuffix}${extension}`); // Include the extension in the filename
    }
});

const upload = multer({ storage: storage });

export default upload;
