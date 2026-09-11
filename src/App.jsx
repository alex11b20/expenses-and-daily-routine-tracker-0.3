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
  Gift,
  Target,
  Heart,
  CheckCircle2,
  Menu,
  UserPlus,
  Users,
  Copy,
  HeartHandshake,
  Share2,
  UserCheck,
  Bell,
  BellRing,
  Smile,
  Info,
  User,
  LogOut,
  LogIn,
  KeyRound,
  AtSign,
  UserCircle,
  CalendarDays,
  QrCode // <
} from 'lucide-react';

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// force fresh preview build
const WORLD_CURRENCIES = [
  { code: 'RSD', name: 'Serbian Dinar', symbol: 'RSD' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'BAM', name: 'Bosnia-Herzegovina Convertible Mark', symbol: 'KM' },
  { code: 'MKD', name: 'Macedonian Denar', symbol: 'den' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'lv' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei' }
];

const CATEGORIES = [
  { id: 'Food', label: 'Food & Groceries', icon: '🛒', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  { id: 'Utilities', label: 'Utilities & Bills', icon: '⚡', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  { id: 'Transport', label: 'Transportation & Fuel', icon: '🚗', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { id: 'Housing', label: 'Housing & Rent', icon: '🏠', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  { id: 'Entertainment', label: 'Entertainment & Dining', icon: '☕', color: 'bg-pink-500/20 text-pink-400 border-pink-500/30' },
  { id: 'Health', label: 'Health & Medical', icon: '💊', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  { id: 'Salary', label: 'Salary & Income', icon: '💼', color: 'bg-teal-500/20 text-teal-400 border-teal-500/30' },
  { id: 'Other', label: 'Other Expenses', icon: '📦', color: 'bg-slate-500/20 text-slate-400 border-slate-500/30' }
];

const FINANCIAL_FUN_FACTS = [
  "💡 Fun Fact: The word 'bankrupt' comes from the Italian 'banca rotta', meaning 'broken bench' — because when a Renaissance banker ran out of money, authorities literally smashed his bench!",
  "💡 Fun Fact: Monopoly prints more money every year than the US Bureau of Engraving and Printing does for real currency!",
  "💡 Fun Fact: Pigs were chosen as piggy banks because 'pygg' was an old English word for a cheap orange clay used to make jars. Potteries started shaping them like actual pigs!",
  "💡 Fun Fact: In 1913, the entire US Income Tax form was just a single page long!",
  "💡 Fun Fact: The credit card was invented in 1949 because Frank McNamara forgot his wallet while dining at a restaurant in New York City!",
  "💡 Fun Fact: Isaac Newton lost today's equivalent of over $4 million in the South Sea Bubble stock crash and remarked: 'I can calculate the motion of heavenly bodies, but not the madness of people.'",
  "💡 Fun Fact: The paper used for US currency isn't paper at all — it's a blend of 75% cotton and 25% linen!",
  "💡 Fun Fact: Apple makes enough money every 8 minutes to buy a brand new Ferrari!"
];

const THEMES = {
  'electric-blue': {
    name: 'Electric Blue',
    btnPrimary: 'bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold',
    textAccent: 'text-blue-400',
    borderAccent: 'border-blue-500/40',
    bgAccent: 'bg-blue-500/10',
    chartColor: '#3b82f6',
    bgGlow: 'from-blue-950/40',
    cardBg: 'bg-slate-900/80',
    cardBorder: 'border-slate-800/80'
  },
  'emerald-green': {
    name: 'Emerald Green',
    btnPrimary: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold',
    textAccent: 'text-emerald-400',
    borderAccent: 'border-emerald-500/40',
    bgAccent: 'bg-emerald-500/10',
    chartColor: '#10b981',
    bgGlow: 'from-emerald-950/40',
    cardBg: 'bg-slate-900/80',
    cardBorder: 'border-slate-800/80'
  },
  'ruby-red': {
    name: 'Ruby Red',
    btnPrimary: 'bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold',
    textAccent: 'text-rose-400',
    borderAccent: 'border-rose-500/40',
    bgAccent: 'bg-rose-500/10',
    chartColor: '#f43f5e',
    bgGlow: 'from-rose-950/40',
    cardBg: 'bg-slate-900/80',
    cardBorder: 'border-slate-800/80'
  },
  'sky-blue': {
    name: 'Sky Blue',
    btnPrimary: 'bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold',
    textAccent: 'text-sky-400',
    borderAccent: 'border-sky-400/40',
    bgAccent: 'bg-sky-400/10',
    chartColor: '#38bdf8',
    bgGlow: 'from-sky-950/40',
    cardBg: 'bg-slate-900/80',
    cardBorder: 'border-slate-800/80'
  },
  'amber-gold': {
    name: 'Amber Gold',
    btnPrimary: 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold',
    textAccent: 'text-amber-400',
    borderAccent: 'border-amber-400/40',
    bgAccent: 'bg-amber-400/10',
    chartColor: '#fbbf24',
    bgGlow: 'from-amber-950/40',
    cardBg: 'bg-slate-900/80',
    cardBorder: 'border-slate-800/80'
  },
  'pure-black': {
    name: 'Pure Onyx',
    btnPrimary: 'bg-slate-100 hover:bg-white text-slate-950 font-bold',
    textAccent: 'text-slate-100',
    borderAccent: 'border-slate-700',
    bgAccent: 'bg-slate-800/60',
    chartColor: '#f8fafc',
    bgGlow: 'from-slate-900',
    cardBg: 'bg-black/90',
    cardBorder: 'border-slate-800'
  },
  'light-mode': {
    name: 'Light Clean',
    btnPrimary: 'bg-slate-900 hover:bg-slate-800 text-white font-bold',
    textAccent: 'text-slate-900',
    borderAccent: 'border-slate-300',
    bgAccent: 'bg-slate-200/80',
    chartColor: '#0f172a',
    bgGlow: 'from-slate-200',
    cardBg: 'bg-white/90',
    cardBorder: 'border-slate-200'
  }
};

const BACKGROUND_LIGHTING = {
  'smooth-blue-fade': {
    name: 'Smooth Midnight Blue Fade',
    bgClass: 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950'
  },
  'deep-ocean-fade': {
    name: 'Deep Ocean Blue Fade',
    bgClass: 'bg-gradient-to-b from-blue-950/90 via-slate-950 to-slate-950'
  },
  'emerald-aura-fade': {
    name: 'Emerald Aura Fade',
    bgClass: 'bg-gradient-to-b from-emerald-950/80 via-slate-950 to-slate-950'
  },
  'onyx-dark': {
    name: 'Onyx Dark Solid',
    bgClass: 'bg-slate-950'
  },
  'light-clean': {
    name: 'Light Ambient',
    bgClass: 'bg-gradient-to-b from-slate-100 to-slate-200'
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
};

export default function App() {
  const [activeTab, setActiveTab] = useState('cashflow');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);

  // User Profile State (Email + Password + Nickname)
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('sb_user_profile');
    return saved ? JSON.parse(saved) : { loggedIn: false, email: '', nickname: '', userId: '' };
  });

  const [currentTheme, setCurrentTheme] = useState(() => localStorage.getItem('fb_theme') || 'electric-blue');
  const theme = THEMES[currentTheme] || THEMES['electric-blue'];

  const [currentBg, setCurrentBg] = useState(() => localStorage.getItem('fb_bg_style') || 'smooth-blue-fade');
  const bgStyle = BACKGROUND_LIGHTING[currentBg] || BACKGROUND_LIGHTING['smooth-blue-fade'];

  const [selectedCurrency, setSelectedCurrency] = useState(() => localStorage.getItem('fb_currency') || 'RSD');

  const formatCurrency = (val) => {
    const curr = WORLD_CURRENCIES.find(c => c.code === selectedCurrency) || WORLD_CURRENCIES[0];
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(val || 0) + ' ' + curr.symbol;
  };

  const [startingBalance, setStartingBalance] = useState(() => {
    const saved = localStorage.getItem('sb_starting_balance');
    return saved !== null ? Number(saved) : 0;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('sb_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [cashflowPlans, setCashflowPlans] = useState(() => {
    const saved = localStorage.getItem('sb_cashflow_plans');
    return saved ? JSON.parse(saved) : [];
  });

  const [shoppingLists, setShoppingLists] = useState(() => {
    const saved = localStorage.getItem('sb_shopping_lists');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('sb_wishlist_items');
    return saved ? JSON.parse(saved) : [];
  });

  const [household, setHousehold] = useState(() => {
    const saved = localStorage.getItem('sb_household');
    if (saved) return JSON.parse(saved);
    const randomCode = 'SB-' + Math.random().toString(36).substring(2, 7).toUpperCase();
    return { householdId: randomCode, partnerName: '', partnerEmail: '', isConnected: false };
  });

  const [pushEnabled, setPushEnabled] = useState(() => {
    return localStorage.getItem('sb_push_enabled') === 'true';
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('sb_notifications_list');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Welcome to Stashly!', body: 'Notifications activated for bill alerts and cashflow warnings.', date: 'Just now', type: 'info', unread: true }
    ];
  });

  const [currentFunFactBanner, setCurrentFunFactBanner] = useState(null);
  const [projectionDays, setProjectionDays] = useState(45);
  
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return localStorage.getItem('sb_gemini_key') || '';
  });

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => { localStorage.setItem('sb_user_profile', JSON.stringify(userProfile)); }, [userProfile]);
  useEffect(() => { localStorage.setItem('fb_theme', currentTheme); }, [currentTheme]);
  useEffect(() => { localStorage.setItem('fb_bg_style', currentBg); }, [currentBg]);
  useEffect(() => { localStorage.setItem('fb_currency', selectedCurrency); }, [selectedCurrency]);
  useEffect(() => { localStorage.setItem('sb_starting_balance', startingBalance.toString()); }, [startingBalance]);
  useEffect(() => { localStorage.setItem('sb_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('sb_cashflow_plans', JSON.stringify(cashflowPlans)); }, [cashflowPlans]);
  useEffect(() => { localStorage.setItem('sb_shopping_lists', JSON.stringify(shoppingLists)); }, [shoppingLists]);
  useEffect(() => { localStorage.setItem('sb_wishlist_items', JSON.stringify(wishlistItems)); }, [wishlistItems]);
  useEffect(() => { localStorage.setItem('sb_household', JSON.stringify(household)); }, [household]);
  useEffect(() => { localStorage.setItem('sb_gemini_key', geminiApiKey); }, [geminiApiKey]);
  useEffect(() => { localStorage.setItem('sb_push_enabled', pushEnabled ? 'true' : 'false'); }, [pushEnabled]);
  useEffect(() => { localStorage.setItem('sb_notifications_list', JSON.stringify(notifications)); }, [notifications]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserProfile({
          loggedIn: true,
          email: session.user.email,
          nickname: session.user.user_metadata?.nickname || session.user.email.split('@')[0],
          userId: session.user.id
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserProfile({
          loggedIn: true,
          email: session.user.email,
          nickname: session.user.user_metadata?.nickname || session.user.email.split('@')[0],
          userId: session.user.id
        });
      } else {
        setUserProfile({ loggedIn: false, email: '', nickname: '', userId: '' });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Povlačenje transakcija iz Supabase baze nakon uspešne prijave
  useEffect(() => {
    const fetchCloudTransactions = async () => {
      if (userProfile.loggedIn) {
        try {
          const { data, error } = await supabase
            .from('transactions')
            .select('*')
            .order('transaction_date', { ascending: false });

          if (error) throw error;

          if (data && data.length > 0) {
            // Mapiranje cloud formata nazad u React format
            const formatted = data.map(t => ({
              id: t.id,
              title: t.title,
              amount: Number(t.amount),
              type: t.transaction_type,
              category: t.category,
              date: t.transaction_date,
              merchant: t.merchant_name
            }));
            setTransactions(formatted);
          }
        } catch (err) {
          console.error('Greška pri povlačenju transakcija:', err);
        }
      }
    };

    fetchCloudTransactions();
  }, [userProfile.loggedIn]);

  const pushNotification = (title, body, type = 'info') => {
    const greetingName = userProfile.nickname ? `, ${userProfile.nickname}` : '';
    const personalizedTitle = title.includes(userProfile.nickname) ? title : `${title}${greetingName}`;
    const newNotif = { id: 'notif-' + Date.now(), title: personalizedTitle, body, date: 'Just now', type, unread: true };
    setNotifications(prev => [newNotif, ...prev]);

    if (pushEnabled && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(personalizedTitle, { body, icon: '/favicon.ico' });
      } catch (err) {
        console.error('Push delivery error:', err);
      }
    }
  };

  const showRandomFunFact = () => {
    const randomFact = FINANCIAL_FUN_FACTS[Math.floor(Math.random() * FINANCIAL_FUN_FACTS.length)];
    setCurrentFunFactBanner(randomFact);
    pushNotification('💡 Financial Fun Fact!', randomFact, 'fact');
  };

  useEffect(() => {
    const lastFactTime = localStorage.getItem('sb_last_fact_time');
    const now = Date.now();
    const threeDaysMs = 3 * 24 * 60 * 60 * 1000;

    if (!lastFactTime || (now - Number(lastFactTime)) >= threeDaysMs) {
      const timer = setTimeout(() => {
        showRandomFunFact();
        localStorage.setItem('sb_last_fact_time', now.toString());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const requestBrowserPushPermission = async () => {
    if ('Notification' in window) {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        setPushEnabled(true);
        const nameGreeting = userProfile.nickname ? ` ${userProfile.nickname}` : '';
        pushNotification(`Web Push Activated!`, `Hey${nameGreeting}, you will now receive bill alerts, low-balance warnings, and partner updates on your device.`);
      } else {
        alert('Notification permission was blocked or dismissed. Please enable notifications in your browser settings.');
      }
    } else {
      alert('Your current browser does not support native Web Push Notifications.');
    }
  };

  const { dailyProjections, safeToSpendToday, lowestProjectedBalance } = useMemo(() => {
    const projections = [];
    let currentBalance = Number(startingBalance);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let lowestBal = currentBalance;
    let totalExpensesBeforeNextIncome = 0;
    let foundNextIncome = false;

    for (let i = 0; i < projectionDays; i++) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + i);
      const dateStr = targetDate.toISOString().split('T')[0];
      const dayOfMonth = targetDate.getDate();
      const dayOfWeek = targetDate.getDay();

      let plannedIncomes = 0;
      let plannedExpenses = 0;

      cashflowPlans.filter(p => p.isActive).forEach(plan => {
        let applies = false;
        if (plan.frequency === 'Monthly' && Number(plan.dayOfMonth) === dayOfMonth) applies = true;
        else if (plan.frequency === 'Weekly' && Number(plan.dayOfWeek) === dayOfWeek) applies = true;
        else if (plan.frequency === 'Once' && plan.dueDate === dateStr) applies = true;

        if (applies) {
          if (plan.type === 'Income') plannedIncomes += Number(plan.amount);
          else plannedExpenses += Number(plan.amount);
        }
      });

      let actualIncomes = 0;
      let actualExpenses = 0;
      transactions.forEach(t => {
        if (t.date === dateStr) {
          if (t.type === 'Income') actualIncomes += Number(t.amount);
          else actualExpenses += Number(t.amount);
        }
      });

      const dayStartingBalance = currentBalance;
      const netChange = (plannedIncomes + actualIncomes) - (plannedExpenses + actualExpenses);
      const dayEndingBalance = dayStartingBalance + netChange;

      if (dayEndingBalance < lowestBal) lowestBal = dayEndingBalance;

      if (!foundNextIncome) {
        if (plannedIncomes > 0 && i > 0) foundNextIncome = true;
        else totalExpensesBeforeNextIncome += plannedExpenses;
      }

      projections.push({
        date: dateStr,
        displayDate: targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        dayName: targetDate.toLocaleDateString('en-US', { weekday: 'short' }),
        startingBalance: dayStartingBalance,
        plannedIncomes,
        plannedExpenses,
        actualIncomes,
        actualExpenses,
        endingBalance: dayEndingBalance,
        isToday: i === 0,
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
        hasNetExpense: plannedExpenses > 0 || actualExpenses > 0,
        hasNetIncome: plannedIncomes > 0 || actualIncomes > 0
      });

      currentBalance = dayEndingBalance;
    }

    const currentActualBalance = Number(startingBalance);
    const safeBuffer = Math.max(0, currentActualBalance - totalExpensesBeforeNextIncome);
    const safeToSpend = Math.round(safeBuffer * 0.85);

    return {
      dailyProjections: projections,
      safeToSpendToday: safeToSpend,
      lowestProjectedBalance: lowestBal
    };
  }, [startingBalance, transactions, cashflowPlans, projectionDays]);

 const handleAddTransaction = async (newTx) => {
    // Lokalno osvežavanje stanja radi brzine interfejsa
    setTransactions(prev => [newTx, ...prev]);
    if (newTx.date === new Date().toISOString().split('T')[0]) {
      if (newTx.type === 'Income') setStartingBalance(prev => Number(prev) + Number(newTx.amount));
      else setStartingBalance(prev => Number(prev) - Number(newTx.amount));
    }

    // Upis transakcije u Supabase cloud bazu
    try {
      await supabase.from('transactions').insert([
        {
          title: newTx.title,
          amount: Number(newTx.amount),
          transaction_type: newTx.type,
          category: newTx.category,
          transaction_date: newTx.date || new Date().toISOString().split('T')[0],
          merchant_name: newTx.merchant || 'General Merchant'
        }
      ]);
    } catch (err) {
      console.error('Error saving transaction to Supabase:', err);
    }

    if (household.isConnected) {
      const senderName = userProfile.nickname || 'You';
      pushNotification(
        `🛒 Partner Receipt Alert!`,
        `${senderName} logged a transaction: ${newTx.title} (${formatCurrency(newTx.amount)})`,
        'partner'
      );
    }
  };

  const handleDeleteTransaction = async (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));

    // Brisanje iz Supabase baze ako je validan UUID
    try {
      if (typeof id === 'string' && id.includes('-') && !id.startsWith('tx-')) {
        await supabase.from('transactions').delete().eq('id', id);
      }
    } catch (err) {
      console.error('Error deleting transaction from Supabase:', err);
    }
  };

  const handleSavePlan = (planData) => {
    if (editingPlan) {
      setCashflowPlans(prev => prev.map(p => p.id === editingPlan.id ? { ...planData, id: editingPlan.id } : p));
    } else {
      setCashflowPlans(prev => [...prev, { ...planData, id: 'plan-' + Date.now() }]);
    }
    setIsPlanModalOpen(false);
    setEditingPlan(null);
  };

  const handleDeletePlan = (id) => setCashflowPlans(prev => prev.filter(p => p.id !== id));

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const navItems = [
    { id: 'cashflow', label: 'Cashflow Projection', icon: Calendar },
    { id: 'wishlist', label: 'Wish List', icon: Gift },
    { id: 'lists', label: 'Grocery List', icon: ListPlus },
    { id: 'entry', label: 'Expenses & OCR Scan', icon: Camera },
    { id: 'groceries', label: 'Item Tracker & Usage', icon: Activity },
    { id: 'analytics', label: 'Reports', icon: PieChart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const currentTabObj = navItems.find(n => n.id === activeTab) || navItems[0];

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-500 ${currentTheme === 'light-mode' ? 'bg-slate-100 text-slate-900' : `${bgStyle.bgClass} text-slate-100`}`}>
      
      {currentFunFactBanner && (
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 border-b border-indigo-500/30 px-4 py-2.5 text-xs font-semibold flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2 max-w-5xl mx-auto">
            <Smile className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-purple-100 leading-tight">{currentFunFactBanner}</span>
          </div>
          <button onClick={() => setCurrentFunFactBanner(null)} className="text-slate-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <header className={`sticky top-0 z-40 backdrop-blur-md border-b px-4 py-3.5 sm:px-6 ${currentTheme === 'light-mode' ? 'bg-white/90 border-slate-200' : 'bg-slate-900/80 border-slate-800/80'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-105 ${theme.btnPrimary}`}>
              <TrendingUp className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-wider uppercase bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                STASHLY.COM
              </h1>
              <p className="text-[11px] opacity-60 font-semibold tracking-wide">
                {userProfile.loggedIn && userProfile.nickname ? `Welcome back, ${userProfile.nickname}!` : 'Smart Cashflow & Shared Vault'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className={`hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold ${theme.textAccent} ${theme.borderAccent} ${theme.bgAccent}`}>
              <ShieldCheck className="w-4 h-4" />
              <span>Safe: {formatCurrency(safeToSpendToday)}</span>
            </div>

            {/* User Account / Nickname Badge Button */}
            <button
              onClick={() => setShowAuthModal(true)}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
                userProfile.loggedIn
                  ? 'bg-slate-900 border-slate-700 text-slate-100 hover:border-slate-500'
                  : `${theme.btnPrimary}`
              }`}
              title="Account & Nickname Settings"
            >
              <UserCircle className="w-5 h-5" />
              <span className="hidden sm:inline">
                {userProfile.loggedIn ? userProfile.nickname || 'My Account' : 'Sign In / Register'}
              </span>
            </button>

            <button
              onClick={() => { setShowNotificationCenter(!showNotificationCenter); markAllNotificationsRead(); }}
              className="relative p-2.5 rounded-xl border bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-800 transition-all"
              title="Alerts & Push Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full text-[10px] font-black flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setShowPartnerModal(true)}
              className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
                household.isConnected
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-emerald-500/20 shadow-md'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-800'
              }`}
              title="Shared Household Vault"
            >
              {household.isConnected ? (
                <>
                  <UserCheck className="w-5 h-5 text-emerald-400" />
                  <span className="hidden sm:inline">Partner Synced</span>
                </>
              ) : (
                <>
                  <UserPlus className={`w-5 h-5 ${theme.textAccent}`} />
                  <span className="hidden sm:inline">Add Person</span>
                </>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border font-bold text-xs transition-all ${theme.btnPrimary}`}
              >
                <Menu className="w-5 h-5" />
                <span className="hidden sm:inline">{currentTabObj.label}</span>
              </button>

              {isMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs" onClick={() => setIsMenuOpen(false)} />
                  <div className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl border z-50 p-2 space-y-1 ${currentTheme === 'light-mode' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                    <div className="px-3 py-2 border-b border-slate-800/50 mb-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider opacity-50">Stashly Navigation</p>
                    </div>
                    {navItems.map(item => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                            isActive ? `${theme.btnPrimary} shadow-md` : 'hover:bg-slate-800/50 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {}
      {showNotificationCenter && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-end p-4 sm:p-6">
          <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl w-full max-w-md p-5 space-y-4 shadow-2xl mt-12`}>
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <BellRing className={`w-5 h-5 ${theme.textAccent}`} />
                <h3 className="text-sm font-bold">Stashly Push Alert Engine</h3>
              </div>
              <button onClick={() => setShowNotificationCenter(false)} className="text-slate-500 hover:text-white"><X className="w-4 h-4" /></button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex justify-between items-center text-xs">
              <span className="opacity-70 font-semibold">Web Push Permission:</span>
              <button
                onClick={requestBrowserPushPermission}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold ${pushEnabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : theme.btnPrimary}`}
              >
                {pushEnabled ? '✓ Push Enabled' : 'Enable Web Push'}
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {notifications.map(n => (
                <div key={n.id} className="bg-slate-950 border border-slate-800/80 p-3 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-200 flex items-center gap-1.5">
                      {n.type === 'bill' && '⏰ Bill Due Alert'}
                      {n.type === 'low' && '⚠️ Low Balance Warning'}
                      {n.type === 'partner' && '🛒 Partner Activity'}
                      {n.type === 'fact' && '💡 Financial Fun Fact'}
                      {n.type === 'info' && '🔔 System Notice'}
                    </span>
                    <span className="text-[10px] opacity-50">{n.date}</span>
                  </div>
                  <p className="opacity-70 text-[11px]">{n.body}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex gap-2">
              <button
                onClick={() => pushNotification('⏰ 3-Day Bill Alert', `Hey ${userProfile.nickname || 'there'}, Electric Bill ($120) is due in 3 days.`, 'bill')}
                className="flex-1 py-2 rounded-xl text-[10px] font-bold bg-slate-950 border border-slate-800 hover:border-amber-500/40 text-amber-400"
              >
                Test Bill Alert
              </button>
              <button
                onClick={() => pushNotification('⚠️ Low Balance Warning', `Heads up ${userProfile.nickname || ''}! Projected balance drops below ${formatCurrency(100)} on June 18th.`, 'low')}
                className="flex-1 py-2 rounded-xl text-[10px] font-bold bg-slate-950 border border-slate-800 hover:border-rose-500/40 text-rose-400"
              >
                Test Low Balance
              </button>
              <button
                onClick={showRandomFunFact}
                className={`flex-1 py-2 rounded-xl text-[10px] font-bold ${theme.btnPrimary}`}
              >
                Pop Fun Fact
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {activeTab === 'cashflow' && (
          <CashflowView
            theme={theme}
            startingBalance={startingBalance}
            setStartingBalance={setStartingBalance}
            dailyProjections={dailyProjections}
            safeToSpendToday={safeToSpendToday}
            lowestProjectedBalance={lowestProjectedBalance}
            projectionDays={projectionDays}
            setProjectionDays={setProjectionDays}
            cashflowPlans={cashflowPlans}
            formatCurrency={formatCurrency}
            onOpenAddPlan={() => { setEditingPlan(null); setIsPlanModalOpen(true); }}
            onEditPlan={(plan) => { setEditingPlan(plan); setIsPlanModalOpen(true); }}
            onDeletePlan={handleDeletePlan}
          />
        )}

        {activeTab === 'wishlist' && (
          <WishlistView
            theme={theme}
            wishlistItems={wishlistItems}
            setWishlistItems={setWishlistItems}
            formatCurrency={formatCurrency}
            startingBalance={startingBalance}
            safeToSpendToday={safeToSpendToday}
            onAddPlan={(newPlan) => setCashflowPlans(prev => [...prev, newPlan])}
            onAddTransaction={handleAddTransaction}
          />
        )}

        {activeTab === 'lists' && (
          <ShoppingListsView
            theme={theme}
            geminiApiKey={geminiApiKey}
            selectedCurrency={selectedCurrency}
            shoppingLists={shoppingLists}
            setShoppingLists={setShoppingLists}
            formatCurrency={formatCurrency}
            onAddTransaction={handleAddTransaction}
          />
        )}

        {activeTab === 'entry' && (
          <DailyEntryView
            theme={theme}
            geminiApiKey={geminiApiKey}
            onAddTransaction={handleAddTransaction}
            transactions={transactions}
            formatCurrency={formatCurrency}
            onDeleteTransaction={handleDeleteTransaction}
          />
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
            currentBg={currentBg}
            setCurrentBg={setCurrentBg}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            startingBalance={startingBalance}
            setStartingBalance={setStartingBalance}
            setShowAdminModal={setShowAdminModal}
            household={household}
            onOpenPartnerModal={() => setShowPartnerModal(true)}
            pushEnabled={pushEnabled}
            onRequestPush={requestBrowserPushPermission}
            onPopFunFact={showRandomFunFact}
            userProfile={userProfile}
            onOpenAuthModal={() => setShowAuthModal(true)}
          />
        )}
      </main>

      {}
      {showAuthModal && (
        <AuthModal
          theme={theme}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          onClose={() => setShowAuthModal(false)}
          pushNotification={pushNotification}
        />
      )}

      {showPartnerModal && (
        <PartnerModal
          theme={theme}
          household={household}
          setHousehold={setHousehold}
          userProfile={userProfile}
          onClose={() => setShowPartnerModal(false)}
        />
      )}

      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl w-full max-w-md p-6 space-y-4`}>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2"><Lock className={`w-4 h-4 ${theme.textAccent}`} /> Admin API Key Override</h3>
              <button onClick={() => setShowAdminModal(false)} className="text-slate-500 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <p className="text-xs opacity-70">Enter master Gemini API key to override server configuration.</p>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono focus:outline-none"
            />
            <button onClick={() => setShowAdminModal(false)} className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase ${theme.btnPrimary}`}>Save Admin Key</button>
          </div>
        </div>
      )}

      {isPlanModalOpen && (
        <PlanModal theme={theme} plan={editingPlan} onSave={handleSavePlan} onClose={() => { setIsPlanModalOpen(false); setEditingPlan(null); }} />
      )}
    </div>
  );
}

function AuthModal({ theme, userProfile, setUserProfile, onClose, pushNotification }) {
  const [isRegisterMode, setIsRegisterMode] = useState(!userProfile.loggedIn);
  const [email, setEmail] = useState(userProfile.email || '');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState(userProfile.nickname || '');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setAuthError('');
    setLoading(true);

    try {
      if (isRegisterMode) {
        const finalNickname = nickname.trim() || email.split('@')[0];
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { nickname: finalNickname } }
        });

        if (error) throw error;

        setUserProfile({
          loggedIn: true,
          email: email,
          nickname: finalNickname,
          userId: data.user?.id || 'usr-' + Date.now().toString(36)
        });

        pushNotification(
          `Welcome to Stashly, ${finalNickname}! 🚀`,
          `Your account has been created on Supabase Cloud.`
        );
        onClose();
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        const user = data.user;
        const userNick = user?.user_metadata?.nickname || email.split('@')[0];

        setUserProfile({
          loggedIn: true,
          email: user.email,
          nickname: userNick,
          userId: user.id
        });

        pushNotification(
          `Welcome back, ${userNick}! 🚀`,
          `Successfully authenticated with Supabase.`
        );
        onClose();
      }
    } catch (err) {
      setAuthError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUserProfile({ loggedIn: false, email: '', nickname: '', userId: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl`}>
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <UserCircle className={`w-6 h-6 ${theme.textAccent}`} />
            <div>
              <h3 className="text-sm font-bold">Stashly Cloud Account</h3>
              <p className="text-[10px] opacity-60">Supabase Secured Authentication</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white"><X className="w-4 h-4" /></button>
        </div>

        {authError && (
          <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl text-xs text-rose-400 font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{authError}</span>
          </div>
        )}

        {userProfile.loggedIn ? (
          <div className="space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="opacity-60">Status:</span>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold text-[10px]">
                  ✓ Cloud Authenticated
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="opacity-60">App Nickname:</span>
                <span className={`font-bold ${theme.textAccent}`}>{userProfile.nickname}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="opacity-60">Email:</span>
                <span className="font-mono text-[11px] opacity-90">{userProfile.email}</span>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="w-full py-2.5 rounded-xl font-semibold text-xs border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Sign Out of Account
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex border-b border-slate-800 mb-2">
              <button
                type="button"
                onClick={() => { setIsRegisterMode(true); setAuthError(''); }}
                className={`flex-1 py-2 text-xs font-bold text-center border-b-2 ${isRegisterMode ? `${theme.borderAccent} ${theme.textAccent}` : 'border-transparent opacity-50'}`}
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => { setIsRegisterMode(false); setAuthError(''); }}
                className={`flex-1 py-2 text-xs font-bold text-center border-b-2 ${!isRegisterMode ? `${theme.borderAccent} ${theme.textAccent}` : 'border-transparent opacity-50'}`}
              >
                Sign In
              </button>
            </div>

            {isRegisterMode && (
              <div>
                <label className="text-[11px] font-semibold opacity-60 uppercase">App Nickname</label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    placeholder="e.g. Alex, Johnny..."
                    required={isRegisterMode}
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs focus:outline-none"
                  />
                  <User className="w-4 h-4 absolute left-3 top-2.5 opacity-50" />
                </div>
              </div>
            )}

            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Email Address</label>
              <div className="relative mt-1">
                <input
                  type="email"
                  placeholder="yourname@gmail.com"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs focus:outline-none"
                />
                <AtSign className="w-4 h-4 absolute left-3 top-2.5 opacity-50" />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Password</label>
              <div className="relative mt-1">
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs focus:outline-none"
                />
                <KeyRound className="w-4 h-4 absolute left-3 top-2.5 opacity-50" />
              </div>
            </div>

            <button type="submit" disabled={loading} className={`w-full py-3 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2 ${theme.btnPrimary}`}>
              <LogIn className="w-4 h-4" /> {loading ? 'Authenticating...' : (isRegisterMode ? 'Create Cloud Account' : 'Sign In')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function PartnerModal({ theme, household, setHousehold, userProfile, onClose }) {
  const [activeTab, setActiveTab] = useState('code');
  const [partnerInput, setPartnerInput] = useState('');
  const [partnerName, setPartnerName] = useState(household.partnerName || '');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [syncError, setSyncError] = useState('');

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(household.householdId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConnectPartner = async (e) => {
    e.preventDefault();
    if (!partnerInput) return;
    setSyncError('');
    setLoading(true);

    try {
      const codeToLink = partnerInput.trim().toUpperCase();

      // Provera ili kreiranje zapisa u Supabase public.households tabeli
      const { data: existingHousehold, error: fetchErr } = await supabase
        .from('households')
        .select('*')
        .eq('household_code', codeToLink)
        .maybeSingle();

      if (fetchErr) throw fetchErr;

      if (!existingHousehold) {
        // Ako kod još ne postoji u bazi, kreiramo novu zajedničku sobu/sef
        const { error: insertErr } = await supabase
          .from('households')
          .insert([{ household_code: codeToLink }]);

        if (insertErr) throw insertErr;
      }

      setHousehold(prev => ({
        ...prev,
        householdId: codeToLink,
        partnerEmail: partnerInput,
        partnerName: partnerName || partnerInput.split('@')[0],
        isConnected: true
      }));

      onClose();
    } catch (err) {
      setSyncError(err.message || 'Failed to link household in Supabase cloud.');
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    setHousehold(prev => ({ ...prev, partnerEmail: '', partnerName: '', isConnected: false }));
  };

  const handleScanQRCode = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPartnerInput(household.householdId);
      setPartnerName('Scanned Partner');
      alert('QR Code detected! Click "Merge Accounts & Sync" to establish cloud connection.');
    };
    reader.readAsDataURL(file);
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(household.householdId)}&color=0f172a&bgcolor=f8fafc`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartHandshake className={`w-6 h-6 ${theme.textAccent}`} />
            <div>
              <h3 className="text-sm font-bold">Shared Vault & Partner Account</h3>
              <p className="text-[10px] opacity-60">
                {userProfile.nickname ? `${userProfile.nickname}'s Cloud Vault Sync` : 'Merge budgets with your spouse or partner'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white"><X className="w-4 h-4" /></button>
        </div>

        {syncError && (
          <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl text-xs text-rose-400 font-semibold">
            ⚠️ {syncError}
          </div>
        )}

        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('code')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'code' ? `${theme.btnPrimary}` : 'opacity-60 hover:opacity-100 text-slate-300'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" /> Code & Manual
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'qr' ? `${theme.btnPrimary}` : 'opacity-60 hover:opacity-100 text-slate-300'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" /> QR Connect
          </button>
        </div>

        {activeTab === 'qr' ? (
          <div className="space-y-4 text-center py-2">
            <div className="bg-slate-100 p-4 rounded-2xl inline-block shadow-inner mx-auto border border-slate-300">
              <img src={qrCodeUrl} alt="Household QR Code" className="w-36 h-36 mx-auto rounded-lg" />
            </div>
            <p className="text-xs opacity-70">Have your partner open Stashly, switch to the QR tab, and scan this code using their camera to instantly interconnect.</p>

            <div className="pt-2">
              <label className="cursor-pointer inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200">
                <Camera className="w-4 h-4 text-emerald-400" /> Open Camera to Scan Partner's QR
                <input type="file" accept="image/*" capture="environment" onChange={handleScanQRCode} className="hidden" />
              </label>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="opacity-60 font-semibold uppercase text-[10px]">Vault Status</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${household.isConnected ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'}`}>
                  {household.isConnected ? '❤️ Connected Cloud Vault' : '👤 Personal Vault'}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="opacity-60">Your Household Code:</span>
                <div className="flex items-center gap-1.5 font-mono font-bold text-emerald-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                  <span>{household.householdId}</span>
                  <button onClick={handleCopyCode} className="text-slate-400 hover:text-white">
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {!household.isConnected ? (
              <form onSubmit={handleConnectPartner} className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold opacity-60 uppercase">Partner's Sync Code</label>
                  <input
                    type="text"
                    placeholder="e.g. SB-98X21"
                    required
                    value={partnerInput}
                    onChange={e => setPartnerInput(e.target.value)}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none uppercase font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold opacity-60 uppercase">Partner's Nickname</label>
                  <input
                    type="text"
                    placeholder="e.g. Anja"
                    value={partnerName}
                    onChange={e => setPartnerName(e.target.value)}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none"
                  />
                </div>

                <button type="submit" disabled={loading} className={`w-full py-3 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2 ${theme.btnPrimary}`}>
                  <UserPlus className="w-4 h-4" /> {loading ? 'Syncing with Supabase...' : 'Merge Accounts & Sync Cloud'}
                </button>
              </form>
            ) : (
              <div className="space-y-3">
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-xs space-y-1">
                  <p className="font-bold text-emerald-400">Vault synced with {household.partnerName || household.partnerEmail}</p>
                  <p className="text-[10px] opacity-70">Household room "{household.householdId}" is active on Supabase.</p>
                </div>

                <button onClick={handleDisconnect} className="w-full py-2.5 rounded-xl font-semibold text-xs border border-rose-500/30 text-rose-400 hover:bg-rose-500/10">
                  Unlink Partner Account
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function CashflowView({ theme, startingBalance, setStartingBalance, dailyProjections, safeToSpendToday, lowestProjectedBalance, projectionDays, setProjectionDays, cashflowPlans, formatCurrency, onOpenAddPlan, onEditPlan, onDeletePlan }) {
  const [filterType, setFilterType] = useState('all');
  const [isBalanceEditing, setIsBalanceEditing] = useState(false);
  const [tempBalance, setTempBalance] = useState(startingBalance);

  const maxBal = Math.max(...dailyProjections.map(d => d.endingBalance), 100);
  const minBal = Math.min(...dailyProjections.map(d => d.endingBalance), 0);
  const range = (maxBal - minBal) || 1;

  const chartPoints = dailyProjections.map((d, index) => {
    const x = (index / (dailyProjections.length - 1)) * 100;
    const y = 100 - (((d.endingBalance - minBal) / range) * 80 + 10);
    return `${x},${y}`;
  }).join(' ');

  const filteredProjections = dailyProjections.filter(d => {
    if (filterType === 'bills') return d.hasNetExpense || d.hasNetIncome;
    if (filterType === 'low') return d.endingBalance < 100;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl relative`}>
          <div className="flex items-center justify-between opacity-60 mb-2">
            <span className="text-xs font-semibold uppercase">Current Balance</span>
            <DollarSign className={`w-4 h-4 ${theme.textAccent}`} />
          </div>
          {isBalanceEditing ? (
            <div className="flex items-center gap-2 mt-1">
              <input type="number" value={tempBalance} onChange={(e) => setTempBalance(e.target.value)} className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-lg font-bold w-full focus:outline-none" />
              <button onClick={() => { setStartingBalance(Number(tempBalance)); setIsBalanceEditing(false); }} className={`p-1.5 rounded-lg ${theme.btnPrimary}`}><Check className="w-4 h-4" /></button>
            </div>
          ) : (
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-black">{formatCurrency(startingBalance)}</span>
              <button onClick={() => { setTempBalance(startingBalance); setIsBalanceEditing(true); }} className={`text-xs opacity-60 hover:opacity-100 flex items-center gap-1 ${theme.textAccent}`}><Edit3 className="w-3.5 h-3.5" /> Edit</button>
            </div>
          )}
        </div>

        <div className={`p-5 rounded-2xl border bg-gradient-to-br ${theme.bgGlow} to-slate-900 ${theme.cardBorder}`}>
          <p className={`text-xs font-bold uppercase flex items-center gap-1.5 ${theme.textAccent}`}><ShieldCheck className="w-4 h-4" /> Safe to Spend Today</p>
          <p className={`text-2xl font-black mt-1 ${theme.textAccent}`}>{formatCurrency(safeToSpendToday)}</p>
        </div>

        <div className={`${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl`}>
          <div className="flex items-center justify-between opacity-60 mb-2">
            <span className="text-xs font-semibold uppercase">Lowest Point</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black">{formatCurrency(lowestProjectedBalance)}</p>
        </div>

        <div className={`${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl flex flex-col justify-between`}>
          <p className="text-xs font-semibold uppercase opacity-60">Projection Horizon</p>
          <div className="grid grid-cols-4 gap-1.5 mt-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {[30, 45, 60, 90].map(d => (
              <button key={d} onClick={() => setProjectionDays(d)} className={`py-1 rounded-lg text-xs font-bold transition-all ${projectionDays === d ? theme.btnPrimary : 'opacity-60'}`}>{d}d</button>
            ))}
          </div>
        </div>
      </div>

      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 space-y-4`}>
        <h3 className="text-base font-bold flex items-center gap-2"><TrendingUp className={`w-5 h-5 ${theme.textAccent}`} /> Daily Balance Projection ({projectionDays} Days)</h3>
        <div className="h-56 w-full relative pt-4 pb-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="20" x2="100" y2="20" stroke="#334155" strokeDasharray="2,2" strokeWidth="0.5" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#334155" strokeDasharray="2,2" strokeWidth="0.5" />
            <line x1="0" y1="80" x2="100" y2="80" stroke="#334155" strokeDasharray="2,2" strokeWidth="0.5" />
            <polyline fill="none" stroke={theme.chartColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={chartPoints} />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-5 space-y-4 flex flex-col`}>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold">Planned Income & Expenses</h4>
            <button onClick={onOpenAddPlan} className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 border ${theme.borderAccent} ${theme.bgAccent} ${theme.textAccent}`}><Plus className="w-4 h-4" /> Add Plan</button>
          </div>
          <div className="space-y-2.5 overflow-y-auto max-h-[380px]">
            {cashflowPlans.length === 0 ? (
              <p className="text-xs opacity-50 text-center py-8 border border-dashed border-slate-800 rounded-xl">No plans added yet.</p>
            ) : (
              cashflowPlans.map(plan => (
                <div key={plan.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold">{plan.title}</h5>
                    <span className="text-[10px] opacity-60">{plan.frequency}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${plan.type === 'Income' ? 'text-emerald-400' : 'text-rose-400'}`}>{plan.type === 'Income' ? '+' : '-'}{formatCurrency(plan.amount)}</span>
                    <button onClick={() => onEditPlan(plan)} className="text-slate-400 hover:text-white p-1"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => onDeletePlan(plan.id)} className="text-slate-600 hover:text-rose-400 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={`lg:col-span-2 ${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-5 space-y-4`}>
          <h4 className="text-sm font-bold">Daily Balance Forecast Table</h4>
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 opacity-60 uppercase text-[10px]">
                  <th className="p-3">Date</th>
                  <th className="p-3">Starting</th>
                  <th className="p-3 text-emerald-400">Planned Inc.</th>
                  <th className="p-3 text-rose-400">Planned Exp.</th>
                  <th className="p-3 text-right">Ending</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredProjections.map(d => (
                  <tr key={d.date} className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold font-sans">{d.displayDate} ({d.dayName})</td>
                    <td className="p-3 opacity-60">{formatCurrency(d.startingBalance)}</td>
                    <td className="p-3 text-emerald-400">{d.plannedIncomes > 0 ? `+${formatCurrency(d.plannedIncomes)}` : '-'}</td>
                    <td className="p-3 text-rose-400">{d.plannedExpenses > 0 ? `-${formatCurrency(d.plannedExpenses)}` : '-'}</td>
                    <td className="p-3 text-right font-bold">{formatCurrency(d.endingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function WishlistView({ theme, wishlistItems, setWishlistItems, formatCurrency, startingBalance, safeToSpendToday, onAddPlan, onAddTransaction }) {
  const [formData, setFormData] = useState({ title: '', price: '', priority: 'Medium', category: 'Tech & Gadgets', notes: '' });

  const totalWishValuation = useMemo(() => {
    return wishlistItems.reduce((acc, curr) => acc + Number(curr.price || 0), 0);
  }, [wishlistItems]);

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;

    setWishlistItems(prev => [
      { id: 'wish-' + Date.now(), ...formData, price: Number(formData.price), createdAt: new Date().toISOString() },
      ...prev
    ]);

    setFormData({ title: '', price: '', priority: 'Medium', category: 'Tech & Gadgets', notes: '' });
  };

  const handleDeleteWish = (id) => {
    setWishlistItems(prev => prev.filter(w => w.id !== id));
  };

  const handleConvertToPlan = (wish) => {
    onAddPlan({
      id: 'plan-' + Date.now(),
      title: `Wish: ${wish.title}`,
      amount: wish.price,
      type: 'Expense',
      category: 'Other',
      frequency: 'Once',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isActive: true
    });
  };

  const handleBuyNow = (wish) => {
    onAddTransaction({
      id: 'tx-' + Date.now(),
      title: wish.title,
      amount: wish.price,
      type: 'Expense',
      category: 'Other',
      merchant: 'Wishlist Purchase',
      date: new Date().toISOString().split('T')[0]
    });
    handleDeleteWish(wish.id);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl`}>
          <div className="flex items-center justify-between opacity-60 mb-1">
            <span className="text-xs font-semibold uppercase">Total Wish List Cost</span>
            <Gift className={`w-4 h-4 ${theme.textAccent}`} />
          </div>
          <p className="text-2xl font-black">{formatCurrency(totalWishValuation)}</p>
          <p className="text-[10px] opacity-60 mt-1">{wishlistItems.length} future items on wishlist</p>
        </div>

        <div className={`${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl`}>
          <div className="flex items-center justify-between opacity-60 mb-1">
            <span className="text-xs font-semibold uppercase">Affordability Check</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400">{formatCurrency(safeToSpendToday)}</p>
          <p className="text-[10px] opacity-60 mt-1">Safe to spend buffer currently available</p>
        </div>

        <div className={`${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl flex flex-col justify-between`}>
          <div className="flex items-center justify-between opacity-60 mb-1">
            <span className="text-xs font-semibold uppercase">Highest Priority Wish</span>
            <Heart className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-lg font-bold truncate">
            {wishlistItems.find(w => w.priority === 'High')?.title || (wishlistItems[0]?.title || 'None yet')}
          </p>
          <span className="text-[10px] opacity-60">
            {wishlistItems.length > 0 ? formatCurrency(wishlistItems.find(w => w.priority === 'High')?.price || wishlistItems[0]?.price) : 'Add your first wish below'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl space-y-4 lg:col-span-1`}>
          <h3 className="text-sm font-bold flex items-center gap-2"><Plus className={`w-4 h-4 ${theme.textAccent}`} /> Add Future Wish Item</h3>
          <form onSubmit={handleAddWish} className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Item Name</label>
              <input
                type="text"
                placeholder="e.g. 34' OLED Monitor, New PC, Dress..."
                required
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Expected Price</label>
              <input
                type="number"
                placeholder="e.g. 45000"
                required
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold opacity-60 uppercase">Priority</label>
                <select
                  value={formData.priority}
                  onChange={e => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="High">🔥 High</option>
                  <option value="Medium">⚡ Medium</option>
                  <option value="Low">🌱 Low</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold opacity-60 uppercase">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="Tech & Gadgets">Tech & PC</option>
                  <option value="Fashion">Clothing & Apparel</option>
                  <option value="Home & Furniture">Home & Appliances</option>
                  <option value="Animals & Farm">Animals & Pets</option>
                  <option value="Travel & Fun">Travel & Fun</option>
                  <option value="Other">Other Wish</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Notes / Specs</label>
              <textarea
                rows={2}
                placeholder="Optional link, specs, color, model details..."
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs focus:outline-none"
              />
            </div>

            <button type="submit" className={`w-full py-3 rounded-xl font-bold text-xs uppercase ${theme.btnPrimary}`}>
              Add to Wish List
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-3">
          {wishlistItems.length === 0 ? (
            <div className={`${theme.cardBg} border border-dashed border-slate-800 rounded-2xl p-12 text-center opacity-50 text-xs space-y-2`}>
              <Gift className="w-8 h-8 mx-auto opacity-40" />
              <p className="font-bold">Your wish list is currently empty.</p>
              <p>Add anything you plan to buy in the future to keep your cashflow clear until you're ready!</p>
            </div>
          ) : (
            wishlistItems.map(wish => {
              const isAffordableNow = safeToSpendToday >= wish.price;
              return (
                <div key={wish.id} className={`${theme.cardBg} border ${theme.cardBorder} p-4 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4`}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        wish.priority === 'High' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                        wish.priority === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                      }`}>
                        {wish.priority} Priority
                      </span>
                      <span className="text-[10px] opacity-50 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800">{wish.category}</span>
                      {isAffordableNow && (
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Affordable Now
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm text-slate-100">{wish.title}</h4>
                    {wish.notes && <p className="text-xs opacity-60 italic">{wish.notes}</p>}
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                    <div className="text-left sm:text-right">
                      <span className={`text-base font-black font-mono ${theme.textAccent}`}>{formatCurrency(wish.price)}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleConvertToPlan(wish)}
                        title="Add to Planned Cashflow"
                        className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-semibold flex items-center gap-1"
                      >
                        <Calendar className="w-3.5 h-3.5 text-blue-400" /> Plan
                      </button>

                      <button
                        onClick={() => handleBuyNow(wish)}
                        title="Log as Bought"
                        className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 ${theme.btnPrimary}`}
                      >
                        <Check className="w-3.5 h-3.5" /> Buy
                      </button>

                      <button
                        onClick={() => handleDeleteWish(wish.id)}
                        className="p-2 text-slate-600 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function ShoppingListsView({ theme, geminiApiKey, selectedCurrency, shoppingLists, setShoppingLists, formatCurrency, onAddTransaction }) {
  const [selectedCategory, setSelectedCategory] = useState('Foods');
  const [listTitle, setListTitle] = useState('');
  const [rawText, setRawText] = useState('');
  const [isEstimating, setIsEstimating] = useState(false);

  const categories = [
    { id: 'Foods', label: 'Foods & Groceries', icon: ShoppingBag },
    { id: 'Tools', label: 'Tools & Hardware', icon: Wrench },
    { id: 'Car', label: 'Car Parts & Repair', icon: Car },
    { id: 'Project', label: 'Projects & Building', icon: Hammer },
    { id: 'Other', label: 'Other & Various', icon: Package }
  ];

  const handleEstimateCost = async (e) => {
    e.preventDefault();
    if (!rawText.trim() || !listTitle.trim()) return;

    if (!geminiApiKey) {
      alert('Gemini API key is required for AI estimations. Please configure it in Settings.');
      return;
    }

    setIsEstimating(true);
    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;
      const systemPrompt = `Analyze shopping list for '${selectedCategory}'. Estimate average retail price in ISO currency ${selectedCurrency}. Respond strictly with JSON: { "estimatedItems": [{ "item": "string", "qty": "string", "estimatedPrice": number }], "totalEstimated": number, "summaryNote": "string" }\nList:\n${rawText}`;

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: systemPrompt }] }], generationConfig: { responseMimeType: "application/json" } })
      });
      const data = await res.json();
      const parsed = JSON.parse(data?.candidates?.[0]?.content?.parts?.[0]?.text);

      setShoppingLists(prev => [{ id: 'list-' + Date.now(), title: listTitle, category: selectedCategory, rawText, estimatedItems: parsed.estimatedItems || [], totalEstimated: parsed.totalEstimated || 0, summaryNote: parsed.summaryNote || '', date: new Date().toISOString().split('T')[0] }, ...prev]);
      setListTitle('');
      setRawText('');
    } catch (err) { alert('Estimation error: ' + err.message); } finally { setIsEstimating(false); }
  };

  const convertListToTransaction = (list) => {
    onAddTransaction({
      id: 'tx-' + Date.now(),
      title: list.title,
      amount: Number(list.totalEstimated) || 0,
      type: 'Expense',
      category: 'Food',
      merchant: 'Shopping List Purchase',
      date: new Date().toISOString().split('T')[0],
      items: list.estimatedItems.map(i => ({ name: i.item, quantity: i.qty, price: i.estimatedPrice }))
    });
  };

  return (
    <div className="space-y-6">
      <div className={`${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl`}>
        <h3 className="text-base font-bold flex items-center gap-2"><Calculator className={`w-5 h-5 ${theme.textAccent}`} /> Grocery List & AI Market Cost Estimation</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-1 ${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl space-y-4`}>
          <form onSubmit={handleEstimateCost} className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Category</label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {categories.map(cat => (
                  <button key={cat.id} type="button" onClick={() => setSelectedCategory(cat.id)} className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-2 border ${selectedCategory === cat.id ? theme.btnPrimary : 'bg-slate-950 border-slate-800 opacity-60'}`}>{cat.id}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">List Title</label>
              <input type="text" placeholder="e.g. Weekly Groceries" required value={listTitle} onChange={(e) => setListTitle(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Items List</label>
              <textarea rows={5} placeholder="Write items here (e.g. 2x Milk 1L, 1kg Apples)..." required value={rawText} onChange={(e) => setRawText(e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs focus:outline-none font-mono" />
            </div>
            <button type="submit" disabled={isEstimating} className={`w-full font-bold py-3 rounded-xl text-xs uppercase ${theme.btnPrimary}`}>{isEstimating ? 'Estimating...' : 'Estimate Cost with AI'}</button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {shoppingLists.length === 0 ? (
            <div className={`${theme.cardBg} p-8 rounded-2xl border border-dashed border-slate-800 text-center opacity-50 text-xs`}>No saved shopping lists yet.</div>
          ) : (
            shoppingLists.map(list => (
              <div key={list.id} className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-5 space-y-3`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-sm">{list.title}</h5>
                    <p className="text-[10px] opacity-60">{list.category} • {formatDate(list.date)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-mono font-bold text-base ${theme.textAccent}`}>~{formatCurrency(list.totalEstimated)}</span>
                    <button onClick={() => convertListToTransaction(list)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${theme.btnPrimary}`}>Log as Expense</button>
                    <button onClick={() => setShoppingLists(prev => prev.filter(l => l.id !== list.id))} className="text-slate-600 hover:text-rose-400 p-1"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                {list.summaryNote && <p className="text-xs opacity-70 italic bg-slate-950 p-2.5 rounded-xl border border-slate-800">{list.summaryNote}</p>}
                <div className="space-y-1">
                  {list.estimatedItems?.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs py-1 border-b border-slate-800/40">
                      <span>{item.qty} {item.item}</span>
                      <span className="font-mono opacity-80">{formatCurrency(item.estimatedPrice)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function DailyEntryView({ theme, geminiApiKey, onAddTransaction, transactions, formatCurrency, onDeleteTransaction }) {
  const [formData, setFormData] = useState({ title: '', amount: '', type: 'Expense', category: 'Food', merchant: '', date: new Date().toISOString().split('T')[0] });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef(null);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;

    onAddTransaction({
      id: 'tx-' + Date.now(),
      title: formData.title,
      amount: Number(formData.amount),
      type: formData.type,
      category: formData.category,
      merchant: formData.merchant || 'General Merchant',
      date: formData.date
    });

    setFormData({ title: '', amount: '', type: 'Expense', category: 'Food', merchant: '', date: new Date().toISOString().split('T')[0] });
  };

  const handleReceiptScan = async () => {
    if (!selectedFiles.length) return;
    if (!geminiApiKey) {
      alert('Gemini API key is missing. Please add your key in Settings or Admin Config.');
      return;
    }
    setIsScanning(true);
    try {
      const imageParts = await Promise.all(selectedFiles.map(file => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve({ inlineData: { data: reader.result.split(',')[1], mimeType: file.type || 'image/jpeg' } });
        reader.readAsDataURL(file);
      })));

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: "Extract JSON: pfrNumber, amount (number), merchant (string), date (YYYY-MM-DD), category ('Food','Utilities','Transport','Housing','Entertainment','Health','Other'), title (string), items (array of { name, quantity, price })" }, ...imageParts] }], generationConfig: { responseMimeType: "application/json" } })
      });
      const data = await res.json();
      const parsed = JSON.parse(data?.candidates?.[0]?.content?.parts?.[0]?.text);

      onAddTransaction({
        id: 'tx-' + Date.now(),
        title: parsed.title || 'Scanned Receipt',
        amount: Number(parsed.amount) || 0,
        type: 'Expense',
        category: parsed.category || 'Food',
        merchant: parsed.merchant || 'Store',
        date: parsed.date || new Date().toISOString().split('T')[0],
        items: parsed.items || []
      });
      setSelectedFiles([]);
    } catch (err) { alert('OCR Error: ' + err.message); } finally { setIsScanning(false); }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <div className={`${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl space-y-4`}>
          <h3 className="text-sm font-bold flex items-center gap-2"><Sparkles className={`w-4 h-4 ${theme.textAccent}`} /> Multi-Part Receipt OCR Scanner</h3>
          <p className="text-xs opacity-60">Snap or upload receipt photos. AI extracts totals, merchant, and items.</p>
          <input type="file" multiple accept="image/*" ref={fileInputRef} onChange={(e) => setSelectedFiles(Array.from(e.target.files))} className="hidden" />
          <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-slate-800 p-6 rounded-xl text-center cursor-pointer hover:border-slate-700">
            <Camera className={`w-8 h-8 mx-auto mb-2 ${theme.textAccent}`} />
            <p className="text-xs font-semibold">{selectedFiles.length > 0 ? `${selectedFiles.length} photos selected` : 'Take or Upload Receipt Photos'}</p>
          </div>
          {selectedFiles.length > 0 && <button onClick={handleReceiptScan} disabled={isScanning} className={`w-full py-2.5 rounded-xl font-bold text-xs ${theme.btnPrimary}`}>{isScanning ? 'Scanning...' : 'Process Photos'}</button>}
        </div>

        <div className={`${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl space-y-4`}>
          <h3 className="text-sm font-bold flex items-center gap-2"><Plus className={`w-4 h-4 ${theme.textAccent}`} /> Manual Transaction Entry</h3>
          <form onSubmit={handleManualSubmit} className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Transaction Type</label>
              <div className="grid grid-cols-2 gap-2 mt-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button type="button" onClick={() => setFormData({ ...formData, type: 'Expense' })} className={`py-1.5 rounded-lg text-xs font-bold transition-all ${formData.type === 'Expense' ? 'bg-rose-500 text-white' : 'opacity-60'}`}>Expense (-)</button>
                <button type="button" onClick={() => setFormData({ ...formData, type: 'Income' })} className={`py-1.5 rounded-lg text-xs font-bold transition-all ${formData.type === 'Income' ? 'bg-emerald-500 text-slate-950' : 'opacity-60'}`}>Income (+)</button>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Amount</label>
              <input type="number" placeholder="e.g. 4500" required value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none" />
            </div>

            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Title / Description</label>
              <input type="text" placeholder="e.g. Supermarket Purchase" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold opacity-60 uppercase">Category</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none">
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold opacity-60 uppercase">Date</label>
                <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold opacity-60 uppercase">Merchant / Client</label>
              <input type="text" placeholder="e.g. Target, Shell" value={formData.merchant} onChange={(e) => setFormData({ ...formData, merchant: e.target.value })} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none" />
            </div>

            <button type="submit" className={`w-full py-3 rounded-xl font-bold text-xs uppercase ${theme.btnPrimary}`}>Add Transaction</button>
          </form>
        </div>
      </div>

      <div className={`lg:col-span-2 ${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl space-y-4`}>
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold">Transaction History Log</h3>
          <span className="text-xs opacity-60">Total entries: {transactions.length}</span>
        </div>
        <div className="divide-y divide-slate-800 max-h-[620px] overflow-y-auto pr-1 space-y-2">
          {transactions.length === 0 ? (
            <p className="text-xs opacity-50 text-center py-12 border border-dashed border-slate-800 rounded-xl">No transactions recorded yet.</p>
          ) : (
            transactions.map(t => {
              const cat = CATEGORIES.find(c => c.id === t.category) || CATEGORIES[7];
              return (
                <div key={t.id} className="pt-3 pb-2 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-xl p-2 rounded-xl bg-slate-950 border border-slate-800">{cat.icon}</span>
                    <div>
                      <p className="font-bold">{t.title}</p>
                      <p className="opacity-50">{t.merchant} • {formatDate(t.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-mono font-bold ${t.type === 'Income' ? 'text-emerald-400' : 'text-slate-200'}`}>{t.type === 'Income' ? '+' : '-'}{formatCurrency(t.amount)}</span>
                    <button onClick={() => onDeleteTransaction(t.id)} className="text-slate-600 hover:text-rose-400 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function GroceryTrackerView({ theme, transactions, formatCurrency }) {
  const [search, setSearch] = useState('');
  const items = useMemo(() => {
    const itemMap = {};
    transactions.forEach(t => {
      if (t.items && Array.isArray(t.items)) {
        t.items.forEach(i => {
          const name = i.name || i.item || (typeof i === 'string' ? i : 'Item');
          const qty = Number(i.quantity || i.qty || 1);
          const price = Number(i.price || i.estimatedPrice || 0);

          const k = name.toLowerCase().trim();
          if (!itemMap[k]) itemMap[k] = { name: name, qty: 0, spent: 0 };
          itemMap[k].qty += qty;
          itemMap[k].spent += price * qty;
        });
      }
    });
    return Object.values(itemMap).filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  }, [transactions, search]);

  return (
    <div className={`${theme.cardBg} border ${theme.cardBorder} p-5 rounded-2xl space-y-4`}>
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h3 className="text-sm font-bold flex items-center gap-2"><Activity className={`w-4 h-4 ${theme.textAccent}`} /> Item Tracker & Usage</h3>
        <div className="relative">
          <input type="text" placeholder="Search item..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 pl-8 text-xs focus:outline-none" />
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 opacity-50" />
        </div>
      </div>
      {items.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl text-xs opacity-50">No scanned items tracked yet. Process receipt images or log items to view statistics.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {items.map((i, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex justify-between items-center">
              <div><p className="font-bold text-xs">{i.name}</p></div>
              <div className="text-right"><p className={`font-mono font-bold text-xs ${theme.textAccent}`}>{i.qty} pcs</p><p className="text-[10px] opacity-50">{formatCurrency(i.spent)}</p></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AnalyticsView({ theme, transactions, formatCurrency }) {
  const categoryTotals = useMemo(() => {
    const totals = {};
    CATEGORIES.forEach(c => { totals[c.id] = 0; });
    transactions.forEach(t => {
      if (t.type === 'Expense') totals[t.category] = (totals[t.category] || 0) + Number(t.amount);
    });
    return totals;
  }, [transactions]);

  const totalExpense = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

  return (
    <div className={`${theme.cardBg} border ${theme.cardBorder} p-6 rounded-2xl space-y-6`}>
      <div>
        <h3 className="text-base font-bold flex items-center gap-2">
          <PieChart className={`w-5 h-5 ${theme.textAccent}`} /> Reports & Category Expenses
        </h3>
        <p className="text-xs opacity-60 mt-0.5">Distribution of actual recorded expenses across categories.</p>
      </div>

      {totalExpense === 0 ? (
        <div className="text-center py-12 text-xs opacity-50 border border-dashed border-slate-800 rounded-xl">
          No recorded expenses to display in reports.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CATEGORIES.map(cat => {
            const amount = categoryTotals[cat.id] || 0;
            const percentage = totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0;

            return (
              <div key={cat.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-2">
                    <span>{cat.icon}</span> {cat.label}
                  </span>
                  <span className="font-extrabold text-white">{formatCurrency(amount)}</span>
                </div>

                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${theme.btnPrimary.split(' ')[0]}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="text-[10px] opacity-50 text-right font-semibold">
                  {percentage}% of total expenses
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SettingsView({ theme, currentTheme, setCurrentTheme, currentBg, setCurrentBg, selectedCurrency, setSelectedCurrency, startingBalance, setStartingBalance, setShowAdminModal, household, onOpenPartnerModal, pushEnabled, onRequestPush, onPopFunFact, userProfile, onOpenAuthModal }) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* User Account Profile Settings */}
      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 space-y-4`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <UserCircle className={`w-5 h-5 ${theme.textAccent}`} />
            <h3 className="text-base font-bold">Account & App Nickname</h3>
          </div>
          <button onClick={onOpenAuthModal} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${theme.btnPrimary}`}>
            {userProfile.loggedIn ? 'Manage Account' : 'Sign In / Register'}
          </button>
        </div>
        <p className="text-xs opacity-60">
          {userProfile.loggedIn
            ? `Logged in as ${userProfile.email}. Your app nickname is "${userProfile.nickname || 'Guest'}".`
            : 'Sign in or register with email & password to customize your app nickname for notifications and partner sync.'}
        </p>
      </div>

      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 space-y-4`}>
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold flex items-center gap-2"><Bell className={`w-5 h-5 ${theme.textAccent}`} /> Web Push Alerts & Fun Facts</h3>
          <button onClick={onRequestPush} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${pushEnabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : theme.btnPrimary}`}>
            {pushEnabled ? '✓ Push Active' : 'Enable Web Push'}
          </button>
        </div>
        <p className="text-xs opacity-60">
          Receive 3-day bill warnings, low-balance cashflow alerts, partner receipt notifications (using your nickname), and random financial fun facts every 3 days.
        </p>
        <button onClick={onPopFunFact} className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
          <Smile className="w-4 h-4" /> Trigger Random Fun Fact Right Now
        </button>
      </div>

      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 space-y-4`}>
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold flex items-center gap-2"><HeartHandshake className={`w-5 h-5 ${theme.textAccent}`} /> Shared Vault & Partner Account</h3>
          <button onClick={onOpenPartnerModal} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${theme.btnPrimary}`}>
            {household.isConnected ? 'Manage Vault' : 'Add Person'}
          </button>
        </div>
        <p className="text-xs opacity-60">
          {household.isConnected ? `Connected with partner (${household.partnerName || household.partnerEmail}). Data is synchronized across both devices.` : 'Currently using a standalone personal vault. Connect a partner to share live cashflow, wishlists, and grocery lists.'}
        </p>
      </div>

      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 space-y-4`}>
        <h3 className="text-base font-bold flex items-center gap-2"><Globe className={`w-5 h-5 ${theme.textAccent}`} /> Default Currency (ISO Standard)</h3>
        <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none">
          {WORLD_CURRENCIES.map(c => (
            <option key={c.code} value={c.code}>{c.code} - {c.name} ({c.symbol})</option>
          ))}
        </select>
      </div>

      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 space-y-4`}>
        <h3 className="text-base font-bold flex items-center gap-2"><Palette className={`w-5 h-5 ${theme.textAccent}`} /> Accent Highlight Color</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.keys(THEMES).map(tKey => (
            <button key={tKey} onClick={() => setCurrentTheme(tKey)} className={`p-3 rounded-xl border text-xs font-bold transition-all ${currentTheme === tKey ? `${THEMES[tKey].btnPrimary} border-white shadow-lg` : 'bg-slate-950 border-slate-800 opacity-70 hover:opacity-100'}`}>{THEMES[tKey].name}</button>
          ))}
        </div>
      </div>

      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 space-y-4`}>
        <h3 className="text-base font-bold flex items-center gap-2"><Sparkles className={`w-5 h-5 ${theme.textAccent}`} /> Background Gradient & Lighting</h3>
        <p className="text-xs opacity-60">Choose your preferred background atmosphere with smooth top-to-bottom fading effects.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.keys(BACKGROUND_LIGHTING).map(bgKey => (
            <button
              key={bgKey}
              onClick={() => setCurrentBg(bgKey)}
              className={`p-3.5 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                currentBg === bgKey
                  ? `${theme.borderAccent} ${theme.bgAccent} ${theme.textAccent} border-2`
                  : 'bg-slate-950 border-slate-800 opacity-70 hover:opacity-100'
              }`}
            >
              <span>{BACKGROUND_LIGHTING[bgKey].name}</span>
              {currentBg === bgKey && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>

      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 space-y-4`}>
        <h3 className="text-base font-bold flex items-center gap-2"><DollarSign className={`w-5 h-5 ${theme.textAccent}`} /> Starting Balance</h3>
        <input type="number" value={startingBalance} onChange={(e) => setStartingBalance(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-mono focus:outline-none" />
      </div>

      <div className="text-right pt-2">
        <button onClick={() => setShowAdminModal(true)} className="text-[11px] text-slate-600 hover:text-slate-400 font-mono">🔒 Admin API Config</button>
      </div>
    </div>
  );
}

function PlanModal({ theme, plan, onSave, onClose }) {
  const [formData, setFormData] = useState(plan || { title: '', amount: '', type: 'Expense', category: 'Utilities', frequency: 'Monthly', dayOfMonth: 15, isActive: true });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;
    onSave({ ...formData, amount: Number(formData.amount), dayOfMonth: Number(formData.dayOfMonth) });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl w-full max-w-md p-6 space-y-4`}>
        <div className="flex justify-between items-center"><h3 className="text-sm font-bold">{plan ? 'Edit Cashflow Rule' : 'New Cashflow Rule'}</h3><button onClick={onClose}><X className="w-4 h-4" /></button></div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold opacity-60 uppercase">Type</label>
            <div className="grid grid-cols-2 gap-2 mt-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button type="button" onClick={() => setFormData({ ...formData, type: 'Expense' })} className={`py-1.5 rounded-lg text-xs font-bold transition-all ${formData.type === 'Expense' ? 'bg-rose-500 text-white' : 'opacity-60'}`}>Expense (-)</button>
              <button type="button" onClick={() => setFormData({ ...formData, type: 'Income' })} className={`py-1.5 rounded-lg text-xs font-bold transition-all ${formData.type === 'Income' ? 'bg-emerald-500 text-slate-950' : 'opacity-60'}`}>Income (+)</button>
            </div>
          </div>

          <input type="text" placeholder="Title (e.g. Monthly Rent, Salary)" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none" />
          <input type="number" placeholder="Amount" required value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none" />

          <div className="grid grid-cols-2 gap-2">
            <select value={formData.frequency} onChange={e => setFormData({ ...formData, frequency: e.target.value })} className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none">
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
              <option value="Once">Once</option>
            </select>
            {formData.frequency === 'Monthly' && (
              <input type="number" min="1" max="31" placeholder="Day of month (1-31)" value={formData.dayOfMonth} onChange={e => setFormData({ ...formData, dayOfMonth: e.target.value })} className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none" />
            )}
          </div>

          <button type="submit" className={`w-full py-2.5 rounded-xl font-bold text-xs ${theme.btnPrimary}`}>Save Rule</button>
        </form>
      </div>
    </div>
  );
}
