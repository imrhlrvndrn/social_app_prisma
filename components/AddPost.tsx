'use client';

import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { usePosts } from '@/hooks/usePosts';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

export const CreatePost = () => {
    const [content, setContent] = useState('');
    const { createPostMutation } = usePosts();
    const queryClient = useQueryClient();
    const [isDisabled, setIsDisabled] = useState(false);
    const { register, handleSubmit, resetField } = useForm();

    // Create a post
    const { mutate } = useMutation(createPostMutation, {
        onError: (error) => {
            if (error instanceof AxiosError) toast.error(error?.response?.data?.message);
            setIsDisabled(() => false);
        },
        onSuccess: () => {
            toast.success('Post has been made 🔥');
            resetField('content');
            setIsDisabled(() => false);
            queryClient.invalidateQueries(['posts']);
        },
    });

    const createPost: SubmitHandler<FieldValues> = async (formFields) => {
        setIsDisabled(() => true);
        await mutate(formFields as { content: string });
    };

    return (
        <form className='bg-gray-900 my-8 p-8 rounded-md' onSubmit={handleSubmit(createPost)}>
            <label htmlFor='content'>What's on your mind?</label>
            <textarea
                {...register('content', {
                    onChange(event) {
                        setContent(() => event?.target?.value);
                    },
                })}
                name='content'
                id='content'
                className='p-4 text-lg rounded-md my-2 bg-black text-white w-full'
            ></textarea>
            <div className='flex items-center justify-between'>
                <p
                    className={`text-sm font-bold ${
                        content?.length > 300 ? 'text-red-700' : 'text-white'
                    }`}
                >
                    {content?.length}/300
                </p>
                <button
                    disabled={isDisabled}
                    className='text-sm bg-teal-800 text-white py-2 px-6 rounded-xl disabled:opacity-25 disabled:cursor-not-allowed'
                    type='submit'
                >
                    {isDisabled ? 'Creating post...' : 'Create  post'}
                </button>
            </div>
        </form>
    );
};
