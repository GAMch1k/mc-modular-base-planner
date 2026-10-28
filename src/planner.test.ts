import { describe, expect, it } from 'vitest'
import { moveWithChildren, readProject, snap, type PlanObject } from './planner'

const platform: PlanObject = { id: 'p', kind: 'platform', name: 'Platform', x: -16, z: 0, w: 16, h: 16, color: '#fff', category: '', notes: '' }
const module: PlanObject = { id: 'm', kind: 'module', name: 'Module', x: -12, z: 2, w: 4, h: 4, color: '#fff', category: '', notes: '', parentId: 'p' }
const project = { version: 1 as const, name: 'Test', grid: 1, showGrid: true, showChunks: false, objects: [platform, module] }

describe('block planner coordinates', () => {
  it('snaps positive and negative positions to the configured block interval', () => {
    expect(snap(7, 4)).toBe(8)
    expect(snap(-7, 4)).toBe(-8)
    expect(snap(11, 1)).toBe(11)
  })
  it('moves a platform with its modules while preserving exact relative offsets', () => {
    const moved = moveWithChildren([platform, module], 'p', 8, -4)
    expect(moved[0]).toMatchObject({ x: -8, z: -4 })
    expect(moved[1]).toMatchObject({ x: -4, z: -2 })
    expect(moved[1].x - moved[0].x).toBe(4)
  })
  it('round-trips the versioned JSON project and rejects fractional coordinates', () => {
    expect(readProject(JSON.stringify(project))).toEqual(project)
    expect(() => readProject(JSON.stringify({ ...project, objects: [{ ...platform, x: 1.5 }] }))).toThrow(/non-integer/)
  })
})
