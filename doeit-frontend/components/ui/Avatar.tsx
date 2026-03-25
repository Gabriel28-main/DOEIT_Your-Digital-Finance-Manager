interface AvatarProps {
  initial: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-12 h-12 text-base',
}

export default function Avatar({ initial, size = 'md' }: AvatarProps) {
  return (
    <div className={`${sizeMap[size]} rounded-full flex items-center justify-center
                     font-bold text-white flex-shrink-0`}
         style={{ background: 'linear-gradient(135deg, #e11d48, #be123c)' }}>
      {initial}
    </div>
  )
}
