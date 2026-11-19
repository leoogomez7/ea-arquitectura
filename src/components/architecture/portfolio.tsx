import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { categories, filterProjects, images, type Category, type Project } from '@/lib/architecture-data';

export function Portfolio() {
  const [category, setCategory] = useState<Category>('Todos');
  const [project, setProject] = useState<Project | null>(null);
  const [photo, setPhoto] = useState(0);
  function move(direction: number) {
    if (project) setPhoto(current => (current + direction + project.gallery.length) % project.gallery.length);
  }
  useEffect(() => {
    if (!project) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') setPhoto(current => (current + 1) % project.gallery.length);
      if (event.key === 'ArrowLeft') setPhoto(current => (current - 1 + project.gallery.length) % project.gallery.length);
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [project]);
  return <section id="proyectos" className="light-section section-space">
    <div className="container-ma">
      <div className="section-heading"><div><div className="eyebrow">02 / PROYECTOS SELECCIONADOS</div><h2 className="section-title">Espacios con<br />identidad propia.</h2></div><p className="body-copy">Cada proyecto, una búsqueda singular.<br />Diseño, materialidad y entorno en equilibrio.</p></div>
      <div className="filters" aria-label="Categorías de proyectos">{categories.map(item => <Button variant="editorial" key={item} className={`filter-item ${category === item ? 'selected' : ''}`} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</Button>)}</div>
      <div className="project-grid" key={category}>{filterProjects(category).map(item => <article className="project-item reveal" key={item.id}>
        <Button variant="editorial" className="project-trigger" aria-label={`Ver proyecto ${item.name}`} onClick={() => { setPhoto(0); setProject(item); }}>
          <div className="project-photo"><img src={item.image} alt={`${item.name} — visualización arquitectónica conceptual`} loading="lazy" /><span className="project-arrow"><ArrowUpRight size={20} /></span></div>
          <div className="project-meta"><div className="project-name"><span>{item.id}</span><h3>{item.name}</h3></div><p>{item.category} / Conceptual</p></div>
        </Button>
      </article>)}</div>
      <p className="concept-note">Selección conceptual · Imágenes generadas para esta presentación. No representan obras ejecutadas por EA Arquitectura.</p>
    </div>
    <Dialog open={Boolean(project)} onOpenChange={open => { if (!open) setProject(null); }}>
      <DialogContent className="project-dialog">{project && <>
        <img className="dialog-image" src={project.gallery[photo]} alt={`${project.name} — imagen conceptual ${photo + 1}`} />
        <div className="dialog-controls"><Button variant="architecturalOutline" size="icon" aria-label="Imagen anterior" onClick={() => move(-1)}><ArrowLeft /></Button><span className="text-xs">{photo + 1} / {project.gallery.length}</span><Button variant="architecturalOutline" size="icon" aria-label="Imagen siguiente" onClick={() => move(1)}><ArrowRight /></Button></div>
        <div className="dialog-copy"><div className="eyebrow">{project.category} / ESTUDIO CONCEPTUAL</div><DialogTitle>{project.name}</DialogTitle><DialogDescription className="mt-4">{project.subtitle} Imágenes de referencia conceptual; no corresponden a una obra ejecutada por el estudio.</DialogDescription>
          <dl className="dialog-facts"><div><dt>Ubicación</dt><dd>Por confirmar</dd></div><div><dt>Año</dt><dd>Por confirmar</dd></div><div><dt>Superficie</dt><dd>Por confirmar</dd></div></dl>
          <h3>Concepto y proceso de diseño</h3><p className="body-copy">Una exploración de la relación entre luz, espacio y entorno. La propuesta conceptual busca un equilibrio entre la claridad de los volúmenes y la sensibilidad de los materiales.</p>
          <h3>Materialidad propuesta</h3><p className="body-copy">{project.material} Información demostrativa, pendiente de aprobación.</p>
          <h3>Información técnica</h3><p className="body-copy">Documentación y especificaciones pendientes de incorporar para los proyectos reales del estudio.</p>
          <a href="#contacto" className="text-link" onClick={() => setProject(null)}>CONVERSAR SOBRE UN PROYECTO <ArrowUpRight size={15} /></a>
        </div>
      </>}</DialogContent>
    </Dialog>
  </section>;
}

const gallery = [{ image: images.stair, name: 'Materialidad y detalle' }, { image: images.patio, name: 'Arquitectura y paisaje' }, { image: images.interior, name: 'Luz y espacio' }];
export function Gallery() {
  const [current, setCurrent] = useState<number | null>(null);
  const selected = current === null ? null : gallery[current];
  function move(direction: number) { setCurrent(index => index === null ? null : (index + direction + gallery.length) % gallery.length); }
  useEffect(() => {
    if (current === null) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') setCurrent(index => index === null ? null : (index + 1) % gallery.length);
      if (event.key === 'ArrowLeft') setCurrent(index => index === null ? null : (index - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [current]);
  return <section className="light-section section-space" id="galeria"><div className="container-ma"><div className="section-heading"><div><div className="eyebrow">06 / UNA MIRADA EN DETALLE</div><h2 className="section-title">La arquitectura<br />está en los detalles.</h2></div><p className="body-copy">Luz. Textura. Proporción.<br />Las pequeñas decisiones hacen la diferencia.</p></div><div className="gallery-grid">{gallery.map((item,index) => <Button key={item.name} variant="editorial" className="gallery-trigger" aria-label={`Ampliar ${item.name}`} onClick={() => setCurrent(index)}><img src={item.image} alt={`${item.name} — imagen conceptual`} loading="lazy" /></Button>)}</div><p className="concept-note">Exploraciones visuales conceptuales.</p></div>
    <Dialog open={current !== null} onOpenChange={open => { if (!open) setCurrent(null); }}><DialogContent className="lightbox-dialog">{selected && <><DialogTitle className="sr-only">{selected.name}</DialogTitle><DialogDescription className="sr-only">Fotografía conceptual ampliada</DialogDescription><img src={selected.image} alt={selected.name} className="lightbox-image" /><div className="lightbox-bottom"><Button variant="editorial" aria-label="Foto anterior" onClick={() => move(-1)}><ArrowLeft /></Button><span>{selected.name} · {(current ?? 0) + 1} / {gallery.length}</span><Button variant="editorial" aria-label="Foto siguiente" onClick={() => move(1)}><ArrowRight /></Button></div></>}</DialogContent></Dialog>
  </section>;
}