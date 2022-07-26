export type RawContent = {
  id: string;
  content: string;
};

export interface Source {
  getPosts: () => Promise<Array<RawContent>>;
  getPost: (id: string) => Promise<RawContent>;
}
