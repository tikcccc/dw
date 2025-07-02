// BIM查看器组件
import React from 'react';
import { History, Plus, Target } from 'lucide-react';
import { Component, ModelVersion, BindingCart } from '../../types';

interface BIMViewerProps {
  components: Component[];
  modelVersions: ModelVersion[];
  selectedModelVersion: string;
  onModelVersionChange: (version: string) => void;
  viewMode: string;
  finalHighlightSet: string[];
  filterHighlightSet: string[];
  manualHighlightSet: string[];
  hoveredObjects: string[];
  bindingCart: BindingCart;
  isBindingMode: boolean;
  hasHydCodeFilter: boolean;
  onComponentClick: (component: Component) => void;
  onAddAllHighlightedToCart?: () => void;
  selectedRISC?: string | null;
  selectedFile?: number | null;
  hoveredItem?: any;
  hoveredItemType?: string | null;
  files?: any[];
}

export const BIMViewer: React.FC<BIMViewerProps> = ({
  components,
  modelVersions,
  selectedModelVersion,
  onModelVersionChange,
  viewMode,
  finalHighlightSet,
  filterHighlightSet,
  manualHighlightSet,
  hoveredObjects,
  bindingCart,
  isBindingMode,
  hasHydCodeFilter,
  onComponentClick,
  onAddAllHighlightedToCart,
  selectedRISC,
  selectedFile,
  hoveredItem,
  hoveredItemType,
  files = []
}) => {
  const getComponentColorClasses = (component: Component) => {
    const isInFinalSet = finalHighlightSet.includes(component.id);
    const isHovered = hoveredObjects.includes(component.id);
    const isInCart = bindingCart.objects.find(o => o.id === component.id);
    const isInHydCodeFilter = hasHydCodeFilter && filterHighlightSet.includes(component.id);
    
    let colorClass = '';
    let borderClass = '';
    let scaleClass = '';
    
    // 1. 悬浮高光 - 最高优先级
    if (isHovered) {
      // 绑定模式下，悬浮统一显示黄色
      if (isBindingMode) {
        colorClass = 'bg-yellow-400 text-gray-800 shadow-md';
        borderClass = 'border-yellow-500';
        scaleClass = 'transform scale-102';
      }
      // 非绑定模式的原有逻辑
      else {
        // 当视图中无任何持续高亮时：悬浮显示蓝色临时高亮
        if (finalHighlightSet.length === 0 && !isInCart) {
          colorClass = 'bg-blue-400 text-white shadow-md';
          borderClass = 'border-blue-500';
          scaleClass = 'transform scale-102';
        }
        // 当视图中存在任何持续高亮时：悬浮显示黄色临时高亮，覆盖蓝色
        else {
          colorClass = 'bg-yellow-400 text-gray-800 shadow-md';
          borderClass = 'border-yellow-500';
          scaleClass = 'transform scale-102';
        }
      }
    }
    // 2. 蓝色持续高光 - 第二优先级（手动选择的构件或绑定购物车中的构件）
    else if (isInFinalSet || isInCart) {
      colorClass = 'bg-blue-500 text-white shadow-lg';
      borderClass = 'border-blue-600';
      scaleClass = 'transform scale-105';
    }
    // 3. HyD Code筛选的黄色高光 - 第三优先级（仅当未被手动选择时显示）
    else if (isInHydCodeFilter) {
      colorClass = 'bg-yellow-200 text-gray-800 shadow-md';
      borderClass = 'border-yellow-300';
      scaleClass = 'transform scale-103';
    }
    // 4. 默认状态 - 最低优先级
    else {
      colorClass = 'bg-white bg-opacity-90 text-gray-700 hover:bg-opacity-100';
      borderClass = 'border-gray-300 hover:border-gray-400';
      scaleClass = '';
    }
    
    return { colorClass, borderClass, scaleClass };
  };

  if (components.length === 0) {
    return (
      <div className="flex-1 bg-gray-100 relative">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="text-center w-full max-w-6xl">
            <div className="text-gray-500">
              <div className="text-lg mb-2">无可显示的BIM构件</div>
              <div className="text-sm">请调整筛选条件或选择其他模型版本</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-100 relative">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="text-center w-full max-w-6xl">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            {/* 模型版本选择器 */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-700">BIM 模型视图</h3>
              <select 
                value={selectedModelVersion}
                onChange={(e) => onModelVersionChange(e.target.value)}
                className="border rounded px-3 py-1 text-sm"
                title="选择模型版本"
              >
                {modelVersions.map(version => (
                  <option key={version.value} value={version.value}>
                    {version.label} - {version.date}
                  </option>
                ))}
              </select>
            </div>
            
            <div className={`w-full h-96 relative ${
              viewMode === 'current' 
                ? 'bg-gradient-to-br from-yellow-200 to-orange-300' 
                : 'bg-gradient-to-br from-orange-300 to-red-400'
            } rounded-lg mb-4 flex flex-col items-center justify-start p-4 overflow-y-auto`}>
              <div className="text-center w-full">
                <div className="text-lg font-medium text-gray-700 mb-4 flex items-center justify-center">
                  {viewMode === 'current' ? '当前版本' : '历史版本'}
                  {viewMode === 'historical' && (
                    <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-800 rounded-full text-xs flex items-center">
                      <History className="w-3 h-3 mr-1" />
                      {selectedModelVersion}
                    </span>
                  )}
                </div>
                
                {/* 绑定模式下的批量添加按钮 */}
                {isBindingMode && finalHighlightSet.length > 0 && onAddAllHighlightedToCart && (
                  <div className="mb-4 flex justify-center">
                    <button
                      onClick={onAddAllHighlightedToCart}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center font-medium shadow-md transition-all"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      添加所有高亮构件到绑定 ({finalHighlightSet.length})
                    </button>
                  </div>
                )}

                {/* 构件网格显示 */}
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-4 w-full">
                  {components.map(component => {
                    const { colorClass, borderClass, scaleClass } = getComponentColorClasses(component);
                    
                    return (
                      <div 
                        key={component.id}
                        className={`p-3 rounded-lg cursor-pointer transition-all relative border-2 ${colorClass} ${borderClass} ${scaleClass}`}
                        onClick={() => onComponentClick(component)}
                        title={`${component.name} (${component.objectGroup})`}
                      >
                        <div className="text-xs font-medium truncate flex items-center justify-between mb-1">
                          <span className="truncate">{component.name}</span>
                          {component.version !== 'current' && !hoveredObjects.includes(component.id) && !finalHighlightSet.includes(component.id) && !bindingCart.objects.find(o => o.id === component.id) && (
                            <History className="w-3 h-3 text-orange-600 flex-shrink-0 ml-1" />
                          )}
                        </div>
                        <div className="text-xs opacity-75 truncate">{component.objectGroup}</div>
                        <div className="text-xs opacity-60">v: {component.version}</div>
                        
                        {/* 状态指示器 */}
                        <div className="absolute top-1 right-1 flex space-x-1">
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="text-xs text-gray-600">
                  显示 {components.length} 个构件
                  {hasHydCodeFilter && (
                    <span className="ml-2 text-blue-600">
                      (HyD Code筛选: {filterHighlightSet.length} 个)
                    </span>
                  )}
                  {manualHighlightSet.length > 0 && (
                    <span className="ml-2 text-purple-600">
                      (手动选择: {manualHighlightSet.length} 个)
                    </span>
                  )}
                </div>
                
                {finalHighlightSet.length > 0 && (
                  <div className="text-xs text-blue-600 mt-2 font-medium">
                    最终高亮集: {finalHighlightSet.length} 个构件
                  </div>
                )}
                {hoveredObjects.length > 0 && (
                  <div className={`text-xs mt-2 font-medium ${
                    isBindingMode 
                      ? 'text-yellow-600'
                      : (finalHighlightSet.length === 0 && !bindingCart.objects.some(obj => hoveredObjects.includes(obj.id))
                          ? 'text-blue-600' 
                          : 'text-yellow-600')
                  }`}>
                    悬浮预览: {hoveredObjects.length} 个构件 {
                      isBindingMode 
                        ? '(黄色)' 
                        : (finalHighlightSet.length === 0 && !bindingCart.objects.some(obj => hoveredObjects.includes(obj.id))
                            ? '(蓝色)' 
                            : '(黄色覆盖)')
                    }
                  </div>
                )}
              </div>
            </div>
            
            {selectedRISC && (
              <div className="text-xs text-blue-600 border-t pt-2">
                关联RISC: {selectedRISC}
              </div>
            )}
            {selectedFile && (
              <div className="text-xs text-green-600 border-t pt-2">
                关联文件: {files.find(f => f.id === selectedFile)?.name.substring(0, 30)}...
              </div>
            )}
            
            {hoveredItem && (
              <div className="text-xs text-yellow-600 border-t pt-2">
                悬浮预览: {hoveredItemType === 'risc' ? hoveredItem.requestNo : hoveredItem.name?.substring(0, 30) + '...'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 绑定模式状态 */}
      {isBindingMode && (
        <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
          <div className="bg-blue-100 border border-blue-300 px-3 py-2 rounded-lg text-sm max-w-xs">
            <div className="font-medium text-blue-800 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              绑定模式已激活
            </div>
            <div className="text-xs text-blue-600 mt-1">
              • 文件已选择（1个文件 ↔ 多个构件）
            </div>
            <div className="text-xs text-blue-600">
              • 通过筛选或手动选择构件进行高亮
            </div>
            <div className="text-xs text-blue-600">
              • 点击"添加所有高亮构件"批量添加
            </div>
            {bindingCart.hasHistoricalObjects && (
              <div className="mt-1 text-xs text-orange-600 flex items-center">
                <History className="w-3 h-3 mr-1" />
                包含历史版本构件
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 