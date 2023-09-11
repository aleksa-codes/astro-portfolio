const fs = require('fs');

const postsFolderExists = fs.existsSync('public/assets/posts');

if (postsFolderExists) {
  fs.rmSync('public/assets/posts', { recursive: true });
}

fs.renameSync('posts', 'public/assets/posts');
