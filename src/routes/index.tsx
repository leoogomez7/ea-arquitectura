import { createFileRoute } from '@tanstack/react-router';
import { Header, Hero, Vision, Studio, Services, Methodology, Impact, Philosophy, Contact, Location, Footer } from '@/components/architecture/sections';
import { Portfolio, Gallery } from '@/components/architecture/portfolio';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'EA Arquitectura | Estudio de Arquitectura y Diseño' },
    { name: 'description', content: 'Estudio de arquitectura especializado en diseño, desarrollo de proyectos, dirección de obra e interiorismo. Creamos espacios con identidad y propósito.' },
    { property: 'og:title', content: 'EA Arquitectura | Arquitectura con identidad' },
    { property: 'og:description', content: 'Diseñamos espacios con identidad, equilibrio y propósito. Proyecto arquitectónico, dirección de obra e interiorismo.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});
function Index() {
  return <><Header /><main><Hero /><Vision /><Portfolio /><Studio /><Services /><Methodology /><Impact /><Gallery /><Philosophy /><Contact /><Location /></main><Footer /></>;
}
