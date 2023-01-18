import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import { useContractRead } from 'wagmi'

import '@leenguyen/react-flip-clock-countdown/dist/index.css'

import { theGameContractConfig } from '@/constant/env'

const Countdown = () => {
  // Use those variables check the wagmi project examples
  const { data, isRefetching, isSuccess, refetch } = useContractRead({
    ...theGameContractConfig,
    functionName: 'EventEndTime',
  })
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  )
  // TODO: Remove placeholder at to= argument for FlipClockCountdown
  // TODO: Work on responsiveness

  return (
    <>
      <div className='flex flex-col items-center justify-center text-white'>
        <h1 className='text-4xl leading-tight'>Starts in:</h1>
        <FlipClockCountdown
          className='mt-4'
          to={
            isNaN(Number(data))
              ? new Date().getTime() + 3 * 24 * 60 * 60 * 1000
              : Number(data)
          }
          labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
          labelStyle={{
            fontSize: 8,
            fontWeight: 500,
            textTransform: 'uppercase',
          }}
          digitBlockStyle={{
            width: vw < 400 ? 24 : 30,
            height: vw < 400 ? 29 : 37,
            fontSize: vw < 400 ? 23 : 30,
          }}
          dividerStyle={{ color: 'gray', height: 1 }}
          separatorStyle={{ size: '6px' }}
          duration={0.5}
        />
      </div>
    </>
  )
}

export default Countdown
