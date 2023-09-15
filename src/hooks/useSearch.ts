import { useState } from "react";
import { useDebounce } from "use-debounce";

interface UseSearchProps {
  value: string | null;
}

export const useSearch = ({ value }: UseSearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string | null>(value);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 600);

  const onSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(value);
  };

  return {
    onSearch,
    debouncedSearchTerm,
  };
};
