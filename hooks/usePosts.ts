import axios from '@/lib/axios';

export const usePosts = () => {
    const createPostMutation = async (fields: { content: string }) => {
        await axios.post(`/posts/add-post`, {
            content: fields?.content,
        });
    };

    const createCommentMutation = async (fields: { content: string; postId: string }) => {
        await axios.post(`/posts/add-comment`, {
            content: fields?.content,
            postId: fields?.postId,
        });
    };

    const getAllCommentsOfPostById = async (postId: string) => {
        const result = await axios.get(`/posts/post-comments`);
        return result.data;
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
        const result = await axios.post(`/posts/delete-post`, { postId });

        return result.data;
    };

    const getPostByIdQuery = async (postId: string) => {
        const result = await axios.get(`/posts/${postId}`);
        return result.data;
    };

    return {
        getPostByIdQuery,
        deletePostMutation,
        createPostMutation,
        createCommentMutation,
        getEveryUsersPostsQuery,
        getMyPostsQuery,
        getAllCommentsOfPostById,
    };
};
