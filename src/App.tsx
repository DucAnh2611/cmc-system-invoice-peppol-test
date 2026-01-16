import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import InvoicesLayout from './layouts/InvoicesLayout';
import InvoicePage from './pages/invoices/page';
import NoContent from './components/NoContent';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/invoices" replace />} />
            <Route path="/invoices" element={<InvoicesLayout />}>
              <Route index element={<InvoicePage />} />
            </Route>
            <Route path="*" element={<NoContent title="Page not found" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
