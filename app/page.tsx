'use client';

import { CreatePost } from '@/components/AddPost';
import { useQuery } from '@tanstack/react-query';
import { usePosts } from '@/hooks/usePosts';
import { Post } from '../components/Post';

export default function Home() {
    const { getEveryUsersPostsQuery } = usePosts();
    const { data, error, isLoading } = useQuery<PostType[]>({
        queryFn: getEveryUsersPostsQuery,
        queryKey: ['posts'],
    });

    if (error) return error;

    if (isLoading)
        return (
            <main>
                <CreatePost />
                <p className='font-bold text-lg'>Loading posts...</p>
            </main>
        );

    return (
        <main>
            <CreatePost />
            {data?.map((post) => (
                <Post key={post?.id} post={post} />
            ))}
        </main>
    );
}
