export default function PoolSizeBar({ leftPool, rightPool }) {
  return (
    <div className="mb-10 flex h-6 w-full justify-between rounded-full bg-red-500 font-alfa text-white md:w-8/12 xl:w-4/12">
      <div
        className="inline-block h-6 rounded-full bg-blue-500"
        style={{ width: `${(leftPool / (leftPool + rightPool)) * 100}%` }}
      >
        <div>
          <span className="pl-2">{leftPool} ETH</span>
        </div>
      </div>
      <span className="pr-2">{rightPool} ETH</span>
    </div>
  )
}
