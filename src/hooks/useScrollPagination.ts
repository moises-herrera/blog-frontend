import { useState, useMemo, useCallback, useEffect } from "react";

interface UsePaginationProps {
  isLoading: boolean;
  currentRecords: number;
  total: number;
  elementRef?: React.RefObject<HTMLDivElement>;
  isReverse?: boolean;
}

export const useScrollPagination = ({
  isLoading,
  currentRecords,
  total,
  elementRef,
  isReverse,
}: UsePaginationProps) => {
  const element = elementRef ? elementRef.current : window;
  const [page, setPage] = useState<number>(1);
  const isLastPage = useMemo(
    () => currentRecords === total,
    [currentRecords, total]
  );

  const handleScroll = useCallback(() => {
    const canScrollWindow =
      element &&
      element instanceof Window &&
      element.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight;
    const canScrollDiv =
      element instanceof HTMLDivElement
        ? !isReverse
          ? element.offsetHeight + element.scrollTop !== element.scrollHeight
          : element.scrollTop !== 0
        : false;

    if (canScrollWindow || canScrollDiv || isLoading || isLastPage) {
      return;
    }

    if (element instanceof HTMLDivElement) {
      const lastScrollTop = element.scrollTop + element.scrollHeight / 2;
      localStorage.setItem("scrollTop", lastScrollTop.toString());
    }

    setPage((prevPage) => prevPage + 1);
  }, [isLoading, isLastPage, element, isReverse]);

  useEffect(() => {
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    return () => element?.removeEventListener("scroll", handleScroll);
  }, [isLoading, handleScroll, element]);

  return {
    page,
    setPage,
  };
};
