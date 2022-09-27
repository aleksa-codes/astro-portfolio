import rss from '@astrojs/rss';
import { getRSS } from '../data/post';

const postImportResult = import.meta.glob('../posts/*.mdx', { eager: true });
const posts = Object.values(postImportResult);

export const get = () => rss(getRSS(posts));
