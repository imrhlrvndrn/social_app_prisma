import Link from 'next/link';
import { AuthStatus } from '@/app/components/AuthStatus';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export const Nav = async () => {
    const session = await getServerSession(authOptions);

    console.log(session);
    return (
        <nav className='flex justify-between items-center py-8'>
            <Link href='/'>
                <h1 className='font-bold text-lg'>Post it.</h1>
            </Link>
            <AuthStatus image={session?.user?.image || ''} />
        </nav>
    );
};
