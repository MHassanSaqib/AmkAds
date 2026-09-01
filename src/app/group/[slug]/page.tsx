import DivisionGallery from '@/components/group/DivisionGallery'

export function generateStaticParams() {
  return [
    { slug: 'digital-marketing' },
    { slug: 'creative-agency' },
    { slug: 'event-management' },
    { slug: 'corporate-services' }
  ]
}

export default function DivisionGalleryPage({ params }: { params: { slug: string } }) {
  return <DivisionGallery slug={params.slug} />
}
