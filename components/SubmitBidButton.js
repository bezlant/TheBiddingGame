export default function BidInput({ processBid, userBidAmount, hasJoined }) {
  return (
    <button
      onClick={() => (hasJoined ? processBid(true) : processBid())}
      disabled={Number(userBidAmount) < 0.0009}
      className={`w-full rounded-lg bg-blue-600 py-2.5 font-fugaz text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-800`}
    >
      {hasJoined ? 'WITHDRAW' : 'ENTER'}
    </button>
  )
}
