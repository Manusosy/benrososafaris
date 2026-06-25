async function bootstrapPortalProfile() {
  const response = await fetch('/api/portal/bootstrap-profile', {
    method: 'POST',
    credentials: 'include'
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? 'Could not finish setting up your account.');
  }
}

export { bootstrapPortalProfile };
