import clx from 'classnames'

import { ReactComponent as Germany } from '@/assets/svg/flag-icons/de.svg'
import { ReactComponent as France } from '@/assets/svg/flag-icons/fr.svg'
import { TEAM } from '@/constants'

type FlagsProps = {
  setTeamChosen: React.Dispatch<React.SetStateAction<TEAM>>
  teamChosen: TEAM
}

const Flags = ({ setTeamChosen, teamChosen }: FlagsProps) => {
  const handleLeftClick = () => setTeamChosen(TEAM.LEFT)
  const handleRightClick = () => setTeamChosen(TEAM.RIGHT)

  return (
    <div className="flex w-screen">
      <div className="flex flex-1">
        <Germany
          onClick={handleLeftClick}
          preserveAspectRatio="none"
          className={clx(
            'h-16 transition-all duration-300 ease-linear md:h-20',
            {
              ['w-full']: teamChosen === TEAM.LEFT,
              ['w-8/12 hover:w-10/12']: teamChosen !== TEAM.LEFT,
              ['clip-right']: true
            }
          )}
        />
      </div>
      <div className="flex flex-1 justify-end">
        <France
          onClick={handleRightClick}
          preserveAspectRatio="none"
          className={clx(
            'h-16 transition-all duration-300 ease-linear md:h-20',
            {
              ['w-full']: teamChosen === TEAM.RIGHT,
              ['w-8/12 hover:w-10/12']: teamChosen !== TEAM.RIGHT,
              ['clip-left']: true
            }
          )}
        />
      </div>
    </div>
  )
}

export default Flags
