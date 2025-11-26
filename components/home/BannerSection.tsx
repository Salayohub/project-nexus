// components/home/BannerSection.tsx
import React from "react";
import Link from "next/link";
import { Banner } from "@/interface";

interface BannerSectionProps {
  banners: Banner[];
}

const BannerSection: React.FC<BannerSectionProps> = ({ banners }) => {
  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <Link
            key={banner.id}
            href={banner.link}
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image */}
            <div className="aspect-4/3 overflow-hidden">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-linearto-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity"></div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              {banner.badge && (
                <span className="inline-block px-3 py-1 bg-red-500 text-xs font-bold rounded mb-2 uppercase">
                  {banner.badge}
                </span>
              )}
              <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
              <p className="text-gray-200 text-sm">{banner.description}</p>
              <div className="mt-3 inline-flex items-center text-sm font-semibold group-hover:underline">
                Shop Now →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BannerSection;