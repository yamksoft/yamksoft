const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'pages', 'landing', 'LandingPage.css');
const tsxPath = path.join(__dirname, 'src', 'pages', 'landing', 'LandingPage.tsx');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Theme colors replacement
    content = content.replace(/--gold-primary/g, '--brand-primary');
    content = content.replace(/--gold-light/g, '--brand-light');
    content = content.replace(/--gold-dark/g, '--brand-dark');
    content = content.replace(/--gold-gradient/g, '--brand-gradient');
    content = content.replace(/--gold-glow-sm/g, '--brand-glow-sm');
    content = content.replace(/--gold-glow/g, '--brand-glow');
    
    // Class names replacement
    content = content.replace(/btn-gold/g, 'btn-primary');
    content = content.replace(/btn-outline-gold/g, 'btn-outline-primary');
    content = content.replace(/hero-title-gold/g, 'hero-title-brand');
    
    // Specific color values
    content = content.replace(/#d4af37/g, '#0072ff');
    content = content.replace(/#f3e5ab/g, '#00c6ff');
    content = content.replace(/#996515/g, '#0055cc');
    content = content.replace(/rgba\(212,\s*175,\s*55/g, 'rgba(0, 114, 255');
    content = content.replace(/rgba\(212,175,55/g, 'rgba(0,114,255');
    
    // Specific linear gradients
    content = content.replace(/linear-gradient\(135deg, #d4af37 0%, #f3e5ab 50%, #996515 100%\)/g, 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
}

replaceInFile(cssPath);
replaceInFile(tsxPath);
