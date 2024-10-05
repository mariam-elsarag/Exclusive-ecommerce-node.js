import Spinner from "./Spinner";

const SpinnerFullPage = () => {
  return (
    <div className=" h-full w-full absolute inset-0 backdrop-blur-sm flex items-center justify-center">
      <Spinner />
    </div>
  );
};

export default SpinnerFullPage;
