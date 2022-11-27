export default function BidInput({ processBid, userBidAmount }) {
  return (
    <button
      onClick={() => processBid()}
      type="button"
      value="PAY"
      disabled={Number(userBidAmount) < 0.0009}
      className={`mr-2 rounded-lg bg-blue-700 px-5 py-2.5 font-fugaz text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
    >
      PAY
    </button>
  )
}
