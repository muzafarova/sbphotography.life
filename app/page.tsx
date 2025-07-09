import Image from 'next/image';

export default function Page() {
  return (
    <Image
      src="/logo.avif"
      alt="Sarah Barlow Photography"
      width={202}
      height={202}
    />
  );
}
