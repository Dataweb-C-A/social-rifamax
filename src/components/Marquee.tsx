import { ReactNode, CSSProperties } from "react";
import { ScrollArea, createStyles } from "@mantine/core";

interface IMarquee {
  children: ReactNode
  time?: number
  direction?: 'ltr' | 'rtl'
  style?: CSSProperties
}

function Slider({
  children,
  time = 10,
  direction = 'rtl',
  style
}: IMarquee) {
  const marqueeDir = direction === "ltr" 
  ? ["translate(-100%)", "translate(100%)"] 
  : ["translate(100%)", "translate(-100%)"]
  const useStyles = createStyles(() => ({
    marquee: {
      display: 'flex',
      flexDirection: 'row',
      whiteSpace: 'nowrap',
      animation: `marquee ${time}s linear infinite`,
      '@keyframes marquee': {
        '0%': {
          transform: marqueeDir[0]
        },
        '100%': {
          transform: marqueeDir[1]
        }
      }
    }
  }))

  const { classes } = useStyles()

  return (
    <ScrollArea
      w="100%"
      py={-10}
      m={0}
      type="never"
      style={style}
    >
      <div className={classes.marquee}>
        {children}
      </div>
    </ScrollArea>
  )
}

export default Slider