"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Save, Palette, Layout, Type } from 'lucide-react'

type Theme = {
  id: string
  name: string
  primaryColor: string
  secondaryColor: string
  fontFamily: string
}

const themes: Theme[] = [
  { id: 'default', name: 'Default', primaryColor: '#10B981', secondaryColor: '#1F2937', fontFamily: 'Inter' },
  { id: 'dark', name: 'Dark Mode', primaryColor: '#6366F1', secondaryColor: '#111827', fontFamily: 'Roboto' },
  { id: 'light', name: 'Light and Airy', primaryColor: '#3B82F6', secondaryColor: '#F3F4F6', fontFamily: 'Poppins' },
]

export default function StoreCustomizationPage() {
  const [logo, setLogo] = useState<string | null>(null)
  const [selectedTheme, setSelectedTheme] = useState(themes[0])
  const [customColors, setCustomColors] = useState({ primary: '#10B981', secondary: '#1F2937' })

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleThemeChange = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId)
    if (theme) {
      setSelectedTheme(theme)
      setCustomColors({ primary: theme.primaryColor, secondary: theme.secondaryColor })
    }
  }

  const handleColorChange = (colorType: 'primary' | 'secondary', color: string) => {
    setCustomColors(prev => ({ ...prev, [colorType]: color }))
  }

  const handleSave = () => {
    console.log('Saving customization:', { logo, theme: selectedTheme.id, customColors })
    // Here you would typically send the customization data to your backend
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Store Customization</h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center"><Upload className="mr-2" /> Store Logo</h2>
              <div className="flex items-center space-x-4">
                <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {logo ? (
                    <img src={logo} alt="Store logo" className="w-full h-full object-cover" />
                  ) : (
                    <Upload size={32} className="text-gray-400" />
                  )}
                </div>
                <label className="cursor-pointer">
                  <span className="px-4 py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 transition-colors">
                    Upload New Logo
                  </span>
                  <input type="file" className="hidden" onChange={handleLogoUpload} accept="image/*" />
                </label>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center"><Palette className="mr-2" /> Color Scheme</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Color
                  </label>
                  <input
                    type="color"
                    id="primaryColor"
                    value={customColors.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="w-full h-10 rounded-md cursor-pointer"
                  />
                </div>
                <div>
                  <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700 mb-1">
                    Secondary Color
                  </label>
                  <input
                    type="color"
                    id="secondaryColor"
                    value={customColors.secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="w-full h-10 rounded-md cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center"><Layout className="mr-2" /> Theme</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedTheme.id === theme.id ? 'border-green-500 shadow-lg' : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="w-full h-20 rounded-md mb-2" style={{ background: `linear-gradient(to right, ${theme.primaryColor}, ${theme.secondaryColor})` }} />
                    <p className="font-medium text-center">{theme.name}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center"><Type className="mr-2" /> Typography</h2>
              <select
                value={selectedTheme.fontFamily}
                onChange={(e) => setSelectedTheme(prev => ({ ...prev, fontFamily: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Poppins">Poppins</option>
              </select>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="px-6 py-2 bg-green-500 text-white rounded-md font-semibold flex items-center space-x-2 hover:bg-green-600 transition-colors"
            >
              <Save size={20} />
              <span>Save Changes</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}