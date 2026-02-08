import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

type Message = {
  id: string
  from: 'bot' | 'user'
  text: string
}

type Reply = {
  id: string
  label: string
  next: string
  userText?: string
}

type Node = {
  id: string
  text: string
  replies?: Reply[]
  showForm?: boolean
}

const CONTACT = {
  email: 'post@valheimbygg.no',
  phone: '+47 477 293 71',
}

const NODES: Node[] = [
  {
    id: 'start',
    text: 'Hei! Hvordan kan vi hjelpe deg?',
    replies: [
      { id: 'services', label: 'Hvilke tjenester?', next: 'services' },
      { id: 'pricing', label: 'Hvordan fungerer tilbud?', next: 'pricing' },
      { id: 'process', label: 'Hvordan jobber dere?', next: 'process' },
      { id: 'time', label: 'Tidsplan', next: 'timeline' },
      { id: 'hours', label: 'Åpningstider', next: 'hours' },
      { id: 'warranty', label: 'Garanti', next: 'warranty' },
      { id: 'clients', label: 'Privat eller bedrift?', next: 'clients' },
      { id: 'min', label: 'Minimum oppdrag?', next: 'minimum' },
      { id: 'response', label: 'Hvor raskt svar?', next: 'response' },
      { id: 'area', label: 'Område', next: 'area' },
      { id: 'contact', label: 'Kontakt', next: 'contact' },
    ],
  },
  {
    id: 'services',
    text: 'Vi tilbyr flere typer arbeider. Velg gjerne en kategori:',
    replies: [
      { id: 'svc_ceilings', label: 'Himlinger', next: 'svc_ceilings' },
      { id: 'svc_walls', label: 'Vegger & glass', next: 'svc_walls' },
      { id: 'svc_interiors', label: 'Innvendig & rehab', next: 'svc_interiors' },
      { id: 'svc_carpentry', label: 'Tømrer', next: 'svc_carpentry' },
      { id: 'svc_concrete', label: 'Betong', next: 'svc_concrete' },
      { id: 'back', label: 'Tilbake', next: 'start' },
    ],
  },
  {
    id: 'svc_ceilings',
    text: 'Himlinger: systemhimlinger, gips-, akustiske og tre/panel-himlinger.',
    replies: [
      { id: 'svc_ceilings_more', label: 'Hva er inkludert?', next: 'svc_ceilings_more' },
      { id: 'services', label: 'Tilbake til tjenester', next: 'services' },
    ],
  },
  {
    id: 'svc_ceilings_more',
    text: 'Vi monterer himlinger med integrasjon av lys/ventilasjon etter behov.',
    replies: [
      { id: 'services', label: 'Tilbake til tjenester', next: 'services' },
    ],
  },
  {
    id: 'svc_walls',
    text: 'Vegger & glass: gipsvegger, tekniske skiller og glassvegger.',
    replies: [
      { id: 'svc_walls_more', label: 'Brann/lyd?', next: 'svc_walls_more' },
      { id: 'services', label: 'Tilbake til tjenester', next: 'services' },
    ],
  },
  {
    id: 'svc_walls_more',
    text: 'Vi leverer løsninger med brann- og lydkrav etter prosjektets behov.',
    replies: [{ id: 'services', label: 'Tilbake til tjenester', next: 'services' }],
  },
  {
    id: 'svc_interiors',
    text: 'Innvendig & rehab: oppgraderinger, tilpasninger og rehabilitering.',
    replies: [
      { id: 'svc_interiors_more', label: 'Små eller store jobber?', next: 'svc_interiors_more' },
      { id: 'services', label: 'Tilbake til tjenester', next: 'services' },
    ],
  },
  {
    id: 'svc_interiors_more',
    text: 'Vi tar både mindre oppdrag og større prosjekter.',
    replies: [{ id: 'services', label: 'Tilbake til tjenester', next: 'services' }],
  },
  {
    id: 'svc_carpentry',
    text: 'Tømrer: arbeid etter avtale, blant annet konstruksjoner og trearbeid.',
    replies: [
      { id: 'services', label: 'Tilbake til tjenester', next: 'services' },
    ],
  },
  {
    id: 'svc_concrete',
    text: 'Betong: arbeid etter avtale (fundamenter, vegger, dekker).',
    replies: [
      { id: 'services', label: 'Tilbake til tjenester', next: 'services' },
    ],
  },
  {
    id: 'pricing',
    text: 'Etter befaring gir vi et tydelig prisoverslag. Der det er mulig tilbyr vi fast pris.',
    replies: [
      { id: 'pricing_doc', label: 'Hva trenger dere?', next: 'pricing_doc' },
      { id: 'back', label: 'Tilbake', next: 'start' },
    ],
  },
  {
    id: 'pricing_doc',
    text: 'Tegninger, bilder eller kort beskrivelse av omfang gjør tilbudet mer presist.',
    replies: [{ id: 'back', label: 'Tilbake', next: 'start' }],
  },
  {
    id: 'process',
    text: 'Prosess: befaring → tilbud → planlegging → utførelse → ferdigstillelse.',
    replies: [
      { id: 'pricing', label: 'Tilbud', next: 'pricing' },
      { id: 'timeline', label: 'Tidsplan', next: 'timeline' },
      { id: 'back', label: 'Tilbake', next: 'start' },
    ],
  },
  {
    id: 'timeline',
    text: 'Tidsplan avtales etter befaring. Vi gir realistiske milepæler.',
    replies: [{ id: 'back', label: 'Tilbake', next: 'start' }],
  },
  {
    id: 'hours',
    text: 'Man–fre: 07:00–16:00. Lørdag etter avtale. Søndag stengt.',
    replies: [{ id: 'back', label: 'Tilbake', next: 'start' }],
  },
  {
    id: 'warranty',
    text: 'Ja. Vi gir garanti på utført arbeid i henhold til avtale. Materialer har produsentgaranti. Varighet vanligvis 2 år, avhengig av type arbeid.',
    replies: [{ id: 'back', label: 'Tilbake', next: 'start' }],
  },
  {
    id: 'clients',
    text: 'Vi gjør tilbud både for privatpersoner og bedrifter.',
    replies: [{ id: 'back', label: 'Tilbake', next: 'start' }],
  },
  {
    id: 'minimum',
    text: 'Vi har ingen fast minimumssum. Små oppdrag tar vi hovedsakelig lokalt eller sammen med andre jobber. Hvert oppdrag vurderes individuelt.',
    replies: [{ id: 'back', label: 'Tilbake', next: 'start' }],
  },
  {
    id: 'response',
    text: 'Vi svarer normalt samme arbeidsdag, senest innen 24 timer.',
    replies: [{ id: 'back', label: 'Tilbake', next: 'start' }],
  },
  {
    id: 'area',
    text: 'Vi jobber i Tromsø og nærområdet. Større prosjekter utenfor Tromsø kan avtales individuelt.',
    replies: [{ id: 'back', label: 'Tilbake', next: 'start' }],
  },
  {
    id: 'contact',
    text: `Kontakt oss via kontaktskjemaet eller e‑post (${CONTACT.email}). For hastesaker kan du ringe ${CONTACT.phone}.`,
    replies: [{ id: 'back', label: 'Tilbake', next: 'start' }],
  },
]

