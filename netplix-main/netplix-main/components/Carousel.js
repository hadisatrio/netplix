// import Swiper core and required modules
import { Autoplay, Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function Carousel({ data }) {
  const [zoomCard, setZoomCard] = useState({});
  return (
    <div>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
        }}>
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <>
              <div
                className="p-4 border border-gray-600 rounded flex"
                onClick={() => setZoomCard(item)}>
                <img
                  src={item.poster}
                  alt="gambar"
                  className="object-cover h-[150px] w-[100px] lg:h-[500px] lg:w-[300px]"
                  onClick={() => setZoomCard(item)}
                />
                <div className="p-4">
                  <h1 className="text-2xl" onClick={() => setZoomCard(item)}>
                    {item.title}
                  </h1>
                  <p className="leading-relaxed text-lg mt-4">{item.plot}</p>
                </div>
              </div>
              {zoomCard && (
                <Transition appear show={zoomCard === item} as={Fragment}>
                  <Dialog
                    onClose={() => setZoomCard()}
                    className="relative z-50">
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
            </>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
