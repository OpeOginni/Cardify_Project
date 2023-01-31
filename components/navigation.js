import { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

// Creating an array of navigation objects, these are the places users can navigate to on the mobile view
const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Issuers', href: '/issuers', current: false },
  { name: 'Cards', href: '/cards', current: false },
  { name: 'Contact', href: '/#contact', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavigationBar() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  const [isLoggedIn, setLoggedIn] = useState(false); // State to check if a user is logged in or not
  // Helpful when we only need to show an element when the user is logged in

  const [user, setUser] = useState(''); // State to set the exact user that is logged in

  async function fetchData() {
    // This function uses the AI to get if the user is logged in using the cookies
    // and sets the isLoggedIn state accordingly

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

  useEffect(() => {
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutBtnMobile = document.getElementById('logoutBtnMobile');

    if (logoutBtn)
      // If the logout button is clicked, the user is logged out, by calling the logout route in the API
      logoutBtn.addEventListener('click', async (e) => {
        try {
          const res = await axios.get(`/api/v1/users/logout`);
          if (res.data.status === 'success') {
            window.location.assign('/');
          }
        } catch (err) {
          alert('ERROR');
        }
      });

    if (logoutBtnMobile)
      // This is for the Mobile VIew Logout button
      logoutBtnMobile.addEventListener('click', async (e) => {
        try {
          const res = await axios.get(`/api/v1/users/logout`);
          if (res.data.status === 'success') {
            window.location.assign('/');
          }
        } catch (err) {
          alert('ERROR');
        }
      });

    // Using useEffect prevents the api from running continiously
    fetchData();
  }, []);

  // Code to make sure that the page the user is in is noted and is given the right colour
  for (let i = 0; i < navigation.length; i++) {
    if (router.pathname.endsWith(navigation[i].href)) {
      navigation[i].current = true;
    } else {
      navigation[i].current = false;
    }
  }
  return (
    <Disclosure
      as="nav"
      className="bg-gradient-to-r from-project-blue to-project-dark-blue"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <Link href="/">
                <Image
                  className="hidden h-45 w-auto lg:block"
                  src="/cardify-logo.png"
                  alt="Cardify Logo"
                  height="100"
                  width="100"
                />
              </Link>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <Image
                      className="block h-20 w-auto lg:hidden"
                      src="/cardify-logo.png"
                      alt="Cardify Logo"
                      height="100"
                      width="100"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-project-pink text-white'
                            : 'text-gray-300 hover:bg-project-pink/50 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div
                  className={classNames(
                    isLoggedIn ? 'hidden' : 'hidden md:block pr-7'
                  )}
                >
                  <Link
                    href={'/login'}
                    className="mr-2 font-bold text-project-pink px-8 py-2 hover:text-project-pink/70"
                  >
                    LOGIN
                  </Link>
                  <Link
                    href={'/signup'}
                    className="font-bold text-project-pink px-8 py-2 border-2 border-project-pink rounded-2xl hover:border-project-pink/70 hover:text-project-pink/70"
                  >
                    SIGN UP
                  </Link>
                </div>

                <div
                  className={classNames(
                    isLoggedIn ? 'hidden md:block pr-7' : 'hidden'
                  )}
                >
                  <button
                    id="logoutBtn"
                    className="mr-2 font-bold text-project-pink px-8 py-2 hover:text-project-pink/70"
                  >
                    LOGOUT
                  </button>
                  <span
                    href={'/myOrders'}
                    className="font-bold text-project-pink px-8 py-2 border-2 border-project-pink rounded-2xl hover:border-project-pink/70 hover:text-project-pink/70"
                  >
                    Welcome {user.name}
                  </span>
                </div>

                <div
                  className={classNames(
                    isLoggedIn
                      ? 'relative ml-3 hidden'
                      : 'relative ml-3 md:hidden'
                  )}
                >
                  <Link
                    href={'/login'}
                    className=" font-bold border-2 border-project-pink text-project-pink px-2 py-1 rounded-2xl hover:text-project-pink/70 "
                  >
                    LOGIN
                  </Link>
                </div>

                <Menu
                  as="div"
                  className={classNames(
                    isLoggedIn
                      ? 'relative ml-3 md:hidden'
                      : 'relative ml-3 hidden'
                  )}
                >
                  <div>
                    <div className="flex text-sm px-2  text-project-pink border-2 border-project-pink rounded-2xl">
                      <span className="sr-only">Open user menu</span>
                      <button
                        className="h-auto w-auto rounded-full"
                        id="logoutBtnMobile"
                      >
                        LogOut User
                      </button>
                    </div>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  ></Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-project-pink text-white'
                      : 'text-gray-300 hover:text-project-pink/70 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
