'use client'
import { CubeIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useModal } from "connectkit"
import { useAccount } from "wagmi";
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit'
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { AppContext } from './context'

export default function Home() {
  const { address } = useAccount()
  const [isLoaded, setIsLoaded] = useState(false)
  const [success, setSuccess] = useState(false)
  const { setOpen } = useModal()
  const { profile } = useContext<any>(AppContext)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  async function handleVerify(data: any) {
    data.signal = address
    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
    console.log('response: ', response)
    if (response.code === 'success') {
      setSuccess(true)
      toast("Successfully authenticated with World ID.")
    } else {
      toast("Authenticated failed with World ID.")
      console.log('error:', response.wldResponse)
    }
  }
  if (!isLoaded) return null

  return (
    <main className="
    p-4 sm:p-12
    flex flex-1 h-full">
      <div className="
      rounded-xl
      border
      flex-col md:flex-row
      flex flex-1
      ">
       <div
       className='
       p-6 sm:p-8 
       rounded-tl-xl rounded-tr-xl
       md:rounded-tr-none
       md:rounded-tl-xl md:rounded-bl-xl
       flex flex-1 bg-secondary-100 bg-zinc-900'
       >
        <div className='flex items-start flex-col'>
          <div className='flex justify-center flex-1 '>
            <CubeIcon
             className='w-7 h-7 text-white' />
            <p className='
            text-white
            ml-3 text-lg'>Acme Inc</p>
          </div>
          <div>
           Sybil-resistant identity verification powered by <Link rel='no-opener' target="_blank" href="https://docs.worldcoin.org/">WorldID</Link>.
          </div>
        </div>
       </div>
       {
        success && (
          <div
          className='
          border-l items-center justify-center
          flex flex-1 flex-col p-6 sm:p-8 '
          >
            {
              !profile && (
                <p className='text-sm text-muted-foreground'>
                 🎉 Welcome!
                </p>
              )
            }
            {
              address && profile && (
                <p className='text-sm mt-3 text-muted-foreground'>
                  welcome, {profile.profileName}
                </p>
              )
            }
            {
              !profile && (
                <Button
                  onClick={() => setOpen(true)}
                  variant={'outline'} className='mt-2'>
                    Connect your Web3 Social Account
                  </Button>
                )
            }
          </div>
        )
       }

      {
        !success && (
          <div
          className='
          md:rounded-bl-none rounded-bl-xl 
          border-l items-center justify-center
          flex flex-1 flex-col p-6 sm:p-8 '
          >
            <div className='flex flex-col items-center'>
              <p className='font-medium text-2xl'>Login or create account</p>
              <p className='text-sm text-muted-foreground mt-2'>
              Connect and verify with World ID.
              </p>
            </div>
            <div className='mt-5 flex flex-col'>
              <IDKitWidget
                app_id={`app_${process.env.NEXT_PUBLIC_WLD_APP_ID}`}
                action={process.env.NEXT_PUBLIC_WC_ACTION || ''}
                onSuccess={(message) => console.log(message)}
                handleVerify={handleVerify}
                verification_level={VerificationLevel.Device}
              >
                {({ open }) => (
                  <Button
                    onClick={open}
                  >Sign in with World ID</Button>
                )}
              </IDKitWidget>
              <div className='relative py-4'>
                <Separator
                  className='mt-6 absolute inset-0 flex items-center'
                />
                <div className='relative flex justify-center text-xs uppercase'>
                  <p className='bg-background px-2 text-muted-foreground'>
                    or
                  </p>
                </div>
              </div>
              <Button
              asChild
              variant="outline" className='
              w-[290px] sm:w-[320px] 
              rounded-lg'>
                <Link
                  href="https://apps.apple.com/no/app/world-app-worldcoin-wallet/id1560859847"
                  target='_blank'
                  rel='noopener noreferrer'
                >
                Get the World ID App
                </Link>
              </Button>
            </div>
          </div>
        )
      }
      </div>
      <Toaster />
    </main>
  )
}
