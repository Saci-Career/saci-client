import { get } from '@/services/http'
import { getRoles } from './getters'
import type { Role } from '@/domain/Role'
import { roles } from './state'

function setRoles(newRoles: Role[]): void {
  roles.value = newRoles
}

async function fetchRoles(): Promise<void> {
  if (getRoles?.value?.length > 0) {
    return
  }

  const fetchedRoles = await get<Role[]>('/roles')

  setRoles(fetchedRoles)
}

export { fetchRoles }
