// HyD代码验证服务
import { HydCode, Component } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errorType: 'missing' | 'incomplete' | 'invalid' | null;
  errorMessage: string;
  missingFields: string[];
}

export interface BatchValidationResult {
  isValid: boolean;
  validComponents: Component[];
  invalidComponents: Component[];
  allInvalid: boolean;
  partiallyInvalid: boolean;
  errorMessage: string;
}

export class HydCodeValidator {
  // 检查HyD代码是否存在且完整
  static validateHydCode(hydCode: HydCode | null | undefined): ValidationResult {
    if (!hydCode) {
      return {
        isValid: false,
        errorType: 'missing',
        errorMessage: '构件缺少HyD代码',
        missingFields: ['all']
      };
    }

    const requiredFields = [
      'project', 'originator', 'volume', 'system', 
      'location', 'discipline', 'sequential_number'
    ];

    const missingFields = requiredFields.filter(field => 
      !hydCode[field as keyof HydCode] || 
      hydCode[field as keyof HydCode].trim() === ''
    );

    if (missingFields.length > 0) {
      return {
        isValid: false,
        errorType: 'incomplete',
        errorMessage: `HyD代码不完整，缺少字段: ${missingFields.join(', ')}`,
        missingFields
      };
    }

    // 检查HyD代码格式是否有效（可以根据实际需求添加更多验证规则）
    if (!this.isValidHydCodeFormat(hydCode)) {
      return {
        isValid: false,
        errorType: 'invalid',
        errorMessage: 'HyD代码格式无效',
        missingFields: []
      };
    }

    return {
      isValid: true,
      errorType: null,
      errorMessage: '',
      missingFields: []
    };
  }

  // 验证单个构件
  static validateComponent(component: Component): ValidationResult {
    if (!component) {
      return {
        isValid: false,
        errorType: 'missing',
        errorMessage: '构件不存在',
        missingFields: ['component']
      };
    }

    return this.validateHydCode(component.hydCode);
  }

  // 批量验证构件
  static validateComponentBatch(components: Component[]): BatchValidationResult {
    if (!components || components.length === 0) {
      return {
        isValid: false,
        validComponents: [],
        invalidComponents: [],
        allInvalid: false,
        partiallyInvalid: false,
        errorMessage: '没有选择构件'
      };
    }

    const validComponents: Component[] = [];
    const invalidComponents: Component[] = [];

    components.forEach(component => {
      const validation = this.validateComponent(component);
      if (validation.isValid) {
        validComponents.push(component);
      } else {
        invalidComponents.push(component);
      }
    });

    const allInvalid = invalidComponents.length === components.length;
    const partiallyInvalid = invalidComponents.length > 0 && invalidComponents.length < components.length;

    let errorMessage = '';
    if (allInvalid) {
      errorMessage = '选中的构件都没有HyD Code，不可以绑定';
    } else if (partiallyInvalid) {
      errorMessage = '部分构件没有HyD Code，请先取消选择这些构件';
    }

    return {
      isValid: invalidComponents.length === 0,
      validComponents,
      invalidComponents,
      allInvalid,
      partiallyInvalid,
      errorMessage
    };
  }

  // 验证选中的构件是否可以进行绑定操作
  static validateSelectedComponentsForBinding(selectedComponents: Component[]): BatchValidationResult {
    const batchResult = this.validateComponentBatch(selectedComponents);
    
    // 如果有无效构件，生成更详细的错误信息
    if (!batchResult.isValid) {
      const invalidNames = batchResult.invalidComponents.map(comp => comp.name);
      
      if (batchResult.allInvalid) {
        batchResult.errorMessage = `选中的构件都没有HyD Code，不可以绑定:\n${invalidNames.join('\n')}`;
      } else if (batchResult.partiallyInvalid) {
        batchResult.errorMessage = `以下构件没有HyD Code，请先取消选择:\n${invalidNames.join('\n')}`;
      }
    }

    return batchResult;
  }

  // 检查HyD代码格式是否有效（可以根据实际需求扩展）
  private static isValidHydCodeFormat(hydCode: HydCode): boolean {
    // 基本格式检查 - 可以根据实际的HyD代码规范进行扩展
    const fields = [
      hydCode.project,
      hydCode.originator,
      hydCode.volume,
      hydCode.system,
      hydCode.location,
      hydCode.discipline,
      hydCode.sequential_number
    ];

    // 检查是否所有字段都不为空且长度合理
    return fields.every(field => 
      field && 
      field.trim().length > 0 && 
      field.trim().length <= 50 && // 假设最大长度为50
      !field.includes('  ') // 不包含连续空格
    );
  }

  // 生成构件验证状态摘要
  static generateValidationSummary(validationResult: BatchValidationResult): string {
    if (validationResult.isValid) {
      return `所有构件 (${validationResult.validComponents.length}) 都有有效的HyD代码`;
    }

    const summary = [
      `总构件数: ${validationResult.validComponents.length + validationResult.invalidComponents.length}`,
      `有效构件: ${validationResult.validComponents.length}`,
      `无效构件: ${validationResult.invalidComponents.length}`
    ];

    if (validationResult.allInvalid) {
      summary.push('状态: 全部无效');
    } else if (validationResult.partiallyInvalid) {
      summary.push('状态: 部分无效');
    }

    return summary.join('\n');
  }
}