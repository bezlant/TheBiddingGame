import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import '@leenguyen/react-flip-clock-countdown/dist/index.css'

export default function Countdown({ timeTillEnd }) {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  )

  return (
    <div className="flex flex-col items-center justify-center font-alfa text-white">
      <h1 className="font-fugaz text-4xl leading-tight">Starts in:</h1>
      <FlipClockCountdown
        className="mt-4"
        to={timeTillEnd}
        labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
        labelStyle={{
          fontSize: 10,
          fontWeight: 500,
          textTransform: 'uppercase',
        }}
        digitBlockStyle={{
          width: vw < 400 ? 21 : 30,
          height: vw < 400 ? 30 : 37,
          fontSize: vw < 400 ? 22 : 30,
        }}
        dividerStyle={{ color: 'gray', height: 1 }}
        separatorStyle={{ size: '6px' }}
        duration={0.5}
      />
    </div>
  )
}
