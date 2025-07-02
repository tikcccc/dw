// 类型定义文件

export interface HydCode {
  project: string;
  originator: string;
  volume: string;
  system: string;
  location: string;
  discipline: string;
  sequential_number: string;
}

export interface Component {
  id: string;
  name: string;
  version: string;
  modelVersionId: string; // Model version ID the component belongs to
  objectGroup: string;
  hydCode: HydCode;
  properties: {
    position: string;
    material: string;
    volume?: string;
    height?: string;
    length?: string;
    status: string;
  };
}

export interface ObjectGroup {
  id: string;
  name: string;
  version: string;
  modelVersionId: string; // Model version ID the object group belongs to
  components: string[];
  hydCode: HydCode;
  properties: {
    position: string;
    material: string;
    totalVolume?: string;
    totalHeight?: string;
    totalLength?: string;
    status: string;
  };
}

export interface RiscForm {
  id: string;
  requestNo: string;
  updateDate: string;
  status: string;
  bindingStatus: 'history' | 'current';
  linkedToCurrent: boolean;
  objects: string[]; // Component ID list
  boundModelVersionId?: string; // Model version ID when bound
  createdBy: string;
  hydCode: HydCode;
  changes?: string[];
}

export interface FileItem {
  id: number;
  name: string;
  uploadDate: string;
  updateDate: string;
  type: string;
  bindingStatus: 'history' | 'current';
  uploadedBy: string;
  linkedToCurrent: boolean;
  objects: string[]; // Component ID list
  boundModelVersionId?: string; // Model version ID when bound
  hydCode: HydCode;
  changes?: string[];
  version?: number;
}

export interface CompareData {
  item: RiscForm | FileItem;
  type: string;
  currentVersion: string;
  targetVersion: string;
}

export interface ModelVersion {
  value: string;
  label: string;
  date: string;
}

export interface ActivityLog {
  id: number;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  target: string;
  targetDetail: string;
  details: string;
  ip: string;
}

export interface BindingCart {
  files: FileItem[];
  objects: Component[];
  hasHistoricalObjects: boolean;
}

export interface HistoricalComponentInfo {
  componentId: string;
  currentVersionId: string;
  historicalVersionId: string;
  fileInfo: FileItem | RiscForm;
  fileType: 'file' | 'risc';
  changes: string[];
}

export interface FloatingPanel {
  visible: boolean;
  componentInfo: HistoricalComponentInfo | null;
  isHistoricalView: boolean; // Whether currently in historical view mode
}

export interface RiscFilters {
  status: string;
  startDate: string;
  endDate: string;
  searchText: string;
  showCurrentModelBinding?: boolean;
}

export interface FileFilters {
  type: string;
  startDate: string;
  endDate: string;
  searchText: string;
  showMyFiles: boolean;
  showCurrentModelBinding?: boolean;
}

export interface LogFilters {
  user: string;
  role: string;
  startDate: string;
  endDate: string;
  searchText: string;
}

export interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  componentId: string | null;
  isFromTree?: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  lastLogin: string;
}

export enum UserRole {
  ADMINISTRATOR = 'Administrator',
  AUTHORIZED_USER = 'Authorized User', 
  VIEW_ONLY_USER = 'View-only User'
}

export interface AddFileToSelectedState {
  isEnabled: boolean;
  reason?: string;
  componentCount: number;
} 