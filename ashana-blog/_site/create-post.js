document.getElementById('blogForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('postTitle').value;
  const body = document.getElementById('postBody').value;
  const tag = document.getElementById('postTag').value;
  const statusMessage = document.getElementById('statusMessage');

  statusMessage.textContent = "Submitting post...";

  // NOTE: For public sites, use a backend proxy or fine-grained GitHub token
  // to avoid exposing credentials in client-side code.
  const GITHUB_TOKEN = "YOUR_PERSONAL_ACCESS_TOKEN"; 
  const REPO_OWNER = "YOUR_GITHUB_USERNAME";
  const REPO_NAME = "YOUR_REPO_NAME";

  try {
    const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/dispatches`, {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event_type: 'create-blog-post',
        client_payload: { title, body, tag }
      })
    });

    if (response.ok) {
      statusMessage.textContent = "Success! Your post build has been triggered on GitHub.";
      document.getElementById('blogForm').reset();
    } else {
      statusMessage.textContent = "Failed to submit. Check API permissions or token.";
    }
  } catch (err) {
    statusMessage.textContent = "Error connecting to GitHub API.";
  }
});