// 模拟数据
import { ModelVersion, Component, RiscForm, FileItem, ActivityLog, User, UserRole } from '../types';

// HyD Code 选项
export const hydCodeOptions = {
  project: ['HY202404', 'HY202405'],
  contractor: ['CSG', 'AECOM', 'HKJV'],
  location: ['SITE-A', 'SITE-B', 'SITE-C'],
  structure: ['FOUNDATION', 'FRAME', 'ROOF', 'WALL'],
  space: ['WC_B8', 'WC_B9', 'WC_C1', 'WC_C2'],
  grid: ['ST_FD', 'ST_FE', 'ST_GD', 'ST_GE'],
  cat: ['CONCRETE', 'STEEL', 'TIMBER', 'COMPOSITE']
};

// 模型版本
export const modelVersions: ModelVersion[] = [
  { value: 'current', label: 'Current Version (Latest)', date: '2025-03-08' },
  { value: 'v1.8', label: 'Version 1.8', date: '2024-12-10' }
];

// 示例构件数据
export const mockComponents: Component[] = [
  // Foundation components
  { 
    id: 'F-A-001', 
    name: 'Foundation Block A1', 
    version: 'current', 
    modelVersionId: 'current',
    objectGroup: 'OBJ-GROUP-001',
    hydCode: { project: 'HY202404', contractor: 'CSG', location: 'SITE-A', structure: 'FOUNDATION', space: 'WC_B8', grid: 'ST_FD', cat: 'CONCRETE' },
    properties: { 
      position: 'Zone A Foundation Area Block 1', 
      material: 'C40 Concrete', 
      volume: '15.2m³',
      status: 'current'
    }
  },
  { 
    id: 'F-A-002', 
    name: 'Foundation Block A2', 
    version: 'current', 
    modelVersionId: 'current',
    objectGroup: 'OBJ-GROUP-001',
    hydCode: { project: 'HY202404', contractor: 'CSG', location: 'SITE-A', structure: 'FOUNDATION', space: 'WC_B8', grid: 'ST_FD', cat: 'CONCRETE' },
    properties: { 
      position: 'Zone A Foundation Area Block 2', 
      material: 'C40 Concrete', 
      volume: '15.2m³',
      status: 'current'
    }
  },
  { 
    id: 'F-A-003', 
    name: 'Foundation Block A3', 
    version: 'current', 
    modelVersionId: 'current',
    objectGroup: 'OBJ-GROUP-001',
    hydCode: { project: 'HY202404', contractor: 'CSG', location: 'SITE-A', structure: 'FOUNDATION', space: 'WC_B8', grid: 'ST_FD', cat: 'CONCRETE' },
    properties: { 
      position: 'Zone A Foundation Area Block 3', 
      material: 'C40 Concrete', 
      volume: '15.2m³',
      status: 'current'
    }
  },
  // 历史版本构件
  { 
    id: 'F-A-001', // 与当前构件ID相同
    name: 'Foundation Block A1 (Historical)', 
    version: 'v1.8', 
    modelVersionId: 'v1.8', // 历史版本ID
    objectGroup: 'OBJ-GROUP-001',
    hydCode: { project: 'HY202404', contractor: 'CSG', location: 'SITE-A', structure: 'FOUNDATION', space: 'WC_B8', grid: 'ST_FD', cat: 'CONCRETE' },
    properties: { 
      position: 'Zone A Foundation Area Block 1 (Historical)', 
      material: 'C35 Concrete', 
      volume: '19.1m³',
      status: 'history'
    }
  }
];

