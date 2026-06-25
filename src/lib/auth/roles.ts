export const PORTAL_ROLES = ['viewer', 'sales', 'editor', 'admin', 'owner'] as const;

export type PortalRole = (typeof PORTAL_ROLES)[number];

const ROLE_RANK: Record<PortalRole, number> = {
  viewer: 0,
  sales: 1,
  editor: 2,
  admin: 3,
  owner: 4
};

export function isPortalRole(value: string | null | undefined): value is PortalRole {
  return !!value && PORTAL_ROLES.includes(value as PortalRole);
}

export function hasMinimumRole(userRole: PortalRole, required: PortalRole): boolean {
  return ROLE_RANK[userRole] >= ROLE_RANK[required];
}

export function isSuperAdmin(role: PortalRole): boolean {
  return role === 'admin' || role === 'owner';
}

export function roleLabel(role: PortalRole): string {
  if (role === 'admin' || role === 'owner') return 'Super Admin';
  if (role === 'editor') return 'Editor';
  if (role === 'sales') return 'Sales';
  return 'Viewer';
}
