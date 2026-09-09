import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Camera,
  PieChart,
  ShieldCheck,
  Plus,
  Trash2,
  Edit3,
  AlertTriangle,
  RefreshCw,
  Settings,
  Sparkles,
  Clock,
  Layers,
  Check,
  X,
  ShoppingBag,
  Search,
  ListPlus,
  Wrench,
  Car,
  Hammer,
  Package,
  Calculator,
  Palette,
  Activity,
  Globe,
  Lock,
  Upload,
  Menu,
  UserPlus,
  Heart,
  Bell,
  User,
  LogIn,
  LogOut,
  Database,
  CheckCircle2,
  XCircle,
  Eye,
  ChevronDown,
  ChevronUp,
  ListTree,
  QrCode,
  ScanFocus,
  Users
} from 'lucide-react';

const WORLD_CURRENCIES = [
  { code: 'RSD', name: 'Serbian Dinar', symbol: 'RSD' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'GBP', name: 'British Pound', symbol: '£' }
];

const CATEGORIES = [
  { id: 'Food', label: 'Food & Groceries', icon: '🛒' },
  { id: 'Utilities', label: 'Utilities & Bills', icon: '⚡' },
  { id: 'Transport', label: 'Transportation & Fuel', icon: '🚗' },
  { id: 'Housing', label: 'Housing & Rent', icon: '🏠' },
  { id: 'Entertainment', label: 'Entertainment & Dining', icon: '☕' },
  { id: 'Health', label: 'Health & Medical', icon: '💊' },
  { id: 'Salary', label: 'Salary & Income', icon: '💼' },
  { id: 'Other', label: 'Other Expenses', icon: '📦' }
];

