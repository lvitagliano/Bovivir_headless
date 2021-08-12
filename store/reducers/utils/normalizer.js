export const normalizeError = data => {
  return {
    severity: data.severity,
    errorMessage: data.errorMessage,
    status: data.status || undefined,
  }
}
