// 事件处理服务
import { Component, RiscForm, FileItem, BindingCart, HydCode } from '../types';
import { BindingService } from './bindingService';
import { HydCodeValidator, BatchValidationResult } from './hydCodeValidator';

export class EventHandlers {
  // HyD Code筛选变更处理
  static handleHydCodeChange(
    level: keyof HydCode,
    value: string,
    hydCodeFilter: HydCode,
    setHydCodeFilter: (filter: HydCode) => void,
    setFilterHighlightSet: (set: string[]) => void
  ): void {
    const newFilter = { ...hydCodeFilter, [level]: value };
    setHydCodeFilter(newFilter);

    // Clear filter highlight set since filtering now happens at component level
    setFilterHighlightSet([]);
  }

  // RISC筛选变更处理
  static handleRiscFilterChange(
    field: string,
    value: string,
    riscFilters: any,
    setRiscFilters: (filters: any) => void
  ): void {
    setRiscFilters({ ...riscFilters, [field]: value });
  }

  // 文件筛选变更处理
  static handleFileFilterChange(
    field: string,
    value: string | boolean,
    fileFilters: any,
    setFileFilters: (filters: any) => void
  ): void {
    setFileFilters({ ...fileFilters, [field]: value });
  }

  // 列表项悬浮处理
  static handleItemHover(
    item: RiscForm | FileItem | any,
    type: string,
    setHoveredObjects: (objects: string[]) => void,
    setHoveredItem: (item: any) => void,
    setHoveredItemType: (type: string | null) => void
  ): void {
    if (item?.objects) {
      setHoveredObjects(item.objects);
    }
    setHoveredItem(item);
    setHoveredItemType(type);
  }

  // 列表项离开处理
  static handleItemLeave(
    setHoveredObjects: (objects: string[]) => void,
    setHoveredItem: (item: any) => void,
    setHoveredItemType: (type: string | null) => void
  ): void {
    setHoveredObjects([]);
    setHoveredItem(null);
    setHoveredItemType(null);
  }

  // 列表项点击处理
  static handleListItemClick(
    item: RiscForm | FileItem,
    type: string,
    selectedRISC: string | null,
    selectedFile: number | null,
    setSelectedRISC: (id: string | null) => void,
    setSelectedFile: (id: number | null) => void,
    setManualHighlightSet: (set: string[]) => void,
    isBindingMode: boolean,
    bindingCart: BindingCart,
    addToBindingCart: (item: FileItem, type: string) => void
  ): void {
    const isRISC = type === 'risc';
    const riscItem = item as RiscForm;
    const fileItem = item as FileItem;

    // 绑定模式下的特殊处理
    if (isBindingMode && !isRISC) {
      // 检查是否已在购物车中
      const alreadyInCart = bindingCart.files.some(f => f.id === fileItem.id);
      if (!alreadyInCart) {
        addToBindingCart(fileItem, type);
        return;
      }
    }

    if (isRISC) {
      // RISC选择逻辑
      if (selectedRISC === riscItem.id) {
        setSelectedRISC(null);
        setManualHighlightSet([]);
      } else {
        setSelectedRISC(riscItem.id);
        setSelectedFile(null);
        setManualHighlightSet(riscItem.objects || []);
      }
    } else {
      // 文件选择逻辑
      if (selectedFile === fileItem.id) {
        setSelectedFile(null);
        setManualHighlightSet([]);
      } else {
        setSelectedFile(fileItem.id);
        setSelectedRISC(null);
        setManualHighlightSet(fileItem.objects || []);
      }
    }
  }

  // 构件点击处理
  static handleComponentClick(
    component: Component,
    manualHighlightSet: string[],
    setManualHighlightSet: (set: string[]) => void,
    isBindingMode: boolean,
    bindingCart: BindingCart,
    addObjectToCart: (obj: Component) => void,
    setSelectedRISC: (id: string | null) => void,
    setSelectedFile: (id: number | null) => void
  ): void {
    if (isBindingMode) {
      const alreadyInCart = bindingCart.objects.some(obj => obj.id === component.id);
      if (!alreadyInCart) {
        addObjectToCart(component);
        return;
      }
    }

    // 切换手动高亮
    const isHighlighted = manualHighlightSet.includes(component.id);
    
    if (isHighlighted) {
      setManualHighlightSet(manualHighlightSet.filter(id => id !== component.id));
    } else {
      setManualHighlightSet([...manualHighlightSet, component.id]);
    }

    // 清除文件和RISC选择
    setSelectedRISC(null);
    setSelectedFile(null);
  }

