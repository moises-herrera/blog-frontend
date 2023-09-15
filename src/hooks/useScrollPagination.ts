import { useState, useMemo, useCallback, useEffect } from "react";

interface UsePaginationProps {
  isLoading: boolean;
  currentRecords: number;
  total: number;
}

export const useScrollPagination = ({
  isLoading,
  currentRecords,
  total,
}: UsePaginationProps) => {
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

  return {
    page,
  };
};
