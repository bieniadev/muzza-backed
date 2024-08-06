export function formatTimeDifference(startDate, endDate) {
  // Oblicz różnicę czasu w milisekundach
  const diff = endDate.getTime() - startDate.getTime();

  // Konwertuj milisekundy na sekundy
  const seconds = Math.floor(diff / 1000);

  // Oblicz godziny, minuty i sekundy
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Formatuj czas
  let formattedTime = '';
  if (hours > 0) {
    formattedTime += `${hours}:`;
  }
  // Dodaj zera na początku jeśli potrzeba
  formattedTime += `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

  return formattedTime;
}
