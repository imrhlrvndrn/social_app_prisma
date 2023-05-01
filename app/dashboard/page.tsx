import { UserPosts } from '@/components/UserPosts';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if (!session) redirect('/auth/signin');

    return (
        <main>
            <h1 className='text-2xl font-bold'>Welcome back {session?.user?.name}</h1>
            <UserPosts />
        </main>
    );
}
