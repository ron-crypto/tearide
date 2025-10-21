// Base spacing unit (8px)
const baseUnit = 8;

// Spacing scale
export const spacing = {
  xs: baseUnit * 0.5,    // 4px
  sm: baseUnit * 1,       // 8px
  md: baseUnit * 1.5,     // 12px
  lg: baseUnit * 2,       // 16px
  xl: baseUnit * 3,       // 24px
  '2xl': baseUnit * 4,    // 32px
  '3xl': baseUnit * 5,    // 40px
  '4xl': baseUnit * 6,    // 48px
  '5xl': baseUnit * 8,    // 64px
  '6xl': baseUnit * 10,   // 80px
} as const;

// Component spacing
export const componentSpacing = {
  // Button spacing
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  buttonSmall: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
  },
  buttonLarge: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    marginBottom: spacing.lg,
  },
  
  // Input spacing
  input: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  
  // Card spacing
  card: {
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  cardHeader: {
    paddingBottom: spacing.md,
    marginBottom: spacing.md,
  },
  cardContent: {
    paddingVertical: spacing.sm,
  },
  cardFooter: {
    paddingTop: spacing.md,
    marginTop: spacing.md,
  },
  
  // List spacing
  list: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  listItem: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  listHeader: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  
  // Screen spacing
  screen: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  screenHeader: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  screenContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  screenFooter: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  
  // Modal spacing
  modal: {
    padding: spacing.xl,
  },
  modalHeader: {
    paddingBottom: spacing.lg,
    marginBottom: spacing.lg,
  },
  modalContent: {
    paddingVertical: spacing.md,
  },
  modalFooter: {
    paddingTop: spacing.lg,
    marginTop: spacing.lg,
  },
  
  // Navigation spacing
  tabBar: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  tabBarItem: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  
  // Form spacing
  form: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  formGroup: {
    marginBottom: spacing.lg,
  },
  formField: {
    marginBottom: spacing.md,
  },
  formActions: {
    paddingTop: spacing.lg,
    marginTop: spacing.lg,
  },
} as const;

// Layout spacing
export const layoutSpacing = {
  // Container spacing
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  containerSmall: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  containerLarge: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
  },
  
  // Section spacing
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    marginBottom: spacing.lg,
  },
  sectionContent: {
    marginBottom: spacing.md,
  },
  
  // Grid spacing
  grid: {
    gap: spacing.md,
  },
  gridItem: {
    marginBottom: spacing.md,
  },
  
  // Flex spacing
  flex: {
    gap: spacing.md,
  },
  flexItem: {
    marginRight: spacing.md,
    marginBottom: spacing.md,
  },
} as const;

// Utility functions
export const getSpacing = (size: keyof typeof spacing) => {
  return spacing[size];
};

export const getComponentSpacing = (component: keyof typeof componentSpacing) => {
  return componentSpacing[component];
};

export const getLayoutSpacing = (layout: keyof typeof layoutSpacing) => {
  return layoutSpacing[layout];
};

// Responsive spacing
export const responsiveSpacing = {
  screen: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  card: {
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
} as const;

