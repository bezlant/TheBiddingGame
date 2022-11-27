export default function PotentialGain({ gain }) {
  return (
    <div className="mt-4">
      <p className="mb-4 text-2xl font-extrabold leading-none tracking-wide text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        Potential:{' '}
        <span className="underline-offset-3 underline decoration-green-200 decoration-8 dark:decoration-green-400">
          {gain}
        </span>
      </p>
    </div>
  )
}
