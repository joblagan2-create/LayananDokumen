// components/AdsterraBanner.tsx
'use client';
import { useEffect, useRef } from 'react';

type Props = {
  adKey: string;
  width: number;
  height: number;
  containerId: string;
};

export default function AdsterraBanner({ adKey, width, height, containerId }: Props) {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Jika ref belum siap atau script sudah ada, jangan eksekusi
    if (!bannerRef.current || document.getElementById(`scr-${containerId}`)) return;

    const conf = document.createElement('script');
    const ads = document.createElement('script');

    conf.id = `conf-${containerId}`;
    ads.id = `scr-${containerId}`;

    // Trik Adsterra: Menggunakan objek window unik per instance
    (window as any).atOptions = {
      key: adKey,
      format: 'iframe',
      height: height,
      width: width,
      params: {},
    };

    ads.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;
    ads.async = true;

    if (bannerRef.current) {
      bannerRef.current.append(conf);
      bannerRef.current.append(ads);
    }

    // Cleanup saat komponen dicopot (unmount)
    return () => {
      const c = document.getElementById(`conf-${containerId}`);
      const s = document.getElementById(`scr-${containerId}`);
      if (c) c.remove();
      if (s) s.remove();
    };
  }, [adKey, containerId, height, width]);

  return (
    <div className="w-full flex justify-center items-center py-4 overflow-hidden min-h-[100px]">
      <div 
        ref={bannerRef} 
        id={`container-${containerId}`}
        className="inline-block mx-auto" // Menjaga iklan tetap di tengah
        style={{ width: width, height: height }}
      />
    </div>
  );
}