export default function durationFormatter(unformatedDuration) {
  const hours = Math.trunc(unformatedDuration / 60);
  const minutes = unformatedDuration % 60;
  return `${hours > 0 ? `${hours}ч ` : ''}${minutes}м`;
}
