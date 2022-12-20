import React from 'react'

export default function BidEventResult({
  team,
  address,
  id,
  setShowEventModal,
}) {
  return (
    <>
      <div className="fixed inset-4 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden font-fugaz outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-auto max-w-3xl">
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            <div className="flex items-start justify-center rounded-t border-b border-solid border-slate-200 p-4">
              <h3 className="text-xl">Successful Bid!</h3>
            </div>
            <div className="relative flex-auto p-4">
              <p className="md:text-l my-1 text-sm leading-relaxed text-slate-500">
                Team: {team}
              </p>
              <p className="md:text-l my-1 break-all text-xs leading-relaxed text-slate-500">
                Address: {address}
              </p>
              <p className="md:text-l my-1 text-sm leading-relaxed text-slate-500">
                id: {id}
              </p>
            </div>
            <div className="flex items-center justify-center rounded-b border-t border-solid border-slate-200 p-4">
              <button
                className="mr-1 mb-1 rounded bg-emerald-500 px-10 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                type="button"
                onClick={() => setShowEventModal(false)}
              >
                Done!
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  )
}
