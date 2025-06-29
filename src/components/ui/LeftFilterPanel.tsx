// 左侧筛选面板组件
import React from 'react';
import { Filter, FileText, Search, Calendar, X, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { RiscForm, HydCode, RiscFilters } from '../../types';
import { hydCodeOptions } from '../../data/mockData';

interface LeftFilterPanelProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  
  // HyD Code筛选
  hydCodeFilter: HydCode;
  onHydCodeChange: (level: keyof HydCode, value: string) => void;
  onClearHydCodeFilter: () => void;
  hasHydCodeFilter: boolean;
  hydCodeFilteredCount: number;
  
  // RISC筛选
  riscFilters: RiscFilters;
  onRiscFilterChange: (field: string, value: string) => void;
  onClearRiscFilters: () => void;
  
  // RISC列表
  filteredRiscForms: RiscForm[];
  selectedRISC: string | null;
  hoveredItem: any;
  onItemClick: (item: RiscForm, type: string) => void;
  onItemDoubleClick: (item: RiscForm, type: string) => void;
  onItemHover: (item: RiscForm, type: string) => void;
  onItemLeave: () => void;
  
  // 日期选择器
  showRiscDatePicker: boolean;
  onToggleRiscDatePicker: () => void;
  
  // 权限
  isViewOnlyUser: boolean;
  
  // 全局清除功能
  hasAnyActiveFilters: boolean;
  onClearAllFilters: () => void;
  
  // 高亮相关
  finalHighlightCount: number;
}

