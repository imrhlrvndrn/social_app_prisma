'use client';

import { AddComment } from '@/components/AddComment';
import { Post } from '@/components/Post';
import { usePosts } from '@/hooks/usePosts';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

type PostPageProps = {
    params: { postId: string };
};

export default function PostPage({ params }: PostPageProps) {
    const { postId } = params;
    const { getPostByIdQuery } = usePosts();
    const { data, isLoading } = useQuery<PostType>({
        queryFn: async () => await getPostByIdQuery(postId),
        queryKey: ['user-posts', `${postId}`],
    });

    if (isLoading) return <div>Loading post...</div>;

    return (
        <div>
            <Post post={data as PostType} />
            <AddComment />
            {data?.comments?.map((comment) => (
                <div key={comment.id} className='bg-gray-900 my-8 p-8 rounded-lg'>
                    <div className='flex items-center gap-2'>
                        <Image
                            className='rounded-full'
                            width={32}
                            height={32}
                            src={comment?.user?.image ? comment?.user?.image : ''}
                            alt='user avatar'
                        />
                        <h3 className='font-bold text-white'>{comment?.user?.name}</h3>
                    </div>
                    <p className='break-all my-8'>{comment?.content}</p>
                </div>
            ))}
        </div>
    );
}
