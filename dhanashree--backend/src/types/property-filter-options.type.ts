export interface PropertyFilterOptions {
  propertyCode?: string
  price?: number
  status?: string
  purpose?: string
  type?: string[]
  district?: number
  municipality?: number
  sortBy?: 'createdAt' | 'price'
  order?: 'asc' | 'desc'
}
