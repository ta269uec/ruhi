import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { RanksScreen } from "./screens/RanksScreen";
import { MapScreen } from "./screens/MapScreen";
import { WatchScreen } from "./screens/WatchScreen";
import { NotesScreen } from "./screens/NotesScreen";
import { SliceDetailScreen } from "./screens/SliceDetailScreen";
import { AboutScreen } from "./screens/AboutScreen";
import { getStoredTab } from "./lib/storage";
import { DataProvider } from "./lib/DataContext";
import { LayoutModeProvider } from "./lib/LayoutModeContext";

function RootRedirect() {
  const tab = getStoredTab();
  return <Navigate to={tab ? `/${tab}` : "/ranks"} replace />;
}

export default function App() {
  return (
    <LayoutModeProvider>
      <DataProvider>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/ranks" element={<RanksScreen />} />
            <Route path="/map" element={<MapScreen />} />
            <Route path="/watch" element={<WatchScreen />} />
            <Route path="/notes" element={<NotesScreen />} />
            <Route path="/slice/:key" element={<SliceDetailScreen />} />
            <Route path="/about" element={<AboutScreen />} />
            <Route path="*" element={<Navigate to="/ranks" replace />} />
          </Route>
        </Routes>
      </DataProvider>
    </LayoutModeProvider>
  );
}
