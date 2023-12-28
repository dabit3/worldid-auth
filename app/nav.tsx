'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
import { AppContext } from './context'
import { useContext, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useDisconnect } from 'wagmi'
export function Nav() {
  const [isClient, setIsClient] = useState(false)
  const { address, setProfile, setVerified } = useContext<any>(AppContext)
  const { disconnect } = useDisconnect()
  useEffect(() => {
    setIsClient(true)
  }, [])
  if (!isClient) return null
  return (
    <div
      className="
      flex border-b
      px-6 py-3"
    >
      <div className='flex flex-1 items-center'>
        <Link href="/">
          <div className='flex items-center'>
            <Image
              src="/worldcoin.svg"
              width={40}
              className="dark:invert"
              height={40}
              alt="Worldcoin Logo"
            />
              <p className='ml-2 text-sm'>
              <span className='font-bold'>world</span> auth
            </p>
          </div>
        </Link>
      </div>
      <div className='flex items-center'>
        {
          address && (
            <Button onClick={
              () => {
                disconnect()
                setProfile(null)
                setVerified(false)
              }
            } className='text-xs' variant='link'>
              Disconnect
            </Button>
          )
        }
        <ModeToggle />
      </div>
    </div>
  )
}