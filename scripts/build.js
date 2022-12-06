const fs = require('fs');

// move posts folder from the root to the public/assets and delete the old one
fs.renameSync('./posts', './public/assets/posts');