// 示例RISC表单数据
export const mockRiscForms: RiscForm[] = [
  { 
    id: 'TRN0001-RISC-TRC-B-5-00002', 
    requestNo: 'TRN0001-RISC-TRC-B-5-00002', 
    updateDate: '2025-03-08', 
    status: 'Approved', 
    bindingStatus: 'current', 
    linkedToCurrent: true, 
    objects: ['F-A-001', 'F-A-002'], 
    createdBy: 'John Doe',
    hydCode: { project: 'HY202404', contractor: 'CSG', location: 'SITE-A', structure: 'FOUNDATION', space: 'WC_B8', grid: 'ST_FD', cat: 'CONCRETE' },
    boundModelVersionId: 'current'
  },
  { 
    id: 'RN0001-RISC-TRC-CS-02001', 
    requestNo: 'RN0001-RISC-TRC-CS-02001', 
    updateDate: '2025-02-20', 
    status: 'Submitted', 
    bindingStatus: 'history', 
    linkedToCurrent: true,
    objects: ['F-A-002'],
    createdBy: 'Mike Johnson', 
    changes: ['Component position adjusted', 'Material parameters updated'],
    hydCode: { project: 'HY202404', contractor: 'CSG', location: 'SITE-A', structure: 'FOUNDATION', space: 'WC_B8', grid: 'ST_FD', cat: 'CONCRETE' },
    boundModelVersionId: 'v1.8'
  }
];

// 示例文件数据
export const mockFiles: FileItem[] = [
  { 
    id: 1, 
    name: '0479 Method Statement_MS073 for Construction of Footing of Walkway Covers at Rock Hill Street.pdf', 
    uploadDate: '2024-11-08', 
    updateDate: '2024-12-15', 
    type: 'Method Statement', 
    bindingStatus: 'current', 
    uploadedBy: 'John Doe', 
    linkedToCurrent: true, 
    objects: ['F-A-001', 'F-A-002'],
    hydCode: { project: 'HY202404', contractor: 'CSG', location: 'SITE-A', structure: 'FOUNDATION', space: 'WC_B8', grid: 'ST_FD', cat: 'CONCRETE' },
    boundModelVersionId: 'current'
  },
  { 
    id: 4, 
    name: '0521 Historical Working Drawing v1.pdf', 
    uploadDate: '2024-08-20', 
    updateDate: '2024-08-25', 
    type: 'Working Drawings', 
    bindingStatus: 'history', 
    uploadedBy: 'Sarah Wilson', 
    linkedToCurrent: true,
    objects: ['F-A-001'],
    changes: ['Component position adjusted', 'Geometric shape optimized'],
    hydCode: { project: 'HY202404', contractor: 'CSG', location: 'SITE-A', structure: 'FOUNDATION', space: 'WC_B8', grid: 'ST_FD', cat: 'CONCRETE' },
    boundModelVersionId: 'v1.8'
  }
];

// 示例活动日志数据
export const mockActivityLogs: ActivityLog[] = [
  { 
    id: 1, 
    timestamp: '2025-03-08 14:30:15', 
    user: 'Administrator', 
    role: 'Admin', 
    action: 'FILE_BIND_SUBMIT', 
    target: 'File', 
    targetDetail: 'Construction Drawing.pdf', 
    details: 'Associated file "Construction Drawing.pdf" with components "OBJ-GROUP-001, OBJ-GROUP-002"', 
    ip: '192.168.1.100' 
  },
  { 
    id: 2, 
    timestamp: '2025-03-08 13:15:22', 
    user: 'John Doe', 
    role: 'Authorized User', 
    action: 'RISC_CREATE_REQUEST', 
    target: 'RISC Form', 
    targetDetail: 'TRN0001-RISC-TRC-B-5-00003', 
    details: 'Created new RISC form "TRN0001-RISC-TRC-B-5-00003"', 
    ip: '192.168.1.101' 
  }
];

// 示例用户数据
export const mockUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: UserRole.AUTHORIZED_USER, lastLogin: '2025-03-08 09:15' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: UserRole.AUTHORIZED_USER, lastLogin: '2025-03-08 08:30' },
  { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', role: UserRole.VIEW_ONLY_USER, lastLogin: '2025-03-07 16:45' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah.wilson@example.com', role: UserRole.AUTHORIZED_USER, lastLogin: '2025-03-05 14:20' },
  { id: 5, name: 'Tom Chen', email: 'tom.chen@example.com', role: UserRole.ADMINISTRATOR, lastLogin: '2025-03-08 10:00' }
]; 