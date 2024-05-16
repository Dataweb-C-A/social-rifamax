import { useEffect, useState, ChangeEvent } from "react"
import { Card, Button, createStyles, Text, Title, RingProgress, Group, Image, Modal, Stepper, ScrollArea, Divider, TextInput, Select, Checkbox, Accordion } from '@mantine/core';
import PublicNavbar from '../components/PublicNavbar';
import { IconEdit, IconCreditCardPay } from '@tabler/icons-react';
import usadata from '../assets/Usastates.json'
import vendata from '../assets/Venstate.json'
import coldata from '../assets/Colstate.json'

import axios from 'axios';
import { addProduct } from "../store/reducers/cartSlice";
import { useDispatch } from "react-redux";

interface Country {
    name: string;
    code: string;
}
interface SelectOption {
    value: string;
    label: string;
}
function MPI() {
    const useStyles = createStyles((theme) =>
    ({
        cardCharts: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[3],
        },
        ticketsList100: {
            width: '75%',
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
            background: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[3],
            userSelect: 'none',
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
    const numbers: number[] = Array.from({ length: 100 }, (_, index) => index + 1);

    const [textInputValue, setTextInputValue] = useState<string>('');
    const [selectValue, setSelectValue] = useState<string>('');
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

    const selectNumber = (number: number) => {
        if (selectedNumbers.includes(number)) {
            setSelectedNumbers(selectedNumbers.filter((num) => num !== number));
        } else {
            setSelectedNumbers([...selectedNumbers, number]);
        }
    }

    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    const resetStepper = () => {
        setActive(0);
    };

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                const data: any[] = response.data;
                const countriesData: Country[] = data.map(country => ({
                    name: country.name.common,
                    code: country.cca3
                }));

                const usaIndex = countriesData.findIndex(country => country.name === "United States");
                // const colombiaIndex = countriesData.findIndex(country => country.name === "Colombia");
                // const venezuelaIndex = countriesData.findIndex(country => country.name === "Venezuela");

                const usa = usaIndex !== -1 ? countriesData.splice(usaIndex, 1)[0] : undefined;
                // const colombia = countriesData.splice(colombiaIndex, 1)[0];
                // const venezuela = countriesData.splice(venezuelaIndex, 1)[0];

                countriesData.sort((a, b) => a.name.localeCompare(b.name));

                if (usa) {
                    countriesData.unshift(usa);
                }

                setCountries(countriesData);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);


    const handleCountryChange = (selectedOption: string) => {
        if (selectedOption) {
            setSelectedCountry(selectedOption);
            console.log("País seleccionado:", selectedOption);
        }
    };


    let selectData: SelectOption[];

    if (selectedCountry === 'United States') {
        selectData = usadata.map(item => ({
            value: item.value,
            label: item.label
        }));
    } else if (selectedCountry === 'Venezuela') {
        selectData = vendata.map(item => ({
            value: item.value,
            label: item.label
        }));
    } else if (selectedCountry === 'Colombia') {
        selectData = coldata.map(item => ({
            value: item.value,
            label: item.label
        }));
    } else {
        selectData = [
            { value: 'sin estados', label: 'sin estados' },
        ];
    }

    const dispatch = useDispatch();

    const selectOptions = countries.map(country => ({
        value: country.name,
        label: country.name
    }));
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value.replace(/\D/g, '');
        let formattedText = '';

        if (text.length > 0) {
            formattedText = `(${text.slice(0, 3)})`;
        }

        setSelectValue(formattedText);
    };
    function handleTextInputChange(value: string) {
        const numericValue = value.replace(/\D/g, '');

        let formattedValue = numericValue;
        if (numericValue.length > 3) {
            formattedValue = numericValue.slice(0, 3) + '-' + numericValue.slice(3);
        }
        setTextInputValue(formattedValue);
    }
    return (
        <>

            <PublicNavbar />
            <Modal
                opened={opened} onClose={() => {
                    setOpened(false);
                    resetStepper();
                }}
                radius='lg'>

                <Stepper color="green" iconSize={30} active={active} size='sm' onStepClick={setActive} allowNextStepsSelect={false}>


                    <Stepper.Step icon={<IconCreditCardPay size={12} />} w={135} label="Mi compra">
                        <Card className={classes.cardCharts} mt={10} radius="lg">
                            <small>
                                <Title c='white' order={5} ta="center" fw={700} color='black'>Informacion de compra</Title>


                                <Group pb={10} mx={0} position="apart">
                                    <ScrollArea h={366} w="100%" type="never" scrollbarSize={10} offsetScrollbars style={{ overflowX: 'hidden' }}>

                                        <div >
                                            <Group position="apart">
                                                <Card h={40} radius='lg' style={{ width: '50px' }}>
                                                    <Title mt={-3} fw={800} fz="xs" ml={3}>
                                                        05
                                                    </Title>
                                                </Card>

                                                <Text mt={-3} fz="lg" ml={4}>
                                                    5 $
                                                </Text>
                                            </Group>

                                            <Divider my="sm" />
                                        </div>
                                    </ScrollArea>


                                </Group>
                            </small>
                            <Group position="apart">

                                <Text mt={-3} fz="lg" ml={4}>
                                    Total
                                </Text>

                                <Text mt={-3} fz="lg" ml={4}>
                                    300$
                                </Text>
                            </Group>

                            <Divider my="sm" />

                        </Card>
                        <Group position="center" mt="xl">
                            <Button
                                radius='lg' color="green" variant="default" onClick={prevStep}>Volver</Button>
                            <Button
                                radius='lg' color="green" onClick={nextStep}>Continuar</Button>
                        </Group>
                    </Stepper.Step>



                    <Stepper.Step icon={<IconEdit size={12} />} label="Datos cliente" >
                        <Text ta="center" mt={5} fw={750}>Ingrese sus datos</Text>
                        <Group spacing={5}>
                            <TextInput
                                radius="md"
                                style={{ width: '49.2%' }}
                                label='Nombre'
                                placeholder="Nombre"
                            />
                            <TextInput
                                radius="md"
                                style={{ width: '49.2%' }}
                                label='Apellido'
                                placeholder="Apellido"
                            />
                        </Group>
                        <Text mt={5} fz={14}>
                            Cédula o DNI
                        </Text>
                        <Group >
                            <Select
                                w={65}
                                mt={10}
                                radius="md"
                                defaultValue="V-"
                                data={[
                                    { value: 'V-', label: 'V' },
                                    { value: 'E-', label: 'E' },
                                    { value: 'J-', label: 'J' },
                                    { value: 'G-', label: 'G' },
                                ]}
                            />
                            <TextInput
                                placeholder="Cedula o DNI"
                                mt={10}
                                style={{ width: '75%' }}
                                maxLength={8}
                                radius="md"
                            />
                        </Group>

                        <TextInput
                            label='Correo electronico '
                            radius="md"
                            style={{ width: '98%' }}
                            placeholder="Correo electronico"
                            mt={10}
                        />


                        <Select
                            label="Pais de residencia"
                            placeholder="Escoga un pais"
                            radius="md"
                            mt={10}
                            maxDropdownHeight={300}
                            style={{ width: '100%' }}
                            data={selectOptions}
                            onChange={handleCountryChange}
                        />


                        <Select
                            label="Estado de residencia"
                            placeholder="Escoga un Estado"
                            radius="md"
                            mt={10}
                            maxDropdownHeight={400}
                            data={selectData}
                            style={{
                                display: selectedCountry !== 'Venezuela' && selectedCountry !== 'Colombia' && selectedCountry !== 'United States' ? 'none' : 'block'
                            }}
                        />

                        <TextInput
                            radius="md"
                            label='Direccion de envio'
                            mt={10}
                            placeholder="Direccion"
                        />

                        <TextInput
                            label='Codigo postal '
                            radius="md"
                            style={{ width: '98%' }}
                            placeholder="Codigo postal"
                            mt={10}
                        />
                        <Group mt={10}>

                            <TextInput
                                label={<Text>Prefijo</Text>}
                                radius="md"
                                placeholder="000"
                                style={{ width: '40%' }}
                                size="md"
                                maxLength={5}
                                onChange={handleInputChange}
                                value={selectValue}
                            />
                            <TextInput
                                color="red"
                                label={<Text>Número telefónico</Text>}
                                placeholder="136-6487"
                                style={{ width: '55%' }}
                                size="md"
                                radius="md"
                                maxLength={8}
                                onChange={(event) => {
                                    handleTextInputChange(event.currentTarget.value);
                                }}
                                value={textInputValue}
                            />
                        </Group>
                        <Checkbox
                            mt={20}
                            label="Acepto los términos y condiciones"
                        />

                        <Group position="center" mt="xl">
                            <Button
                                radius='lg' color="green" variant="default" onClick={prevStep}>Volver</Button>
                            <Button
                                radius='lg' color="green" onClick={nextStep}>Continuar</Button>
                        </Group>
                    </Stepper.Step>

                    <Stepper.Step icon={<IconCreditCardPay size={12} />} label="Metodos de pago">
                        <Group position="center">

                            <Text fw={700} mt={-3} fz="lg" ml={4}>
                                Total
                            </Text>

                            <Text mt={-3} fw={700} fz="lg" ml={4}>
                                300$
                            </Text>
                        </Group>

                        <Accordion variant="contained" radius="xl" >

                            <Accordion.Item value="Stripe">
                                <Accordion.Control> Tarjeta de crédito (Stripe)</Accordion.Control>

                                <Accordion.Panel>

                                    <TextInput
                                        label='Numero de la tarjeta'
                                        radius="md"
                                        style={{ width: '98%' }}
                                        placeholder="Numero de la tarjeta"
                                        mt={10}
                                    />
                                    <Group >
                                        <TextInput
                                            mt={15}
                                            radius="md"
                                            style={{ width: '45%' }}
                                            label='Fecha de caducidad'
                                            placeholder="Fecha de caducidad"
                                        />
                                        <TextInput
                                            radius="md"
                                            fz={5}
                                            style={{ width: '45%' }}
                                            label='Codigo de verificacion'
                                            placeholder="Codigo de verificacion"
                                        />
                                    </Group>
                                    <Group position="center" mt="xl">
                                        <Button
                                            radius='lg' color="green" variant="default" onClick={prevStep}>Volver</Button>
                                        <Button
                                            radius='lg' color="green" onClick={nextStep}>Continuar</Button>
                                    </Group>
                                </Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item value="Zelle">
                                <Accordion.Control> Transferencia ZELLE</Accordion.Control>
                                <Accordion.Panel>
                                    <Title order={4} c='#56CCF2' >
                                        Zelle: AZSPORTLLC@gmail.com
                                    </Title>

                                    <Text mt={5} fw={700} fz="lg" ml={4}>
                                        A nombre de Javier Diaz
                                    </Text>



                                    <Text size="xl" mt={10} fw={700} fz="lg" ml={4}>
                                        Por favor, usa el número del pedido como referencia de pago y envía el comprobante al teléfono +17862808699 (o a través del chat WhatsApp)

                                    </Text>

                                    <Group position="center" mt="xl">
                                        <Button
                                            radius='lg' color="green" variant="default" onClick={prevStep}>Volver</Button>
                                        <Button
                                            radius='lg' color="green" onClick={nextStep}>Continuar</Button>
                                    </Group>
                                </Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item value="movilv">
                                <Accordion.Control>Pago Movil (Venezuela)</Accordion.Control>


                                <Accordion.Panel>
                                    <Title order={4} c='#56CCF2' >
                                        0412-6312085
                                    </Title>
                                    <Title order={4} c='#56CCF2' >
                                        Banesco Banco Universal
                                    </Title>
                                    <Title order={4} c='#56CCF2' >
                                        RIF J-xxxxxxxx
                                    </Title>
                                    <Title order={4} c='#56CCF2' >
                                        Inversiones XX, C.A

                                    </Title>

                                    <Text ta='center' mt={15} fw={700} fz="lg" ml={4}>
                                        Colocar el nombre del participante en el concepto escrito
                                    </Text>



                                    <Text size="xl" mt={10} fw={700} fz="lg" ml={4}>
                                        Por favor, usa el número del pedido como referencia de pago y envía el comprobante al teléfono +xxxxxxxx (o a través del chat WhatsApp)

                                    </Text>

                                    <Group position="center" mt="xl">
                                        <Button
                                            radius='lg' color="green" variant="default" onClick={prevStep}>Volver</Button>
                                        <Button
                                            radius='lg' color="green" onClick={nextStep}>Continuar</Button>
                                    </Group>
                                </Accordion.Panel>
                            </Accordion.Item>


                        </Accordion>

                    </Stepper.Step>

                    <Stepper.Completed>
                        Completed, click back button to get to previous step
                    </Stepper.Completed>
                </Stepper>
            </Modal>
            <ScrollArea h='100%' type="never">
                <Card mt={15} ml={5} mr={5} radius='md'>

                    <Group position='center'>


                        <Card mb={15} radius='xl' className={classes.cardCharts}>


                            <Image maw={350} mx="auto" radius="md" src="https://www.motortrend.com/uploads/2022/05/2023-Toyota-4Runner-40th-Anniversary-Edition-1.jpg?fit=around%7C875:492" alt="Random image" />



                            <Group position='apart' style={{ maxWidth: '100%', margin: '0 auto' }}>

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
                                        sections={[{ value: 40, color: 'green' }]}
                                        label={
                                            <Text color="green" weight={600} align="center" size="xl">
                                                40%
                                            </Text>
                                        }
                                    />
                                    <Text color="green" weight={700} align="center" size="xl">
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


                        </Card>





                        <div className={classes.ticketsList100}>


                            {numbers.map((number: number, index: number) => (
                                <Card shadow='xl' className={selectedNumbers.includes(number) ? classes.tickets100select : classes.tickets100} onClick={() => {
                                    selectNumber(number)
                                    dispatch(addProduct())
                                }} key={index} >
                                    {number}
                                </Card>
                            ))}
                            <Button mt={15} onClick={() => setOpened(true)} color="green" radius="md" size="md" variant="outline" >
                                Comprar
                            </Button>
                        </div>

                    </Group>


                </Card>
            </ScrollArea>
        </>
    )
}

export default MPI;
