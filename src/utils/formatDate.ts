export default function formatDate(value: string | number | Date | null | undefined): string {
  if (!value) {
    return 'Recently';
  }

  var date: Date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Recently';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}
