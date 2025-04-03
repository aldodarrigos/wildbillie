'use client';

import { Input } from '@heroui/input';
import Image from 'next/image';
import AppButton from '../AppButton';
import dynamic from 'next/dynamic';

const NZMap = dynamic(() => import('@/components/map/NZMap'), {
  ssr: false,
});

export default function BannerHome() {
  return (
    <div
      id="banner-container"
      style={styles.bannerContainer}
      className="w-full h-screen mt-16"
    >
      <img
        src="/img/bg-banner-home.webp"
        alt="Banner Home"
        style={{
          maskImage: 'linear-gradient(to top, transparent, white 10%)',
        }}
        className="w-full h-full object-cover z-10 absolute top-0 left-0"
      />
      <div className="grid grid-cols-[1fr_1fr] gap-2 relative z-20">
        <div id="banner-content" className="flex flex-col gap-6">
          <h1 className="text-white text-5xl font-extrabold leading-tight">
            Kia Ora! <br />
            Ready to find your <br />
            next challenge?
          </h1>
          {/* Search Bar */}
          <div className="flex items-center gap-4 w-fit bg-white/30 backdrop-blur-xl rounded-full px-2 py-2">
            <Input
              type="text"
              // label="Search events"
              placeholder="Explore events"
              className="w-96 text-red [&_[data-slot=input-wrapper]]:!border-none [&_[data-slot=input-wrapper]]:!shadow-none [&_[data-slot=input-wrapper]]:after:!hidden [&_[data-slot=input]]:placeholder:!text-white"
              variant="underlined"
              id="search-input"
              color="default"
            />
            <AppButton color="primary" radius="full">
              Search
            </AppButton>
          </div>

          {/* Category Chips */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <AppButton
                key={category}
                variant="bordered"
                radius="full"
                className="bg-white/10 hover:shadow-sm text-white px-4 py-1 h-auto"
              >
                {category}
              </AppButton>
            ))}
          </div>

          <div className="img flex">
            <Image
              src="/img/pet-billie.webp"
              alt="Banner Home"
              width={400}
              height={300}
            />
          </div>
        </div>
        <div id="banner-map" className="-mt-14">
          <NZMap />
        </div>
      </div>
    </div>
  );
}

const categories = [
  'Multiday races',
  'Fun runs',
  '10k runs',
  'South Island runs',
];

const styles = {
  bannerContainer: {
    // backgroundImage: "url('/img/bg-banner-home.webp')",
    // backgroundSize: "cover",
    // backgroundPosition: "center",
  },
};
