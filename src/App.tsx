import {
  QueryProvider,
  AuthProvider,
  TenantProvider,
} from "@gaqno-development/frontcore";
import { PdvPage } from "./pages/PdvPage";

export default function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <TenantProvider>
          <PdvPage />
        </TenantProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
