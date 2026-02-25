export type UserProfile = {
  id: string
  auth_user_id: string
  name: string | null
  parish_id: string | null
  phone_number: string
  birthday: Date
  created_at: string
  updated_at: string
}

export type Parish = {
  id: string
  name: string
  pastoral_region: string
  created_at: string
  updated_at: string
}

export type Group = {
  id: string
  name: string
  created_at: string
  updated_at: string
}