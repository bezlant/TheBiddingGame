import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import '@leenguyen/react-flip-clock-countdown/dist/index.css'

export default function Countdown({ timeTillEnd }) {
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
        digitBlockStyle={{ width: 30, height: 37, fontSize: 30 }}
        dividerStyle={{ color: 'gray', height: 1 }}
        separatorStyle={{ size: '6px' }}
        duration={0.5}
      />
    </div>
  )
}
