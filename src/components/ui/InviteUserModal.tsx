// 邀请用户模态框组件
import React from 'react';
import { X, CheckCircle, Mail, Info } from 'lucide-react';

interface InviteUserModalProps {
  isVisible: boolean;
  onClose: () => void;
  inviteEmail: string;
  setInviteEmail: (email: string) => void;
  inviteRole: string;
  setInviteRole: (role: string) => void;
  onSendInvite: () => void;
}

export const InviteUserModal: React.FC<InviteUserModalProps> = ({
  isVisible,
  onClose,
  inviteEmail,
  setInviteEmail,
  inviteRole,
  setInviteRole,
  onSendInvite
}) => {
  if (!isVisible) return null;

  const handleClose = () => {
    setInviteEmail('');
    setInviteRole('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">邀请成员</h3>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              分配角色
            </label>
            <div className="text-xs text-gray-500 mb-2">* 配备角色</div>
            <select 
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              title="选择用户角色"
            >
              <option value="">项目成员 ×</option>
              <option value="View-only User">普通用户 (View-only User)</option>
              <option value="Authorized User">授权用户 (Authorized User)</option>
              <option value="Admin">管理员 (Admin)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              输入邮箱
            </label>
            <div className="text-xs text-gray-500 mb-2">* 输入邮箱</div>
            <div className="relative">
              <input 
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="在此处输入邀请人员邮箱地址，例如 abc@jarvis.com"
                className="w-full border rounded-md px-3 py-2 pr-16 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <button className="p-1 text-green-600 hover:text-green-700" title="验证邮箱">
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600" title="发送邮件">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs text-blue-600">
              <Info className="w-3 h-3 mr-1" />
              <span>输入邀请人员邮箱，可通过换行分隔不同的成员批量邀请</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button 
            onClick={onSendInvite}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            发送邀请
          </button>
        </div>
      </div>
    </div>
  );
}; 