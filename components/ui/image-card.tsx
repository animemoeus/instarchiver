import { cn } from '@/lib/utils';
import Image from 'next/image';

type Props = {
  imageUrl: string;
  caption: string;
  className?: string;
};

export default function ImageCard({ imageUrl, caption, className }: Props) {
  return (
    <figure
      className={cn(
        'w-[250px] overflow-hidden rounded-base border-2 border-border bg-main font-base shadow-shadow',
        className
      )}
    >
      <div className="relative w-full aspect-4/3">
        <Image src={imageUrl} alt="image" fill sizes="250px" className="object-cover" />
      </div>
      <figcaption className="border-t-2 text-main-foreground border-border p-4">
        {caption}
      </figcaption>
    </figure>
  );
}
