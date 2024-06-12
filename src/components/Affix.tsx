import { IconArrowUp } from '@tabler/icons-react';
import { useWindowScroll } from '@mantine/hooks';
import { Affix as Ax, Button, Transition, rem } from '@mantine/core';

function Affix({ children }: { children?: React.ReactNode }) {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      {children}
      <Ax position={{ bottom: rem(20), right: rem(20) }} zIndex={9998}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              leftIcon={<IconArrowUp size="1rem" />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Regresar
            </Button>
          )}
        </Transition>
      </Ax>
    </>
  );
}

export default Affix;