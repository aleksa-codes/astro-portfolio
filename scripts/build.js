const fs = require('fs');

// delete first the posts folder from the public/assets folder, then move the posts folder from root to public/assets
fs.rmSync('public/assets/posts', { recursive: true });
fs.renameSync('posts', 'public/assets/posts');