export const LeftFilterPanel: React.FC<LeftFilterPanelProps> = ({
  isCollapsed,
  onToggleCollapse,
  hydCodeFilter,
  onHydCodeChange,
  onClearHydCodeFilter,
  hasHydCodeFilter,
  hydCodeFilteredCount,
  riscFilters,
  onRiscFilterChange,
  onClearRiscFilters,
  filteredRiscForms,
  selectedRISC,
  hoveredItem,
  onItemClick,
  onItemDoubleClick,
  onItemHover,
  onItemLeave,
  showRiscDatePicker,
  onToggleRiscDatePicker,
  isViewOnlyUser,
  hasAnyActiveFilters,
  onClearAllFilters,
  finalHighlightCount
}) => {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-600';
      case 'Submitted':
        return 'bg-blue-100 text-blue-600';
      case 'Rejected':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className={`bg-white shadow-sm transition-all duration-300 ${isCollapsed ? 'w-12' : 'w-80'} flex flex-col`}>
      <div className="p-4 border-b flex items-center justify-between flex-shrink-0">
        {!isCollapsed && (
          <div className="flex items-center justify-between w-full">
            <h2 className="font-medium">筛选与管理</h2>
            {/* 全局清除所有选择按钮 */}
            {hasAnyActiveFilters && (
              <button
                onClick={onClearAllFilters}
                className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 flex items-center"
                title="清除所有筛选和选择"
              >
                <X className="w-3 h-3 mr-1" />
                清除全部
              </button>
            )}
          </div>
        )}
        <button 
          onClick={onToggleCollapse}
          className="p-1 hover:bg-gray-100 rounded"
        >
          {isCollapsed ? <ChevronsRight className="w-4 h-4" /> : <ChevronsLeft className="w-4 h-4" />}
        </button>
      </div>

      {!isCollapsed && (
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 p-4 space-y-6 overflow-y-auto">
            {/* HyD Code 高级筛选 - 仅授权用户和管理员可见 */}
            {!isViewOnlyUser && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    HyD Code 高级筛选
                  </h3>
                  {hasHydCodeFilter && (
                    <button
                      onClick={onClearHydCodeFilter}
                      className="text-xs text-red-600 hover:text-red-800"
                      title="清除所有HyD Code筛选"
                    >
                      清除
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {Object.keys(hydCodeOptions).map(level => (
                    <div key={level}>
                      <label className="block text-xs text-gray-600 mb-1 capitalize">{level}</label>
                      <select 
                        value={hydCodeFilter[level as keyof HydCode]}
                        onChange={(e) => onHydCodeChange(level as keyof HydCode, e.target.value)}
                        className={`w-full border rounded px-2 py-1 text-sm ${
                          level === 'project' ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
                        }`}
                        disabled={level === 'project'}
                        title={level === 'project' ? 'Project字段不可选择' : `选择${level}`}
                      >
                        <option value="">请选择...</option>
                        {hydCodeOptions[level as keyof typeof hydCodeOptions].map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-xs text-blue-600">
                  匹配构件: {hydCodeFilteredCount}
                  {finalHighlightCount > 0 && (
                    <span className="ml-2 text-purple-600">
                      (最终高亮: {finalHighlightCount})
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* RISC 表单列表 */}
            <div className="flex flex-col min-h-0 flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  RISC 表单
                </h3>
                {(riscFilters.status || riscFilters.startDate || riscFilters.endDate || riscFilters.searchText || selectedRISC) && (
                  <button
                    onClick={onClearRiscFilters}
                    className="text-xs text-red-600 hover:text-red-800"
                    title="清除所有RISC筛选和选择"
                  >
                    清除
                  </button>
                )}
              </div>
              
              {/* RISC 筛选 */}
              <div className="space-y-2 mb-4 border-b pb-4 flex-shrink-0">
                <div className="flex items-center">
                  <div className="flex-1 mr-2">
                    <input 
                      type="text" 
                      placeholder="搜索请求编号..." 
                      value={riscFilters.searchText}
                      onChange={(e) => onRiscFilterChange('searchText', e.target.value)}
                      className="w-full border rounded px-3 py-1.5 text-xs"
                    />
                  </div>
                  <button className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded" title="搜索">
                    <Search className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                </div>
                
                <select 
                  value={riscFilters.status}
                  onChange={(e) => onRiscFilterChange('status', e.target.value)}
                  className="w-full border rounded px-2 py-1.5 text-xs"
                  title="筛选RISC状态"
                >
                  <option value="">所有状态</option>
                  <option value="Approved">已批准</option>
                  <option value="Submitted">已提交</option>
                  <option value="Rejected">已拒绝</option>
                </select>
                
                {/* 日期筛选 - 日历图标 */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">日期筛选</span>
                  <div className="relative">
                    <button 
                      onClick={onToggleRiscDatePicker}
                      className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                      title="选择日期范围"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>
                    
                    {/* 简化的日期选择器 - 可以后续扩展 */}
                    {showRiscDatePicker && (
                      <div className="absolute top-8 right-0 bg-white border rounded-lg shadow-lg p-3 z-10 w-64">
                        <div className="text-sm font-medium mb-2">RISC表单日期筛选</div>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1" htmlFor="risc-start-date">开始日期</label>
                            <input 
                              id="risc-start-date"
                              type="date"
                              value={riscFilters.startDate}
                              onChange={(e) => onRiscFilterChange('startDate', e.target.value)}
                              className="w-full border rounded px-2 py-1 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1" htmlFor="risc-end-date">结束日期</label>
                            <input 
                              id="risc-end-date"
                              type="date"
                              value={riscFilters.endDate}
                              onChange={(e) => onRiscFilterChange('endDate', e.target.value)}
                              className="w-full border rounded px-2 py-1 text-xs"
                            />
                          </div>
                          <button 
                            onClick={onToggleRiscDatePicker}
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
                {(riscFilters.startDate || riscFilters.endDate) && (
                  <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                    {riscFilters.startDate && `从: ${riscFilters.startDate}`}
                    {riscFilters.startDate && riscFilters.endDate && ' '}
                    {riscFilters.endDate && `到: ${riscFilters.endDate}`}
                  </div>
                )}
              </div>
              
              {/* RISC 列表 */}
              <div className="flex-1 min-h-0 overflow-hidden">
                <div className="border rounded-md overflow-hidden h-full flex flex-col">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-50 border-b flex-shrink-0">
                      <tr>
                        <th className="text-left py-2 px-3 font-medium text-gray-600">RequestNo.</th>
                        <th className="text-left py-2 px-3 font-medium text-gray-600">Update Time</th>
                        <th className="text-left py-2 px-3 font-medium text-gray-600">Status</th>
                        <th className="w-8"></th>
                      </tr>
                    </thead>
                  </table>
                  <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-xs">
                      <tbody className="divide-y divide-gray-200">
                        {filteredRiscForms.length > 0 ? (
                          filteredRiscForms.map(form => (
                            <tr 
                              key={form.id}
                              className={`cursor-pointer transition-all duration-200 ${
                                selectedRISC === form.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                              } ${hoveredItem?.id === form.id ? 'ring-2 ring-purple-200' : ''}`}
                              onClick={() => onItemClick(form, 'risc')}
                              onDoubleClick={() => onItemDoubleClick(form, 'risc')}
                              onMouseEnter={() => onItemHover(form, 'risc')}
                              onMouseLeave={onItemLeave}
                            >
                              <td className="py-2 px-3">
                                <div className="font-medium truncate" title={form.requestNo}>
                                  {form.requestNo}
                                </div>
                              </td>
                              <td className="py-2 px-3 text-gray-500">{form.updateDate}</td>
                              <td className="py-2 px-3">
                                <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(form.status)}`}>
                                  {form.status}
                                </span>
                              </td>
                              <td className="py-2 px-3">
                                {form.bindingStatus !== 'current' && (
                                  <div className="group relative">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                      历史版本绑定
                                    </div>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="text-center py-4 text-sm text-gray-500">
                              没有符合条件的RISC表单
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 