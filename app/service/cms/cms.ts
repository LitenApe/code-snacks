import { ApolloClient, InMemoryCache, QueryResult } from '@apollo/client';
import {
  posts as publised,
  drafts as notPublised,
  footer,
  tags,
} from './queries';
import 'dotenv/config';
import { Footer, Posts, Tag, Tags } from './domain';

export class CMS {
  #client;

  constructor(options: Record<string, unknown> = {}) {
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

  async getPosts(preview: boolean = false): Promise<Posts['posts']['data']> {
    const res = await this.#client.query<Posts>({
      query: preview ? notPublised : publised,
    });
    return res.data.posts.data;
  }

  async getTags(): Promise<Tags['tags']['data']> {
    const res = await this.#client.query<Tags>({
      query: tags,
    });
    return res.data.tags.data;
  }

  async getFooter(): Promise<Footer['footer']['data']['attributes']> {
    const res = await this.#client.query<Footer>({
      query: footer,
    });
    return res.data.footer.data.attributes;
  }
}
