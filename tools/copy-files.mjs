import fs from 'node:fs';
import { join } from 'node:path';
import { worker } from './paths.mjs';

const sourceDir = join(worker, 'dist', 'browser');
const destDir = join(worker, 'dist', 'bardle');

// Ensure the destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy files from source to destination
fs.cpSync(sourceDir, destDir, { recursive: true });