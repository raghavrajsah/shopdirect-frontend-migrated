export default function validateEmail(email: string | null | undefined): boolean {
  if (!email) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}
