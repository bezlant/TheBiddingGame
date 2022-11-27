import Image from 'next/image'
import ethsvg from '../public/eth.svg'

export default function BidInput({ userBidAmount, setBidAmount, hasJoined }) {
  return (
    <div className="relative mb-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Image
          alt="ethereum logo"
          src={ethsvg}
          quality={100}
          className="h-5 w-5 text-gray-500 dark:text-gray-400"
        />
      </div>
      <input
        value={userBidAmount}
        onChange={(e) => {
          setBidAmount(e.target.value)
        }}
        type="number"
        name="amount"
        readOnly={hasJoined}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 font-fugaz text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      />
    </div>
  )
}
