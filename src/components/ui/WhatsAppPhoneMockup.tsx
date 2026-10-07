import type { ReactNode } from 'react';

/* ------------------------------------------------------------------ */
/* Phone mockup: an iPhone-style frame showing a WhatsApp conversation */
/* with the HakiArdhi legal-aid bot. Uses WhatsApp's own light-theme   */
/* colours inside the screen so it reads as the real app.             */
/* ------------------------------------------------------------------ */

const WA = {
  header: '#008069',
  wallpaper: '#efeae2',
  outgoing: '#d9fdd3',
  accent: '#00a884',
  tick: '#53bdeb',
  meta: '#667781',
  text: '#111b21',
  notice: '#ffeecd',
};

function Ticks() {
  return (
    <svg viewBox="0 0 16 11" width="16" height="11" aria-hidden="true" style={{ color: WA.tick }}>
      <path fill="currentColor" d="M11.07.65 4.79 6.93 2.4 4.54 1.34 5.6l3.45 3.45 7.34-7.34L11.07.65Zm3.18 0L7.97 6.93l-.78-.78-1.06 1.06 1.84 1.84 7.34-7.34-1.06-1.06Z" />
    </svg>
  );
}

function Bubble({ out = false, time, children, tail = false }: { out?: boolean; time: string; children: ReactNode; tail?: boolean }) {
  return (
    <div className={`flex ${out ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`relative max-w-[82%] px-2 pb-1.5 pt-1.5 text-[13px] leading-[18px] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] ${
          out ? 'rounded-lg' : 'rounded-lg'
        } ${tail ? (out ? 'rounded-tr-none' : 'rounded-tl-none') : ''}`}
        style={{ background: out ? WA.outgoing : '#ffffff', color: WA.text }}
      >
        <span className="whitespace-pre-line">{children}</span>
        <span className="float-right ml-2 mt-1.5 flex translate-y-0.5 items-center gap-1 text-[10.5px] leading-none" style={{ color: WA.meta }}>
          {time}
          {out && <Ticks />}
        </span>
      </div>
    </div>
  );
}

export default function WhatsAppPhoneMockup() {
  return (
    <figure
      className="relative w-[290px] sm:w-[310px]"
      aria-label="Example WhatsApp conversation with the HakiArdhi legal aid bot"
    >
      {/* Side buttons */}
      <span className="absolute -left-[3px] top-[110px] h-8 w-[3px] rounded-l bg-gray-800" aria-hidden="true" />
      <span className="absolute -left-[3px] top-[155px] h-14 w-[3px] rounded-l bg-gray-800" aria-hidden="true" />
      <span className="absolute -left-[3px] top-[220px] h-14 w-[3px] rounded-l bg-gray-800" aria-hidden="true" />
      <span className="absolute -right-[3px] top-[170px] h-20 w-[3px] rounded-r bg-gray-800" aria-hidden="true" />

      {/* Body and bezel */}
      <div className="rounded-[48px] bg-gray-900 p-[10px] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45)] ring-1 ring-black/40">
        <div className="relative overflow-hidden rounded-[38px] bg-white" style={{ aspectRatio: '9 / 19.5' }}>
          {/* Status bar with dynamic island */}
          <div className="relative z-10 flex h-11 items-center justify-between px-7 pt-1 text-[13px] font-semibold text-white" style={{ background: WA.header }}>
            <span>9:41</span>
            <span className="absolute left-1/2 top-2 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
            <span className="flex items-center gap-1.5" aria-hidden="true">
              <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="0.7" /><rect x="4.5" y="5" width="3" height="6" rx="0.7" /><rect x="9" y="2.5" width="3" height="8.5" rx="0.7" /><rect x="13.5" y="0" width="3" height="11" rx="0.7" /></svg>
              <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor"><path d="M7.5 2.2c2.1 0 4 .8 5.5 2.1l1.1-1.2A9.6 9.6 0 0 0 7.5.5C5 .5 2.7 1.4.9 3.1L2 4.3a8 8 0 0 1 5.5-2.1Zm0 3.3c1.2 0 2.3.5 3.2 1.2l1.1-1.2A6.3 6.3 0 0 0 7.5 3.8c-1.6 0-3.1.6-4.3 1.7l1.1 1.2c.9-.7 2-1.2 3.2-1.2Zm0 3.3-1.9 1.9L7.5 12l1.9-1.3-1.9-1.9Z" /></svg>
              <span className="flex h-[11px] w-6 items-center rounded-[3px] border border-white/60 p-[1.5px]"><span className="h-full w-[80%] rounded-[1.5px] bg-white" /></span>
            </span>
          </div>

          {/* WhatsApp chat header */}
          <div className="flex items-center gap-2 px-2 pb-2 pt-1 text-white" style={{ background: WA.header }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.png" alt="" className="w-8" />
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-[15px] font-semibold">HakiArdhi Legal Aid</p>
              <p className="text-[12px] text-white/80">online</p>
            </div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15 8.5v7a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 3 15.5v-7A1.5 1.5 0 0 1 4.5 7h9A1.5 1.5 0 0 1 15 8.5Zm1.5 2.2 4.5-2.9v8.4l-4.5-2.9v-2.6Z" /></svg>
            <svg className="ml-3 mr-1" width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" /></svg>
          </div>

          {/* Conversation */}
          <div className="flex flex-col gap-1.5 overflow-hidden px-3 py-3" style={{ background: WA.wallpaper, height: 'calc(100% - 44px - 50px - 58px)' }}>
            <span className="mx-auto rounded-md bg-white px-2.5 py-1 text-[11.5px] font-medium shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]" style={{ color: WA.meta }}>
              Today
            </span>
            <p className="mx-auto mb-1 max-w-[88%] rounded-md px-2.5 py-1.5 text-center text-[11px] leading-snug" style={{ background: WA.notice, color: '#54656f' }}>
              Messages and calls are end-to-end encrypted. Only people in this chat can read them.
            </p>

            <Bubble out tail time="10:02">Habari, nina mgogoro wa ardhi na jirani yangu</Bubble>
            <Bubble tail time="10:02">{'Pole sana. Tutakusaidia bure.\nChagua huduma unayohitaji:'}</Bubble>

            {/* WhatsApp interactive list message */}
            <div className="flex justify-start">
              <div className="w-[82%] overflow-hidden rounded-lg bg-white shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]">
                <p className="px-2 pt-1.5 text-[13px] leading-[18px]" style={{ color: WA.text }}>
                  Huduma za msaada wa kisheria
                  <span className="float-right ml-2 mt-1.5 text-[10.5px] leading-none" style={{ color: WA.meta }}>10:02</span>
                </p>
                <div className="mt-1.5 border-t border-[#e9edef]">
                  {['Ripoti tukio', 'Ushauri wa kisheria', 'Ongea na wakili'].map((label) => (
                    <p key={label} className="border-b border-[#e9edef] py-2 text-center text-[13.5px] font-medium last:border-b-0" style={{ color: WA.accent }}>
                      {label}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <Bubble out time="10:03">Ushauri wa kisheria</Bubble>
          </div>

          {/* Message composer */}
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 px-2 pb-5 pt-1.5" style={{ background: WA.wallpaper }}>
            <div className="flex h-10 flex-1 items-center gap-2 rounded-full bg-white px-3 text-[14px]" style={{ color: WA.meta }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 14.5s1.2 1.8 3.5 1.8 3.5-1.8 3.5-1.8M9 9.5h.01M15 9.5h.01" strokeLinecap="round" /></svg>
              <span className="flex-1">Message</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M21 11.5 12.5 20a5 5 0 0 1-7-7l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7L10.2 17.7a1.7 1.7 0 0 1-2.4-2.4L15.5 7.6" strokeLinecap="round" /></svg>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 8h3l1.5-2h7L17 8h3v11H4V8Z" strokeLinejoin="round" /><circle cx="12" cy="13" r="3.2" /></svg>
            </div>
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white" style={{ background: WA.accent }} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-2.1a7 7 0 0 0 6-6.9h-2Z" /></svg>
            </span>
            {/* Home indicator */}
            <span className="absolute bottom-1.5 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-black/80" aria-hidden="true" />
          </div>
        </div>
      </div>
    </figure>
  );
}
