export default function PoolSizeBar({ leftPool, rightPool }) {
  const width = (leftPool / (leftPool + rightPool)) * 100
  const smallestWidth = 28
  return (
    // Show values on the left and right
    <div className="mt-5 flex h-6 w-full justify-between rounded bg-red-500 font-alfa text-white">
      <div
        className="inline-block h-6 rounded bg-blue-500"
        style={{
          width: `${width < smallestWidth ? smallestWidth : width}%`,
        }}
      >
        <div>
          <span className="pl-2">{leftPool} ETH</span>
        </div>
      </div>
      <span className="pr-2">{rightPool} ETH</span>
    </div>
  )
}
