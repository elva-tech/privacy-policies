const GITHUB_API = 'https://api.github.com';

function getConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!token || !repo) {
    throw new Error('GitHub repository credentials are not configured.');
  }

  return { token, repo, branch };
}

function githubHeaders(token) {
  return {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };
}

export async function getFileContent(path) {
  const { token, repo, branch } = getConfig();
  const url = `${GITHUB_API}/repos/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`;
  const response = await fetch(url, { headers: githubHeaders(token) });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Failed to read ${path}: ${response.status} ${body}`);
  }

  const data = await response.json();
  const content = Buffer.from(data.content, data.encoding).toString('utf8');

  return {
    content,
    sha: data.sha,
  };
}

export async function putFileContent({ path, content, sha, message, encoding = 'utf8' }) {
  const { token, repo, branch } = getConfig();
  const url = `${GITHUB_API}/repos/${repo}/contents/${path}`;
  const encodedContent = encoding === 'base64'
    ? content
    : Buffer.from(content, 'utf8').toString('base64');
  const body = {
    message,
    content: encodedContent,
    branch,
  };

  if (sha) {
    body.sha = sha;
  }

  const response = await fetch(url, {
    method: 'PUT',
    headers: githubHeaders(token),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to write ${path}: ${response.status} ${errorBody}`);
  }

  return response.json();
}

export async function commitFiles(files, message) {
  const results = [];

  for (const file of files) {
    const latest = await getFileContent(file.path);
    const result = await putFileContent({
      path: file.path,
      content: file.content,
      sha: latest?.sha,
      message,
      encoding: file.encoding || 'utf8',
    });
    results.push(result);
  }

  return results;
}
