// State Mutation Utility Functions
import { HydCode, RiscFilters } from '../types';

export class StateMutations {
  // Clear all RISC filters
  static clearAllRiscFilters(setRiscFilters: (filters: RiscFilters) => void): void {
    setRiscFilters({
      status: '',
      startDate: '',
      endDate: '',
      searchText: ''
    });
  }

  // Clear all file filters
  static clearAllFileFilters(setFileFilters: (filters: any) => void): void {
    setFileFilters({
      type: '',
      startDate: '',
      endDate: '',
      searchText: '',
      showMyFiles: false
    });
  }

  // Clear all HyD Code filters
  static clearAllHydCodeFilters(
    setHydCodeFilter: (filter: HydCode) => void,
    setFilterHighlightSet: (set: string[]) => void
  ): void {
    setHydCodeFilter({
      project: 'HY202404',
      contractor: '',
      location: '',
      structure: '',
      space: '',
      grid: '',
      cat: ''
    });
    // When manually clearing HyD Code filters, clear the filter highlight set but keep the manual highlight set
    setFilterHighlightSet([]);
  }

  // Clear all user selections - New feature
  static clearAllUserSelections(
    setHydCodeFilter: (filter: HydCode) => void,
    setRiscFilters: (filters: RiscFilters) => void,
    setFileFilters: (filters: any) => void,
    setFilterHighlightSet: (set: string[]) => void,
    setManualHighlightSet: (set: string[]) => void,
    setSelectedRISC: (id: string | null) => void,
    setSelectedFile: (id: number | null) => void,
    setHoveredObjects: (objects: string[]) => void,
    setHoveredItem: (item: any) => void,
    setHoveredItemType: (type: string | null) => void
  ): void {
    // Clear all filter conditions
    setHydCodeFilter({
      project: 'HY202404',
      contractor: '',
      location: '',
      structure: '',
      space: '',
      grid: '',
      cat: ''
    });
    setRiscFilters({
      status: '',
      startDate: '',
      endDate: '',
      searchText: ''
    });
    setFileFilters({
      type: '',
      startDate: '',
      endDate: '',
      searchText: '',
      showMyFiles: false
    });
    
    // Clear all highlights and selection states
    setFilterHighlightSet([]);
    setManualHighlightSet([]);
    setSelectedRISC(null);
    setSelectedFile(null);
    setHoveredObjects([]);
    setHoveredItem(null);
    setHoveredItemType(null);
  }

  // Clear all RISC filters and related selections - Enhanced version
  static clearAllRiscFiltersAndSelections(
    setRiscFilters: (filters: RiscFilters) => void,
    selectedRISC: string | null,
    setSelectedRISC: (id: string | null) => void,
    setManualHighlightSet: (set: string[] | ((prev: string[]) => string[])) => void,
    riscForms: any[]
  ): void {
    setRiscFilters({
      status: '',
      startDate: '',
      endDate: '',
      searchText: ''
    });
    
    // If a RISC is currently selected, also clear related highlights
    if (selectedRISC) {
      setSelectedRISC(null);
      // Only clear manual highlights related to this RISC, keep other filter-generated highlights
      const currentRisc = riscForms.find(r => r.id === selectedRISC);
      if (currentRisc) {
        setManualHighlightSet(prev => 
          prev.filter(id => !currentRisc.objects.includes(id))
        );
      }
    }
  }

  // Clear all file filters and related selections - Enhanced version
  static clearAllFileFiltersAndSelections(
    setFileFilters: (filters: any) => void,
    selectedFile: number | null,
    setSelectedFile: (id: number | null) => void,
    setManualHighlightSet: (set: string[] | ((prev: string[]) => string[])) => void,
    files: any[]
  ): void {
    setFileFilters({
      type: '',
      startDate: '',
      endDate: '',
      searchText: '',
      showMyFiles: false
    });
    
    // If a file is currently selected, also clear related highlights
    if (selectedFile) {
      setSelectedFile(null);
      // Only clear manual highlights related to this file, keep other filter-generated highlights
      const currentFile = files.find(f => f.id === selectedFile);
      if (currentFile) {
        setManualHighlightSet(prev => 
          prev.filter(id => !currentFile.objects.includes(id))
        );
      }
    }
  }

  // Helper function to clear all highlight states
  static clearAllHighlightsAfterAdd(
    setManualHighlightSet: (set: string[]) => void,
    setFilterHighlightSet: (set: string[]) => void,
    setHydCodeFilter: (filter: HydCode) => void,
    setSelectedRISC: (id: string | null) => void,
    setSelectedFile: (id: number | null) => void,
    setHoveredObjects: (objects: string[]) => void,
    setHoveredItem: (item: any) => void,
    setHoveredItemType: (type: string | null) => void
  ): void {
    // Clear manual highlight set
    setManualHighlightSet([]);
    // Clear filter highlight set
    setFilterHighlightSet([]);
    // Clear HyD Code filter (if any)
    setHydCodeFilter({
      project: 'HY202404',
      contractor: '',
      location: '',
      structure: '',
      space: '',
      grid: '',
      cat: ''
    });
    // Clear selection states
    setSelectedRISC(null);
    setSelectedFile(null);
    // Clear hover states
    setHoveredObjects([]);
    setHoveredItem(null);
    setHoveredItemType(null);
  }
} 