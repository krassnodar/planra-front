import "./App.css";
import "./i18n";
import { useEffect, useState } from "react";
import { RootStore } from "./store/RootStore";
import { initState, RootStoreProvider } from "./store/initStore";
import Router from "./router/Router";

function App() {
  const [rootStore, setRootStore] = useState<RootStore | null>(null);

  useEffect(() => {
    const init = () => {
      const store = initState();
      setRootStore(store);
    };

    init();
  }, []);

  if (rootStore === null) {
    return null;
  }

  return (
    <RootStoreProvider value={rootStore}>
      <Router />
    </RootStoreProvider>
  );
}

export default App;
