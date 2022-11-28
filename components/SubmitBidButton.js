export default function BidInput({ processBid, userBidAmount, hasJoined }) {
  return (
    <button
      onClick={() => processBid()}
      disabled={Number(userBidAmount) < 0.0009}
      className={`w-full rounded-lg py-2.5 font-fugaz text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-800 ${
        hasJoined ? 'bg-gray-600' : 'bg-blue-600'
      }`}
    >
      {hasJoined ? 'ALREADY ENTERED' : 'ENTER'}
    </button>
  )
}
