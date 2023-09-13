interface UsernameProps {
  username: string;
  isFounder: boolean;
  isAccountVerified: boolean;
}

export const Username = ({
  username,
  isFounder,
  isAccountVerified,
}: UsernameProps) => {
  return (
    <>
      @{username}
      {isFounder && (
        <span className="ml-2">
          <i className="text-yellow-500 fa-solid fa-medal"></i>
        </span>
      )}
      {isAccountVerified && (
        <span className="ml-2">
          <i className="text-blue-500 fa-solid fa-circle-check"></i>
        </span>
      )}
    </>
  );
};
