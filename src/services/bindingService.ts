// 绑定管理服务
import { Component, FileItem, BindingCart } from '../types';

export class BindingService {
  // 添加文件到绑定购物车
  static addToBindingCart(
    item: FileItem,
    type: string,
    bindingCart: BindingCart,
    setBindingCart: (cart: BindingCart) => void,
    currentUser: string
  ): void {
    // 检查是否已存在
    const existingFile = bindingCart.files.find(f => f.id === item.id);
    if (existingFile) {
      alert('该文件已在绑定购物车中');
      return;
    }

    // 检查权限
    if (item.uploadedBy !== currentUser && currentUser !== 'Administrator') {
      const confirmMessage = `您正在绑定其他用户上传的文件："${item.name}"\n上传者：${item.uploadedBy}\n\n是否继续？`;
      if (!confirm(confirmMessage)) {
        return;
      }
    }

    // 检查绑定状态
    const isHistoricalBinding = item.bindingStatus === 'history';
    if (isHistoricalBinding) {
      const confirmMessage = `您正在绑定历史版本的文件：\n"${item.name}"\n\n此绑定将被标记为历史绑定。是否继续？`;
      if (!confirm(confirmMessage)) {
        return;
      }
    }

    // 添加到购物车
    const updatedCart = {
      ...bindingCart,
      files: [...bindingCart.files, item],
      hasHistoricalObjects: bindingCart.hasHistoricalObjects || isHistoricalBinding
    };

    setBindingCart(updatedCart);
    alert(`文件 "${item.name}" 已添加到绑定购物车`);
  }

  // 添加构件到购物车
  static addObjectToCart(
    obj: Component,
    bindingCart: BindingCart,
    setBindingCart: (cart: BindingCart) => void
  ): void {
    // 检查是否已存在
    const existingObj = bindingCart.objects.find(existing => existing.id === obj.id);
    if (existingObj) {
      alert('该构件已在绑定购物车中');
      return;
    }

    // 检查版本一致性
    if (bindingCart.objects.length > 0) {
      const cartVersion = bindingCart.objects[0].version;
      if (obj.version !== cartVersion) {
        const confirmMessage = `构件版本不一致：\n购物车版本: ${cartVersion}\n当前构件版本: ${obj.version}\n\n是否清空购物车并添加当前构件？`;
        if (confirm(confirmMessage)) {
          const updatedCart = {
            ...bindingCart,
            objects: [obj],
            hasHistoricalObjects: obj.version !== 'current'
          };
          setBindingCart(updatedCart);
          alert(`购物车已清空，构件 "${obj.name}" 已添加`);
        }
        return;
      }
    }

    // 添加到购物车
    const updatedObjects = [...bindingCart.objects, obj];
    const hasHistoricalObjects = updatedObjects.some(o => o.version !== 'current');

    const updatedCart = {
      ...bindingCart,
      objects: updatedObjects,
      hasHistoricalObjects
    };

    setBindingCart(updatedCart);
    alert(`构件 "${obj.name}" 已添加到绑定购物车`);
  }

  // 从绑定购物车移除
  static removeFromBindingCart(
    item: FileItem | Component,
    type: string,
    bindingCart: BindingCart,
    setBindingCart: (cart: BindingCart) => void
  ): void {
    if (type === 'file') {
      const fileItem = item as FileItem;
      const updatedFiles = bindingCart.files.filter(f => f.id !== fileItem.id);
      const updatedCart = {
        ...bindingCart,
        files: updatedFiles
      };
      setBindingCart(updatedCart);
    } else {
      const objItem = item as Component;
      const updatedObjects = bindingCart.objects.filter(o => o.id !== objItem.id);
      const hasHistoricalObjects = updatedObjects.some(o => o.version !== 'current');
      
      const updatedCart = {
        ...bindingCart,
        objects: updatedObjects,
        hasHistoricalObjects
      };
      setBindingCart(updatedCart);
    }
  }

  // 编辑现有绑定
  static editExistingBinding(
    file: FileItem,
    setBindingCart: (cart: BindingCart) => void,
    setIsBindingMode: (mode: boolean) => void,
    components: Component[]
  ): void {
    // 获取已绑定的构件
    const boundObjects = components.filter(comp => file.objects.includes(comp.id));
    
    const newCart: BindingCart = {
      files: [file],
      objects: boundObjects,
      hasHistoricalObjects: boundObjects.some(obj => obj.version !== 'current') || file.bindingStatus === 'history'
    };

    setBindingCart(newCart);
    setIsBindingMode(true);
    
    alert(`正在编辑文件 "${file.name}" 的绑定关系`);
  }

  // 退出绑定模式
  static exitBindingMode(
    setIsBindingMode: (mode: boolean) => void,
    setBindingCart: (cart: BindingCart) => void,
    setShowBindingCart: (show: boolean) => void
  ): void {
    setIsBindingMode(false);
    setBindingCart({ files: [], objects: [], hasHistoricalObjects: false });
    setShowBindingCart(false);
  }

