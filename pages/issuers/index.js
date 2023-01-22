import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function IssuersPage() {
  const [issuers, setIssuers] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Using useEffect prevents the api from running continiously
    axios.get(`http://127.0.0.1:3000/api/v1/banks`).then((res) => {
      const issuers = res.data.data.data;
      setIssuers(issuers);
      setLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-white h-screen md:h-auto">
      <div className="text-center py-7 bg-gradient-to-r from-project-ruby to-project-pink text-white text-xl container mx-auto">
        <h1> Order a Card from one of our Supported Issuers </h1>
      </div>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-2 gap-y-12 gap-x-8 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-14">
          {issuers.map((issuer) => (
            <Link
              key={issuer._id}
              href={`/cards/${issuer.slug}`}
              className="group"
            >
              <div className=" w-full overflow-hidden rounded-lg bg-gray-200  ">
                <Image
                  src={`/${issuer.logo}`}
                  alt={'Testing'}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                  height="50"
                  width="50"
                />
              </div>
              <h3 className="mt-4 text-lx text-project-dark-blue text-bold">
                {issuer.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
