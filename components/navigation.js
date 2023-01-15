import Link from 'next/link';
import { Popover } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/solid';

const navigation = () => {
  return (
    <Popover className="container mx-auto flex items-center border-b-2 px-6 py-2 h-24">
      <h1 className="font-bold">Cardify Frontend</h1>
      <div className="grow">
        <div className="hidden sm:flex items-center justify-center gap-2 md:gap-8">
          <Link href={'/'}>Home</Link>
          <Link href={'/cards'}>Cards</Link>
          <Link href={'/Issuers'}>Issuers</Link>
          <Link href={'#contact'}>Contact Us</Link>
        </div>
      </div>
      <div className="flex grow items-center justify-end sm:hidden">
        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
          <span className="sr-only">Open menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </Popover.Button>
      </div>

      <Popover.Panel
        focus
        className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
      ></Popover.Panel>

      <div className="hidden sm:block">
        <Link href={'signUp'} className="mr-2 font-bold">
          Sign Up
        </Link>
        <Link href={'login'} className=" font-bold">
          Login
        </Link>
      </div>
    </Popover>
  );
};

export default navigation;
