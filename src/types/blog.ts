export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: {
    name: string;
    image: string;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
