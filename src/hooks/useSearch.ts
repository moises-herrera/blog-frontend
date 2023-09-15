import { AsyncThunkAction } from "@reduxjs/toolkit";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, AsyncThunkConfig } from "src/store/types";
import { useDebounce } from "use-debounce";

interface UseSearchProps<T, V> {
  value: string | null;
  action: (value: string) => AsyncThunkAction<T, V, AsyncThunkConfig>;
}

export const useSearch = <T, V>({ value, action }: UseSearchProps<T, V>) => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState<string | null>(value);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 600);

  useEffect(() => {
    if (debouncedSearchTerm !== null) {
      dispatch(action(debouncedSearchTerm));
    }
  }, [dispatch, action, debouncedSearchTerm]);

  const onSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(value);
  };

  return {
    onSearch,
  };
};
