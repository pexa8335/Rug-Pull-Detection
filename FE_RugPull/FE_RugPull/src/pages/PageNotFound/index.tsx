

const PageNotFound = () => {
  return (
    <div className="w-full py-24 flex flex-col gap-3 items-center justify-center">
      <img
        src="/screenshots/EmptyBox.png"
        alt="Page Not Found"
        width={200}
        height={200}
      />
      <h1 className="font-extrabold text-3xl">404 Page not found </h1>
      <p className="text-md text-gray-500">
        The page you requested does not exist.
      </p>
    </div>
  );
};

export default PageNotFound;
