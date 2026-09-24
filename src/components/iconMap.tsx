import {
  BarChart3,
  Bot,
  Calendar,
  Database,
  Inbox,
  ListChecks,
  MessageSquare,
  Repeat,
  Target,
} from 'lucide-react'
import type { ComponentType } from 'react'

export type IconKey =
  | 'inbox'
  | 'bot'
  | 'checklist'
  | 'target'
  | 'repeat'
  | 'calendar'
  | 'database'
  | 'messageSquare'
  | 'barChart'

const iconRegistry: Record<IconKey, ComponentType<{ size?: number; className?: string }>> = {
  inbox: Inbox,
  bot: Bot,
  checklist: ListChecks,
  target: Target,
  repeat: Repeat,
  calendar: Calendar,
  database: Database,
  messageSquare: MessageSquare,
  barChart: BarChart3,
}

export function getIcon(key: IconKey) {
  return iconRegistry[key]
}
