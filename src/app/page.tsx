"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  Wallet, 
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  EyeOff,
  Filter,
  Download,
  Bell,
  Settings,
  User,
  Search,
  Calendar,
  MoreHorizontal
} from "lucide-react"

// Mock data
const balanceData = [
  { month: "Jan", balance: 45000, income: 12000, expenses: 8000 },
  { month: "Feb", balance: 52000, income: 15000, expenses: 8000 },
  { month: "Mar", balance: 48000, income: 11000, expenses: 15000 },
  { month: "Apr", balance: 61000, income: 18000, expenses: 5000 },
  { month: "May", balance: 55000, income: 14000, expenses: 20000 },
  { month: "Jun", balance: 67000, income: 22000, expenses: 10000 },
]

const expenseCategories = [
  { name: "Food & Dining", value: 2800, color: "#6366F1" },
  { name: "Transportation", value: 1200, color: "#8B5CF6" },
  { name: "Shopping", value: 1800, color: "#06B6D4" },
  { name: "Entertainment", value: 800, color: "#10B981" },
  { name: "Bills & Utilities", value: 1500, color: "#F59E0B" },
  { name: "Healthcare", value: 600, color: "#EF4444" },
]

const recentTransactions = [
  { id: 1, description: "Spotify Premium", amount: -9.99, category: "Entertainment", date: "2024-01-15", type: "subscription" },
  { id: 2, description: "Salary Deposit", amount: 5200.00, category: "Income", date: "2024-01-15", type: "income" },
  { id: 3, description: "Grocery Store", amount: -127.45, category: "Food & Dining", date: "2024-01-14", type: "expense" },
  { id: 4, description: "Gas Station", amount: -45.20, category: "Transportation", date: "2024-01-14", type: "expense" },
  { id: 5, description: "Amazon Purchase", amount: -89.99, category: "Shopping", date: "2024-01-13", type: "expense" },
  { id: 6, description: "Freelance Payment", amount: 850.00, category: "Income", date: "2024-01-12", type: "income" },
  { id: 7, description: "Netflix", amount: -15.99, category: "Entertainment", date: "2024-01-12", type: "subscription" },
  { id: 8, description: "Electric Bill", amount: -98.50, category: "Bills & Utilities", date: "2024-01-11", type: "expense" },
]

const goals = [
  { name: "Emergency Fund", current: 8500, target: 15000, color: "#6366F1" },
  { name: "Vacation", current: 2300, target: 5000, color: "#8B5CF6" },
  { name: "New Car", current: 12000, target: 25000, color: "#06B6D4" },
  { name: "Investment", current: 4200, target: 10000, color: "#10B981" },
]

export default function FinancialDashboard() {
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState("6m")
  const [animatedBalance, setAnimatedBalance] = useState(0)
  const currentBalance = 67420.50

  // Animate balance on load
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = currentBalance / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= currentBalance) {
        current = currentBalance
        clearInterval(timer)
      }
      setAnimatedBalance(current)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'income':
        return <ArrowUpRight className="w-4 h-4 text-green-400" />
      case 'expense':
      case 'subscription':
        return <ArrowDownRight className="w-4 h-4 text-red-400" />
      default:
        return <MoreHorizontal className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Header */}
      <header className="border-b border-[#262626] bg-[#1A1A1A]/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold gradient-text">FinanceHub</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, Alex</h2>
          <p className="text-gray-400">Here's what's happening with your money today.</p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-effect hover-lift border-0 neon-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Balance</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setBalanceVisible(!balanceVisible)}
                className="h-8 w-8 p-0 text-gray-400 hover:text-white"
              >
                {balanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold gradient-text">
                {balanceVisible ? formatCurrency(animatedBalance) : "••••••"}
              </div>
              <div className="flex items-center text-sm text-green-400 mt-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect hover-lift border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Monthly Income</CardTitle>
              <DollarSign className="w-4 h-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">$22,450</div>
              <div className="flex items-center text-sm text-green-400 mt-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8.2% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect hover-lift border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Monthly Expenses</CardTitle>
              <CreditCard className="w-4 h-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">$8,720</div>
              <div className="flex items-center text-sm text-red-400 mt-2">
                <TrendingDown className="w-4 h-4 mr-1" />
                -3.1% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect hover-lift border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Savings Rate</CardTitle>
              <PiggyBank className="w-4 h-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">61.2%</div>
              <div className="flex items-center text-sm text-blue-400 mt-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                +5.3% from last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Balance Trend */}
          <Card className="lg:col-span-2 glass-effect border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Balance Trend</CardTitle>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-24 bg-[#262626] border-[#404040]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1A] border-[#404040]">
                    <SelectItem value="1m">1M</SelectItem>
                    <SelectItem value="3m">3M</SelectItem>
                    <SelectItem value="6m">6M</SelectItem>
                    <SelectItem value="1y">1Y</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={balanceData}>
                  <defs>
                    <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1A1A1A', 
                      border: '1px solid #404040',
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#6366F1" 
                    strokeWidth={3}
                    fill="url(#balanceGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Expense Categories */}
          <Card className="glass-effect border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1A1A1A', 
                      border: '1px solid #404040',
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {expenseCategories.slice(0, 3).map((category, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-gray-300">{category.name}</span>
                    </div>
                    <span className="font-medium">${category.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goals and Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Financial Goals */}
          <Card className="glass-effect border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Financial Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {goals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">{goal.name}</span>
                    <span className="font-medium">
                      {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                    </span>
                  </div>
                  <Progress 
                    value={(goal.current / goal.target) * 100} 
                    className="h-2"
                    style={{
                      background: '#262626',
                    }}
                  />
                  <div className="text-xs text-gray-400">
                    {Math.round((goal.current / goal.target) * 100)}% complete
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="lg:col-span-2 glass-effect border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Filter className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-[#262626]/50 hover:bg-[#262626] transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{transaction.description}</p>
                        <p className="text-xs text-gray-400">{transaction.category} • {transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                      </p>
                      <Badge variant="secondary" className="text-xs bg-[#1A1A1A] text-gray-400">
                        {transaction.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}