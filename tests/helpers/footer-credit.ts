// Preserve historical immutable layout captures while allowing only the approved footer credit.
export function restorePriorFooterCredit(value: string | Buffer): string | Buffer {
  if (Buffer.isBuffer(value) && !value.includes(Buffer.from("Built by Munyal · Personally crafted by Tyson Kaye"))) return value;
  return value.toString().replace('<div className="flex flex-col items-center gap-2 sm:items-end">\n            <span className="text-white/70">A family-run service</span>\n            <a href="https://munyal.com.au" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-center normal-case tracking-normal text-white/70 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Built by Munyal · Personally crafted by Tyson Kaye</a>\n          </div>', '<span className="text-white/70">A family-run service</span>');
}
