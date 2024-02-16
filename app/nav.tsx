'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
import { AppContext } from './context'
import { useContext, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useDisconnect } from 'wagmi'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
export function Nav() {
  const [isClient, setIsClient] = useState(false)
  const { address, setProfile, setVerified, verified } = useContext<any>(AppContext)
  const { disconnect } = useDisconnect()
  useEffect(() => {
    setIsClient(true)
  }, [])
  if (!isClient) return null
  return (
    <div
      className="flex border-b px-6 py-3"
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
              <p className='md:ml-1 text-sm'>
              <span className='font-bold'>World</span> Auth
            </p>
          </div>
        </Link>
        <Link
          href="https://worldcoin.org/world-id"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p
            className='
            hover:text-foreground md:ml-8
            ml-5 text-sm text-muted-foreground
            '
          >
            Learn More
          </p>
        </Link>
        <Link
          href="https://github.com/dabit3/worldid-auth"
          target='_blank'
          rel="noopener noreferrer"
        >
          <GitHubLogoIcon
            className="md:ml-8 ml-5 hover:text-foreground text-muted-foreground"
          />
        </Link>
      </div>
      <div className='flex items-center'>
        {
          (verified || address) && (
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