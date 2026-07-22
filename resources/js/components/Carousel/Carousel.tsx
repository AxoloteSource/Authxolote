import React from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper } from 'swiper/react'

const Carousel = ({ children }: { children: React.ReactNode }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation={{
        nextEl: '.swiper-button-next-ex1',
        prevEl: '.swiper-button-prev-ex1'
      }}
      pagination={{ clickable: true }}
      className="swiper mx-auto mb-5 w-full"
      id="slider2"
    >
      <div className="swiper-wrapper">{children}</div>
      <button className="swiper-button-prev-ex1 text-primary border-primary hover:border-primary hover:bg-primary absolute top-1/2 z-[999] grid -translate-y-1/2 place-content-center rounded-full border p-1 transition hover:text-white ltr:left-2 rtl:right-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rtl:rotate-180">
          <path d="M15 5L9 12L15 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button className="swiper-button-next-ex1 text-primary border-primary hover:border-primary hover:bg-primary absolute top-1/2 z-[999] grid -translate-y-1/2 place-content-center rounded-full border p-1 transition hover:text-white ltr:right-2 rtl:left-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rtl:rotate-180">
          <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </Swiper>
  )
}

export default Carousel
