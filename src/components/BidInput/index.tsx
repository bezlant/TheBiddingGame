import { ReactComponent as EthereumSVG } from '@/assets/svg/eth.svg'

const BidInput = () => {
  return (
    <div className="relative flex justify-center">
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <EthereumSVG className="h-5 w-5" />
      </div>
      <input
        type="number"
        name="amount"
        className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 pl-10 font-fugaz text-sm text-white placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
      />
    </div>
  )
}

export default BidInput
