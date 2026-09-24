import AIDemo from '../components/AIDemo'
import Capabilities from '../components/Capabilities'
import CTA from '../components/CTA'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import LeadDashboard from '../components/LeadDashboard'
import Navbar from '../components/Navbar'
import Problem from '../components/Problem'
import ROICalculator from '../components/ROICalculator'
import UseCase from '../components/UseCase'
import Workflow from '../components/Workflow'

function Home() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <AIDemo />
        <LeadDashboard />
        <Workflow />
        <ROICalculator />
        <UseCase />
        <Capabilities />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default Home
