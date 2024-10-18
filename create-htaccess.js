const fs = require('fs');
const path = require('path');

const htaccessContent = `
RewriteEngine On

RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]

RewriteRule ^ /index.html
`;

const distPath = path.join(__dirname, 'dist');
const htaccessPath = path.join(distPath, '.htaccess');

fs.writeFileSync(htaccessPath, htaccessContent.trim());
