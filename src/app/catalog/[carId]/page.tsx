import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchCarById } from '@/lib/api/cars';
import CarDetailsClient from './CarDetails.client';

import type { Metadata } from 'next';

interface CarDetailsPageProps {
  params: Promise<{ carId: string }>;
}

export async function generateMetadata({ params }: CarDetailsPageProps): Promise<Metadata> {
  const { carId } = await params;
  const car = await fetchCarById(carId);

  return {
    title: `RentalCar — ${car.brand} ${car.model}, ${car.year}`,
    description: car.description,
  };
}

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