  // 提交绑定
  static submitBinding(
    bindingCart: BindingCart,
    currentUser: string,
    files: FileItem[],
    setFiles: (files: FileItem[]) => void,
    setIsBindingMode: (mode: boolean) => void,
    setBindingCart: (cart: BindingCart) => void,
    setShowBindingCart: (show: boolean) => void
  ): void {
    if (bindingCart.files.length === 0 || bindingCart.objects.length === 0) {
      alert('请选择至少一个文件和一个构件进行绑定');
      return;
    }

    // 检查版本一致性
    const objectVersions = [...new Set(bindingCart.objects.map(obj => obj.version))];
    if (objectVersions.length > 1) {
      alert('所选构件版本不一致，无法进行绑定');
      return;
    }

    const timestamp = new Date().toISOString().split('T')[0];
    
    // 更新文件的绑定信息
    const updatedFiles = files.map(file => {
      const cartFile = bindingCart.files.find(f => f.id === file.id);
      if (cartFile) {
        return {
          ...file,
          objects: bindingCart.objects.map(obj => obj.id),
          updateDate: timestamp,
          bindingStatus: bindingCart.hasHistoricalObjects ? 'history' as const : 'current' as const,
          linkedToCurrent: !bindingCart.hasHistoricalObjects,
          changes: [
            ...(file.changes || []),
            `${currentUser} 在 ${timestamp} 更新了绑定关系`
          ]
        };
      }
      return file;
    });

    setFiles(updatedFiles);

    // 生成绑定报告
    const bindingReport = {
      timestamp,
      user: currentUser,
      files: bindingCart.files.map(f => f.name),
      objects: bindingCart.objects.map(o => o.name),
      version: objectVersions[0],
      isHistorical: bindingCart.hasHistoricalObjects
    };

    console.log('绑定操作完成:', bindingReport);

    // 显示成功消息
    const successMessage = `绑定操作完成！\n\n文件: ${bindingCart.files.map(f => f.name).join(', ')}\n构件: ${bindingCart.objects.map(o => o.name).join(', ')}\n版本: ${objectVersions[0]}\n${bindingCart.hasHistoricalObjects ? '类型: 历史绑定' : '类型: 当前绑定'}`;
    alert(successMessage);

    // 清理状态
    this.exitBindingMode(setIsBindingMode, setBindingCart, setShowBindingCart);
  }

  // 添加所有高亮构件到购物车
  static addAllHighlightedToCart(
    finalHighlightSet: string[],
    components: Component[],
    selectedModelVersion: string,
    bindingCart: BindingCart,
    setBindingCart: (cart: BindingCart) => void,
    isBindingMode: boolean
  ): boolean {
    if (!isBindingMode) return false;
    
    if (finalHighlightSet.length === 0) {
      alert('没有高亮的构件可以添加。请先选择或筛选构件。');
      return false;
    }

    // 获取所有高亮的构件对象
    const highlightedComponents = components.filter(comp => 
      finalHighlightSet.includes(comp.id) && 
      (selectedModelVersion === 'current' ? comp.version === 'current' : 
       comp.version === selectedModelVersion || comp.version === 'v1.8')
    );

    if (highlightedComponents.length === 0) {
      alert('高亮的构件在当前模型版本中不可用。');
      return false;
    }

    // 检查版本一致性
    const versions = [...new Set(highlightedComponents.map(comp => comp.version))];
    if (versions.length > 1) {
      const confirmMessage = `检测到高亮构件包含多个版本：${versions.join(', ')}\n\n绑定的构件必须属于同一版本。是否只添加版本为"${versions[0]}"的构件？`;
      if (confirm(confirmMessage)) {
        const sameVersionComponents = highlightedComponents.filter(comp => comp.version === versions[0]);
        return this.addMultipleComponentsToCart(sameVersionComponents, bindingCart, setBindingCart);
      }
      return false;
    }

    // 检查与购物车中现有构件的版本一致性
    if (bindingCart.objects.length > 0) {
      const cartVersion = bindingCart.objects[0].version;
      if (versions[0] !== cartVersion) {
        const confirmMessage = `购物车中已有版本为"${cartVersion}"的构件。\n高亮构件版本为"${versions[0]}"。\n\n是否清空购物车并添加高亮构件？`;
        if (confirm(confirmMessage)) {
          setBindingCart({
            ...bindingCart,
            objects: highlightedComponents,
            hasHistoricalObjects: highlightedComponents.some(comp => comp.version !== 'current')
          });
          alert(`成功添加 ${highlightedComponents.length} 个构件到绑定购物车`);
          return true;
        }
        return false;
      }
    }

    // 直接添加到购物车
    return this.addMultipleComponentsToCart(highlightedComponents, bindingCart, setBindingCart);
  }

  // 批量添加构件到购物车的辅助函数
  static addMultipleComponentsToCart(
    componentsToAdd: Component[],
    bindingCart: BindingCart,
    setBindingCart: (cart: BindingCart) => void
  ): boolean {
    const existingIds = new Set(bindingCart.objects.map(obj => obj.id));
    const newComponents = componentsToAdd.filter(comp => !existingIds.has(comp.id));
    
    const updatedObjects = [...bindingCart.objects, ...newComponents];
    const hasHistoricalObjects = updatedObjects.some(obj => obj.version !== 'current');
    
    setBindingCart({
      ...bindingCart,
      objects: updatedObjects,
      hasHistoricalObjects
    });

    // 显示成功消息
    const addedCount = newComponents.length;
    
    if (addedCount > 0) {
      alert(`成功添加 ${addedCount} 个构件到绑定购物车`);
      return true;
    } else {
      alert('选中的构件已经在购物车中');
      return false;
    }
  }
} 