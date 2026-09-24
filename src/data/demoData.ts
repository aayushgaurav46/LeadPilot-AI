import type {
  Capability,
  DashboardLead,
  FAQItem,
  HowItWorksStep,
  IncomingLead,
  ProcessingStep,
  QualificationResult,
  ROIDefaults,
  UseCaseEvent,
  WorkflowNode,
} from './types'

export const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Live Demo', href: '#demo' },
  { label: 'ROI Calculator', href: '#roi' },
  { label: 'FAQ', href: '#faq' },
]

export const heroLead = {
  name: 'Sarah Johnson',
  interestedIn: '3 Bed • Austin, TX',
  budget: '$700,000',
  timeline: '1–3 months',
  score: 91,
  status: 'High Intent',
  checklist: [
    'Lead captured',
    'AI responded',
    'Lead qualified',
    'Follow-up scheduled',
  ],
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    number: '01',
    title: 'Capture',
    description: 'New leads enter the system the moment they come in, from any connected source.',
    icon: 'inbox',
  },
  {
    number: '02',
    title: 'Qualify',
    description: 'AI asks relevant questions and identifies budget, timeline, and intent.',
    icon: 'bot',
  },
  {
    number: '03',
    title: 'Follow Up',
    description: 'Automated follow-ups keep conversations moving instead of going cold.',
    icon: 'repeat',
  },
  {
    number: '04',
    title: 'Convert',
    description: 'Qualified prospects can be directed toward booking an appointment.',
    icon: 'target',
  },
]

export const demoIncomingLead: IncomingLead = {
  name: 'Sarah Johnson',
  property: '3 Bedroom Home',
  location: 'Austin, TX',
  budget: '$700,000',
  timeline: '1–3 months',
}

export const demoProcessingSteps: ProcessingStep[] = [
  { id: 'analyze', label: 'Analyzing new lead...' },
  { id: 'respond', label: 'Generating response...' },
  { id: 'intent', label: 'Evaluating buying intent...' },
  { id: 'plan', label: 'Creating follow-up plan...' },
]

export const demoQualificationResult: QualificationResult = {
  score: 91,
  intent: 'High',
  budgetStatus: 'Qualified',
  timeline: '1–3 months',
  recommendedAction: 'Schedule consultation',
}

export const demoConversation = [
  {
    id: 'm1',
    sender: 'lead' as const,
    text: "Hi, I'm interested in the property. Is it still available?",
  },
  {
    id: 'm2',
    sender: 'ai' as const,
    text: 'Hi Sarah! Thanks for reaching out. Yes, the property is currently available. Are you looking to purchase within the next few months?',
  },
  {
    id: 'm3',
    sender: 'lead' as const,
    text: 'Yes, probably within 2 months.',
  },
  {
    id: 'm4',
    sender: 'ai' as const,
    text: "That's helpful. Are you already pre-approved for financing, or are you planning to pay cash?",
  },
]

export const dashboardLeads: DashboardLead[] = [
  {
    id: 'l1',
    name: 'Sarah Johnson',
    initials: 'SJ',
    location: 'Austin, TX',
    propertyType: '3 Bed House',
    budget: '$700K',
    timeline: '1–3 months',
    intent: 'High',
    score: 91,
    status: 'Qualified',
  },
  {
    id: 'l2',
    name: 'Michael Carter',
    initials: 'MC',
    location: 'Dallas, TX',
    propertyType: '2 Bed Condo',
    budget: '$520K',
    timeline: '3–6 months',
    intent: 'Medium',
    score: 68,
    status: 'Follow-up',
  },
  {
    id: 'l3',
    name: 'Emma Williams',
    initials: 'EW',
    location: 'Miami, FL',
    propertyType: '4 Bed House',
    budget: '$850K',
    timeline: '1–3 months',
    intent: 'High',
    score: 94,
    status: 'Qualified',
  },
  {
    id: 'l4',
    name: 'David Chen',
    initials: 'DC',
    location: 'Phoenix, AZ',
    propertyType: '3 Bed House',
    budget: '$460K',
    timeline: '6+ months',
    intent: 'Low',
    score: 41,
    status: 'Follow-up',
  },
  {
    id: 'l5',
    name: 'Priya Nair',
    initials: 'PN',
    location: 'Austin, TX',
    propertyType: 'Townhome',
    budget: '$610K',
    timeline: '1–3 months',
    intent: 'High',
    score: 88,
    status: 'Qualified',
  },
  {
    id: 'l6',
    name: 'James Cooper',
    initials: 'JC',
    location: 'Denver, CO',
    propertyType: '2 Bed Condo',
    budget: '$395K',
    timeline: '3–6 months',
    intent: 'Medium',
    score: 62,
    status: 'Follow-up',
  },
]

