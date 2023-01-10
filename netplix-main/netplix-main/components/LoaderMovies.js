export default function LoaderMovies() {
  return (
    <div className="container mx-auto px-2 animate-pulse py-5">
      <div className="h-10 md:h-12 w-80 md:w-96 rounded-md bg-gray-100 m-4 mt-4 md:mt-6 md:mb-5"></div>
      <div className="grid grid-cols-1 md:grid-cols-4">
        {Array(8)
          .fill()
          .map((_, index) => (
            <div className="p-6 m-4 h-96 rounded-md bg-gray-100" key={index}>
              <div className="h-52 bg-white rounded flex items-center justify-center"></div>
              <div className="h-9 mt-4 w-48 rounded bg-white"></div>
              <div className="h-14 mt-4 w-full rounded bg-white"></div>
            </div>
          ))}
      </div>
    </div>
  );
}
