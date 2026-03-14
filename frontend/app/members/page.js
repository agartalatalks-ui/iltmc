'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, User, Bike, MapPin, Award, Shield, Phone, Mail, Clock, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_9bab05d4-0d45-4f8d-a396-cf0659408542/artifacts/lv5k959m_Ilt%20logo.png'

// Navbar Component
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-3">
            <img src={LOGO_URL} alt="ILTMC" className="h-12 w-12 object-contain" />
            <div>
              <p className="font-bold text-lg tracking-wider" style={{ fontFamily: 'Oswald, sans-serif' }}>ILTMC</p>
              <p className="text-xs text-red-500">Est. 2013</p>
            </div>
          </a>
          <a href="/">
            <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
              <ArrowLeft size={16} className="mr-2" /> Back to Home
            </Button>
          </a>
        </div>
      </div>
    </nav>
  )
}

// Format last seen time
function formatLastSeen(lastSeen) {
  if (!lastSeen) return 'Never'
  
  const now = new Date()
  const lastSeenDate = new Date(lastSeen)
  const diffMs = now - lastSeenDate
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 5) return 'Just now'
  if (diffMins < 60) return `${diffMins} mins ago`
  if (diffHours < 24) return `${diffHours} hours ago`
  if (diffDays < 7) return `${diffDays} days ago`
  return lastSeenDate.toLocaleDateString()
}

