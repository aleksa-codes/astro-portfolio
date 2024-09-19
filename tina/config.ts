import { defineConfig } from 'tinacms';

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || 'main';

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: 'post',
        label: 'Posts',
        path: 'src/posts',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Date',
            required: true,
          },
          {
            type: 'string',
            name: 'author',
            label: 'Author',
            required: true,
          },
          {
            type: 'string',
            name: 'desc',
            label: 'Description',
            ui: {
              component: 'textarea',
            },
            required: true,
          },
          {
            type: 'image',
            name: 'img',
            label: 'Image',
            required: true,
          },
          {
            type: 'number',
            name: 'imgWidth',
            label: 'Image Width',
            required: true,
          },
          {
            type: 'number',
            name: 'imgHeight',
            label: 'Image Height',
            required: true,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },
    ],
  },
});
