const baseQuery = async handler => {
  try {
    const data = await handler()
    return { data }
  } catch (error) {
    return {
      error: {
        status: 'CUSTOM_ERROR',
        error: (error as Error).message,
        message: (error as Error).message,
      },
    }
  }
}

export default baseQuery
