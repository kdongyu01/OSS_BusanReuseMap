import { describe, expect, it } from 'vitest'
import { projectName, projectStatus } from './app'

describe('project configuration', () => {
  it('exposes the MVP project name and initial status', () => {
    expect(projectName).toContain('잔여자재')
    expect(projectStatus).toContain('개발 환경')
  })
})
