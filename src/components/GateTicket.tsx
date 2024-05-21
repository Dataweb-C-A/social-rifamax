import { motion } from 'framer-motion'
import { Text, createStyles, useMantineTheme } from '@mantine/core'
import { useState, useEffect } from 'react'

interface IGateTicket {
  status: 'available' | 'reserved' | 'sold' | 'winner'
  value: number
}

function GateTicket({ status = 'sold', value }: IGateTicket) {
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const [ticketStatus, setTicketStatus] = useState<'available' | 'reserved' | 'sold' | 'winner' | 'selected'>(status)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const theme = useMantineTheme()

  const selectBackground = (
    status: 'available' | 'reserved' | 'sold' | 'winner' | 'selected'
  ) => {
    return ({
      available: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      selected: theme.colorScheme === 'dark' ? theme.colors.green[8] : theme.colors.teal[2],
      reserved: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1],
      sold: theme.colorScheme === 'dark' ? theme.colors.red[9] : theme.colors.red[6],
      winner: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.yellow[0]
    }[status])
  }

  const useStyles = createStyles((theme) => ({
    gate: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'space-evenly',
      width: '80px',
      flexWrap: 'wrap',
      boxShadow: theme.shadows.xs,
      border: `0.0625rem solid ${theme.colorScheme === 'dark' ? 'transparent' : '#dee2e6'}`,
      borderRadius: theme.radius.xs,
      background: selectBackground(ticketStatus),
      cursor: 'pointer'
    },
    counter: {
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
      width: '80px',
      height: '25px',
      margin: '0 5px 0 5px',
      borderRadius: theme.radius.sm,
      background: isSelected ? 'red' : 'transparent',
      zIndex: 99999
    }
  }))
  const { classes } = useStyles()

  const selectTicket = () => {
    if (ticketStatus === 'available') {
      setIsSelected(true)
      setTimeLeft(5 * 60) // 5 minutes
      setTicketStatus('selected')
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSelected) {
      timer = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000); // decrease timeLeft by 1 every second
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isSelected]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsSelected(false);
    }
  }, [timeLeft]);

  return (
    <motion.div
      className={classes.gate}
      initial={{ scale: 1 }}
      whileHover={{ scale: ticketStatus, zIndex: 9999 }}
      onClick={selectTicket}
    >
      {value}
      <div className={classes.counter}>
        <Text ta="center">
          {isSelected && `${Math.floor(timeLeft / 60)}:${timeLeft % 60}`}
        </Text>
      </div>
    </motion.div>
  )
}

export default GateTicket