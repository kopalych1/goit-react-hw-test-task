import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchCars } from '@/lib/api/cars';
import CatalogClient from './Catalog.client';

export default async function CatalogPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['cars', {}],
    queryFn: ({ pageParam }) => fetchCars({ page: pageParam as number }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
}
