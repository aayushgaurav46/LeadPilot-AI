export type IntentLevel = 'High' | 'Medium' | 'Low'

export type LeadStatus = 'Qualified' | 'Follow-up' | 'New'

export interface DashboardLead {
  id: string
  name: string
  initials: string
  location: string
  propertyType: string
  budget: string
  timeline: string
  intent: IntentLevel
  score: number
  status: LeadStatus
}

export interface ConversationMessage {
  id: string
  sender: 'lead' | 'ai'
  text: string
}

export interface QualificationResult {
  score: number
  intent: IntentLevel
  budgetStatus: string
  timeline: string
  recommendedAction: string
}

export interface ProcessingStep {
  id: string
  label: string
}

export interface IncomingLead {
  name: string
  property: string
  location: string
  budget: string
  timeline: string
}

export interface WorkflowNode {
  id: string
  title: string
  description: string
  icon: 'inbox' | 'bot' | 'checklist' | 'target' | 'repeat' | 'calendar' | 'database'
}

export interface HowItWorksStep {
  number: string
  title: string
  description: string
  icon: 'inbox' | 'bot' | 'repeat' | 'target'
}

export interface Capability {
  title: string
  description: string
  icon:
    | 'bot'
    | 'checklist'
    | 'repeat'
    | 'target'
    | 'database'
    | 'calendar'
    | 'messageSquare'
    | 'barChart'
}

export interface FAQItem {
  question: string
  answer: string
}

export interface UseCaseEvent {
  time: string
  title: string
  detail: string
}

export interface ROIDefaults {
  monthlyLeads: number
  avgDealValue: number
  currentApptRate: number
}

export type DashboardFilter = 'All' | 'High Intent' | 'Follow-up' | 'Qualified'
