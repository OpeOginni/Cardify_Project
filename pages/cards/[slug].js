import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';

const _cards = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: '/coverCard2.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  // More products...
];

export default function SlugPage() {
  const [cards, setCards] = useState([]);
  const router = useRouter();

  const slug = router.query.slug;
  console.log(slug);
  console.log(slug);

  useEffect(() => {
    // Using useEffect prevents the api from running continiously
    axios.get(`/api/v1/cards/issuer/${slug}`).then((res) => {
      console.log(res);
      const cards = res.data.data;
      console.log(cards);
      setCards(cards);
    });
  }, [slug]);

  return (
    <div className="bg-white">
      <div className="text-center py-7 bg-gradient-to-r from-project-ruby to-project-pink text-white text-xl container mx-auto">
        <h1> Check out cards Offered by {slug} </h1>
      </div>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {cards.map((card) => (
            <div key={card.id} className="group relative">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <Image
                  src={'/coverCard2.jpg'}
                  alt={'/coverCard2.jpg'}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  width="1000"
                  height="100"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={card.name}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {card.cardType}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {card.description}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {card.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
