import { CSSProperties, ReactNode } from 'react'

type Shortcuts = 'flexDirection' | 'alignItems' | 'justifyContent' | 'flexGrow' | 'gap'

export type FlexProps = {
  direction?: CSSProperties['flexDirection']
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  grow?: CSSProperties['flexGrow']
  gap?: CSSProperties['gap']
  children: ReactNode
  style?: Omit<CSSProperties, Shortcuts>
  className?: string
}

export const FlexBox = ({ children, direction, align, justify, grow, gap, style = {}, className }: FlexProps) => {
  const flexStyle: CSSProperties = {
    display: 'flex',
    flexDirection: direction || 'row',
    alignItems: align || 'flex-start',
    justifyContent: justify || 'flex-start',
    gap: gap || '0',
    flexGrow: grow || '1',
    width: '100%',
  }

  return (
    <div style={{ ...style, ...flexStyle }} className={`Flex ${!!className ? className : ''}`}>
      {children}
    </div>
  )
}

export const FlexRow = (props: Omit<FlexProps, 'direction'>) => {
  return <FlexBox direction="row" {...props} className={`Row ${!!props.className ? props.className : ''}`} />
}

export const FlexColumn = (props: Omit<FlexProps, 'direction'>) => {
  return <FlexBox direction="column" {...props} className={`Column ${!!props.className ? props.className : ''}`} />
}

export const Flex = {
  Box: FlexBox,
  Row: FlexRow,
  Column: FlexColumn,
}
