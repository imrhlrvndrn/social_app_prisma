import { Inter } from 'next/font/google';
import { CreatePost } from '@/app/components/AddPost';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <main>
            <CreatePost />
        </main>
    );
}
