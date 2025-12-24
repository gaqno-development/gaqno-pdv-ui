import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@gaqno-dev/frontcore/components/providers'
import { QueryProvider } from '@gaqno-dev/frontcore/components/providers'
import { AuthProvider } from '@gaqno-dev/frontcore/contexts'
import { AppProvider } from '@gaqno-dev/frontcore/components/providers'
import { WhiteLabelProvider } from '@gaqno-dev/frontcore/components/providers'
import { TenantProvider } from '@gaqno-dev/frontcore/contexts'

function PDVPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">PDV Module</h1>
      <p className="text-muted-foreground mt-2">PDV functionality coming soon...</p>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <AuthProvider>
          <AppProvider>
            <WhiteLabelProvider>
              <TenantProvider>
                <BrowserRouter basename="/pdv">
                  <Routes>
                    <Route path="/*" element={<PDVPage />} />
                  </Routes>
                </BrowserRouter>
              </TenantProvider>
            </WhiteLabelProvider>
          </AppProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}