export const workflowNodes: WorkflowNode[] = [
  { id: 'w1', title: 'New Lead', description: 'Inquiry arrives from any connected source', icon: 'inbox' },
  { id: 'w2', title: 'AI Response', description: 'Instant, personalized response', icon: 'bot' },
  { id: 'w3', title: 'Qualification', description: 'Budget, timeline & requirements', icon: 'checklist' },
  { id: 'w4', title: 'Intent Detection', description: 'Signals ranked by buying readiness', icon: 'target' },
  { id: 'w5', title: 'Follow-Up', description: 'Automated conversation sequence', icon: 'repeat' },
  { id: 'w6', title: 'Appointment', description: 'Move qualified prospects toward a meeting', icon: 'calendar' },
  { id: 'w7', title: 'CRM', description: 'Lead record updated automatically', icon: 'database' },
]

export const roiDefaults: ROIDefaults = {
  monthlyLeads: 500,
  avgDealValue: 500000,
  currentApptRate: 3,
}

export const useCaseTimeline: UseCaseEvent[] = [
  { time: '09:41 AM', title: 'New inquiry received', detail: 'A prospect messages in about a 3-bedroom listing in Austin.' },
  { time: '09:41 AM', title: 'AI responds', detail: 'A personalized reply goes out within seconds of the inquiry.' },
  { time: '09:43 AM', title: 'Lead qualification begins', detail: 'AI asks about timeline, budget, and financing status.' },
  { time: '09:45 AM', title: 'Intent identified', detail: 'Responses are scored to estimate buying readiness.' },
  { time: '09:46 AM', title: 'Follow-up sequence created', detail: 'A tailored follow-up plan is queued automatically.' },
  { time: '09:48 AM', title: 'Appointment opportunity detected', detail: 'The lead is flagged as ready for a consultation.' },
]

export const capabilities: Capability[] = [
  { title: 'AI Lead Response', description: 'Instant, on-brand replies to new inquiries as they arrive.', icon: 'bot' },
  { title: 'Lead Qualification', description: 'Structured questions surface budget, timeline, and intent.', icon: 'checklist' },
  { title: 'Automated Follow-Up', description: 'Conversation sequences that keep leads engaged over time.', icon: 'repeat' },
  { title: 'Lead Scoring', description: 'A consistent score to help prioritize where to spend time.', icon: 'target' },
  { title: 'CRM Updates', description: 'Lead records stay current without manual data entry.', icon: 'database' },
  { title: 'Appointment Workflows', description: 'A clear path from qualified conversation to booked meeting.', icon: 'calendar' },
  { title: 'Conversation Intelligence', description: 'Context carried through every message in a thread.', icon: 'messageSquare' },
  { title: 'Analytics', description: 'Visibility into lead volume, response time, and outcomes.', icon: 'barChart' },
]

export const faqItems: FAQItem[] = [
  {
    question: 'What does LeadPilot AI do?',
    answer:
      'LeadPilot AI responds to new real-estate inquiries, asks qualifying questions, follows up automatically, and helps route high-intent prospects toward booking an appointment.',
  },
  {
    question: 'Does it replace real-estate agents?',
    answer:
      'No. It handles the initial response and qualification work so agents can focus their time on the conversations and prospects that matter most.',
  },
  {
    question: 'Which lead sources can it work with?',
    answer:
      'It is designed to sit in front of common lead sources such as listing sites, web forms, and paid campaigns. Specific integrations depend on your setup.',
  },
  {
    question: 'Can the AI follow up automatically?',
    answer:
      'Yes. Once a lead is captured, the AI can run a follow-up sequence to keep the conversation moving instead of letting it go cold.',
  },
  {
    question: 'Can it connect to a CRM?',
    answer:
      'Connecting to a CRM is part of the planned setup so lead records stay up to date without manual entry. This demo site does not include a live CRM connection.',
  },
  {
    question: 'Is the demo using real customer data?',
    answer: 'No. The website demo uses simulated data created to demonstrate the workflow.',
  },
]
