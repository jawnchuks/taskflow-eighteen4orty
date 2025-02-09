import React, { useState } from 'react'

type Tab = {
  label: string
  value: string
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  onChange?: (activeTab: string) => void
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab, onChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].value)

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue)
    if (onChange) onChange(tabValue)
  }

  return (
    <div className="tabs_container">
      <div className="tabs_header">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`tab_button ${activeTab === tab.value ? 'tab_button_active' : ''}`}
            onClick={() => handleTabClick(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Tabs
