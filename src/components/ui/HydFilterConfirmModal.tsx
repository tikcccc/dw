import React from 'react';
import { AlertTriangle, X, Filter } from 'lucide-react';

interface HydFilterConfirmModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
  componentCount?: number;
}

export const HydFilterConfirmModal: React.FC<HydFilterConfirmModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  itemName = "该条目",
  componentCount = 0
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">筛选范围提示</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-6">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Filter className="w-3 h-3 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-700 text-sm leading-relaxed">
                <span className="font-medium text-gray-900">{itemName}</span>
                关联的构件超出了您当前的筛选范围。
              </p>
              {componentCount > 0 && (
                <p className="text-gray-600 text-xs mt-1">
                  共有 <span className="font-medium text-blue-600">{componentCount}</span> 个相关构件
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-2">
            <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-gray-600">
              是否要清除当前筛选条件并查看所有关联构件？
            </p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            取消
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1"
          >
            <Filter className="w-4 h-4" />
            <span>清除筛选</span>
          </button>
        </div>
      </div>
    </div>
  );
};