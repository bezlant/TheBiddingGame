import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import '@leenguyen/react-flip-clock-countdown/dist/index.css'

export default function Countdown({ timeTillEnd }) {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  )
  // Work on responsiveness

  return (
    <div className="flex flex-col items-center justify-center font-sport text-white">
      <h1 className="font-sport text-4xl leading-tight">Starts in:</h1>
      <FlipClockCountdown
        className="mt-4"
        to={timeTillEnd}
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
  )
}
