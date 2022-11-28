export default function PoolSizeBar({ leftPool, rightPool }) {
  return (
    // Show values on the left and right
    <div className="mt-5 flex h-6 w-full justify-between rounded-full bg-red-500 font-alfa text-white">
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
