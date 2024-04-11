import React, { useState, useEffect } from 'react';
import { Card, Button, createStyles, Text, Title, RingProgress, Group, Image, Grid } from '@mantine/core';
import { IconShoppingBag } from '@tabler/icons-react';

function MPI() {
    const useStyles = createStyles((theme) =>
    ({
        cartainfo: {
            width: '37vh',
            [`@media (min-width: 1281px)`]: {
                width: '77vh',
            }
        },
        ticketsList100: {
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
            [`@media (min-width: 1281px)`]: {
                gap: '9px',
            }
        },
        tickets100: {
            width: 'calc(20% - 10px)',
            background: '#191B1E',
            userSelect: 'none',

            border: '1px solid grey',
            textDecoration: 'none',
            cursor: 'pointer',
            [`@media (min-width: 1281px)`]: {
                width: 'calc(10% - 9px)',
            }
        },
        tickets100select: {
            width: 'calc(20% - 10px)',
            background: 'green',
            userSelect: 'none',
            textDecoration: 'none',
            cursor: 'pointer',
            [`@media (min-width: 1281px)`]: {
                width: 'calc(10% - 9px)',
            }
        }
    }));

    const { classes } = useStyles()

    const [opened, setOpened] = useState(false);
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
    const numbers: number[] = Array.from({ length: 25 }, (_, index) => index + 1);

    return (
        <Card mt={15} ml={5} mr={5} radius='md'>



            <Card mb={15} radius='xl' style={{ background: '#191B1E' }}>

                <Grid>
                    <Grid.Col md={6} lg={6}>

                        <div style={{ maxWidth: '100%', margin: '0 auto' }}>
                            <Image mx="auto" width='100%' height={300} radius="md" src="https://www.motortrend.com/uploads/2022/05/2023-Toyota-4Runner-40th-Anniversary-Edition-1.jpg?fit=around%7C875:492" alt="Random image" />
                        </div>

                    </Grid.Col>
                    <Grid.Col md={6} lg={6}>
                        <Group position='center' style={{ maxWidth: '100%', margin: '0 auto' }}>

                            <div style={{ marginRight: '20px' }}>
                                <Title order={4} c='#56CCF2' >
                                    RIFA
                                </Title>
                                <Title order={6} >
                                    Rifa de 4Runner
                                </Title>
                                <Title order={4} c='#56CCF2' >
                                    Tipo
                                </Title>
                                <Title order={6} >
                                    100 Numeros
                                </Title>
                                <Title order={4} c='#56CCF2' >
                                    Fecha
                                </Title>
                                <Title order={6} >
                                    10 / 04 / 2024
                                </Title>

                                <Title order={4} c='#56CCF2' >
                                    Loteria
                                </Title>
                                <Title order={6} >
                                    Zulia 7A
                                </Title>
                            </div>

                            <div >

                                <RingProgress
                                    sections={[{ value: 40, color: 'blue' }]}
                                    label={
                                        <Text color="blue" weight={600} align="center" size="xl">
                                            40%
                                        </Text>
                                    }
                                />
                                <Text color="blue" weight={700} align="center" size="xl">
                                    Progreso
                                </Text>

                            </div>
                        </Group>
                        <div>

                            <Title order={4} mt={5} ta='center'>Tiempo restante</Title>
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

                                <Text ml={45} fz="xs">Dias</Text>
                                <Text fz="xs">Horas</Text>
                                <Text fz="xs">Minuto</Text>
                                <Text mr={25} fz="xs">Segundos</Text>

                            </Group>
                        </div>

                    </Grid.Col>

                </Grid>



            </Card>





            <div className={classes.ticketsList100}>


                {numbers.map((number, index) => (
                    <Card className={classes.tickets100} key={index} >
                        {number}
                    </Card>
                ))}
            </div>
            <Button mt={15} fullWidth onClick={() => setOpened(true)} color="green" radius="md" size="md"  variant="outline" >
                                        Comprar
                                    </Button>
        </Card>
    )
}

export default MPI;
