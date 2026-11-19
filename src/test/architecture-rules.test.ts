import { describe, expect, it } from 'vitest';
import { filterProjects, projects, studioContact } from '@/lib/architecture-data';
import { fileError } from '@/lib/contact-validation';

describe('Architecture content rules', () => {
  it('shows all six conceptual projects for Todos', () => expect(filterProjects('Todos')).toHaveLength(6));
  it('filters viviendas separately from commercial work', () => {
    expect(filterProjects('Viviendas').map(project => project.name)).toEqual(['Casa Patio', 'Casa Luz', 'Casa Terraza']);
    expect(filterProjects('Comercial').map(project => project.name)).toEqual(['Espacio Urbano']);
  });
  it('keeps unverified business contact details empty', () => expect(studioContact).toEqual({ email:'', whatsapp:'', instagram:'', address:'Merlo, Buenos Aires', mapsUrl:'' }));
  it('does not invent project locations, years or surfaces', () => {
    for (const project of projects) { expect(project).not.toHaveProperty('location'); expect(project).not.toHaveProperty('year'); expect(project).not.toHaveProperty('area'); }
  });
  it('accepts PDFs and images, not executables', () => {
    expect(fileError({ name:'plano.pdf', size:1024 })).toBe('');
    expect(fileError({ name:'foto.jpg', size:1024 })).toBe('');
    expect(fileError({ name:'program.exe', size:1024 })).not.toBe('');
  });
  it('rejects files larger than the disclosed 10 MB', () => {
    expect(fileError({ name:'plano.pdf', size:10 * 1024 * 1024 })).toBe('');
    expect(fileError({ name:'plano.pdf', size:10 * 1024 * 1024 + 1 })).not.toBe('');
  });
});