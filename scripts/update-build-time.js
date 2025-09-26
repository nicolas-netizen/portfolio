import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get current timestamp
const buildTime = new Date().toISOString();

// Read the index.html file
const indexPath = path.join(__dirname, '..', 'index.html');
let htmlContent = fs.readFileSync(indexPath, 'utf8');

// Update the build time in the HTML
htmlContent = htmlContent.replace(
  /const buildTime = '[^']*';/,
  `const buildTime = '${buildTime}';`
);

// Write the updated HTML back
fs.writeFileSync(indexPath, htmlContent);

console.log(`Updated build time to: ${buildTime}`);
