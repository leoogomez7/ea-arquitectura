import { useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Upload, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fileError, MAX_FILES } from '@/lib/contact-validation';

export function ContactForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState('');
  const [dragging, setDragging] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  function addFiles(incoming: File[]) {
    const error = incoming.map(fileError).find(Boolean);
    if (error) { setStatus(error); return; }
    if (incoming.length + files.length > MAX_FILES) { setStatus('Podés adjuntar hasta 5 archivos.'); return; }
    setFiles(current => [...current, ...incoming]);
    setStatus('');
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('El envío de consultas todavía no está habilitado. No se enviaron tus datos ni tus archivos.');
  }
  return <form onSubmit={submit} className="form-grid">
    <div className="form-field"><label htmlFor="name">Nombre y apellido *</label><input id="name" name="name" autoComplete="name" required placeholder="Tu nombre" maxLength={100} /></div>
    <div className="form-field"><label htmlFor="email">Email *</label><input id="email" name="email" type="email" autoComplete="email" required placeholder="tu@email.com" maxLength={200} /></div>
    <div className="form-field"><label htmlFor="phone">Teléfono / WhatsApp *</label><input id="phone" name="phone" type="tel" autoComplete="tel" required placeholder="Código de área + número" maxLength={40} /></div>
    <div className="form-field"><label htmlFor="type">Tipo de proyecto *</label><select id="type" name="type" defaultValue="" required><option value="" disabled>Seleccioná una opción</option>{['Vivienda nueva', 'Proyecto comercial', 'Reforma', 'Ampliación', 'Interiorismo', 'Otro'].map(type => <option key={type}>{type}</option>)}</select></div>
    <div className="form-field"><label htmlFor="location">Ubicación del proyecto *</label><input id="location" name="location" required placeholder="Ciudad, provincia" maxLength={150} /></div>
    <div className="form-field"><label htmlFor="area">Superficie aproximada (m²)</label><input id="area" name="area" type="number" min="1" placeholder="Superficie estimada" /></div>
    <div className="form-field span-two"><label htmlFor="budget">Presupuesto estimado · opcional</label><input id="budget" name="budget" placeholder="Monto y moneda" maxLength={100} /></div>
    <div className="form-field span-two"><label htmlFor="description">Contanos sobre tu proyecto *</label><textarea id="description" name="description" required rows={3} placeholder="Tus ideas, necesidades y lo que imaginás para este espacio…" maxLength={5000} /></div>
    <div className={`upload-zone span-two ${dragging ? 'dragging' : ''}`} onDragOver={event => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={event => { event.preventDefault(); setDragging(false); addFiles(Array.from(event.dataTransfer.files)); }}>
      <Upload size={20} strokeWidth={1} />
      <Button type="button" variant="editorial" onClick={() => input.current?.click()}>Adjuntar archivos o arrastrarlos aquí</Button>
      <small>JPG, PNG, WebP o PDF · hasta 10 MB por archivo · máximo 5 archivos</small>
      <input ref={input} aria-label="Adjuntar archivos" className="sr-only" type="file" accept=".jpg,.jpeg,.png,.webp,.pdf" multiple onChange={event => { addFiles(Array.from(event.target.files ?? [])); event.target.value = ''; }} />
    </div>
    {files.length > 0 && <ul className="upload-list span-two">{files.map((file, index) => <li key={`${file.name}-${index}`}><FileText size={16} /><span className="flex-1">{file.name}</span><Button variant="editorial" type="button" aria-label={`Eliminar ${file.name}`} onClick={() => setFiles(current => current.filter((_, i) => index !== i))}><X size={16} /></Button></li>)}</ul>}
    <p className="form-disclosure span-two">El canal de recepción está pendiente de configuración. Los archivos seleccionados permanecen en tu dispositivo.</p>
    <Button type="submit" variant="architectural" className="justify-self-start">ENVIAR CONSULTA <ArrowUpRight /></Button>
    {status && <p className="form-status span-two" role="status">{status}</p>}
  </form>;
}