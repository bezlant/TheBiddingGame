export default function Tooltip() {
  return (
    <div className="group relative top-6 right-1 z-10 flex items-end justify-end">
      <svg
        className="h-5 w-5 text-gray-200 hover:text-yellow-300"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
      <div className="absolute top-0 bottom-0 mt-6 hidden flex-col items-center group-hover:flex">
        <div className="h-3 w-3 rotate-45 bg-black"></div>
        <span className="relative z-10 bg-black p-2 text-xs leading-none text-white shadow-lg">
          Fee: <br /> 3% for the community <br /> 2% for devs
        </span>
      </div>
    </div>
  )
}
