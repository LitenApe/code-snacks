export interface Posts {
  posts: {
    data: Array<{
      id: string;
      attributes: {
        title: string;
        tags: Tags['tags'];
        content: string;
        createdAt: string;
        updatedAt: string;
        publishedAt?: string;
      };
    }>;
  };
}

export interface Post {
  posts: {
    data: Array<{
      id: string;
      attributes: {
        title: string;
        tags: Tags['tags'];
        content: string;
        createdAt: string;
        updatedAt: string;
        publishedAt?: string;
      };
    }>;
  };
}

export interface Tag {
  attributes: {
    name: string;
  };
}

export interface Tags {
  tags: {
    data: Array<Tag>;
  };
}
