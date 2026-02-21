import { useState, useEffect, FormEvent } from "react";
import { 
  Wrench, 
  Cpu, 
  Key, 
  Zap, 
  Settings, 
  Disc, 
  MessageCircle, 
  ChevronRight, 
  Users, 
  Trophy, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  Phone,
  MapPin,
  Instagram,
  Facebook
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-brand-black/90 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center">
            <Wrench className="text-white" size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter italic">CAR <span className="text-brand-orange">FR</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#servicos" className="hover:text-brand-orange transition-colors font-medium">Serviços</a>
          <a href="#ganhar" className="hover:text-brand-orange transition-colors font-medium">Ganhar Dinheiro</a>
          <a href="#contato" className="hover:text-brand-orange transition-colors font-medium">Contato</a>
          <button onClick={() => document.getElementById('contato')?.scrollIntoView({behavior: 'smooth'})} className="btn-primary py-2 px-6 text-sm">Agendar Agora</button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-brand-dark border-b border-white/10 p-6 flex flex-col gap-4"
          >
            <a href="#servicos" onClick={() => setIsOpen(false)} className="text-lg font-medium">Serviços</a>
            <a href="#ganhar" onClick={() => setIsOpen(false)} className="text-lg font-medium">Ganhar Dinheiro</a>
            <a href="#contato" onClick={() => setIsOpen(false)} className="text-lg font-medium">Contato</a>
            <button onClick={() => { setIsOpen(false); document.getElementById('contato')?.scrollIntoView({behavior: 'smooth'}) }} className="btn-primary w-full">Agendar Agora</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-orange/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-sm font-bold mb-6">
            <Zap size={16} />
            <span>SOLUÇÕES AUTOMOTIVAS EM LUANDA</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 italic">
            Problemas Elétricos no Seu Carro? <br />
            <span className="text-brand-orange">A CAR FR Resolve</span> e Você Ganha!
          </h1>
          <p className="text-lg text-gray-400 mb-10 max-w-xl">
            Diagnóstico avançado, programação de ECU e mecânica de precisão. Indique amigos e receba prêmios em dinheiro direto na sua conta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => document.getElementById('contato')?.scrollIntoView({behavior: 'smooth'})} className="btn-primary flex items-center justify-center gap-2">
              Resolver Meu Problema <ChevronRight size={20} />
            </button>
            <button onClick={() => document.getElementById('ganhar')?.scrollIntoView({behavior: 'smooth'})} className="btn-secondary flex items-center justify-center gap-2">
              Quero Ganhar Dinheiro
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=1000" 
              alt="Oficina Mecânica" 
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent" />
          </div>
          
          {/* Floating Stats */}
          <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl flex items-center gap-4 z-20">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold">100%</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Garantia de Serviço</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { icon: <Cpu />, title: "Diagnóstico Eletrônico", desc: "Varredura completa em todos os sistemas do veículo com tecnologia de ponta." },
    { icon: <Settings />, title: "Programação ECU", desc: "Otimização e reprogramação de módulos de controle do motor para melhor performance." },
    { icon: <Key />, title: "Codificação de Chaves", desc: "Programação de Smart Keys e chaves codificadas para todas as marcas." },
    { icon: <Zap />, title: "Eletricidade Automotiva", desc: "Reparação de chicotes, alternadores, motores de arranque e sistemas de iluminação." },
    { icon: <Wrench />, title: "Mecânica Geral", desc: "Manutenção preventiva e corretiva de motores, suspensão e travões." },
    { icon: <Disc />, title: "Caixa Automática", desc: "Diagnóstico e reparação especializada em transmissões automáticas." },
  ];

  return (
    <section id="servicos" className="py-24 bg-brand-dark/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black italic mb-4">NOSSOS <span className="text-brand-orange">SERVIÇOS</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Tecnologia alemã aplicada à frota de Luanda. Especialistas em veículos modernos e sistemas complexos.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-3xl group hover:border-brand-orange/50 transition-all"
            >
              <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange mb-6 group-hover:bg-brand-orange group-hover:text-white transition-all">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{s.desc}</p>
              <button onClick={() => document.getElementById('contato')?.scrollIntoView({behavior: 'smooth'})} className="text-brand-orange font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                SOLICITAR ORÇAMENTO <ChevronRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AffiliateSection = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", neighborhood: "" });
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/affiliates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedCode(data.code);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ganhar" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-bold mb-6">
            <Trophy size={16} />
            <span>SISTEMA DE AFILIADOS ATIVO</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black italic mb-6 leading-tight">
            Indique 2 Clientes e <br />
            <span className="text-brand-orange">Ganhe 15.000 Kz</span>
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            É simples: cadastre-se, receba seu código exclusivo e compartilhe com amigos. Quando 2 pessoas indicadas por você realizarem um serviço pago, o dinheiro é seu!
          </p>
          
          <ul className="space-y-4 mb-10">
            {[
              "Cadastro rápido e gratuito",
              "Código automático exclusivo",
              "Acompanhamento transparente",
              "Pagamento imediato via Multicaixa Express"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-300">
                <div className="w-6 h-6 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange">
                  <CheckCircle2 size={14} />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass p-8 md:p-12 rounded-[40px] relative">
          <AnimatePresence mode="wait">
            {!generatedCode ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold mb-8">Começar a Ganhar</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Nome Completo</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-orange transition-all"
                    placeholder="Ex: João Manuel"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Telefone (WhatsApp)</label>
                  <input 
                    required
                    type="tel" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-orange transition-all"
                    placeholder="9xx xxx xxx"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Bairro</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-orange transition-all"
                    placeholder="Ex: Talatona"
                    value={formData.neighborhood}
                    onChange={e => setFormData({...formData, neighborhood: e.target.value})}
                  />
                </div>
                {error && <p className="text-red-500 text-sm flex items-center gap-2"><AlertCircle size={16} /> {error}</p>}
                <button 
                  disabled={loading}
                  type="submit" 
                  className="btn-primary w-full py-4 text-lg"
                >
                  {loading ? "Gerando..." : "Gerar Meu Código"}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-bold mb-2">Sucesso!</h3>
                <p className="text-gray-400 mb-8 text-lg">Seu código de afiliado é:</p>
                <div className="bg-brand-orange text-white text-5xl font-black py-6 px-10 rounded-3xl mb-8 inline-block tracking-widest shadow-2xl shadow-brand-orange/30">
                  {generatedCode}
                </div>
                <p className="text-sm text-gray-400 mb-8">
                  Tire um print ou anote seu código. <br />
                  Compartilhe agora e comece a ganhar!
                </p>
                <button 
                  onClick={() => setGeneratedCode(null)}
                  className="text-brand-orange font-bold hover:underline"
                >
                  Cadastrar outro
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const CampaignSection = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 5, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const prizes = [
    { label: "Diagnóstico", value: "10.000 Kz" },
    { label: "Programação", value: "15.000 Kz" },
    { label: "Codificação", value: "10.000 Kz" },
    { label: "Eletricidade", value: "20.000 Kz" },
    { label: "Caixa Automática", value: "25.000 Kz" },
  ];

  return (
    <section className="py-24 bg-brand-orange/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass p-12 rounded-[50px] border-brand-orange/20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black italic mb-6">SORTEIOS POR <span className="text-brand-orange">SERVIÇO</span></h2>
              <p className="text-gray-400 mb-8">Realize qualquer um destes serviços e concorra automaticamente a prêmios em dinheiro todo mês!</p>
              
              <div className="grid grid-cols-2 gap-4">
                {prizes.map((p, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">{p.label}</p>
                    <p className="text-xl font-bold text-brand-orange">{p.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-brand-orange font-bold mb-6">
                <Clock size={20} />
                <span>CAMPANHA ATIVA - TERMINA EM:</span>
              </div>
              <div className="flex justify-center gap-4">
                {[
                  { v: timeLeft.days, l: "DIAS" },
                  { v: timeLeft.hours, l: "HORAS" },
                  { v: timeLeft.minutes, l: "MIN" },
                  { v: timeLeft.seconds, l: "SEG" },
                ].map((t, i) => (
                  <div key={i} className="w-20 md:w-24">
                    <div className="bg-brand-black border border-white/10 rounded-2xl py-4 text-3xl md:text-4xl font-black mb-2">
                      {String(t.v).padStart(2, '0')}
                    </div>
                    <span className="text-[10px] text-gray-500 font-bold tracking-widest">{t.l}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => document.getElementById('contato')?.scrollIntoView({behavior: 'smooth'})} className="btn-primary mt-10 w-full md:w-auto">
                Quero Participar Agora
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", car_brand: "", problem_type: "", referral_code: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contato" className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-black italic mb-8">FALE COM UM <span className="text-brand-orange">ESPECIALISTA</span></h2>
          <p className="text-gray-400 mb-12 text-lg">Não deixe o problema do seu carro piorar. Agende um diagnóstico hoje mesmo e tenha a tranquilidade que você merece.</p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Localização</h4>
                <p className="text-gray-400">Luanda, Angola - Atendimento em domicílio disponível.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">WhatsApp</h4>
                <p className="text-gray-400">+244 934 764 904</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Horário</h4>
                <p className="text-gray-400">Segunda a Sábado: 08:00 - 18:00</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-12">
            <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:text-brand-orange transition-all"><Instagram size={20} /></a>
            <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:text-brand-orange transition-all"><Facebook size={20} /></a>
          </div>
        </div>

        <div className="glass p-8 md:p-12 rounded-[40px]">
          {status === "success" ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-3xl font-bold mb-4">Solicitação Enviada!</h3>
              <p className="text-gray-400 mb-8">Entraremos em contato via WhatsApp em poucos minutos.</p>
              <button onClick={() => setStatus("idle")} className="btn-secondary">Enviar outra</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Nome</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-orange transition-all"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Telefone</label>
                  <input 
                    required
                    type="tel" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-orange transition-all"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Marca/Modelo do Carro</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-orange transition-all"
                  placeholder="Ex: Toyota Hilux 2022"
                  value={formData.car_brand}
                  onChange={e => setFormData({...formData, car_brand: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Tipo de Problema</label>
                <select 
                  required
                  className="w-full bg-brand-black border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-orange transition-all appearance-none"
                  value={formData.problem_type}
                  onChange={e => setFormData({...formData, problem_type: e.target.value})}
                >
                  <option value="">Selecione o serviço</option>
                  <option value="Diagnóstico">Diagnóstico Eletrônico</option>
                  <option value="Programação">Programação ECU</option>
                  <option value="Codificação">Codificação de Chaves</option>
                  <option value="Eletricidade">Eletricidade</option>
                  <option value="Mecânica">Mecânica</option>
                  <option value="Caixa">Caixa Automática</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Código de Indicação (Opcional)</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-orange transition-all"
                  placeholder="Ex: FR1234"
                  value={formData.referral_code}
                  onChange={e => setFormData({...formData, referral_code: e.target.value})}
                />
              </div>
              {status === "error" && <p className="text-red-500 text-sm">Erro ao enviar. Tente novamente.</p>}
              <button 
                disabled={status === "loading"}
                type="submit" 
                className="btn-primary w-full py-4 text-lg"
              >
                {status === "loading" ? "Enviando..." : "Solicitar Orçamento Grátis"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const [stats, setStats] = useState({ customersServed: 0, rewardsPaid: 0 });

  useEffect(() => {
    fetch("/api/stats").then(res => res.json()).then(setStats);
  }, []);

  return (
    <footer className="py-12 border-t border-white/5 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
                <Wrench className="text-white" size={18} />
              </div>
              <span className="text-xl font-black tracking-tighter italic">CAR <span className="text-brand-orange">FR</span></span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              A oficina de referência em Luanda para diagnóstico eletrônico e programação avançada. Qualidade garantida e transparência total.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-4xl font-black text-brand-orange mb-2">{stats.customersServed}+</p>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Clientes Atendidos</p>
            </div>
            <div>
              <p className="text-4xl font-black text-brand-orange mb-2">{stats.rewardsPaid.toLocaleString()} Kz</p>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Prêmios Pagos</p>
            </div>
          </div>

          <div className="text-right">
            <button 
              onClick={() => window.location.href = '/admin'}
              className="text-xs text-gray-700 hover:text-gray-500 transition-colors"
            >
              Painel Administrativo
            </button>
          </div>
        </div>
        <div className="text-center text-gray-600 text-xs">
          &copy; {new Date().getFullYear()} OFICINA CAR FR. Todos os direitos reservados. Luanda, Angola.
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => (
  <a 
    href="https://wa.me/244934764904" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-2xl shadow-green-500/40 z-50 hover:scale-110 transition-transform active:scale-95 animate-bounce"
  >
    <MessageCircle size={32} />
  </a>
);

// --- Main Page ---

export default function LandingPage() {
  return (
    <div className="bg-brand-black min-h-screen selection:bg-brand-orange selection:text-white">
      <Navbar />
      <Hero />
      <Services />
      <AffiliateSection />
      <CampaignSection />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
