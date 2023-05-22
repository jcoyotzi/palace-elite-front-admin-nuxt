export function getCookie(name: string): string {
  try {
    const cookie: {[key: string]: string} = {};
    window.document.cookie.split(';').forEach(function(el) {
      const [key,value] = el.split('=');
      cookie[key.trim()] = value;
    })

    return cookie[name];
  } catch (error) {
    return 'en';
  }
}