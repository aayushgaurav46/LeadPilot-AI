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

type IconComponent = ComponentType<{ size?: number; className?: string }>

const iconRegistry: Record<IconKey, IconComponent> = {
  inbox: Inbox as IconComponent,
  bot: Bot as IconComponent,
  checklist: ListChecks as IconComponent,
  target: Target as IconComponent,
  repeat: Repeat as IconComponent,
  calendar: Calendar as IconComponent,
  database: Database as IconComponent,
  messageSquare: MessageSquare as IconComponent,
  barChart: BarChart3 as IconComponent,
}

export function getIcon(key: IconKey) {
  return iconRegistry[key]
}
