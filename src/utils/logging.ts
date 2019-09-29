export function showError(city: string, err?: Error): void {
  console.error(
    `City/ZipCode: ${city}, Error encountered: ${err || 'Unknown Error'}`
  );
}

export function showResult(city: string, temperature: string): void {
  console.log(`City/ZipCode: ${city}, Temperature: ${temperature}`);
}
