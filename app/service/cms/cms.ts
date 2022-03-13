import 'dotenv/config';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import {
  Post, PostDTO, Posts, Tags,
} from './domain';
import {
  createPost as createPostMutation,
  draft as draftQuery,
  drafts as draftsQuery,
  post as postQuery,
  posts as postsQuery,
  tags as tagsQuery,
} from './queries';

import { Log } from '../logger';
import { marked } from 'marked';

interface Options {
  readonly isAuthenticated?: boolean;
}

const memoryCache = new InMemoryCache();
export class CMS {
  #client;

  #logger;

  #parser;

  constructor(options: Options = {}) {
    this.#logger = new Log('CMS');
    this.#client = new ApolloClient({
      uri: process.env.STRAPI_URL,
      cache: memoryCache,
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

  async createPost(payload: any): Promise<unknown> {
    this.#logger.debug(`Creating a new post with [title=${payload.title}]`);
    try {
      const res = await this.#client.mutate({
        mutation: createPostMutation,
        variables: {
          data: {
            ...payload,
            tags: [],
          },
        },
      });

      this.#logger.info(
        `Created new post with [id=${res.data.createPost.data.id}]`,
      );
      return {
        id: res.data.createPost.data.id,
        ...res.data.createPost.data.attributes,
      };
    } catch (err) {
      this.#logger.error(
        `Failed to create new post with [title=${payload.title}]`,
      );
      throw err;
    }
  }

  async getPost(
    id: number,
    preview: boolean = false,
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
        `Encountered an error while retrieving post with [id=${id}]. Service returned [message=${res.error.message}]`,
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
      `Retrieved [length=${res.data.posts.data.length}] posts`,
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
