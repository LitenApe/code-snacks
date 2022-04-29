export interface Source {
  getPosts: () => Promise<Array<unknown>>;
  getPost: (id: string) => Promise<unknown>;
}
