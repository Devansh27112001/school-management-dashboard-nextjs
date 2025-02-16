import LoadingSpinner from "@/components/LoadingSpinner";

const loading = () => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};

export default loading;
