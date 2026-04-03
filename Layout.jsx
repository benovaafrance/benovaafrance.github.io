import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingCart, Users, FileText, Settings, LogOut, PlusCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  const navItems = [
    { path: '/caisse', label: 'Caisse', icon: ShoppingCart },
    { path: '/clients', label: 'Commandes', icon: Users },
    { path: '/commandes/nouvelle', label: 'Nouvelle commande', icon: PlusCircle },
    { path: '/admin', label: 'Administration', icon: Settings },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-cream">
      {/* Mobile hamburger */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-lg"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-56 bg-surface border-r border-border z-50
        transform transition-transform duration-300 lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-border">
          <h1 className="font-serif text-2xl font-bold text-primary">Aladdin Réalise</h1>
          <p className="text-sm text-text-secondary">Logiciel Traiteur</p>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <button
              key={path}
              onClick={() => {
                navigate(path)
                setSidebarOpen(false)
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${isActive(path)
                  ? 'bg-primary text-white'
                  : 'text-text hover:bg-cream'
                }
              `}
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-serif">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-sm">{user?.username}</p>
              <p className="text-xs text-text-secondary">Administrateur</p>
            </div>
          </div>
          <button
            onClick={() => {
              logout()
              navigate('/login')
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-text-secondary hover:text-primary transition-colors"
          >
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-56 min-h-screen">
        {children}
      </main>
    </div>
  )
}
