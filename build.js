// Copies the static site into dist/, stamping the deployed commit hash
// (from Vercel's VERCEL_GIT_COMMIT_SHA) into index.html's build badge.
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'dist');
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir);

for (const file of ['jszip.min.js', 'protobuf.min.js']) {
    fs.copyFileSync(path.join(__dirname, file), path.join(outDir, file));
}

const sha = (process.env.VERCEL_GIT_COMMIT_SHA || 'dev').slice(0, 7);
const html = fs
    .readFileSync(path.join(__dirname, 'index.html'), 'utf8')
    .replaceAll('__BUILD_SHA__', sha);
fs.writeFileSync(path.join(outDir, 'index.html'), html);

console.log(`Stamped build ${sha} into dist/index.html`);
