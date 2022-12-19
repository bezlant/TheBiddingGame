import { useState } from 'react'
export default function WithdrawModal({ withdrawBid, setShowWithdrawModal }) {
  const [eventId, setEventId] = useState(0)
  return (
    <>
      <div className="fixed inset-4 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden font-fugaz outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-auto max-w-3xl">
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            <div className="flex items-start justify-center rounded-t border-b border-solid border-slate-200 p-4">
              <h3 className="text-xl">Event id</h3>
            </div>
            <div className="relative flex-auto p-4">
              <div className="relative mb-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
                <input
                  value={eventId}
                  onChange={(e) => setEventId(e.target.value)}
                  type="number"
                  name="eventId"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 font-fugaz text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center justify-center rounded-b border-t border-solid border-slate-200 p-4">
              <button
                className="mr-1 mb-1 rounded bg-emerald-500 px-10 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                type="button"
                onClick={() => {
                  setShowWithdrawModal(false)
                  withdrawBid(eventId)
                }}
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  )
}
