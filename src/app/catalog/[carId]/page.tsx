import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchCarById } from '@/lib/api/cars';
import CarDetailsClient from './CarDetails.client';

interface CarDetailsPageProps {
  params: Promise<{ carId: string }>;
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { carId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['car', carId],
    queryFn: () => fetchCarById(carId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetailsClient carId={carId} />
    </HydrationBoundary>
  );
}
