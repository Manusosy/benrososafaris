export interface PortalModuleStat {
  key: string;
  label: string;
  total: number;
  published: number;
  draft: number;
  href: string;
}

export interface PortalOverviewStats {
  modules: PortalModuleStat[];
  newEnquiries: number;
  totalEnquiries: number;
}

export interface PortalContentRow {
  id: string;
  title: string;
  status: string;
  locale: string;
  updatedAt: string;
}

export interface PortalContentList {
  rows: PortalContentRow[];
  total: number;
}