const THEMES = {
  'light-blue': { name: 'Sky Blue Accent', btnPrimary: 'bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold', textAccent: 'text-sky-400', borderAccent: 'border-sky-400/40', bgAccent: 'bg-sky-400/10', chartColor: '#38bdf8', bgGlow: 'from-sky-950/40' },
  'green': { name: 'Green Accent', btnPrimary: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold', textAccent: 'text-emerald-400', borderAccent: 'border-emerald-500/40', bgAccent: 'bg-emerald-500/10', chartColor: '#10b981', bgGlow: 'from-emerald-950/40' },
  'blue': { name: 'Blue Accent', btnPrimary: 'bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold', textAccent: 'text-blue-400', borderAccent: 'border-blue-500/40', bgAccent: 'bg-blue-500/10', chartColor: '#3b82f6', bgGlow: 'from-blue-950/40' },
  'yellow': { name: 'Yellow Accent', btnPrimary: 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold', textAccent: 'text-amber-400', borderAccent: 'border-amber-400/40', bgAccent: 'bg-amber-400/10', chartColor: '#fbbf24', bgGlow: 'from-amber-950/40' }
};

const FUN_FACTS = [
  "Did you know? The first paper money was issued in China over 1,000 years ago!",
  "Pro tip: Waiting 24h before buying non-essentials reduces impulse buying by 70%.",
  "Financial tip: Building an emergency fund is like putting your budget in body armor."
];

export default function App() {
  // Global State
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('sb_is_logged_in') === 'true');
  const [nickname, setNickname] = useState(() => localStorage.getItem('sb_user_nickname') || '');
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('sb_user_email') || '');
  const [householdCode, setHouseholdCode] = useState(() => localStorage.getItem('sb_household_code') || '');
  
  // App Navigation State
  const [activeTab, setActiveTab] = useState('cashflow');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Settings & Financials
  const [currentTheme, setCurrentTheme] = useState(() => localStorage.getItem('fb_theme') || 'light-blue');
  const theme = THEMES[currentTheme] || THEMES['light-blue'];
  const [selectedCurrency, setSelectedCurrency] = useState(() => localStorage.getItem('fb_currency') || 'RSD');

  const [startingBalance, setStartingBalance] = useState(() => Number(localStorage.getItem('sb_starting_balance')) || 0);
  const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem('sb_transactions') || '[]'));
  const [cashflowPlans, setCashflowPlans] = useState(() => JSON.parse(localStorage.getItem('sb_cashflow_plans') || '[]'));
  const [shoppingLists, setShoppingLists] = useState(() => JSON.parse(localStorage.getItem('sb_shopping_lists') || '[]'));
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('sb_wishlist') || '[]'));
  const [connectedPartners, setConnectedPartners] = useState(() => JSON.parse(localStorage.getItem('sb_partners') || '[]'));
  
  const [projectionDays, setProjectionDays] = useState(45);
  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('sb_gemini_key') || '');
  
  // UI Modals
  const [toast, setToast] = useState(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [subExpensesPlan, setSubExpensesPlan] = useState(null);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  // Live Users Online Tracker
  const [liveUsersCount, setLiveUsersCount] = useState(1);

  const formatCurrency = (val) => {
    const curr = WORLD_CURRENCIES.find(c => c.code === selectedCurrency) || WORLD_CURRENCIES[0];
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(val || 0) + ' ' + curr.symbol;
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  // Persist State
  useEffect(() => { localStorage.setItem('fb_theme', currentTheme); }, [currentTheme]);
  useEffect(() => { localStorage.setItem('fb_currency', selectedCurrency); }, [selectedCurrency]);
  useEffect(() => { localStorage.setItem('sb_starting_balance', startingBalance.toString()); }, [startingBalance]);
  useEffect(() => { localStorage.setItem('sb_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('sb_cashflow_plans', JSON.stringify(cashflowPlans)); }, [cashflowPlans]);
  useEffect(() => { localStorage.setItem('sb_shopping_lists', JSON.stringify(shoppingLists)); }, [shoppingLists]);
  useEffect(() => { localStorage.setItem('sb_wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('sb_partners', JSON.stringify(connectedPartners)); }, [connectedPartners]);
  useEffect(() => { localStorage.setItem('sb_gemini_key', geminiApiKey); }, [geminiApiKey]);
  useEffect(() => { localStorage.setItem('sb_household_code', householdCode); }, [householdCode]);
  useEffect(() => { localStorage.setItem('sb_user_nickname', nickname); }, [nickname]);
  useEffect(() => { localStorage.setItem('sb_user_email', userEmail); }, [userEmail]);
  useEffect(() => { localStorage.setItem('sb_is_logged_in', isLoggedIn.toString()); }, [isLoggedIn]);

  // SMART NOTIFICATIONS (Triggered on login)
  useEffect(() => {
    if (isLoggedIn && cashflowPlans.length > 0) {
      const today = new Date();
      const currentDay = today.getDate();
      let upcomingBills = [];

      cashflowPlans.forEach(plan => {
        if (plan.frequency === 'Monthly' && plan.type === 'Expense') {
          const diff = plan.dayOfMonth - currentDay;
          if (diff >= 0 && diff <= 3) {
            upcomingBills.push(plan.title);
          }
        }
      });

      if (upcomingBills.length > 0) {
        setTimeout(() => {
          showToast(`ALARM: Imate račune koji dospevaju u naredna 3 dana (${upcomingBills.join(', ')}).`, 'info');
        }, 3000);
      } else {
        setTimeout(() => {
          const randomFact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
          showToast(randomFact, 'info');
        }, 4000);
      }
    }
  }, [isLoggedIn]);

  const handleAddTransaction = (newTx) => {
    setTransactions(prev => [newTx, ...prev]);
    if (newTx.date === new Date().toISOString().split('T')[0]) {
      setStartingBalance(prev => newTx.type === 'Income' ? Number(prev) + Number(newTx.amount) : Number(prev) - Number(newTx.amount));
    }
    showToast(`Transaction "${newTx.title}" logged successfully!`, 'success');
  };

  const handleSavePlan = (planData) => {
    if (editingPlan) {
      setCashflowPlans(prev => prev.map(p => p.id === editingPlan.id ? { ...planData, id: editingPlan.id } : p));
      showToast('Cashflow plan updated successfully!', 'success');
    } else {
      setCashflowPlans(prev => [...prev, { ...planData, id: 'plan-' + Date.now(), subExpenses: [] }]);
      showToast('New Cashflow plan added!', 'success');
    }
    setIsPlanModalOpen(false);
    setEditingPlan(null);
  };

  const handleDeletePlan = (id) => {
    setCashflowPlans(prev => prev.filter(p => p.id !== id));
    showToast('Cashflow plan deleted.', 'info');
  };

  const handleUpdateSubExpenses = (planId, newSubExpenses) => {
    const totalSubSum = newSubExpenses.reduce((acc, item) => acc + Number(item.amount || 0), 0);
    setCashflowPlans(prev => prev.map(p => {
      if (p.id === planId) {
        return { ...p, subExpenses: newSubExpenses, amount: newSubExpenses.length > 0 ? totalSubSum : p.amount };
      }
      return p;
    }));
    showToast(`Sub-items updated! Main plan total synced to ${formatCurrency(totalSubSum)}`, 'success');
  };

  // If not logged in, show Full-Screen Onboarding Flow
  if (!isLoggedIn) {
    return <OnboardingScreen 
      onComplete={(email, nick, newVaultCode) => {
        setUserEmail(email);
        setNickname(nick);
        setHouseholdCode(newVaultCode);
        setIsLoggedIn(true);
      }} 
    />;
  }

  const tabs = [
    { id: 'cashflow', label: 'Cashflow Projection', icon: Calendar },
    { id: 'wishlist', label: 'Wish List & Goals', icon: Heart },
    { id: 'lists', label: 'Grocery List', icon: ListPlus },
    { id: 'entry', label: 'Expenses & OCR Scan', icon: Camera },
    { id: 'groceries', label: 'Item Tracker & Usage', icon: Activity },
    { id: 'analytics', label: 'Reports', icon: PieChart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen font-sans antialiased bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-slate-100">
      {/* Dynamic Toasts (Mutual Notifications) */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={`p-4 rounded-2xl border shadow-2xl flex items-center gap-3 text-xs font-bold max-w-sm ${toast.type === 'success' ? 'bg-emerald-950 border-emerald-500 text-emerald-200' : toast.type === 'error' ? 'bg-rose-950 border-rose-500 text-rose-200' : 'bg-sky-950 border-sky-500 text-sky-200'}`}>
            {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" /> : toast.type === 'error' ? <XCircle className="w-5 h-5 shrink-0 text-rose-400" /> : <Bell className="w-5 h-5 shrink-0 text-sky-400" />}
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 opacity-50 hover:opacity-100 shrink-0"><X className="w-4 h-4" /></button>
          </div>
        </div>
      )}

      {/* Main App Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md border-b px-4 py-3.5 sm:px-6 bg-slate-900/90 border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-xl ${theme.btnPrimary}`}>
              <TrendingUp className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">STASHLY</h1>
              <p className="text-[10px] font-semibold opacity-60 uppercase tracking-wider">
                Vault: {householdCode}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {liveUsersCount > 1 && (
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border-emerald-500/40 animate-in fade-in">
                <Eye className="w-3.5 h-3.5 animate-pulse" />
                <span>Partner Online</span>
              </div>
            )}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${theme.btnPrimary}`} title="Menu">
              <Menu className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setIsMenuOpen(false); }}
                  className={`flex items-center gap-2.5 p-3 rounded-xl text-xs font-bold transition-all border ${isActive ? `${theme.btnPrimary} shadow-lg` : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60'}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {activeTab === 'cashflow' && (
          <CashflowView
            theme={theme}
            startingBalance={startingBalance}
            setStartingBalance={setStartingBalance}
            projectionDays={projectionDays}
            setProjectionDays={setProjectionDays}
            cashflowPlans={cashflowPlans}
            transactions={transactions}
            formatCurrency={formatCurrency}
            onOpenAddPlan={() => { setEditingPlan(null); setIsPlanModalOpen(true); }}
            onDeletePlan={handleDeletePlan}
            onOpenSubExpenses={(plan) => setSubExpensesPlan(plan)}
          />
        )}

        {activeTab === 'wishlist' && (
          <WishlistView theme={theme} wishlist={wishlist} setWishlist={setWishlist} formatCurrency={formatCurrency} onAddTransaction={handleAddTransaction} showToast={showToast} />
        )}

        {activeTab === 'lists' && (
          <ShoppingListsView theme={theme} geminiApiKey={geminiApiKey} shoppingLists={shoppingLists} setShoppingLists={setShoppingLists} formatCurrency={formatCurrency} selectedCurrency={selectedCurrency} showToast={showToast} />
        )}

        {activeTab === 'entry' && (
          <DailyEntryView theme={theme} geminiApiKey={geminiApiKey} onAddTransaction={handleAddTransaction} transactions={transactions} formatCurrency={formatCurrency} onDeleteTransaction={(id) => setTransactions(prev => prev.filter(t => t.id !== id))} showToast={showToast} />
        )}

        {activeTab === 'groceries' && (
          <GroceryTrackerView theme={theme} transactions={transactions} formatCurrency={formatCurrency} />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView theme={theme} transactions={transactions} formatCurrency={formatCurrency} />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            theme={theme}
            currentTheme={currentTheme}
            setCurrentTheme={setCurrentTheme}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            nickname={nickname}
            userEmail={userEmail}
            householdCode={householdCode}
            connectedPartners={connectedPartners}
            onOpenPartnerScanner={() => setIsPartnerModalOpen(true)}
            onLogOut={() => { setIsLoggedIn(false); setHouseholdCode(''); localStorage.clear(); }}
          />
        )}
      </main>

      {/* Sub-Expenses Modal */}
      {subExpensesPlan && (
        <SubExpensesModal theme={theme} plan={subExpensesPlan} formatCurrency={formatCurrency} onUpdate={(newSubList) => handleUpdateSubExpenses(subExpensesPlan.id, newSubList)} onClose={() => setSubExpensesPlan(null)} />
      )}

      {/* Cashflow Rule Creation Modal */}
      {isPlanModalOpen && (
        <PlanModal theme={theme} plan={editingPlan} onSave={handleSavePlan} onClose={() => { setIsPlanModalOpen(false); setEditingPlan(null); }} />
      )}

      {/* IN-APP QR SCANNER & PARTNER CONNECTION MODAL */}
      {isPartnerModalOpen && (
        <QRScannerModal
          theme={theme}
          householdCode={householdCode}
          onConnect={(partnerCode, partnerNick) => {
            setConnectedPartners(prev => [...prev, { id: partnerCode, name: partnerNick, status: 'Connected', addedAt: new Date().toISOString() }]);
            showToast(`Uspesno ste se povezali! Nalog "${partnerNick}" je sada sinhronizovan sa vašim trezorom.`, 'success');
            setIsPartnerModalOpen(false);
          }}
          onClose={() => setIsPartnerModalOpen(false)}
        />
      )}
    </div>
  );
}

// -------------------------------------------------------------------------------------
// FULL-SCREEN ONBOARDING COMPONENT
// -------------------------------------------------------------------------------------
function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        alert("Lozinke se ne poklapaju!");
        return;
      }
      setStep(2);
    } else if (step === 2 && nickname) {
      // Generate unique vault code for new user
      const newVaultCode = 'STASH-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      onComplete(email, nickname, newVaultCode);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-100 font-sans relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-sky-500/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-md border border-slate-800 p-8 rounded-3xl shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-500">
        
        {step === 1 ? (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-sky-400 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-sky-500/20">
              <TrendingUp className="w-8 h-8 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-2xl font-black mb-2">Hi, good day.</h1>
              <p className="text-sm text-slate-400 leading-relaxed">I'm so glad to see you.<br/>Welcome to STASHLY, your smart financial vault.</p>
            </div>

            <form onSubmit={handleNext} className="space-y-4 text-left mt-6">
              <div>
                <label className="text-[11px] font-bold opacity-60 uppercase tracking-wide">Email adresa</label>
                <input type="email" required placeholder="tvoj@email.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-sky-400 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all" />
              </div>
              <div>
                <label className="text-[11px] font-bold opacity-60 uppercase tracking-wide">Lozinka</label>
                <input type="password" required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-sky-400 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all" />
              </div>
              <div>
                <label className="text-[11px] font-bold opacity-60 uppercase tracking-wide">Potvrdi Lozinku</label>
                <input type="password" required placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-sky-400 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all" />
              </div>
              <button type="submit" className="w-full py-3.5 mt-2 bg-sky-400 hover:bg-sky-300 text-slate-950 rounded-xl font-bold text-sm transition-all">Sledeći korak</button>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-6 animate-in slide-in-from-right-8 duration-300">
            <div className="w-16 h-16 bg-emerald-400 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <User className="w-8 h-8 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-2xl font-black mb-2">Kako da te zovemo?</h1>
              <p className="text-sm text-slate-400">Ovo ime će videti partneri sa kojima deliš trezor.</p>
            </div>
            <form onSubmit={handleNext} className="space-y-4 text-left mt-6">
              <div>
                <label className="text-[11px] font-bold opacity-60 uppercase tracking-wide">Tvoj Nickname</label>
                <input type="text" required placeholder="npr. Aleksandar" value={nickname} onChange={e => setNickname(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 focus:border-emerald-400 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all" />
              </div>
              <button type="submit" className="w-full py-3.5 mt-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-xl font-bold text-sm transition-all">Kreiraj Trezor (Vault)</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------------------
// NATIVE IN-APP QR SCANNER MODAL
// -------------------------------------------------------------------------------------
function QRScannerModal({ theme, householdCode, onConnect, onClose }) {
  const [isScanning, setIsScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const videoRef = useRef(null);

  // Fallback camera simulation - Native HTML5 userMedia
  useEffect(() => {
    let stream = null;
    if (isScanning) {
      const startCamera = async () => {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        } catch (err) {
          console.error("Kamera nije dostupna:", err);
          alert("Nije moguće pristupiti kameri. Proverite dozvole browsera.");
          setIsScanning(false);
        }
      };
      startCamera();
    }
    return () => {
      if (stream) { stream.getTracks().forEach(track => track.stop()); }
    };
  }, [isScanning]);

  const handleSimulatedScan = () => {
    // Ovo bi u produkciji bio callback od BarcodeDetector API-ja
    const fakeDetectedCode = "STASH-PARTNER1";
    onConnect(fakeDetectedCode, "Anja");
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <h3 className="text-sm font-bold flex items-center gap-2"><ScanFocus className={`w-4 h-4 ${theme.textAccent}`} /> Dodaj Partnera (Merdžovanje)</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6 space-y-6">
          {/* CAMERA FEED AREA */}
          <div className="relative w-full h-56 bg-black rounded-xl overflow-hidden flex items-center justify-center border border-slate-700 shadow-inner">
            {isScanning ? (
              <>
                <video ref={videoRef} className="w-full h-full object-cover opacity-80" playsInline muted />
                <div className="absolute inset-0 border-2 border-emerald-500/50 m-4 rounded-lg pointer-events-none"></div>
                <div className="absolute top-0 w-full h-0.5 bg-emerald-400 shadow-[0_0_10px_2px_#34d399] animate-[scan_2s_ease-in-out_infinite]"></div>
                {/* Za potrebe testiranja dok ne vežemo pravu biblioteku za QR dekodiranje */}
                <button onClick={handleSimulatedScan} className="absolute bottom-2 bg-emerald-500 text-slate-950 text-xs px-3 py-1 rounded-full font-bold">Simuliraj Skeniranje</button>
              </>
            ) : (
              <div className="text-center space-y-3">
                <QrCode className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">Kamera je isključena.</p>
                <button onClick={() => setIsScanning(true)} className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.btnPrimary}`}>Aktiviraj Skener</button>
              </div>
            )}
          </div>

          <div className="text-center">
             <span className="text-[10px] uppercase font-bold opacity-50 block mb-2">Tvoj Vault QR Kod za deljenje</span>
             <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${householdCode}&color=ffffff&bgcolor=0f172a`} alt="Tvoj QR Kod" className="w-[100px] h-[100px] mx-auto rounded-xl border border-slate-700 p-1 bg-slate-950" />
             <p className="font-mono text-sm font-bold text-sky-400 mt-2">{householdCode}</p>
          </div>

          <div className="pt-4 border-t border-slate-800">
             <p className="text-[10px] font-bold uppercase opacity-60 mb-2">Ili unesi kod ručno</p>
             <div className="flex gap-2">
               <input type="text" placeholder="STASH-XXXXXX" value={manualCode} onChange={e => setManualCode(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 text-xs font-mono focus:outline-none" />
               <button onClick={() => manualCode && onConnect(manualCode, "Novi Partner")} className={`px-4 py-2 rounded-xl text-xs font-bold ${theme.btnPrimary}`}>Spoji</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------------------
// CASHFLOW VIEW (WITH MODULAR PLAN CATEGORIES)
// -------------------------------------------------------------------------------------
function CashflowView({ theme, startingBalance, setStartingBalance, projectionDays, setProjectionDays, cashflowPlans, transactions, formatCurrency, onOpenAddPlan, onDeletePlan, onOpenSubExpenses }) {
  const [selectedPlanCategory, setSelectedPlanCategory] = useState('All');
  const [isBalanceEditing, setIsBalanceEditing] = useState(false);
  const [tempBalance, setTempBalance] = useState(startingBalance);

  // Dynamic Tabs based on existing plans
  const planCategories = ['All', ...new Set(cashflowPlans.map(p => p.category))];
  const filteredPlans = selectedPlanCategory === 'All' ? cashflowPlans : cashflowPlans.filter(p => p.category === selectedPlanCategory);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between opacity-60 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Trenutno Stanje Trezora</span>
            <DollarSign className={`w-5 h-5 ${theme.textAccent}`} />
          </div>
          {isBalanceEditing ? (
            <div className="flex items-center gap-2 mt-2">
              <input type="number" value={tempBalance} onChange={(e) => setTempBalance(e.target.value)} className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-2xl font-bold w-full focus:outline-none" />
              <button onClick={() => { setStartingBalance(Number(tempBalance)); setIsBalanceEditing(false); }} className={`p-2 rounded-xl ${theme.btnPrimary}`}><Check className="w-5 h-5" /></button>
            </div>
          ) : (
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-4xl font-black tracking-tight">{formatCurrency(startingBalance)}</span>
              <button onClick={() => { setTempBalance(startingBalance); setIsBalanceEditing(true); }} className={`text-xs opacity-60 hover:opacity-100 flex items-center gap-1 ${theme.textAccent}`}><Edit3 className="w-4 h-4" /> Ažuriraj</button>
            </div>
          )}
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between opacity-60 mb-2">
             <span className="text-xs font-semibold uppercase tracking-wider">Planirani Gotovinski Tokovi</span>
             <button onClick={onOpenAddPlan} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 ${theme.btnPrimary}`}><Plus className="w-3.5 h-3.5" /> Dodaj Plan</button>
          </div>

          {/* Dinamički tabovi kategorija */}
          {planCategories.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide my-2">
              {planCategories.map(cat => (
                <button key={cat} onClick={() => setSelectedPlanCategory(cat)} className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${selectedPlanCategory === cat ? `${theme.borderAccent} ${theme.bgAccent} ${theme.textAccent}` : 'border-slate-800 bg-slate-950 opacity-60 hover:opacity-100'}`}>
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {filteredPlans.length === 0 ? (
              <p className="text-xs opacity-40 text-center py-6 border border-dashed border-slate-800 rounded-xl">Nema unetih planova za ovu kategoriju.</p>
            ) : (
              filteredPlans.map(plan => {
                const subCount = plan.subExpenses ? plan.subExpenses.length : 0;
                return (
                  <div key={plan.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between hover:bg-slate-900/50 cursor-pointer transition-all" onClick={() => onOpenSubExpenses(plan)}>
                    <div>
                      <h5 className="text-sm font-bold">{plan.title}</h5>
                      <span className="text-[10px] opacity-60 uppercase">{plan.category} • Datum: {plan.dayOfMonth}. • {subCount} stavki</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-mono font-bold text-sm ${plan.type === 'Income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {plan.type === 'Income' ? '+' : '-'}{formatCurrency(plan.amount)}
                      </span>
                      <button onClick={(e) => { e.stopPropagation(); onDeletePlan(plan.id); }} className="text-slate-600 hover:text-rose-400 p-1"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------------------
// CLEANED PLAN MODAL (NO HARDCODED "CAR" STUFF)
// -------------------------------------------------------------------------------------
function PlanModal({ theme, plan, onSave, onClose }) {
  const [formData, setFormData] = useState(plan || { title: '', amount: '', type: 'Expense', category: 'General', frequency: 'Monthly', dayOfMonth: 15, isActive: true });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
        <div className="flex justify-between items-center"><h3 className="text-sm font-bold">Novi Cashflow Plan</h3><button onClick={onClose} className="p-1"><X className="w-5 h-5" /></button></div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold uppercase opacity-60">Kategorija</label>
            <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs focus:outline-none">
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase opacity-60">Dan u mesecu</label>
            <select value={formData.dayOfMonth} onChange={e => setFormData({ ...formData, dayOfMonth: Number(e.target.value) })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs focus:outline-none">
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => <option key={day} value={day}>Dan {day}.</option>)}
            </select>
          </div>
        </div>

        <div>
           <label className="text-[10px] font-bold uppercase opacity-60">Naziv (npr. Struja, Plata, Kasko)</label>
           <input type="text" placeholder="Unesite naziv..." required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs focus:outline-none" />
        </div>
        
        <div>
           <label className="text-[10px] font-bold uppercase opacity-60">Iznos</label>
           <input type="number" placeholder="Iznos..." required value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono focus:outline-none" />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
             <label className="text-[10px] font-bold uppercase opacity-60">Tip Toka</label>
             <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs focus:outline-none">
               <option value="Expense">Trošak (Odliv)</option>
               <option value="Income">Prihod (Priliv)</option>
             </select>
          </div>
          <div>
             <label className="text-[10px] font-bold uppercase opacity-60">Učestalost</label>
             <select value={formData.frequency} onChange={e => setFormData({ ...formData, frequency: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs focus:outline-none">
               <option value="Monthly">Mesečno</option>
               <option value="Once">Jednokratno</option>
             </select>
          </div>
        </div>

        <button onClick={() => { if(formData.title && formData.amount) { onSave(formData); onClose(); } }} className={`w-full py-3.5 mt-2 rounded-xl font-bold text-xs uppercase ${theme.btnPrimary}`}>Sačuvaj Plan</button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------------------
// CONNECTED PEOPLE & SETTINGS VIEW
// -------------------------------------------------------------------------------------
function SettingsView({ theme, currentTheme, setCurrentTheme, selectedCurrency, setSelectedCurrency, nickname, userEmail, householdCode, connectedPartners, onOpenPartnerScanner, onLogOut }) {
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Profil i Generalna Podešavanja */}
      <div className="space-y-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold flex items-center gap-2"><User className={`w-5 h-5 ${theme.textAccent}`} /> Profil (Moj Identitet)</h3>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
             <p className="text-sm font-bold">{nickname}</p>
             <p className="text-xs opacity-60 mb-3">{userEmail}</p>
             <span className="text-[10px] font-mono bg-slate-800 px-2 py-1 rounded-md text-slate-300">ID: {householdCode}</span>
          </div>
          <button onClick={onLogOut} className="w-full py-2.5 rounded-xl text-xs font-bold bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition-all">Odjavi se sa naloga</button>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold flex items-center gap-2"><Palette className={`w-5 h-5 ${theme.textAccent}`} /> Izgled & Valuta</h3>
          <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-sm focus:outline-none mb-3">
            {WORLD_CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name} ({c.symbol})</option>)}
          </select>
          <div className="grid grid-cols-2 gap-3">
            {Object.keys(THEMES).map(tKey => (
              <button key={tKey} onClick={() => setCurrentTheme(tKey)} className={`p-2 rounded-xl border text-[11px] font-bold ${currentTheme === tKey ? `${THEMES[tKey].btnPrimary} border-white shadow-lg` : 'bg-slate-950 border-slate-800 opacity-60'}`}>{THEMES[tKey].name}</button>
            ))}
          </div>
        </div>
      </div>

      {/* PRAVA SEKCIJA ZA POVEZANE LJUDE */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
           <div>
              <h3 className="text-base font-bold flex items-center gap-2"><Users className={`w-5 h-5 ${theme.textAccent}`} /> Povezani Nalozi</h3>
              <p className="text-xs opacity-60 mt-1">Osobe sa kojima deliš ovaj trezor</p>
           </div>
           <button onClick={onOpenPartnerScanner} className={`p-2 rounded-xl text-slate-950 ${theme.btnPrimary}`} title="Skeniraj QR za dodavanje"><UserPlus className="w-5 h-5" /></button>
        </div>

        <div className="space-y-3 flex-grow">
           {/* Current User Card */}
           <div className="flex items-center justify-between p-3 rounded-xl border border-sky-500/30 bg-sky-500/5">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300">{nickname.charAt(0)}</div>
                 <div>
                    <p className="text-sm font-bold">{nickname} (Ti)</p>
                    <p className="text-[10px] font-mono opacity-50">Vlasnik trezora</p>
                 </div>
              </div>
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]"></span>
           </div>

           {/* Connected Partners Array */}
           {connectedPartners.length === 0 ? (
             <div className="py-8 text-center border-2 border-dashed border-slate-800 rounded-xl mt-4">
                <p className="text-xs opacity-50">Nemaš povezanih partnera.</p>
                <button onClick={onOpenPartnerScanner} className={`mt-3 px-4 py-2 rounded-lg text-xs font-bold ${theme.btnPrimary}`}>Poveži nekoga sada</button>
             </div>
           ) : (
             connectedPartners.map(partner => (
               <div key={partner.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-950">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300">{partner.name.charAt(0)}</div>
                     <div>
                        <p className="text-sm font-bold">{partner.name}</p>
                        <p className="text-[10px] font-mono opacity-50">Spojen: {new Date(partner.addedAt).toLocaleDateString()}</p>
                     </div>
                  </div>
                  {/* Status Indicator */}
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded border border-emerald-500/30">Sinhronizovano</span>
               </div>
             ))
           )}
        </div>
      </div>

    </div>
  );
}

// -------------------------------------------------------------------------------------
// OTHER REQUIRED VIEWS (Kept identical as requested)
// -------------------------------------------------------------------------------------
function SubExpensesModal({ theme, plan, formatCurrency, onUpdate, onClose }) {
  const [subList, setSubList] = useState(plan.subExpenses || []);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const isIncome = plan.type === 'Income';

  const handleAddSubItem = (e) => {
    e.preventDefault();
    if (!description || !amount) return;
    const newItem = { id: 'sub-' + Date.now(), description, amount: Number(amount) };
    const updated = [...subList, newItem];
    setSubList(updated);
    onUpdate(updated);
    setDescription(''); setAmount('');
  };

  const calculatedTotal = useMemo(() => subList.reduce((acc, s) => acc + Number(s.amount), 0), [subList]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-base font-bold flex items-center gap-2"><ListTree className={`w-5 h-5 ${theme.textAccent}`} /> Sub-{isIncome ? 'Incomes' : 'Expenses'}: {plan.title}</h3>
            <p className="text-xs opacity-60 mt-1">Detaljna specifikacija za ovaj plan.</p>
          </div>
          <button onClick={onClose} className="p-1"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleAddSubItem} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input type="text" placeholder={`Naziv (npr. Registracija)`} required value={description} onChange={(e) => setDescription(e.target.value)} className="sm:col-span-2 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none" />
          <input type="number" placeholder="Iznos" required value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono focus:outline-none" />
          <button type="submit" className={`sm:col-span-3 py-2.5 rounded-xl text-xs font-bold uppercase ${theme.btnPrimary}`}>Dodaj stavku</button>
        </form>
        <div className="space-y-2 max-h-[300px] overflow-y-auto pt-2">
          {subList.length === 0 ? <p className="text-xs opacity-50 text-center py-6 border border-dashed border-slate-800 rounded-xl">Lista je prazna.</p> : subList.map((item, idx) => (
            <div key={item.id} className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between text-xs hover:bg-slate-800/40">
              <div className="flex items-center gap-3"><span className="opacity-40 font-mono text-[10px]">{idx + 1}.</span><p className="font-bold text-sm">{item.description}</p></div>
              <div className="flex items-center gap-3"><span className={`font-mono font-bold text-sm ${isIncome ? 'text-emerald-400' : 'text-rose-400'}`}>{isIncome ? '+' : '-'}{formatCurrency(item.amount)}</span><button onClick={() => { const updated = subList.filter(s => s.id !== item.id); setSubList(updated); onUpdate(updated); }} className="text-slate-600 hover:text-rose-400"><Trash2 className="w-4 h-4" /></button></div>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs font-bold">
          <span className="uppercase opacity-60">Ukupno obračunato:</span><span className="font-mono text-xl text-sky-400">{formatCurrency(calculatedTotal)}</span>
        </div>
      </div>
    </div>
  );
}

function WishlistView({ theme, wishlist, setWishlist, formatCurrency, onAddTransaction, showToast }) {
  const [title, setTitle] = useState(''); const [estimatedPrice, setEstimatedPrice] = useState('');
  const handleAddWish = (e) => {
    e.preventDefault();
    if (!title || !estimatedPrice) return;
    setWishlist(prev => [{ id: 'wish-' + Date.now(), title, estimatedPrice: Number(estimatedPrice), createdAt: new Date().toISOString().split('T')[0] }, ...prev]);
    setTitle(''); setEstimatedPrice(''); showToast(`Dodato u Wishlist!`, 'success');
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold flex items-center gap-2"><Heart className={`w-4 h-4 ${theme.textAccent}`} /> Dodaj Želju / Cilj</h3>
        <form onSubmit={handleAddWish} className="space-y-3">
          <input type="text" placeholder="Naziv (npr. Novi Monitor)" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none" />
          <input type="number" placeholder="Očekivana Cena" required value={estimatedPrice} onChange={(e) => setEstimatedPrice(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono focus:outline-none" />
          <button type="submit" className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase ${theme.btnPrimary}`}>Dodaj na listu</button>
        </form>
      </div>
      <div className="lg:col-span-2 space-y-4">
        {wishlist.length === 0 ? <div className="bg-slate-900/80 p-8 rounded-2xl border border-dashed border-slate-800 text-center opacity-50 text-xs">Lista je prazna.</div> : wishlist.map(wish => (
          <div key={wish.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
            <div><h4 className="font-bold text-sm">{wish.title}</h4><p className="font-mono text-xs opacity-60">{formatCurrency(wish.estimatedPrice)}</p></div>
            <div className="flex gap-2">
              <button onClick={() => { onAddTransaction({ id: 'tx-'+Date.now(), title: `Ostvaren cilj: ${wish.title}`, amount: wish.estimatedPrice, type: 'Expense', category: 'Other', merchant: 'Wishlist', date: new Date().toISOString().split('T')[0] }); setWishlist(prev => prev.filter(w => w.id !== wish.id)); }} className={`p-2 rounded-xl border ${theme.borderAccent} ${theme.bgAccent} ${theme.textAccent}`}><Check className="w-4 h-4" /></button>
              <button onClick={() => setWishlist(prev => prev.filter(w => w.id !== wish.id))} className="p-2 text-slate-500 hover:text-rose-400"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShoppingListsView({ theme, geminiApiKey, shoppingLists, setShoppingLists, formatCurrency, selectedCurrency, showToast }) {
  const [listTitle, setListTitle] = useState(''); const [rawText, setRawText] = useState(''); const [isEstimating, setIsEstimating] = useState(false);
  const handleEstimate = async (e) => {
    e.preventDefault(); if (!geminiApiKey) { alert('Fali Gemini API ključ u podešavanjima!'); return; }
    setIsEstimating(true);
    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;
      const systemPrompt = `Estimate retail prices in ${selectedCurrency} for this list. Return JSON: { "estimatedItems": [{ "item": "string", "qty": "string", "estimatedPrice": number }], "totalEstimated": number }\nList:\n${rawText}`;
      const res = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: systemPrompt }] }], generationConfig: { responseMimeType: "application/json" } }) });
      const data = await res.json(); const parsed = JSON.parse(data?.candidates?.[0]?.content?.parts?.[0]?.text);
      setShoppingLists(prev => [{ id: 'list-'+Date.now(), title: listTitle, estimatedItems: parsed.estimatedItems || [], totalEstimated: parsed.totalEstimated || 0, date: new Date().toISOString().split('T')[0] }, ...prev]);
      setListTitle(''); setRawText(''); showToast('AI Analiza završena!', 'success');
    } catch (err) { alert('Greška: ' + err.message); } finally { setIsEstimating(false); }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold flex items-center gap-2"><Calculator className={`w-4 h-4 ${theme.textAccent}`} /> AI Grocery Procena</h3>
        <form onSubmit={handleEstimate} className="space-y-3">
          <input type="text" placeholder="Naslov (npr. Pijaca)" required value={listTitle} onChange={(e) => setListTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm focus:outline-none" />
          <textarea rows={5} placeholder="Napiši stavke (npr. 2x Mleko, Hleb)..." required value={rawText} onChange={(e) => setRawText(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs focus:outline-none font-mono" />
          <button type="submit" disabled={isEstimating} className={`w-full font-bold py-3 rounded-xl text-xs uppercase ${theme.btnPrimary}`}>{isEstimating ? 'Učitavam AI...' : 'Proceni Cene'}</button>
        </form>
      </div>
      <div className="lg:col-span-2 space-y-4">
        {shoppingLists.length === 0 ? <div className="bg-slate-900/80 p-8 rounded-2xl border border-dashed border-slate-800 text-center opacity-50 text-xs">Nema sačuvanih listi.</div> : shoppingLists.map(list => (
          <div key={list.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5"><div className="flex justify-between items-center"><h5 className="font-bold text-sm">{list.title}</h5><span className={`font-mono font-bold ${theme.textAccent}`}>~{formatCurrency(list.totalEstimated)}</span></div></div>
        ))}
      </div>
    </div>
  );
}

function DailyEntryView({ theme, geminiApiKey, onAddTransaction, transactions, formatCurrency, onDeleteTransaction, showToast }) {
  const [formData, setFormData] = useState({ title: '', amount: '', type: 'Expense', category: 'Food', merchant: '', date: new Date().toISOString().split('T')[0] });
  const handleManualAdd = (e) => {
    e.preventDefault(); onAddTransaction({ id: 'tx-'+Date.now(), title: formData.title, amount: Number(formData.amount), type: formData.type, category: formData.category, merchant: formData.merchant || 'General', date: formData.date });
    setFormData({ title: '', amount: '', type: 'Expense', category: 'Food', merchant: '', date: new Date().toISOString().split('T')[0] });
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold flex items-center gap-2"><Plus className={`w-4 h-4 ${theme.textAccent}`} /> Ručni Unos Transakcije</h3>
          <form onSubmit={handleManualAdd} className="space-y-3">
            <input type="text" placeholder="Naziv" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none" />
            <div className="grid grid-cols-2 gap-2"><input type="number" placeholder="Iznos" required value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono focus:outline-none" /><select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none"><option value="Expense">Trošak</option><option value="Income">Prihod</option></select></div>
            <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none">{CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}</select>
            <button type="submit" className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase ${theme.btnPrimary}`}>Upiši Transakciju</button>
          </form>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl text-center cursor-pointer border-dashed border-2 hover:border-slate-700">
           <Camera className={`w-8 h-8 mx-auto mb-2 ${theme.textAccent}`} />
           <p className="text-xs font-semibold">Skener Računa u pripremi...</p>
        </div>
      </div>
      <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold">Istorija Transakcija</h3>
        <div className="divide-y divide-slate-800 max-h-[500px] overflow-y-auto">
          {transactions.map(t => (
            <div key={t.id} className="py-3 flex justify-between items-center text-xs"><div><p className="font-bold">{t.title}</p><p className="opacity-50">{t.category} • {t.date}</p></div><div className="flex gap-3 items-center"><span className={`font-mono font-bold ${t.type === 'Income' ? 'text-emerald-400' : 'text-slate-200'}`}>{t.type === 'Income' ? '+' : '-'}{formatCurrency(t.amount)}</span><button onClick={() => onDeleteTransaction(t.id)} className="text-slate-600 hover:text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button></div></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GroceryTrackerView({ theme, transactions, formatCurrency }) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl text-center opacity-50 py-12"><Activity className={`w-8 h-8 mx-auto mb-2 ${theme.textAccent}`} />Modul se popunjava OCR skeniranjem.</div>
  );
}

function AnalyticsView({ theme, transactions, formatCurrency }) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-6">
      <h3 className="text-sm font-bold flex items-center gap-2"><PieChart className={`w-4 h-4 ${theme.textAccent}`} /> Izveštaj po kategorijama</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map(cat => {
           const spent = transactions.filter(t => t.type === 'Expense' && t.category === cat.id).reduce((a, b) => a + b.amount, 0);
           return spent > 0 && <div key={cat.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex justify-between items-center"><span className="font-bold text-xs">{cat.icon} {cat.label}</span><span className="font-mono font-bold text-xs">{formatCurrency(spent)}</span></div>
        })}
      </div>
    </div>
  );
}
