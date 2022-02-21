import { ApolloClient, InMemoryCache, QueryResult } from '@apollo/client';
import {
  posts as publised,
  drafts as notPublised,
  tags,
  post,
} from './queries';
import 'dotenv/config';
import { Post, Posts, Tags } from './domain';
import { Log } from '../logger';

export class CMS {
  #client;
  #logger;

  constructor(options: Record<string, unknown> = {}) {
    this.#logger = new Log('CMS');
    this.#client = new ApolloClient({
      uri: process.env.STRAPI_URL,
      cache: new InMemoryCache(),
      ssrMode: true,
      headers: options.isAuthenticated
        ? {
            Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
          }
        : {},
    });
  }

  async getPost(
    id: number
  ): Promise<Post['posts']['data'][number] | undefined> {
    this.#logger.debug(`Retrieving post [id=${id}]`);
    const res = await this.#client.query<Post>({
      query: post,
      variables: {
        id,
      },
    });
    const data = res.data.posts.data;
    this.#logger.debug(`Found [length=${data.length}] with [id=${id}]`);
    return data[0];
  }

  async getPosts(preview: boolean = false): Promise<Posts['posts']['data']> {
    this.#logger.debug('Retrieving posts');
    const res = await this.#client.query<Posts>({
      query: preview ? notPublised : publised,
    });
    this.#logger.debug(`Found [length=${res.data.posts.data.length}] posts`);
    return res.data.posts.data;
  }

  async getTags(): Promise<Tags['tags']['data']> {
    this.#logger.debug('Retrieving tags');
    const res = await this.#client.query<Tags>({
      query: tags,
    });
    this.#logger.debug(`Found [length=${res.data.tags.data.length}] tags`);
    return res.data.tags.data;
  }
}
