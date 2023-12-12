export default function mapStatus(type: string): number {
  const statusMap: Record<string, number> = {
    INVALID_DATA: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
  };

  return statusMap[type];
}