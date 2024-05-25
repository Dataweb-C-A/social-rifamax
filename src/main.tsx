import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider, Text } from '@mantine/core';
import Loading from './components/Loading.tsx';
import { Provider, useSelector } from 'react-redux'
import { store, RootState } from './store'
import { BrowserRouter as Router } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import { SpotlightProvider } from '@mantine/spotlight';
import { IconMapSearch, IconSearch } from '@tabler/icons-react';
import { actions } from './utils/actions.tsx';
import './index.css';
import './i18n.ts'

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <StrictMode>
      <Provider store={store}>
        {children}
      </Provider>
    </StrictMode>
  )
}

const AppWrapper = () => {
  const mode = useSelector((state: RootState) => state.theme.mode)
  const [App, setApp] = useState<React.FC | null>(null);

  useEffect(() => {
    let importPromise;
    if (import.meta.env.MODE === 'web') {
      importPromise = import('./App.tsx');
    } else {
      importPromise = import('./Default.tsx');
    }

    importPromise.then(module => {
      setApp(() => module.default);
    });
  }, []);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: mode,
        fontFamily: 'Montserrat, sans-serif',
        other: {
          bgDark: "#1A1B1E",
          bgLight: "#EEF5FF",
          defaultFontSize: "1rem"
        },
      }}
    >
      <Notifications position="top-right" zIndex={999999} limit={3} />
      <SpotlightProvider
        actions={actions()}
        searchIcon={<IconSearch size="1.2rem" />}
        searchPlaceholder="Buscar..."
        shortcut={"ctrl + B"}
        zIndex={999999}
        centered
        nothingFoundMessage={
          <div style={{ width: '100%', textAlign: 'center', justifyContent: 'center', padding: '50px 0' }}>
            <IconMapSearch size="3.2rem" />
            <Text fw={700} fz={22}>No se encontraron resultados</Text>
          </div>
        }
      >
        {!App ? <Loading full message="Loading..." /> : <App />}
      </SpotlightProvider>
    </MantineProvider>
  );
}

export default function Main() {
  return (
    <Layout>
      <Router>
        <AppWrapper />
      </Router>
    </Layout>
  );
}

createRoot(document.getElementById('root')!).render(<Main />);

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*');
