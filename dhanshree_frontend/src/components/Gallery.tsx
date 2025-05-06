"use client";
import React, { useState } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

const images = [
  "/user/category/category_1.jpg",
  "/user/category/category_2.jpg",
  "/user/category/category_3.jpg",
  "/user/category/category_4.jpg",
  "/user/category/category_5.jpg",
  "/user/category/category_6.jpg",
];

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [selectedImg, setSelectedImg] = useState(images[0]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () =>
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);

  const visibleImages = images.slice(0, 3);
  const extraCount = images.length - 3;

  return (
    <div className="flex gap-4 pt-8">
      {/* Featured Image */}
      <div
        className="w-full h-[420px] rounded-lg overflow-hidden cursor-pointer"
        onClick={() => openLightbox(images.indexOf(selectedImg))}
      >
        <Image
          src={selectedImg}
          alt="Featured"
          width={1000}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-rows-3 gap-4">
        {visibleImages.map((img, idx) => {
          const isLastVisible = idx === 2 && extraCount > 0;

          return (
            <div
              key={idx}
              className="relative"
              onClick={() => {
                setSelectedImg(img);
                openLightbox(idx);
              }}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx}`}
                width={300}
                height={200}
                className={clsx(
                  "h-32 w-full object-cover rounded-md cursor-pointer transition-transform",
                  selectedImg === img && "ring-4 ring-blue-400"
                )}
              />
              {isLastVisible && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-lg font-semibold rounded-md cursor-pointer">
                  +{extraCount} photos
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center ">
          <button
            className="absolute top-4 right-4 text-white cursor-pointer"
            onClick={() => setLightboxOpen(false)}
          >
            <X size={32} />
          </button>
          <button className="absolute left-4 text-white cursor-pointer" onClick={prevImage}>
            <ArrowLeft size={32} />
          </button>
          <Image
            src={images[lightboxIndex]}
            alt="Lightbox"
            width={1000}
            height={600}
            className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg"
          />
          <button className="absolute right-4 text-white cursor-pointer" onClick={nextImage}>
            <ArrowRight size={32} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
