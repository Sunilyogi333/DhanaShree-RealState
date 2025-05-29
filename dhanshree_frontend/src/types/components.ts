import { Property, PropertyType, PropertyStatus, PropertyFilter } from "./property";
import { ReactNode } from "react";

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Card component props
export interface CardProps extends BaseComponentProps {
  variant?: "default" | "compact" | "featured";
  onClick?: () => void;
}

// Property card props
export interface PropertyCardProps extends CardProps {
  property: Property;
  onFavorite?: (propertyId: string) => void;
  isFavorite?: boolean;
}

// Filter component props
export interface FilterProps extends BaseComponentProps {
  onFilterChange: (filters: PropertyFilter) => void;
  initialFilters?: PropertyFilter;
}

// Tab component props
export interface TabProps extends BaseComponentProps {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

// Form component props
export interface FormProps<T> extends BaseComponentProps {
  initialValues?: Partial<T>;
  onSubmit: (values: T) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}
