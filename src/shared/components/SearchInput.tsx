import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";

interface SearchInputProps {
  placeholder?: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  backgroundColor?: string;
  textColor?: string;
  iconClassName?: string;
}

export const SearchInput = ({
  placeholder = "Buscar",
  onSearch,
  backgroundColor = "black",
  textColor = "white",
  iconClassName = "text-white",
}: SearchInputProps) => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <i className={`fa-solid fa-magnifying-glass ${iconClassName}`}></i>
      </InputLeftElement>
      <Input
        type="text"
        placeholder={placeholder}
        onChange={onSearch}
        backgroundColor={backgroundColor}
        textColor={textColor}
      />
    </InputGroup>
  );
};
