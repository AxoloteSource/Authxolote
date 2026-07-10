import { CarouselItemProps } from '@/components/Carousel/interfaces/CarouselItemProps'

const CarouselItem = ({ title, description, image }: CarouselItemProps) => {
  return (
    <div className="relative">
      <img src={image ? URL.createObjectURL(new Blob([image])) : ''} className="max-h-80 w-full object-cover" alt="itemImage" />
      {(title || description) && (
        <div className="absolute top-1/4 z-[999] ltr:left-12 rtl:right-12">
          <div className="bg-opacity-70 rounded bg-black p-2">
            {title && <div className="text-base font-bold text-white sm:text-3xl">{title}</div>}
            {description && <div className="mt-1 hidden w-4/5 text-base font-medium text-white sm:mt-5 sm:block">{description}</div>}
          </div>
        </div>
      )}
    </div>
  )
}

export default CarouselItem
