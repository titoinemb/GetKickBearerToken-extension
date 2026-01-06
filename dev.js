const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const sass = require('sass');
const pug = require('pug');
// translate PUG to HTML
const popupBuider = () => {
  const pugPath = path.join(__dirname, './src/popup.pug');
  const htmlPath = path.join(__dirname, './build/popup.html');

  let compiledFunction = pug.compileFile(pugPath);
  let html = compiledFunction();

  fs.writeFileSync(htmlPath, html);
};
// translate SCSS to CSS
const styleBuilder = () => {
  const scssPath = path.join(__dirname, './src/style.scss');
  const cssPath = path.join(__dirname, './build/style.css');

  const result = sass.compile(scssPath);
  
  fs.writeFileSync(cssPath, result.css);
};
// translate T.S to J.S
const scriptBuilder = () => {
  const tsConfigPath = path.join(__dirname, 'tsconfig.dev.json');

  exec(`npx tsc --project "${tsConfigPath}"`);
};
(() => {
  popupBuider();
  styleBuilder();
  scriptBuilder();
})();