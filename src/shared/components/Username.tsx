interface UsernameProps {
  username: string;
  isAccountVerified: boolean;
}

export const Username = ({ username, isAccountVerified }: UsernameProps) => {
  return (
    <>
      @{username}
      {isAccountVerified && (
        <span className="ml-2">
          <i className="text-blue-500 fa-solid fa-circle-check"></i>
        </span>
      )}
    </>
  );
};
