import Image from 'next/image';
import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

// This is the featured cards page
const card = {
  name: 'Test Card',
  price: '192',
  images: ['/coverCard7.png'],
  cardType: 'Test Card Type',
  description: 'SOmethingggg',
}; // Put this dummy data to let code work

const deliveryFee = 65; // Initialized the delivery Fee

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CardPage() {
  const [cards, setCards] = useState([]);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(card);

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  function handlePopup(individualCard) {
    setProduct(individualCard);
    setOpen(true);
  }

  async function fetchUser() {
    try {
      await axios.get(`/api/v1/auth`).then((res) => {
        const loggedInUser = res.data.user;
        if (loggedInUser === 'Not Logged In') {
          return setLoggedIn(false);
        }
        setUser(loggedInUser);
        setLoggedIn(true);
      });
    } catch (err) {}
  }

  async function getCheckout() {
    const orderAddress = document.getElementById('location').value;

    try {
      const res = await axios.post(
        `/api/v1/orders/checkout-session/${product._id}`,
        {
          email: user.email,
          price: product.price + deliveryFee,
          user: user._id,
          card: product._id,
          deliveryAddress: orderAddress,
        }
      );
      window.location.replace(res.data.session.url);
    } catch (err) {
      alert('Please try again ');
    }
  }

  useEffect(() => {
    // Using useEffect prevents the api from running continiously
    axios.get(`/api/v1/cards/showRoom/featuredCards`).then((res) => {
      const cards = res.data.data;
      setCards(cards);
    });
    fetchUser();
  }, []);

  return (
    // Order Popup

    <div className="bg-white">
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                      <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                        <Image
                          src={product.images[0]}
                          alt={product.cardName}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                          width="1000"
                          height="700"
                        />
                      </div>
                      <div className="sm:col-span-8 lg:col-span-7">
                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                          {product.cardType}
                        </h2>

                        <section
                          aria-labelledby="information-heading"
                          className="mt-2"
                        >
                          <h3 id="information-heading" className="sr-only">
                            Product information
                          </h3>

                          <p className="text-2xl text-gray-900">
                            ${product.price}
                          </p>

                          {/* Product Description */}
                          <div className="mt-6">
                            <h4 className="sr-only">Description</h4>
                            <h4 className="text-m font-medium text-gray-900 pb-4">
                              Description
                            </h4>
                            <div className="flex items-center">
                              <p>{product.description}</p>
                            </div>
                          </div>
                        </section>

                        <section
                          aria-labelledby="options-heading"
                          className="mt-10"
                        >
                          <h3 id="options-heading" className="sr-only">
                            Delivery options
                          </h3>

                          <form>
                            {/* Location Input */}
                            <div className="mt-10 pb-3">
                              <div className="flex items-center justify-between">
                                <h4 className="text-m font-medium text-gray-900 pb-4">
                                  Location
                                </h4>
                              </div>
                              <div>
                                <input
                                  id="location"
                                  name="location"
                                  type="text"
                                  required
                                  className="relative block w-full appearance-none rounded-xl border border-gray-300 px-3 py-2 text-project-blue placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                  placeholder="No14 Somewhere Road"
                                />
                              </div>
                            </div>

                            {/* Delivery Fee */}
                            <div className="pb-3">
                              <h4 className="text-m font-medium text-gray-900">
                                Delivery Fee
                              </h4>
                              <div className="pt-2">
                                <h4 className="text-xl font-semibold">
                                  ${deliveryFee}
                                </h4>
                              </div>
                            </div>

                            {/* Price Calculation */}
                            <div className="pb-3">
                              <h4 className="text-m font-medium text-gray-900">
                                Total
                              </h4>
                              <div className="pt-2">
                                <h1 className="text-xl font-semibold">
                                  ${product.price} + ${deliveryFee} = $
                                  {product.price + deliveryFee}
                                </h1>
                              </div>
                            </div>

                            <button
                              type="button"
                              id="orderBtn"
                              className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => getCheckout()}
                            >
                              Order Card
                            </button>
                          </form>
                        </section>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Normal Page */}
      <div className="text-center py-7 bg-gradient-to-r from-project-ruby to-project-pink text-white text-xl container mx-auto">
        <h1> Order one of Our Featured Cards </h1>
      </div>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {cards.map((card) => (
            <div key={card._id} className="group relative">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none ">
                <Image
                  src={card.images[0]}
                  alt={card.cardName}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  width="1000"
                  height="700"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {card.cardType}
                    </a>
                  </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {card.price}
                </p>
              </div>
              <div
                className={classNames(
                  isLoggedIn ? 'flex items-end p-4' : 'hidden'
                )}
              >
                <button
                  type="button"
                  id="popupBtn"
                  className="relative z-10 w-full rounded-md bg-project-blue py-2 px-4 text-sm text-white font-semibold "
                  onClick={() => handlePopup(card)}
                >
                  {' '}
                  Order Now
                </button>
              </div>
              <div
                className={classNames(
                  isLoggedIn ? 'hidden' : 'flex items-end p-4'
                )}
              >
                <Link
                  type="button"
                  href={'/login'}
                  className="relative z-10 w-full rounded-md bg-project-blue py-2 px-4 text-sm text-white font-semibold text-center"
                >
                  {' '}
                  Log In to Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
