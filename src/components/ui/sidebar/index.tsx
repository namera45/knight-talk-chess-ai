
// Re-export components from sidebar.tsx
export * from './sidebar'

// Re-export components from sidebar-menu.tsx
export * from './sidebar-menu'

// Re-export the provider and specific named exports
export { 
  SidebarProvider, 
  useSidebar,
  // Note: We're not re-exporting SidebarContext as it's causing ambiguity
} from './sidebar-provider'

// Re-export types
export * from './types'
