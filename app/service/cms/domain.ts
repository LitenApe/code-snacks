interface PostAttributes {
  title: string;
  tags: Tags['tags'];
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}
export interface Posts {
  posts: {
    data: Array<{
      id: string;
      attributes: PostAttributes;
    }>;
  };
}

export interface Post {
  posts: {
    data: Array<{
      id: string;
      attributes: PostAttributes;
    }>;
  };
}

export interface PostDTO extends PostAttributes {
  id: string;
}

export interface Tag {
  id: string;
  attributes: {
    name: string;
  };
}

export interface Tags {
  tags: {
    data: Array<Tag>;
  };
}
