'use client'
import { AppContext } from './context'
import { useAccount } from "wagmi"
import { useState, useEffect } from 'react'

export function ContextProvider ({ children }) {
  const { address } = useAccount()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    if (address) fetchProfile()
  }, [address])

  async function fetchProfile() {
    try {
     const response = await fetch('/api/get-user', {
      method: 'POST',
      body: JSON.stringify({ address }),
     }).then((res) => res.json())
     if (response?.data?.Socials?.Social) {
        setProfile(response.data.Socials.Social[response.data.Socials.Social.length - 1])
     } else {
      setProfile({
        profileName: address
      })
     }
    } catch (err) {
      console.log('error fetching profile', err)
    }
  }
  
  return (
    <AppContext.Provider
      value={{
        address,
        profile,
        setProfile
      } as any }
    >
      {children}
    </AppContext.Provider>
  )
}