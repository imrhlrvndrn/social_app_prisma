import axios from '@/lib/axios';

export const usePosts = () => {
    const createPostMutation = async (fields: { content: string }) => {
        await axios.post(`/posts/add-post`, {
            content: fields?.content,
        });
    };

    const getEveryUsersPostsQuery = async () => {
        const result = await axios.get('/posts/get-posts');
        return result.data;
    };

    const getMyPostsQuery = async () => {
        const result = await axios.get('/posts/user-posts');
        return result.data;
    };

    const deletePostMutation = async (postId: string) => {
        await axios.post(`/posts/delete-post`, { postId });
    };

    return { deletePostMutation, createPostMutation, getEveryUsersPostsQuery, getMyPostsQuery };
};
