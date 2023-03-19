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
        className="font-fugaz block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      />
    </div>
  )
}

export default BidInput
