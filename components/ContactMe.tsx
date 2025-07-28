import { TbBrandWhatsapp, TbCalendarEvent } from 'react-icons/tb';

export default async function ContactMe({
  calendarLink,
  whatsappLink,
  children,
}: {
  calendarLink?: string;
  whatsappLink?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      {whatsappLink && (
        <a
          href={whatsappLink}
          target="_blank"
          className="inline-flex m-1 items-center gap-1 font-medium bg-stone-600 hover:bg-stone-500 py-2 px-4 rounded text-white"
        >
          <TbBrandWhatsapp size={16} />
          Chat on WhatsApp
        </a>
      )}

      {calendarLink && (
        <a
          href={calendarLink}
          target="_blank"
          className="inline-flex m-1 items-center gap-1 underline hover:no-underline font-medium py-2 px-4"
        >
          <TbCalendarEvent size={16} />
          Request a short call
        </a>
      )}

      {children && <p className="inline-flex  text-xs ">{children}</p>}
    </div>
  );
}
