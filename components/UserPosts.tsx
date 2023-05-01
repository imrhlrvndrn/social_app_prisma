'use client';

import { usePosts } from '@/hooks/usePosts';
import { Post } from './Post';
import { useQuery } from '@tanstack/react-query';

export const UserPosts = () => {
    const { getMyPostsQuery } = usePosts();
    const { data, error, isLoading } = useQuery<UserType>({
        queryFn: getMyPostsQuery,
        queryKey: ['user-posts'],
    });

    // if (error) return error;

    if (isLoading)
        return (
            <main>
                <p className='font-bold text-lg'>Loading your posts...</p>
            </main>
        );

    return (
        <div>
            {data?.posts?.map((post) => (
                <Post variant='Authorized' key={post?.id} post={post} />
            ))}
        </div>
    );
};
