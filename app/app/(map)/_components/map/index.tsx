import dynamic from 'next/dynamic'

export const Map = dynamic(() => import('./map.component'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
