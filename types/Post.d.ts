type PostType = {
    id: string;
    createdAt: string;
    updatedA: string;
    content: string;
    published: boolean;
    userId: string;
    user: UserType;
    comments?: CommentType[];
};

type CommentType = {
    id: string;
    createdAt: string;
    postId: string;
    userId: string;
    content: string;
};

type UserType = {
    id: string;
    name: string;
    email: string;
    image?: string;
    posts?: PostType[];
    comments?: CommentType[];
};
