import { AsyncThunkAction } from "@reduxjs/toolkit";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, AsyncThunkConfig } from "src/store/types";

interface UsePaginationProps<T, V> {
  isLoading: boolean;
  currentRecords: number;
  total: number;
  action: (page: number) => AsyncThunkAction<T, V, AsyncThunkConfig>;
}

export const useScrollPagination = <T, V>({
  isLoading,
  currentRecords,
  total,
  action,
}: UsePaginationProps<T, V>) => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(1);
  const isLastPage = useMemo(
    () => currentRecords === total,
    [currentRecords, total]
  );

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading ||
      isLastPage
    ) {
      return;
    }

    setPage((prevPage) => prevPage + 1);
  }, [isLoading, isLastPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, handleScroll]);

  useEffect(() => {
    dispatch(action(page));
  }, [dispatch, action, page]);
};
