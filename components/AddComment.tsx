'use client';

import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { usePosts } from '@/hooks/usePosts';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';

export const AddComment = () => {
    const params = useParams();
    const { createCommentMutation } = usePosts();
    const queryClient = useQueryClient();
    const [isDisabled, setIsDisabled] = useState(false);
    const { register, handleSubmit, resetField } = useForm();

    // Create a post
    const { mutate } = useMutation(createCommentMutation, {
        onError: (error) => {
            if (error instanceof AxiosError) toast.error(error?.response?.data?.message);
            setIsDisabled(() => false);
        },
        onSuccess: () => {
            toast.success('Your comment has been made 🔥');
            resetField('content');
            setIsDisabled(() => false);
            queryClient.invalidateQueries(['user-posts', `${params?.postId}`]);
        },
    });

    const createComment: SubmitHandler<FieldValues> = async (formFields) => {
        setIsDisabled(() => true);
        await mutate({ content: formFields?.content, postId: params?.postId } as {
            content: string;
            postId: string;
        });
    };

    return (
        <form className='bg-gray-900 my-8 p-8 rounded-md' onSubmit={handleSubmit(createComment)}>
            <label htmlFor='content'>Add a comment</label>
            <textarea
                {...register('content')}
                name='content'
                id='content'
                className='p-4 text-lg rounded-md my-2 bg-black text-white w-full'
            ></textarea>
            <div className='flex items-center justify-end'>
                <button
                    disabled={isDisabled}
                    className='text-sm bg-teal-800 text-white py-2 px-6 rounded-xl disabled:opacity-25 disabled:cursor-not-allowed'
                    type='submit'
                >
                    {isDisabled ? 'Adding comment...' : 'Add  comment'}
                </button>
            </div>
        </form>
    );
};
