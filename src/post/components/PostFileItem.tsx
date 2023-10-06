import { Image } from "@chakra-ui/react";
import { FileStored } from "src/interfaces";

interface PostFileItemProps {
  file: FileStored;
  index: number;
  onRemoveFile: (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => void;
}

export const PostFileItem = ({
  file,
  index,
  onRemoveFile,
}: PostFileItemProps) => {
  return (
    <>
      {file.type.includes("image") ? (
        <Image key={index} src={file.url} alt="Post image" className="w-[450px]" />
      ) : (
        <video key={index} src={file.url} controls />
      )}
      <button
        onClick={(event) => onRemoveFile(event, index)}
        type="button"
        className="absolute top-5 right-5 z-20"
      >
        <i className="text-2xl fa-regular fa-circle-xmark"></i>
      </button>
    </>
  );
};
