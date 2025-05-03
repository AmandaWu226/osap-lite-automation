import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./AppContext";
import AppLayout from "./AppLayout";
import IndexPage from "./pages/IndexPage";
import Step1School from "./pages/Step1School";
import Step2Marital from "./pages/Step2Marital";
import Step3Income from "./pages/Step3Income";
import SummaryPage from "./pages/SummaryPage";

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/step1" element={<Step1School />} />
          <Route path="/step2" element={<Step2Marital />} />
          <Route path="/step3" element={<Step3Income />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}