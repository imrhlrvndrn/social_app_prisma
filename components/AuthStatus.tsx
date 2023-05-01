'use client';

import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type AuthStatusProps = {
    image: string;
};

export const AuthStatus = ({ image }: AuthStatusProps) => {
    const [signOutState, setSignOutState] = useState(false);

    useEffect(() => {
        if (!image) setSignOutState(() => false);
    }, [image]);

    return (
        <div className='flex items-center gap-6'>
            {image ? (
                <>
                    <button
                        className='text-sm bg-gray-900 hover:bg-gray-800 py-2 px-4 text-white rounded-lg disabled:opacity-25'
                        onClick={() => {
                            signOut();
                            setSignOutState(() => true);
                        }}
                    >
                        {signOutState ? 'Signing out...' : 'Sign out'}
                    </button>
                    <Link href='/dashboard'>
                        <Image
                            className={`rounded-full`}
                            alt='User Profile'
                            src={image}
                            width={42}
                            height={42}
                            priority
                        />
                    </Link>
                </>
            ) : (
                <button
                    className='text-sm bg-gray-900 hover:bg-gray-800 py-2 px-4 text-white rounded-lg disabled:opacity-25'
                    onClick={() => signIn()}
                >
                    Sign In
                </button>
            )}
        </div>
    );
};
