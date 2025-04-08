'use client';

import { Input } from '@heroui/input';
import Image from 'next/image';
import AppButton from '../AppButton';
import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';

const NZMap = dynamic(() => import('@/components/map/NZMap'), {
  ssr: false,
});

export default function BannerHome() {
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselPosition, setCarouselPosition] = useState(0);
  const speed = 0.5; // pixels per frame

  // Set up the carousel animation
  useEffect(() => {
    if (isPaused || !carouselRef.current) return;

    let animationId: number;
    let position = carouselPosition;

    const animate = () => {
      if (!carouselRef.current) return;

      const containerWidth = carouselRef.current.offsetWidth;
      const scrollWidth = carouselRef.current.scrollWidth;

      // Reset position when we've scrolled all items
      if (Math.abs(position) >= scrollWidth / 2) {
        position = 0;
      } else {
        position -= speed;
      }

      setCarouselPosition(position);
      carouselRef.current.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused, carouselPosition]);

  // Expandable categories array
  const expandedCategories = [
    ...categories,
    ...categories,
    ...categories,
    ...categories,
  ];

  return (
    <div
      id="banner-container"
      style={styles.bannerContainer}
      className="w-full h-screen mt-10 lg:mt-16"
    >
      <img
        src="/img/bg-banner-home.webp"
        alt="Banner Home"
        style={{
          maskImage: 'linear-gradient(to top, transparent, white 10%)',
        }}
        className="w-full h-full object-cover z-10 absolute top-0 left-0"
      />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-2 relative z-20">
        <div id="banner-content" className="flex flex-col gap-6">
          <h1 className="text-white text-3xl lg:text-6xl font-extrabold leading-tight">
            Kia Ora! <br />
            Ready to find your <br />
            next challenge?
          </h1>
          {/* Search Bar */}
          <div className="w-full md:w-3/4 flex justify-between gap-4 bg-white/30 backdrop-blur-xl rounded-full px-2 py-2">
            <Input
              type="text"
              placeholder="Explore events"
              className="w-full lg:w-96 text-red [&_[data-slot=input-wrapper]]:!border-none [&_[data-slot=input-wrapper]]:!shadow-none [&_[data-slot=input-wrapper]]:after:!hidden [&_[data-slot=input]]:placeholder:!text-white"
              variant="underlined"
              id="search-input"
              color="default"
            />
            <AppButton color="primary" radius="full">
              Search
            </AppButton>
          </div>

          {/* Real Carousel with Fixed Width Container */}
          <div
            className=" max-w-xl overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              ref={carouselRef}
              className="flex gap-2 transition-transform"
              style={{ width: 'max-content' }}
            >
              {expandedCategories.map((category, index) => (
                <AppButton
                  key={`${category.text}-${index}`}
                  variant="bordered"
                  radius="full"
                  className="bg-white/10 hover:shadow-sm text-white px-4 py-1 h-auto flex-none"
                >
                  <span className="text-xl md:text-2xl mr-1">
                    {category.emoji}
                  </span>{' '}
                  <span className="text-sm md:text-base font-semibold">
                    {category.text}
                  </span>
                </AppButton>
              ))}
            </div>
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
        <div id="banner-map" className="hidden lg:block -mt-14">
          <NZMap />
        </div>
      </div>
    </div>
  );
}

const categories = [
  { emoji: '🏃‍♂️', text: 'Multiday races' },
  { emoji: '😹', text: 'Fun runs' },
  { emoji: '🥵', text: '10k runs' },
];

const styles = {
  bannerContainer: {
    // backgroundImage: "url('/img/bg-banner-home.webp')",
    // backgroundSize: "cover",
    // backgroundPosition: "center",
  },
};
