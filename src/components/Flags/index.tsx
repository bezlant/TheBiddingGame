import { ReactComponent as Germany } from '@/assets/svg/flag-icons/de.svg'
import { ReactComponent as France } from '@/assets/svg/flag-icons/fr.svg'

const Flags = () => {
  const flagClasses =
    'h-16 w-9/12 transition-all duration-300 ease-linear hover:w-full md:h-20'
  return (
    <div className="flex w-screen">
      <div className="flex flex-1">
        <Germany
          preserveAspectRatio="none"
          className={`${flagClasses} clip-right`}
        />
      </div>
      <div className="flex flex-1 justify-end">
        <France
          preserveAspectRatio="none"
          className={`${flagClasses} clip-left`}
        />
      </div>
    </div>
  )
}

export default Flags