function getNode(id: string) {
  return NODES.find(n => n.id === id) || NODES[0]
}

export default function ChatWidget() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [nodeId, setNodeId] = useState('start')
  const [messages, setMessages] = useState<Message[]>([
    { id: 'm0', from: 'bot', text: getNode('start').text },
  ])
  const endRef = useRef<HTMLDivElement | null>(null)
  const [status] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const node = useMemo(() => getNode(nodeId), [nodeId])

  const pushBot = (text: string) =>
    setMessages(prev => [...prev, { id: `m${prev.length}`, from: 'bot', text }])
  const pushUser = (text: string) =>
    setMessages(prev => [...prev, { id: `m${prev.length}`, from: 'user', text }])

  const onReply = (reply: Reply) => {
    pushUser(reply.userText || reply.label)
    const next = getNode(reply.next)
    setNodeId(next.id)
    pushBot(next.text)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  useEffect(() => {
    if (!isOpen) return
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isOpen])

  void i18n

  return (
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-panel" role="dialog" aria-label="Chat">
          <div className="chat-header">
            <div className="chat-title">Valheimbygg</div>
            <button
              type="button"
              className="chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="chat-body">
            {messages.map(m => (
              <div
                key={m.id}
                className={`chat-bubble ${m.from === 'user' ? 'chat-user' : 'chat-bot'}`}
              >
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="chat-replies">
            {node.replies?.map(r => (
              <button key={r.id} type="button" className="chat-reply" onClick={() => onReply(r)}>
                {r.label}
              </button>
            ))}
          </div>

          {node.showForm && (
            <form onSubmit={handleSubmit} className="chat-form" noValidate />
          )}
        </div>
      )}

      <button
        type="button"
        className="chat-fab"
        onClick={() => setIsOpen(v => !v)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? '×' : 'Chat'}
      </button>
    </div>
  )
}
