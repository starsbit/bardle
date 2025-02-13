const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

const configurations = ['ja', 'ko', 'zh', 'en-US'];
const distFolder = path.join(__dirname, '../../dist/bardle/browser');
const tempFolder = path.join(__dirname, '../../temp');

async function runBuild(config) {
  return new Promise((resolve, reject) => {
    exec(`ng build --configuration=${config}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error building ${config}:`, stderr);
        reject(error);
      } else {
        console.log(`Build ${config} completed:`, stdout);
        resolve();
      }
    });
  });
}

async function copyToTemp(config) {
  const source = path.join(distFolder, config);
  const destination = path.join(tempFolder, config);
  await fse.copy(source, destination);
  console.log(`Copied ${config} to temp folder`);
}

async function copyBackToDist() {
  await fse.copy(tempFolder, distFolder);
  console.log('Copied all configurations back to dist folder');
}

async function main() {
  try {
    // Ensure temp folder is clean
    await fse.emptyDir(tempFolder);

    // Run builds and copy to temp folder
    for (const config of configurations) {
      await runBuild(config);
      await copyToTemp(config);
    }

    // Copy all configurations back to dist folder
    await copyBackToDist();

    // Clean up temp folder
    await fse.remove(tempFolder);
    console.log('Build and copy process completed successfully');
  } catch (error) {
    console.error('Error during build process:', error);
  }
}

main();