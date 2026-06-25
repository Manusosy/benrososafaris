'use client';

import { createContext, useContext } from 'react';

import type { PortalRole } from '@/lib/auth/roles';

const PortalRoleContext = createContext<PortalRole | null>(null);

export function PortalRoleProvider({
  role,
  children
}: {
  role: PortalRole;
  children: React.ReactNode;
}) {
  return <PortalRoleContext value={role}>{children}</PortalRoleContext>;
}

export function usePortalRole(): PortalRole | null {
  return useContext(PortalRoleContext);
}