// Member Card Component
function MemberCard({ member, ranks, positions }) {
  const rankInfo = ranks?.find(r => r.name === member.rank)
  const positionInfo = positions?.find(p => p.name === member.position)
  
  // Check if member is online (active in last 5 minutes)
  const isOnline = member.lastSeen && (new Date() - new Date(member.lastSeen)) < 300000

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="bg-zinc-900/50 border-zinc-800 hover:border-red-500/50 transition-all duration-300 overflow-hidden">
        <div className="relative">
          {/* Profile Image */}
          <div className="h-48 bg-gradient-to-br from-red-900/30 to-zinc-900 flex items-center justify-center relative overflow-hidden">
            {member.profilePicture ? (
              <img 
                src={member.profilePicture} 
                alt={member.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                <User size={48} className="text-white" />
              </div>
            )}
            {/* Online Status Indicator */}
            <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
              isOnline ? 'bg-green-500/20 text-green-400' : 'bg-zinc-700/50 text-gray-400'
            }`}>
              <Circle size={8} className={isOnline ? 'fill-green-400' : 'fill-gray-500'} />
              {isOnline ? 'Online' : 'Offline'}
            </div>
          </div>

          {/* Rank Badge */}
          {member.rank && (
            <div className="absolute -bottom-4 left-4">
              <Badge className="bg-yellow-600 text-white px-3 py-1 shadow-lg">
                <Award size={12} className="mr-1" />
                {member.rank}
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-5 pt-8">
          {/* Name & Road Name */}
          <div className="mb-3">
            <h3 className="text-xl font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>
              {member.name}
            </h3>
            {member.roadName && (
              <p className="text-red-500 text-sm">&quot;{member.roadName}&quot;</p>
            )}
          </div>

          {/* Position */}
          {member.position && (
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <Shield size={14} className="text-red-500" />
              <span>{member.position}</span>
            </div>
          )}

          {/* Bike */}
          {member.bike && (
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <Bike size={14} className="text-blue-500" />
              <span>{member.bike}</span>
            </div>
          )}

          {/* Chapter */}
          {member.chapter && (
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <MapPin size={14} className="text-green-500" />
              <span>{member.chapter}</span>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-800">
            <div className="text-center">
              <p className="text-lg font-bold text-red-500">{member.totalKilometers || 0}</p>
              <p className="text-xs text-gray-500">Total KM</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-green-500">{member.ridesCount || 0}</p>
              <p className="text-xs text-gray-500">Rides</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-blue-500">{member.eventsCount || 0}</p>
              <p className="text-xs text-gray-500">Events</p>
            </div>
          </div>

          {/* Last Seen */}
          <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-center gap-2 text-xs text-gray-500">
            <Clock size={12} />
            <span>Last seen: {formatLastSeen(member.lastSeen)}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Online Members Counter
function OnlineCounter({ members }) {
  const onlineCount = members.filter(m => m.lastSeen && (new Date() - new Date(m.lastSeen)) < 300000).length

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-zinc-900/50 rounded-full border border-zinc-800">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-green-400 font-medium">{onlineCount}</span>
        <span className="text-gray-400">Online</span>
      </div>
      <div className="w-px h-4 bg-zinc-700"></div>
      <div className="flex items-center gap-2">
        <span className="text-gray-400">{members.length}</span>
        <span className="text-gray-500">Total Members</span>
      </div>
    </div>
  )
}

// Main Members Page
export default function MembersPage() {
  const [members, setMembers] = useState([])
  const [ranks, setRanks] = useState([])
  const [positions, setPositions] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchData()
    // Refresh online status every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      const [membersRes, ranksRes, positionsRes] = await Promise.all([
        fetch('/api/members/public'),
        fetch('/api/ranks'),
        fetch('/api/positions')
      ])
      
      const membersData = await membersRes.json()
      const ranksData = await ranksRes.json()
      const positionsData = await positionsRes.json()
      
      // Only set if we got arrays back
      if (Array.isArray(membersData)) setMembers(membersData)
      if (Array.isArray(ranksData)) setRanks(ranksData)
      if (Array.isArray(positionsData)) setPositions(positionsData)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  const filteredMembers = Array.isArray(members) ? (
    filter === 'all' 
      ? members 
      : filter === 'online'
        ? members.filter(m => m.lastSeen && (new Date() - new Date(m.lastSeen)) < 300000)
        : members.filter(m => !m.lastSeen || (new Date() - new Date(m.lastSeen)) >= 300000)
  ) : []

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <img src={LOGO_URL} alt="ILTMC" className="w-20 h-20 mx-auto animate-pulse mb-4" />
          <p className="text-gray-400">Loading members...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-black"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge variant="outline" className="mb-4 border-red-500 text-red-500">THE BROTHERHOOD</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              OUR <span className="text-red-500">MEMBERS</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Meet the fearless riders who make up the Intrepidus Leones family. 
              United by passion, bound by brotherhood.
            </p>
            
            {/* Online Counter */}
            <div className="flex justify-center mb-8">
              <OnlineCounter members={members} />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center justify-center gap-3">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                className={filter === 'all' ? 'bg-red-600 hover:bg-red-700' : 'border-zinc-700'}
              >
                All Members
              </Button>
              <Button
                variant={filter === 'online' ? 'default' : 'outline'}
                onClick={() => setFilter('online')}
                className={filter === 'online' ? 'bg-green-600 hover:bg-green-700' : 'border-zinc-700'}
              >
                <Circle size={8} className="fill-green-400 mr-2" />
                Online
              </Button>
              <Button
                variant={filter === 'offline' ? 'default' : 'outline'}
                onClick={() => setFilter('offline')}
                className={filter === 'offline' ? 'bg-zinc-600 hover:bg-zinc-700' : 'border-zinc-700'}
              >
                <Circle size={8} className="fill-gray-400 mr-2" />
                Offline
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          {filteredMembers.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMembers.map((member, index) => (
                <MemberCard 
                  key={member.id} 
                  member={member} 
                  ranks={ranks}
                  positions={positions}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <User size={64} className="mx-auto mb-4 text-gray-600" />
              <p className="text-gray-500 text-lg">No members found</p>
            </div>
          )}
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 bg-gradient-to-r from-red-900/20 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Want to <span className="text-red-500">Join the Pride?</span>
          </h2>
          <p className="text-gray-400 mb-6">Become part of the ILTMC brotherhood</p>
          <a href="/#join">
            <Button className="bg-red-600 hover:bg-red-700 px-8 py-6 text-lg">
              Apply for Membership
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <a href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={16} />
            Back to Homepage
          </a>
          <p className="text-gray-600 text-sm mt-4">
            © {new Date().getFullYear()} ILTMC - Intrepidus Leones Tripura Motorcycle Club
          </p>
        </div>
      </footer>
    </div>
  )
}
