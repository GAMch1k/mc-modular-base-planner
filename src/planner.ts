export type Kind = 'platform' | 'module' | 'pathway'
export type PlanObject = { id: string; kind: Kind; name: string; x: number; z: number; w: number; h: number; color: string; category: string; notes: string; locked?: boolean; parentId?: string; groupId?: string }
export type Project = { version: 1; name: string; grid: number; showGrid: boolean; showChunks: boolean; objects: PlanObject[] }
export const snap = (value: number, spacing: number) => Math.round(value / spacing) * spacing
export const readProject = (raw: string): Project => {
  const p = JSON.parse(raw) as Project
  if (p.version !== 1 || !Array.isArray(p.objects) || typeof p.name !== 'string') throw new Error('This file is not a supported Skyblock Planner project (version 1).')
  for (const o of p.objects) if (!o.id || !['platform', 'module', 'pathway'].includes(o.kind) || !Number.isInteger(o.x) || !Number.isInteger(o.z) || !Number.isInteger(o.w) || !Number.isInteger(o.h) || o.w < 1 || o.h < 1) throw new Error('The project contains an invalid object or non-integer block dimensions.')
  return { ...p, grid: [1, 2, 4, 8, 16].includes(p.grid) ? p.grid : 1, showGrid: p.showGrid !== false, showChunks: p.showChunks !== false }
}
export const moveWithChildren = (objects: PlanObject[], rootId: string, dx: number, dz: number) => {
  const root = objects.find(o => o.id === rootId)
  if (!root) return objects
  const ids = new Set([root.id, ...(root.groupId ? objects.filter(o => o.groupId === root.groupId).map(o => o.id) : []), ...(root.kind === 'platform' ? objects.filter(o => o.parentId === root.id).map(o => o.id) : [])])
  return objects.map(o => ids.has(o.id) && !o.locked ? { ...o, x: o.x + dx, z: o.z + dz } : o)
}
