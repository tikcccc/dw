// 右侧文件管理面板组件
import React from 'react';
import { Plus, Search, Calendar, ChevronsLeft, ChevronsRight, FileText, Target, History } from 'lucide-react';
import { FileItem, FileFilters, BindingCart } from '../../types';

interface RightFilePanelProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  
  // 文件筛选
  fileFilters: FileFilters;
  onFileFilterChange: (field: string, value: string | boolean) => void;
  onClearFileFilters: () => void;
  
  // 文件列表
  filteredFiles: FileItem[];
  selectedFile: number | null;
  hoveredItem: any;
  onItemClick: (item: FileItem, type: string) => void;
  onItemDoubleClick: (item: FileItem, type: string) => void;
  onItemHover: (item: FileItem, type: string) => void;
  onItemLeave: () => void;
  
  // 日期选择器
  showFileDatePicker: boolean;
  onToggleFileDatePicker: () => void;
  
  // 绑定功能
  isBindingMode: boolean;
  bindingCart: BindingCart;
  onExitBindingMode: () => void;
  onEditBinding: (file: FileItem) => void;
  
  // 权限
  isViewOnlyUser: boolean;
  hasBindingPermission: boolean;
  currentUser: string;
  
  // 导航
  onNavigateToDetail: (item: FileItem, type: string) => void;
}

