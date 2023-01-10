import { addPlus } from "../utils/addPlus";
import CustomImage from "./CustomImage";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function Card({ movies }) {
  const [zoomCard, setZoomCard] = useState({});
  return (
    <div className="flex flex-wrap -m-4 mt-2">
      {movies?.map((movie, index) => (
        <div className="xl:w-1/4 md:w-1/2 p-4" key={index} title={movie.title}>
          <div
            className="bg-gray-100 p-6 rounded-lg hover:shadow-md hover:-translate-y-3 transition-all duration-200 ease-in shadow-sm"
            onClick={() => setZoomCard(movie)}>
            <CustomImage
              className="rounded w-full h-full object-cover object-center mb-6 hover:opacity-90"
              src={
                movie.poster
                  ? movie.poster
                  : `https://dummyimage.com/400x400&text=${addPlus(
                      movie.title
                    )}`
              }
              error={`https://dummyimage.com/400x400&text=${addPlus(
                movie.title
              )}`}
              alt={movie.title}
              width={700}
              height={400}
              onClick={() => setZoomCard(movie)}
            />

            <p className="tracking-wider text-blue-500 text-xs font-medium">
              {movie.genres?.join(", ")}
            </p>
            <p className="text-xs pt-1">
              Metacritic : {movie.metacritic ? movie.metacritic : "-"}
            </p>
            <button
              type="button"
              onClick={() => setZoomCard(movie)}
              className="hover:underline hover:underline-offset-2">
              <h2 className="text-lg text-gray-900 font-bold mb-2 mt-0.5 tracking-wide">
                {movie.title}
              </h2>
            </button>
            <p className="leading-relaxed text-sm">
              {movie.plot ? movie.plot : "-"}
            </p>
          </div>
          {zoomCard && (
            <Transition appear show={zoomCard === movie} as={Fragment}>
              <Dialog onClose={() => setZoomCard()} className="relative z-50">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <div
                    className="fixed inset-0 bg-black/80"
                    aria-hidden="true"
                  />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-10 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95">
                      <Dialog.Panel className="mx-auto max-w-2xl">
                        {zoomCard && (
                          <div className="flex justify-center relative">
                            <div className="border-gray-200 border rounded overflow-hidden max-w-sm pb-5">
                              <img
                                className="object-cover shadow-md h-[500px] w-full bg-top"
                                src={zoomCard.poster}
                                alt="zoomImage"
                              />
                              <h1 className="mt-2 md:mt-4 text-2xl text-gray-100">
                                {zoomCard.title}
                              </h1>
                              <p className="leading-relaxed text-base text-gray-200 mt-2 px-2">
                                {zoomCard.plot ? zoomCard.plot : "-"}
                              </p>
                            </div>

                            <button
                              className="absolute top-0 right-0 z-30 translate-x-8 -translate-y-8 bg-white rounded-full md:-translate-y-4"
                              onClick={() => setZoomCard()}>
                              <svg
                                className="w-10 h-10"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </button>
                          </div>
                        )}
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          )}
        </div>
      ))}
    </div>
  );
}
