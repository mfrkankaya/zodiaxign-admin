export const sortHoroscopes = (horoscopes) => {
  return horoscopes.sort((a, b) => b.sort - a.sort)
}