  // 双击处理
  static handleDoubleClick(
    item: RiscForm | FileItem,
    type: string,
    setDetailItem: (item: any) => void,
    setCurrentView: (view: string) => void
  ): void {
    setDetailItem(item);
    const viewName = type === 'risc' ? 'risc-detail' : 'file-detail';
    setCurrentView(viewName);
  }

  // 模型版本变更处理
  static handleModelVersionChange(
    version: string,
    setSelectedModelVersion: (version: string) => void,
    setViewMode: (mode: string) => void,
    clearAllUserSelections: () => void
  ): void {
    setSelectedModelVersion(version);
    setViewMode(version === 'current' ? 'current' : 'historical');
    clearAllUserSelections();
  }

  // 邀请发送处理
  static handleSendInvite(
    inviteEmail: string,
    inviteRole: string,
    setShowInviteModal: (show: boolean) => void,
    setInviteEmail: (email: string) => void,
    setInviteRole: (role: string) => void
  ): void {
    if (!inviteEmail || !inviteRole) {
      alert('请填写完整的邀请信息');
      return;
    }
    
    // 模拟发送邀请
    alert(`邀请已发送给 ${inviteEmail}，角色: ${inviteRole}`);
    
    // 清空表单并关闭模态框
    setInviteEmail('');
    setInviteRole('');
    setShowInviteModal(false);
  }

  // 导航到详情页面
  static handleNavigateToDetail(
    item: any,
    type: string,
    setDetailItem: (item: any) => void,
    setCurrentView: (view: string) => void
  ): void {
    setDetailItem(item);
    const viewName = type === 'risc' ? 'risc-detail' : 'file-detail';
    setCurrentView(viewName);
  }

  // 返回仪表板
  static handleBackToDashboard(
    setCurrentView: (view: string) => void,
    setDetailItem: (item: any) => void
  ): void {
    setCurrentView('dashboard');
    setDetailItem(null);
  }

  // 右键菜单文件管理验证处理
  static handleFileManagementClick(
    selectedComponents: Component[],
    setInvalidHydHighlightSet: (set: string[]) => void,
    setShowFileManagement: (show: boolean) => void,
    setSelectedComponentsForFiles: (ids: string[]) => void
  ): boolean {
    // 使用绑定服务进行验证
    const validationResult = BindingService.validateSelectedComponentsForBinding(selectedComponents);
    
    if (!validationResult.isValid) {
      // 显示验证错误
      alert(validationResult.errorMessage);
      
      // 如果是部分无效场景，设置红色高光
      if (validationResult.partiallyInvalid) {
        const invalidIds = validationResult.invalidComponents.map(comp => comp.id);
        setInvalidHydHighlightSet(invalidIds);
      }
      
      return false; // 阻止进入文件管理
    }

    // 验证通过，进入文件管理
    setShowFileManagement(true);
    setSelectedComponentsForFiles(selectedComponents.map(comp => comp.id));
    return true;
  }

  // 红色高光构件点击处理（取消红色高光）
  static handleInvalidHydComponentClick(
    componentId: string,
    invalidHydHighlightSet: string[],
    setInvalidHydHighlightSet: (set: string[]) => void
  ): void {
    // 从红色高光集合中移除该构件
    const updatedSet = invalidHydHighlightSet.filter(id => id !== componentId);
    setInvalidHydHighlightSet(updatedSet);
  }

  // 清空红色高光集合
  static clearInvalidHydHighlights(
    setInvalidHydHighlightSet: (set: string[]) => void
  ): void {
    setInvalidHydHighlightSet([]);
  }

  // 验证并高亮显示无效构件
  static validateAndHighlightInvalidComponents(
    components: Component[],
    setInvalidHydHighlightSet: (set: string[]) => void
  ): BatchValidationResult {
    const validationResult = HydCodeValidator.validateComponentBatch(components);
    
    if (!validationResult.isValid && validationResult.partiallyInvalid) {
      // 只在部分无效的情况下设置红色高光
      const invalidIds = validationResult.invalidComponents.map(comp => comp.id);
      setInvalidHydHighlightSet(invalidIds);
    }
    
    return validationResult;
  }
} 