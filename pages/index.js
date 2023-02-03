import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/footer';
import { Fragment } from 'react';

export default function HomePage() {
  // This is the home page, that will have just basic Grid of images and a button to send users to order cards
  return (
    <Fragment>
      <div className="relative overflow-hidden bg-white h-screen">
        <div className="pt-16 pb-80 sm:pt-24  lg:pt-40 lg:pb-48 ">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Banking is about YOU
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                This year, take your banking by storm. Order your finance cards
                from anywhere in the world. Cardify has no limits.
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <Image
                            src="/images/coverCard2.jpg"
                            alt="Cover Picture"
                            className="h-full w-full object-cover object-center"
                            width={1000}
                            height={100}
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src="/coverCard5.jpg"
                            alt="Cover Picture"
                            className="h-full w-full object-cover object-center"
                            width={1000}
                            height={100}
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src="/coverCard4.jpg"
                            alt="Cover Picture"
                            className="h-full w-full object-cover object-center"
                            width={1000}
                            height={100}
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src="/coverCard3.jpg"
                            alt="Cover Picture"
                            className="h-full w-full object-cover object-center"
                            width={1000}
                            height={100}
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src="/coverCard.jpg"
                            alt="Cover Picture"
                            className="h-full w-full object-cover object-center"
                            width={700}
                            height={430}
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src="/coverCard7.jpg"
                            alt="Cover Picture"
                            className="h-full w-full object-cover object-center"
                            width={1000}
                            height={100}
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src="/coverCard6.jpg"
                            alt="Cover Picture"
                            className="h-full w-full object-cover object-center"
                            width={1000}
                            height={100}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  href="/cards"
                  className="inline-block rounded-md border border-transparent bg-gradient-to-r from-project-ruby to-project-pink py-3 px-8 text-center font-medium text-white hover:bg-indigo-700"
                >
                  Order Cards
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