export const RightFilePanel: React.FC<RightFilePanelProps> = ({
  isCollapsed,
  onToggleCollapse,
  fileFilters,
  onFileFilterChange,
  onClearFileFilters,
  filteredFiles,
  selectedFile,
  hoveredItem,
  onItemClick,
  onItemDoubleClick,
  onItemHover,
  onItemLeave,
  showFileDatePicker,
  onToggleFileDatePicker,
  isBindingMode,
  bindingCart,
  onExitBindingMode,
  onEditBinding,
  isViewOnlyUser,
  hasBindingPermission,
  currentUser,
  onNavigateToDetail
}) => {
  const getFileIcon = (type: string) => {
    const iconClass = "w-5 h-5";
    switch (type) {
      case 'Method Statement':
        return <FileText className={`${iconClass} text-red-500`} />;
      case 'Material Submission':
        return <FileText className={`${iconClass} text-blue-500`} />;
      case 'Working Drawings':
        return <FileText className={`${iconClass} text-green-500`} />;
      case 'Test Result':
        return <FileText className={`${iconClass} text-purple-500`} />;
      default:
        return <FileText className={`${iconClass} text-gray-500`} />;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'Method Statement':
        return 'text-red-500';
      case 'Material Submission':
        return 'text-blue-500';
      case 'Working Drawings':
        return 'text-green-500';
      case 'Test Result':
        return 'text-purple-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className={`bg-white shadow-sm transition-all duration-300 ${isCollapsed ? 'w-12' : 'w-80'} flex flex-col`}>
      <div className="p-4 border-b flex items-center justify-between flex-shrink-0">
        {!isCollapsed && <h2 className="font-medium">文件管理</h2>}
        <button 
          onClick={onToggleCollapse}
          className="p-1 hover:bg-gray-100 rounded"
        >
          {isCollapsed ? <ChevronsLeft className="w-4 h-4" /> : <ChevronsRight className="w-4 h-4" />}
        </button>
      </div>

      {!isCollapsed && (
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {/* 文件筛选 */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium">文件列表</h3>
                <div className="flex items-center space-x-2">
                  {(fileFilters.type || fileFilters.startDate || fileFilters.endDate || fileFilters.searchText || fileFilters.showMyFiles || selectedFile) && (
                    <button
                      onClick={onClearFileFilters}
                      className="text-xs text-red-600 hover:text-red-800"
                      title="清除所有文件筛选和选择"
                    >
                      清除
                    </button>
                  )}
                  {hasBindingPermission && (
                    <button className="p-1 text-gray-600 hover:text-gray-900" title="添加文件">
                      <Plus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="space-y-2 mb-4 border-b pb-4">
                <div className="flex items-center">
                  <div className="flex-1 mr-2">
                    <input 
                      type="text" 
                      placeholder="搜索文件名..." 
                      value={fileFilters.searchText}
                      onChange={(e) => onFileFilterChange('searchText', e.target.value)}
                      className="w-full border rounded px-3 py-1.5 text-xs"
                    />
                  </div>
                  <button className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded" title="搜索">
                    <Search className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                </div>
                
                <select 
                  value={fileFilters.type}
                  onChange={(e) => onFileFilterChange('type', e.target.value)}
                  className="w-full border rounded px-3 py-1.5 text-xs"
                  title="筛选文件类型"
                >
                  <option value="">所有类型</option>
                  <option value="Method Statement">施工方案</option>
                  <option value="Material Submission">物料提交</option>
                  <option value="Working Drawings">施工图纸</option>
                  <option value="Test Result">测试报告</option>
                </select>
                
                {/* 我上传的文件筛选 - 仅管理员和授权用户可见 */}
                {!isViewOnlyUser && (
                  <div className="flex items-center">
                    <input 
                      type="checkbox"
                      id="showMyFiles"
                      checked={fileFilters.showMyFiles}
                      onChange={(e) => onFileFilterChange('showMyFiles', e.target.checked)}
                      className="mr-2 rounded"
                    />
                    <label htmlFor="showMyFiles" className="text-xs text-gray-700 cursor-pointer">
                      我上传的文件
                    </label>
                  </div>
                )}
                
                {/* 日期筛选 - 日历图标 */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">日期筛选</span>
                  <div className="relative">
                    <button 
                      onClick={onToggleFileDatePicker}
                      className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                      title="选择日期范围"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>
                    
                    {/* 日期选择器 */}
                    {showFileDatePicker && (
                      <div className="absolute top-8 right-0 bg-white border rounded-lg shadow-lg p-3 z-10 w-64">
                        <div className="text-sm font-medium mb-2">文件日期筛选</div>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1" htmlFor="file-start-date">开始日期</label>
                            <input 
                              id="file-start-date"
                              type="date"
                              value={fileFilters.startDate}
                              onChange={(e) => onFileFilterChange('startDate', e.target.value)}
                              className="w-full border rounded px-2 py-1 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1" htmlFor="file-end-date">结束日期</label>
                            <input 
                              id="file-end-date"
                              type="date"
                              value={fileFilters.endDate}
                              onChange={(e) => onFileFilterChange('endDate', e.target.value)}
                              className="w-full border rounded px-2 py-1 text-xs"
                            />
                          </div>
                          <button 
                            onClick={onToggleFileDatePicker}
                            className="w-full bg-blue-600 text-white py-1 px-2 rounded text-xs hover:bg-blue-700"
                          >
                            确定
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* 显示当前选择的日期范围 */}
                {(fileFilters.startDate || fileFilters.endDate) && (
                  <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                    {fileFilters.startDate && `从: ${fileFilters.startDate}`}
                    {fileFilters.startDate && fileFilters.endDate && ' '}
                    {fileFilters.endDate && `到: ${fileFilters.endDate}`}
                  </div>
                )}
              </div>
            </div>

            {/* 文件列表 */}
            <div className="flex-1 min-h-0">
              {/* 绑定模式状态指示器 */}
              {isBindingMode && (
                <div className="bg-blue-100 border border-blue-300 px-3 py-2 rounded-lg text-sm mb-3">
                  <div className="font-medium text-blue-800 flex items-center justify-between">
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      绑定模式已激活
                    </div>
                    <button 
                      onClick={onExitBindingMode}
                      className="bg-red-600 text-white text-xs py-1 px-2 rounded hover:bg-red-700"
                    >
                      退出
                    </button>
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    在BIM视图中高亮构件，然后点击"添加所有高亮构件"按钮
                  </div>
                  {bindingCart.hasHistoricalObjects && (
                    <div className="mt-1 text-xs text-orange-600 flex items-center">
                      <History className="w-3 h-3 mr-1" />
                      包含历史版本构件
                    </div>
                  )}
                </div>
              )}
              
              <div className="space-y-2 overflow-y-auto file-list-container">
                {(() => {
                  // 绑定模式下，将绑定购物车中的文件排在最前面
                  if (isBindingMode && bindingCart.files.length > 0) {
                    const bindingFileIds = new Set(bindingCart.files.map(f => f.id));
                    // 确保绑定文件始终显示，即使不在过滤列表中
                    const allBindingFiles = bindingCart.files;
                    const otherFiles = filteredFiles.filter(file => !bindingFileIds.has(file.id));
                    const sortedFiles = [...allBindingFiles, ...otherFiles.filter(file => !bindingFileIds.has(file.id))];
                    
                    if (sortedFiles.length > 0) {
                      return sortedFiles.map(file => {
                        const isInCart = bindingCart.files.find(f => f.id === file.id);
                        const canModify = currentUser === 'Administrator' || file.uploadedBy === currentUser;
                        
                        return (
                          <div 
                            key={file.id}
                            className={`p-3 border rounded-md cursor-pointer transition-all duration-200 ${
                              selectedFile === file.id ? 'bg-blue-50 border-blue-200' : 'bg-white hover:bg-gray-50'
                            } ${hoveredItem?.id === file.id ? 'ring-1 ring-purple-200' : ''} ${
                              isInCart ? 'bg-green-50 border-green-200' : ''
                            }`}
                            onClick={() => onItemClick(file, 'file')}
                            onDoubleClick={() => onItemDoubleClick(file, 'file')}
                            onMouseEnter={() => onItemHover(file, 'file')}
                            onMouseLeave={onItemLeave}
                          >
                            <div className="flex items-center">
                              <div className="mr-3 flex-shrink-0">
                                <div className={`w-10 h-10 ${
                                  file.type === 'Method Statement' ? 'bg-red-100' :
                                  file.type === 'Material Submission' ? 'bg-blue-100' :
                                  file.type === 'Working Drawings' ? 'bg-green-100' :
                                  'bg-purple-100'
                                } rounded-md flex items-center justify-center`}>
                                  {getFileIcon(file.type)}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <a 
                                  href="#"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onNavigateToDetail(file, 'file');
                                  }}
                                  className="text-sm font-medium text-gray-900 hover:text-blue-600 block truncate"
                                  title={file.name}
                                >
                                  {file.name}
                                </a>
                                <div className="flex items-center mt-1">
                                  <span className={`text-xs ${getFileTypeColor(file.type)}`}>
                                    {file.type}
                                  </span>
                                  <span className="text-xs text-gray-500 ml-4">
                                    上传: {file.uploadDate}
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500">
                                  更新: {file.updateDate}
                                </div>
                                {file.uploadedBy === currentUser && (
                                  <div className="text-xs text-blue-600 mt-1">
                                    我上传的文件
                                  </div>
                                )}
                                {file.bindingStatus === 'history' && (
                                  <div className="text-xs text-orange-600 mt-1 flex items-center">
                                    <History className="w-3 h-3 mr-1" />
                                    历史版本绑定
                                  </div>
                                )}
                              </div>
                              <div className="ml-2 flex items-center space-x-1">
                                {/* 绑定模式下显示当前选中文件 */}
                                {isBindingMode && isInCart && (
                                  <div className="text-xs text-green-600 font-medium">
                                    当前选中
                                  </div>
                                )}
                                
                                {/* 非绑定模式下的操作按钮 */}
                                {!isBindingMode && hasBindingPermission && canModify && (
                                  <>
                                    {/* 修改现有绑定 */}
                                    {file.objects.length > 0 && (file.bindingStatus === 'current' || file.bindingStatus === 'history') && (
                                      <button 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          onEditBinding(file);
                                        }}
                                        className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded hover:bg-orange-200"
                                        title="修改绑定关系"
                                      >
                                        修改绑定
                                      </button>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      });
                    }
                  }
                  
                  // 非绑定模式下的正常显示
                  if (filteredFiles.length > 0) {
                    return filteredFiles.map(file => {
                      const isInCart = bindingCart.files.find(f => f.id === file.id);
                      const canModify = currentUser === 'Administrator' || file.uploadedBy === currentUser;
                      
                      return (
                        <div 
                          key={file.id}
                          className={`p-3 border rounded-md cursor-pointer transition-all duration-200 ${
                            selectedFile === file.id ? 'bg-blue-50 border-blue-200' : 'bg-white hover:bg-gray-50'
                          } ${hoveredItem?.id === file.id ? 'ring-1 ring-purple-200' : ''} ${
                            isInCart ? 'bg-green-50 border-green-200' : ''
                          }`}
                          onClick={() => onItemClick(file, 'file')}
                          onDoubleClick={() => onItemDoubleClick(file, 'file')}
                          onMouseEnter={() => onItemHover(file, 'file')}
                          onMouseLeave={onItemLeave}
                        >
                          <div className="flex items-center">
                            <div className="mr-3 flex-shrink-0">
                              <div className={`w-10 h-10 ${
                                file.type === 'Method Statement' ? 'bg-red-100' :
                                file.type === 'Material Submission' ? 'bg-blue-100' :
                                file.type === 'Working Drawings' ? 'bg-green-100' :
                                'bg-purple-100'
                              } rounded-md flex items-center justify-center`}>
                                {getFileIcon(file.type)}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <a 
                                href="#"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onNavigateToDetail(file, 'file');
                                }}
                                className="text-sm font-medium text-gray-900 hover:text-blue-600 block truncate"
                                title={file.name}
                              >
                                {file.name}
                              </a>
                              <div className="flex items-center mt-1">
                                <span className={`text-xs ${getFileTypeColor(file.type)}`}>
                                  {file.type}
                                </span>
                                <span className="text-xs text-gray-500 ml-4">
                                  上传: {file.uploadDate}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">
                                更新: {file.updateDate}
                              </div>
                              {file.uploadedBy === currentUser && (
                                <div className="text-xs text-blue-600 mt-1">
                                  我上传的文件
                                </div>
                              )}
                              {file.bindingStatus === 'history' && (
                                <div className="text-xs text-orange-600 mt-1 flex items-center">
                                  <History className="w-3 h-3 mr-1" />
                                  历史版本绑定
                                </div>
                              )}
                            </div>
                            <div className="ml-2 flex items-center space-x-1">
                              {/* 绑定模式下显示当前选中文件 */}
                              {isBindingMode && isInCart && (
                                <div className="text-xs text-green-600 font-medium">
                                  当前选中
                                </div>
                              )}
                              
                              {/* 非绑定模式下的操作按钮 */}
                              {!isBindingMode && hasBindingPermission && canModify && (
                                <>
                                  {/* 修改现有绑定 */}
                                  {file.objects.length > 0 && (file.bindingStatus === 'current' || file.bindingStatus === 'history') && (
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onEditBinding(file);
                                      }}
                                      className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded hover:bg-orange-200"
                                      title="修改绑定关系"
                                    >
                                      修改绑定
                                    </button>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    });
                  }
                  
                  // 没有文件的情况
                  return (
                    <div className="text-center py-4 text-sm text-gray-500">
                      没有符合条件的文件
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 