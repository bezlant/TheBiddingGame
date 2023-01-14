import clsxm from '@/lib/clsxm'
import { FC } from 'react'

interface SvgProps {
  preserveAspectRatio: string
  className: string
}

interface FlagsProps {
  Left: FC<SvgProps>
  Right: FC<SvgProps>
}

const Flags: FC<FlagsProps> = ({ Left, Right }: FlagsProps) => {
  const flagClasses =
    'h-16 w-9/12 transition-all duration-300 ease-linear hover:w-full md:h-20'
  return (
    <div className='flex w-screen'>
      <div className='flex flex-1'>
        <Left
          preserveAspectRatio='none'
          className={clsxm(flagClasses, 'clip-right')}
        />
      </div>
      <div className='flex flex-1 justify-end'>
        <Right
          preserveAspectRatio='none'
          className={clsxm(flagClasses, 'clip-left')}
        />
      </div>
    </div>
  )
}

export default Flags
