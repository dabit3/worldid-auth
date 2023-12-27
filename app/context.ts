import { createContext } from 'react'

export const AppContext = createContext({
  address: '',
  profile: null,
  setProfile: () => null,
})