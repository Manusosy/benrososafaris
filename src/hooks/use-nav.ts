'use client';

import { hasMinimumRole, isSuperAdmin, type PortalRole } from '@/lib/auth/roles';
import type { NavGroup, NavItem } from '@/types';

import { usePortalRole } from './portal-role-provider';

function canAccessItem(item: NavItem, role: PortalRole | null): boolean {
  if (!item.access) return true;
  if (!role) return false;

  if (item.access.superAdminOnly) {
    return isSuperAdmin(role);
  }

  if (item.access.minRole) {
    return hasMinimumRole(role, item.access.minRole);
  }

  return true;
}

function filterNavItems(items: NavItem[], role: PortalRole | null): NavItem[] {
  return items
    .filter((item) => canAccessItem(item, role))
    .map((item) => ({
      ...item,
      items: item.items?.length ? filterNavItems(item.items, role) : item.items
    }));
}

export function useFilteredNavItems(items: NavItem[]) {
  const role = usePortalRole();
  return filterNavItems(items, role);
}

export function useFilteredNavGroups(groups: NavGroup[]) {
  const role = usePortalRole();
  return groups
    .map((group) => ({
      ...group,
      items: filterNavItems(group.items, role)
    }))
    .filter((group) => group.items.length > 0);
}

export { PortalRoleProvider, usePortalRole } from './portal-role-provider';
