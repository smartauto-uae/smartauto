export type BlogPost = {
  id:            string
  title:         string
  slug:          string
  excerpt?:      string | null
  content?:      string | null
  cover_image?:  string | null
  category?:     string | null
  tags?:         string[] | null
  status:        'draft' | 'published'
  meta_title?:   string | null
  meta_desc?:    string | null
  og_image?:     string | null
  schema_type?: string | null
schema_custom?: string | null
  published_at?: string | null
  created_at:    string
  updated_at:    string
}