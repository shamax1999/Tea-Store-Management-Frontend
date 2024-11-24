export interface Report {
  reportId?: number;
  reportType: 'Sales' | 'Production' | 'Inventory';
  pdfSrc?: string;
  pdfFile?: Blob;
  date: string;
  reportName: string;
  adminId: number;
  managerId: number;
}
