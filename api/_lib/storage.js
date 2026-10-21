import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { commitFiles, getFileContent } from './github.js';

const POLICIES_PATH = 'src/data/privacyPolicies.js';

function isDevLocalMode() {
  return process.env.ONBOARD_WRITE_LOCAL === 'true';
}

function readLocalPoliciesFile() {
  const filePath = join(process.cwd(), POLICIES_PATH);
  return {
    content: readFileSync(filePath, 'utf8'),
    sha: null,
  };
}

function writeLocalFiles(files) {
  for (const file of files) {
    const filePath = join(process.cwd(), file.path);

    if (file.encoding === 'base64') {
      writeFileSync(filePath, Buffer.from(file.content, 'base64'));
    } else {
      writeFileSync(filePath, file.content, 'utf8');
    }
  }
}

export async function readPoliciesFile() {
  if (isDevLocalMode() || !process.env.GITHUB_TOKEN) {
    return readLocalPoliciesFile();
  }

  const file = await getFileContent(POLICIES_PATH);
  if (!file) {
    return null;
  }

  return file;
}

export async function writeOnboardFiles(files, message) {
  if (isDevLocalMode() || !process.env.GITHUB_TOKEN) {
    writeLocalFiles(files);
  }

  if (process.env.GITHUB_TOKEN) {
    return commitFiles(files, message);
  }

  return { local: true };
}
