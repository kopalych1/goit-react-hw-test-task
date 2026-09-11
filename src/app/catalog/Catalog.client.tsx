'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchCars } from '@/lib/api/cars';
import { type CarFilters } from '@/types/car';

import CarCard from '@/components/CarCard/CarCard';
import Loader from '@/components/Loader/Loader';
import EmptyState from '@/components/EmptyState/EmptyState';
import FilterBar from '@/components/FilterBar/FilterBar';

import css from './Catalog.client.module.css';

export default function CatalogClient() {
  const [filters, setFilters] = useState<CarFilters>({});
  const [draftFilters, setDraftFilters] = useState<CarFilters>({});

  function handleSearch() {
    setFilters(draftFilters);
  }

  function handleClearFilters() {
    setDraftFilters({});
    setFilters({});
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['cars', filters],
    queryFn: ({ pageParam }) => fetchCars({ page: pageParam as number, ...filters }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined;
    },
  });

  const cars = data?.pages.flatMap(page => page.cars) ?? [];

  return (
    <div className={css.page}>
      <FilterBar
        draftFilters={draftFilters}
        setDraftFilters={setDraftFilters}
        onSearch={handleSearch}
        onClear={handleClearFilters}
      />

      {isLoading && <Loader />}
      {!isLoading && cars.length === 0 && <EmptyState onReset={() => setFilters({})} />}
      {!isLoading && cars.length > 0 && (
        <ul className={css.grid}>
          {cars.map((car, index) => (
            <CarCard key={car.id} car={car} priority={index < 4} />
          ))}
        </ul>
      )}

      {hasNextPage && (
        <button
          className={css.loadMore}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load more'}
        </button>
      )}
    </div>
  );
}
