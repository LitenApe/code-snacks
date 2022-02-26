import { ApolloClient, ApolloError, InMemoryCache } from '@apollo/client';
import {
  post as postQuery,
  posts as postsQuery,
  draft as draftQuery,
  drafts as draftsQuery,
  tags as tagsQuery,
} from './queries';
import 'dotenv/config';
import { Post, PostDTO, Posts, Tags } from './domain';
import { Log } from '../logger';
import { marked } from 'marked';

export class CMS {
  #client;
  #logger;
  #parser;

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
    this.#parser = marked;
    marked.setOptions({
      breaks: true,
      gfm: true,
      headerIds: true,
    });
  }

  async getPost(
    id: number,
    preview: boolean = false
  ): Promise<PostDTO | undefined> {
    this.#logger.debug(`Retrieving post [id=${id}]`);
    const res = await this.#client.query<Post>({
      query: preview ? draftQuery : postQuery,
      variables: {
        id,
      },
    });

    if (typeof res.error !== 'undefined') {
      this.#logger.error(
        `Encountered an error while retrieving post with [id=${id}]. Service returned [message=${res.error.message}]`
      );
      return undefined;
    }

    const data = res.data.posts.data[0];

    if (typeof data === 'undefined') {
      this.#logger.error(`Unable to retrieve post with [id=${id}]`);
      return undefined;
    }

    this.#logger.debug(`Retrieved post with [id=${id}]`);

    return {
      id: data.id,
      ...data.attributes,
      content: this.#parser(data.attributes.content),
    };
  }

  async getPosts(preview: boolean = false): Promise<Array<PostDTO>> {
    this.#logger.debug('Retrieving posts');

    const res = await this.#client.query<Posts>({
      query: preview ? draftsQuery : postsQuery,
    });
    this.#logger.debug(
      `Retrieved [length=${res.data.posts.data.length}] posts`
    );

    return res.data.posts.data.map((post) => ({
      id: post.id,
      ...post.attributes,
      content: this.#parser(post.attributes.content),
    }));
  }

  async getTags(): Promise<Tags['tags']['data']> {
    this.#logger.debug('Retrieving tags');
    const res = await this.#client.query<Tags>({
      query: tagsQuery,
    });
    this.#logger.debug(`Retrieved [length=${res.data.tags.data.length}] tags`);
    return res.data.tags.data;
  }
}
