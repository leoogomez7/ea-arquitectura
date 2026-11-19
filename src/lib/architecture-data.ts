import hero from '@/assets/residence-hero.webp';
import patio from '@/assets/courtyard.webp';
import interior from '@/assets/interior.webp';
import urban from '@/assets/urban.webp';
import terrace from '@/assets/terrace.webp';
import stair from '@/assets/stair.webp';

export const images = { hero, patio, interior, urban, terrace, stair };
export const categories = ['Todos', 'Viviendas', 'Comercial', 'Intervenciones', 'Reformas'] as const;
export type Category = typeof categories[number];
export const projects = [
  { id: '01', name: 'Casa Patio', category: 'Viviendas', subtitle: 'La naturaleza como punto de partida.', image: patio, gallery: [patio, interior, hero], material: 'Hormigón, madera y piedra natural.' },
  { id: '02', name: 'Casa Luz', category: 'Viviendas', subtitle: 'La luz define cada espacio.', image: interior, gallery: [interior, stair, patio], material: 'Travertino, roble y vidrio.' },
  { id: '03', name: 'Espacio Urbano', category: 'Comercial', subtitle: 'Una nueva relación con la ciudad.', image: urban, gallery: [urban, interior], material: 'Piedra natural, vidrio y metal.' },
  { id: '04', name: 'Casa Terraza', category: 'Viviendas', subtitle: 'Habitar el paisaje.', image: terrace, gallery: [terrace, hero, patio], material: 'Hormigón visto y piedra.' },
  { id: '05', name: 'Intervención 01', category: 'Intervenciones', subtitle: 'Una nueva mirada sobre lo existente.', image: stair, gallery: [stair, interior], material: 'Revoque natural, madera y acero.' },
  { id: '06', name: 'Espacio Contemporáneo', category: 'Reformas', subtitle: 'El equilibrio está en los detalles.', image: hero, gallery: [hero, interior, stair], material: 'Madera, piedra y texturas naturales.' },
] as const;
export type Project = typeof projects[number];
export function filterProjects(category: Category) {
  return category === 'Todos' ? projects : projects.filter(project => project.category === category);
}
export const services = [
  ['Proyecto arquitectónico', 'De la primera idea a la documentación técnica. Propuestas que integran identidad, funcionalidad y precisión.'],
  ['Dirección de obra', 'Supervisión, coordinación y seguimiento para mantener la coherencia entre el diseño y su ejecución.'],
  ['Interiorismo', 'Materialidad, iluminación y detalles que construyen una experiencia integral de cada espacio.'],
  ['Consultoría', 'Una mirada profesional para evaluar posibilidades y definir el mejor camino para tu proyecto.'],
];
export const stages = [
  ['Primer encuentro', 'Escuchamos tus necesidades, expectativas y objetivos.'],
  ['Análisis', 'Estudiamos el espacio, el entorno y sus posibilidades.'],
  ['Conceptualización', 'Definimos la idea y el lenguaje arquitectónico.'],
  ['Proyecto ejecutivo', 'Desarrollamos documentación y detalles técnicos.'],
  ['Planificación', 'Organizamos recursos, tiempos y etapas.'],
  ['Dirección de obra', 'Acompañamos y supervisamos la ejecución.'],
  ['Entrega', 'La idea se transforma en un espacio para habitar.'],
];
export const studioContact = { email: '', whatsapp: '', instagram: '', address: 'Merlo, Buenos Aires', mapsUrl: '' };