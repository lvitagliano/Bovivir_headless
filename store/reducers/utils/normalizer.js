export const normalizeError = data => {
  if (data.status) {
    return {
      severity: data.severity,
      errorMessage: data.errorMessage,
      status: data.status,
    }
  } else {
    return {
      severity: data.severity,
      errorMessage: data.errorMessage,
    }
  }
}
