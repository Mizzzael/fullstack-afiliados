'use client'
import Dashboard from "@root/presentation/common/components/Dashboard";
import TransactionsList from "@root/presentation/transaction/components/TransactionsList";
import AuthProvider from "@root/provider/AuthProvider";

export default function Home() {
  return (
    <AuthProvider>
        <Dashboard>
          <TransactionsList />
        </Dashboard>
    </AuthProvider>
  )
}
