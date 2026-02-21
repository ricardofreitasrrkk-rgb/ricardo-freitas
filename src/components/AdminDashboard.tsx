import { useState, useEffect, FormEvent } from "react";
import { 
  Users, 
  UserCheck, 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  LogOut,
  ChevronRight,
  Search,
  Clock
} from "lucide-react";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"affiliates" | "customers">("affiliates");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    if (res.ok) {
      setIsLoggedIn(true);
      fetchData();
    } else {
      alert("Senha incorreta");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const [affRes, custRes] = await Promise.all([
      fetch("/api/admin/affiliates"),
      fetch("/api/admin/customers")
    ]);
    setAffiliates(await affRes.json());
    setCustomers(await custRes.json());
    setLoading(false);
  };

  const confirmPayment = async (customerId: number) => {
    const value = prompt("Valor do serviço (Kz):", "20000");
    if (!value) return;

    const res = await fetch("/api/admin/confirm-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId, serviceValue: parseInt(value) })
    });
    if (res.ok) fetchData();
  };

  const payReward = async (affiliateId: number) => {
    if (!confirm("Confirmar pagamento de 15.000 Kz para este afiliado?")) return;
    const res = await fetch("/api/admin/pay-reward", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ affiliateId })
    });
    if (res.ok) fetchData();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center p-6">
        <div className="glass p-10 rounded-[40px] w-full max-w-md">
          <h1 className="text-3xl font-black italic mb-8 text-center">ADMIN <span className="text-brand-orange">CAR FR</span></h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Senha de Acesso</label>
              <input 
                type="password" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-orange transition-all"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary w-full py-4">Entrar no Painel</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black text-white">
      {/* Sidebar / Header */}
      <header className="border-b border-white/10 bg-brand-dark/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-black italic">ADMIN <span className="text-brand-orange">CAR FR</span></h1>
            <nav className="hidden md:flex items-center bg-white/5 rounded-xl p-1 ml-8">
              <button 
                onClick={() => setActiveTab("affiliates")}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "affiliates" ? "bg-brand-orange text-white" : "text-gray-400 hover:text-white"}`}
              >
                Afiliados
              </button>
              <button 
                onClick={() => setActiveTab("customers")}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "customers" ? "bg-brand-orange text-white" : "text-gray-400 hover:text-white"}`}
              >
                Clientes
              </button>
            </nav>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2">
            <LogOut size={18} /> Sair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="glass p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-500"><Users size={20} /></div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Afiliados</span>
            </div>
            <p className="text-3xl font-black">{affiliates.length}</p>
          </div>
          <div className="glass p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center text-green-500"><UserCheck size={20} /></div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Clientes</span>
            </div>
            <p className="text-3xl font-black">{customers.length}</p>
          </div>
          <div className="glass p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-brand-orange/20 rounded-xl flex items-center justify-center text-brand-orange"><TrendingUp size={20} /></div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Indicações</span>
            </div>
            <p className="text-3xl font-black">{affiliates.reduce((acc, curr) => acc + curr.referrals_count, 0)}</p>
          </div>
          <div className="glass p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center text-yellow-500"><DollarSign size={20} /></div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Pago</span>
            </div>
            <p className="text-3xl font-black">{affiliates.reduce((acc, curr) => acc + curr.total_paid, 0).toLocaleString()} Kz</p>
          </div>
        </div>

        {/* Content Table */}
        <div className="glass rounded-[40px] overflow-hidden">
          <div className="p-8 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-2xl font-bold">{activeTab === "affiliates" ? "Ranking de Afiliados" : "Lista de Clientes"}</h2>
            <button onClick={fetchData} className="text-brand-orange text-sm font-bold hover:underline">Atualizar Dados</button>
          </div>

          <div className="overflow-x-auto">
            {activeTab === "affiliates" ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-widest">
                    <th className="px-8 py-4">Afiliado</th>
                    <th className="px-8 py-4">Código</th>
                    <th className="px-8 py-4 text-center">Indicações</th>
                    <th className="px-8 py-4">Status Prêmio</th>
                    <th className="px-8 py-4 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {affiliates.map((a) => (
                    <tr key={a.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-8 py-6">
                        <p className="font-bold">{a.name}</p>
                        <p className="text-xs text-gray-500">{a.phone} • {a.neighborhood}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className="bg-brand-orange/10 text-brand-orange px-3 py-1 rounded-lg font-mono font-bold">{a.code}</span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="text-xl font-black">{a.referrals_count}</span>
                      </td>
                      <td className="px-8 py-6">
                        {a.reward_released ? (
                          <span className="inline-flex items-center gap-1 text-green-500 text-xs font-bold bg-green-500/10 px-3 py-1 rounded-full">
                            <CheckCircle size={14} /> DISPONÍVEL
                          </span>
                        ) : a.reward_paid ? (
                          <span className="inline-flex items-center gap-1 text-blue-500 text-xs font-bold bg-blue-500/10 px-3 py-1 rounded-full">
                            <DollarSign size={14} /> PAGO
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-gray-500 text-xs font-bold bg-white/5 px-3 py-1 rounded-full">
                            AGUARDANDO
                          </span>
                        )}
                      </td>
                      <td className="px-8 py-6 text-right">
                        {a.reward_released && (
                          <button 
                            onClick={() => payReward(a.id)}
                            className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
                          >
                            Pagar 15.000 Kz
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-widest">
                    <th className="px-8 py-4">Cliente</th>
                    <th className="px-8 py-4">Veículo / Serviço</th>
                    <th className="px-8 py-4">Indicação</th>
                    <th className="px-8 py-4">Pagamento</th>
                    <th className="px-8 py-4 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-8 py-6">
                        <p className="font-bold">{c.name}</p>
                        <p className="text-xs text-gray-500">{c.phone}</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-medium">{c.car_brand}</p>
                        <p className="text-xs text-brand-orange font-bold uppercase">{c.problem_type}</p>
                      </td>
                      <td className="px-8 py-6">
                        {c.referral_code ? (
                          <span className="text-xs font-mono font-bold text-gray-400">#{c.referral_code}</span>
                        ) : (
                          <span className="text-xs text-gray-600 italic">Nenhuma</span>
                        )}
                      </td>
                      <td className="px-8 py-6">
                        {c.payment_confirmed ? (
                          <div className="flex flex-col">
                            <span className="text-green-500 text-xs font-bold flex items-center gap-1">
                              <CheckCircle size={14} /> CONFIRMADO
                            </span>
                            <span className="text-xs text-gray-500">{c.service_value.toLocaleString()} Kz</span>
                          </div>
                        ) : (
                          <span className="text-gray-500 text-xs font-bold flex items-center gap-1">
                            <Clock size={14} /> PENDENTE
                          </span>
                        )}
                      </td>
                      <td className="px-8 py-6 text-right">
                        {!c.payment_confirmed && (
                          <button 
                            onClick={() => confirmPayment(c.id)}
                            className="bg-brand-orange hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
                          >
                            Confirmar Pagamento
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
