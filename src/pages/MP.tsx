import { useState, useEffect } from 'react';
import { Card, Button, Title, Text, Group, Image } from '@mantine/core';
import { IconShoppingBag } from '@tabler/icons-react';
import PublicNavbar from '../components/PublicNavbar';
// import RaffleCard from '../components/RaffleCard';

function MP() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date('2024-05-05') - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  }

  function formatNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  return (
    <>
      <PublicNavbar />
      {/* <RaffleCard data={{ id: 1, title: '4Runner 2023 TRD', background: "https://www.motortrend.com/uploads/2022/05/2023-Toyota-4Runner-40th-Anniversary-Edition-1.jpg?fit=around%7C875:492" }} /> */}
      <Card mt={15} ml={35} mr={35} radius='md'>
            <Group w='100%' position="apart">
                <div style={{margin:'auto'}}>

                    <Title  order={1}> Rifa de 4Runner</Title>

                    <Title order={4} ta='center'>Tiempo restante</Title>
                    <Group position="center">
                        <Card w={50} withBorder ta="center" mx="auto">
                            <span>{formatNumber(timeLeft.days)}</span>
                        </Card>
                        <Card w={50} withBorder ta="center" mx="auto">
                            <span>{formatNumber(timeLeft.hours)}</span>
                        </Card>
                        <Card w={50} withBorder ta="center" mx="auto">
                            <span>{formatNumber(timeLeft.minutes)}</span>
                        </Card>
                        <Card w={50} withBorder ta="center" mx="auto">
                            <span>{formatNumber(timeLeft.seconds)}</span>
                        </Card>
                        {Object.keys(timeLeft).length === 0 && (
                            <span>Countdown Finished!</span>
                        )}
                    </Group>
                    <Group position='apart'>

                    <Text ml={15} fz="xs">Dias</Text>
                    <Text fz="xs">Horas</Text>
                    <Text fz="xs">Minuto</Text>
                    <Text fz="xs">Segundos</Text>

                    </Group>
                    <Button leftIcon={<IconShoppingBag/>} variant="outline" fullWidth mt={15} color="teal" radius="md" size="md" onClick={() => { window.location.href = '/rafflesi'; }}>
  Comprar 
</Button>
                </div>
                <div >
                    <Image style={{margin:'auto'}}  maw='100%' radius="md" src="https://www.motortrend.com/uploads/2022/05/2023-Toyota-4Runner-40th-Anniversary-Edition-1.jpg?fit=around%7C875:492" alt="Random image" />
                </div>
            </Group>
        </Card>
    </>
  )
}

export default MP;
