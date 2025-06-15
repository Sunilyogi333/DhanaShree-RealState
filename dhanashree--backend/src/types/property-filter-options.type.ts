export interface PropertyFilterOptions {
  propertyCode?: string
  minPrice?: number
  maxPrice?: number
  status?: string
  purpose?: string
  type?: string[]
  district?: number
  municipality?: number
  sortBy?: 'createdAt' | 'price'
  order?: 'asc' | 'desc'
}
