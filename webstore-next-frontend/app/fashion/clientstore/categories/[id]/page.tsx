"use client"
import ShowRoom from '@/client-components-fashion/store-display/ShowRoom';
import { useParams } from 'next/navigation';

export default function page() {
  const params = useParams<{id:string}>();

  return (
    <ShowRoom catId={params.id}/>
  )
}
