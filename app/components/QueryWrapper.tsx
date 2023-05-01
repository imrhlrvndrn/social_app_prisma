'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

type QueryProps = {
    children?: ReactNode;
};

const queryClient = new QueryClient();

export const QueryWrapper = ({ children }: QueryProps) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
