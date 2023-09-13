import { Loading } from "src/shared/components";

export const AuthLoading = () => {
  return (
    <section className="flex flex-col gap-4 w-full h-screen bg-primary-500 justify-center items-center">
      <Loading />
    </section>
  );
};
