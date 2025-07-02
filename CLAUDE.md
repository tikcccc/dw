# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DWSS-BIM is a React-based Building Information Modeling (BIM) dashboard application for managing construction project components, RISC forms, and file bindings. The application features a component binding system that associates construction files with BIM model components across multiple model versions.

## Development Environment

This is a React 18 + TypeScript + Vite project using Tailwind CSS for styling. The project is now fully configured with all necessary build tools and dependencies.

### Development Commands
- `npm run dev` - Start development server on http://localhost:3000 (opens automatically)
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint with TypeScript support
- `npm run preview` - Preview production build locally
- `npm run deploy` - Build and deploy to GitHub Pages (manual deployment)

### Tech Stack
- **Build Tool**: Vite 5.0+ with React plugin
- **Styling**: Tailwind CSS with PostCSS
- **Icons**: Lucide React
- **TypeScript**: v5.2+ with strict mode enabled

## Core Architecture

### Main Components Structure
- **App.tsx** - Root application component that renders the main dashboard
- **DWSSBIMDashboard.tsx** - Main dashboard component (large file, 262KB+) containing the primary application logic
- **src/components/ui/** - UI components including BIMViewer, modals, and panels
- **src/types/index.ts** - Comprehensive TypeScript type definitions for the entire system

### Key Data Models
The application manages several core entities:
- **Component** - BIM model components with version tracking and HyD codes
- **RiscForm** - Risk assessment forms with binding status and component associations  
- **FileItem** - Construction documents with component bindings and version history
- **HydCode** - Hierarchical classification system (project/contractor/location/structure/space/grid/category)
- **ModelVersion** - BIM model version management (current vs historical)

### Service Layer
- **bindingService.ts** - Handles component-to-file binding operations, cart management, and version consistency
- **eventHandlers.ts** - Centralized event handling for UI interactions, filtering, and selections
- **stateMutations.ts** - Utilities for clearing filters and managing application state

### Data Management
- **mockData.ts** - Contains sample data for all entity types and configuration options
- Uses in-memory state management with React hooks (no external state library)

## Key Features

### Component Binding System
The application's core feature allows binding construction files to BIM components:
- Multi-version support (current vs historical)
- Batch binding operations through a "binding cart"
- Version consistency validation
- Historical binding tracking

### Model Version Management
- Current version vs historical version viewing
- Component highlighting based on version and binding status
- Version-aware filtering and selection

### Multi-Level Filtering
- HyD Code hierarchical filtering (7 levels)
- RISC form filtering by status and date ranges
- File filtering by type, user, and date ranges
- Real-time component highlighting based on active filters

### Advanced HyD Code Filtering Logic
The application implements sophisticated item-component interaction when HyD filtering is active:
- **Case 1**: When clicked item's components are all within HyD filter scope → directly highlight components
- **Case 2**: When clicked item's components extend beyond HyD filter scope → show confirmation dialog asking user to clear filters and view all related components
- Confirmation dialog ensures no side effects when user cancels the operation
- Critical implementation detail: HyD filtering check must occur FIRST in `handleListItemClick` before any state changes

## Working with the Codebase

### Component Interaction Patterns
- Components use color-coded highlighting (blue for selected, yellow for hover)
- Event handlers are centralized in EventHandlers class
- State mutations use dedicated utility functions in StateMutations class

### Key State Management
The dashboard maintains several coordinated state variables:
- Filter states (HyD codes, RISC filters, file filters)
- Selection states (selected components, files, RISC forms)
- Highlight sets (filter-based, manual, hover)
- Binding cart state and mode flags

### Code Quality and Development Notes
- Main dashboard file (DWSSBIMDashboard.tsx) uses @ts-nocheck directive due to size/complexity
- ESLint configured with TypeScript support and React hooks rules
- TypeScript configured with strict mode and additional linting rules (noUnusedLocals, noUnusedParameters)
- Error boundary component included for robust error handling
- Vite configuration includes markdown file support for USER_GUIDE.md import
- Vite server configured to auto-open browser and use port 3000
- No test framework configured - tests would need to be added separately

## Common Operations

### Adding New Component Types
1. Update type definitions in `src/types/index.ts`
2. Add mock data in `src/data/mockData.ts`
3. Update filtering logic in `src/services/eventHandlers.ts`
4. Modify UI components as needed

### Extending Binding Logic
- Primary binding logic is in `bindingService.ts`
- Version consistency checks are critical for binding operations
- Cart management includes historical object tracking

### UI Component Development
- Follow existing patterns in `src/components/ui/`
- BIMViewer component shows comprehensive component rendering patterns
- Use existing type definitions for props and state

## Development Workflow

### Getting Started
1. Run `npm install` to install dependencies
2. Run `npm run dev` to start development server
3. Application will be available at http://localhost:3000

### File Structure Important Notes
- **DWSSBIMDashboard.tsx** is the main monolithic component (262KB+) containing most application logic
- Consider refactoring large components when making significant changes
- **USER_GUIDE.md** is imported as raw text in the dashboard component
- All TypeScript types are centralized in `src/types/index.ts`

### Configuration Files
- **vite.config.ts** - Vite bundler configuration with React plugin, markdown support, port 3000, and relative base path
- **tailwind.config.js** - Tailwind CSS configuration
- **tsconfig.json** - TypeScript configuration with strict mode and advanced linting
- **package.json** - Dependencies and build scripts including GitHub Pages deployment