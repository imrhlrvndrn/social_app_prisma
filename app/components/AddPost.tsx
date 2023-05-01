'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const CreatePost = () => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [content, setContent] = useState('');
    const { register, handleSubmit, formState } = useForm();

    return (
        <form
            className='bg-gray-900 my-8 p-8 rounded-md'
            onSubmit={handleSubmit((formFields) => console.log('form values => ', formFields))}
        >
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
                    Creat post
                </button>
            </div>
        </form>
    );
};
