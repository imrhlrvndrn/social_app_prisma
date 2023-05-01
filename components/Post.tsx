'use client';

import { usePosts } from '@/hooks/usePosts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

type PostProps = { post: PostType; variant?: 'Authorized' | 'Unauthorized' };

export const Post = ({ post, variant = 'Unauthorized' }: PostProps) => {
    const { deletePostMutation } = usePosts();
    const queryClient = useQueryClient();

    // Delete a post
    const { mutate } = useMutation(deletePostMutation, {
        onError: (error) => {
            if (error instanceof AxiosError) toast.error(error?.response?.data?.message);
        },
        onSuccess: () => {
            toast.success('Your post was deleted 😢');
            queryClient.invalidateQueries(['user-posts']);
        },
    });

    return (
        <div className='bg-gray-900 my-8 p-8 rounded-lg'>
            <div className='flex items-center gap-2'>
                <Image
                    className='rounded-full'
                    width={32}
                    height={32}
                    src={post?.user?.image ? post?.user?.image : ''}
                    alt='user avatar'
                />
                <h3 className='font-bold text-white'>{post?.user?.name}</h3>
            </div>
            <p className='break-all my-8'>{post?.content}</p>
            <div className='flex gap-4 cursor-pointer items-center'>
                <Link className='font-bold text-white' href={`/posts/${post?.id}`}>
                    Comments ({post?.comments?.length})
                </Link>
                {variant === 'Authorized' && (
                    <p className='text-red-700 font-bold' onClick={() => mutate(post?.id)}>
                        Delete
                    </p>
                )}
            </div>
        </div>
    );
};
