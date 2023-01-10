import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import LoaderMovies from "../components/LoaderMovies";
import { Open_Sans } from "@next/font/google";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

const open_sans = Open_Sans({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const { data: movies, isLoading: loadingMovies } = useSWR(
    `/api/movies`,
    fetcher
  );

  const [query, setQuery] = useState("");

  const { data: searchMovies, isLoading: loadingSearchMovies } = useSWR(
    query ? `/api/movies/search?keyword=${query}` : null,
    fetcher
  );

  return (
    <section
      className={`${open_sans.className} container mx-auto px-2 md:px-0`}>
      <Head>
        <title>Netplix</title>
      </Head>
      {/* header */}
      <header aria-label="Site Header" className="shadow-sm">
        <div className="flex h-16 items-center justify-between px-2 md:px-0">
          <div>
            <Link
              href="/"
              className="text-3xl font-bold text-gray-900 font-serif">
              Netplix
            </Link>
          </div>

          <nav
            aria-label="Site Nav"
            className="hidden items-center justify-center gap-8 text-xl font-medium lg:flex lg:w-0 lg:flex-1">
            <Link
              className="text-gray-900 hover:underline hover:underline-offset-4"
              href="/series">
              Series
            </Link>
            <Link
              className="text-gray-900 hover:underline hover:underline-offset-4"
              href="/movies">
              Movies
            </Link>
            <Link
              className="text-gray-900 hover:underline hover:underline-offset-4"
              href="/genre">
              Genre
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="mb-0 hidden lg:flex">
              <div className="relative">
                <input
                  className="h-10 rounded-lg border-gray-400 pr-10 text-sm placeholder-gray-300 focus:z-10"
                  placeholder="Search..."
                  type="text"
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                />

                <button
                  // type="submit"
                  className="absolute inset-y-0 right-0 mr-px rounded-r-lg p-2 text-gray-600">
                  <span className="sr-only">Submit Search</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      clipRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      fillRule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* end header */}
      {/* movies */}
      {!query && loadingMovies && <LoaderMovies />}
      {!query && !searchMovies && !loadingMovies && movies && (
        <div>
          <Carousel data={movies?.top} />
          <div className="mt-8">
            <h1 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 leading-relaxed">
              Top Movies
            </h1>
            <Card movies={movies?.top} />
          </div>
          <div className="mt-8">
            <h1 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 leading-relaxed">
              Latest Movies
            </h1>
            <Card movies={movies?.latest} />
          </div>
        </div>
      )}

      {/* search movies */}
      {query && loadingSearchMovies && <LoaderMovies />}
      {query && !loadingSearchMovies && searchMovies && (
        <div>
          {searchMovies?.data.length === 0 ? (
            <div className="text-center mt-20 text-2xl">
              Movie {query} not found!
            </div>
          ) : (
            <div className="mt-8">
              <h1 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 leading-relaxed">
                <span>
                  <svg
                    className="h-6 w-6 inline mb-1 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      clipRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      fillRule="evenodd"></path>
                  </svg>
                </span>
                Search Movies
              </h1>
              <Card movies={searchMovies?.data} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
