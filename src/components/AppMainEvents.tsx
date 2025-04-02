'use client';

import Image from 'next/image';
import Link from 'next/link';

interface EventCardProps {
  title: string;
  image: string;
  date: {
    day: string;
    month: string;
  };
  location: string;
}

const EventCard = ({ title, image, date, location }: EventCardProps) => {
  return (
    <div className="relative rounded-[15px] overflow-hidden group h-[350px] max-w-[300px]">
      {/* Date Box */}
      <div className="absolute top-[15px] right-4 bg-gradient-to-b from-[#FF9B05] to-[#FF5005] text-white text-center px-2 rounded-lg w-[50px] h-[50px]">
        <p className="font-extrabold text-2xl leading-tight">{date.day}</p>
        <p className="font-bold text-xs">{date.month}</p>
      </div>
      {/* Image */}
      <Image
        src={image}
        alt={title}
        width={300}
        height={350}
        className="rounded-[15px] w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-xl p-4 rounded-b-[15px]">
        <h3 className="font-semibold text-white mb-2  line-clamp-1 text-sm md:text-base">
          {title}
        </h3>
        {/* Location and link */}
        <div className="flex justify-between items-end mt-2 border-t-1 border-primary pt-2">
          <p className="text-white text-xs font-extrabold">{location}</p>
          <Link href="#" className="text-white text-xs">
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function AppMainEvents() {
  const events = [
    {
      id: 1,
      title: 'Marathon Race in Queenstown Valley',
      image: '/img/main_events/event1.webp',
      date: { day: '15', month: 'NOV' },
      location: 'Queenstown',
    },
    {
      id: 2,
      title: 'Southern Lakes Half Marathon',
      image: '/img/main_events/event2.webp',
      date: { day: '26', month: 'MAY' },
      location: 'Manawatū-Whanganui',
    },
    {
      id: 3,
      title: 'Auckland Harbor 10K Run',
      image: '/img/main_events/event3.webp',
      date: { day: '18', month: 'JUN' },
      location: 'Auckland',
    },
    {
      id: 4,
      title: 'Wellington Waterfront Marathon',
      image: '/img/main_events/event4.webp',
      date: { day: '03', month: 'SEP' },
      location: 'Wellington',
    },
    {
      id: 5,
      title: 'Rotorua Forest Trail Run',
      image: '/img/main_events/event5.webp',
      date: { day: '12', month: 'AUG' },
      location: 'Rotorua',
    },
    {
      id: 6,
      title: 'Taupo Ironman Challenge',
      image: '/img/main_events/event6.webp',
      date: { day: '22', month: 'OCT' },
      location: 'Taupo',
    },
    {
      id: 7,
      title: 'Wellington Waterfront Marathon',
      image: '/img/main_events/event2.webp',
      date: { day: '03', month: 'SEP' },
      location: 'Wellington',
    },
    {
      id: 8,
      title: 'Wellington Waterfront Marathon',
      image: '/img/main_events/event1.webp',
      date: { day: '03', month: 'SEP' },
      location: 'Wellington',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
        {events.map(event => (
          <EventCard
            key={event.id}
            title={event.title}
            image={event.image}
            date={event.date}
            location={event.location}
          />
        ))}
      </div>
    </div>
  );
}
