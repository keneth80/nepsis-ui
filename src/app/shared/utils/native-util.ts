export const clipBoardEvent = (text: string, callback?: any) => {
  if ((window as any).clipboardData) { // Internet Explorer
    (window as any).clipboardData.setData('Text', text);
    if (callback) {
        callback();
    }
  } else {
    const clipBoardHandler = (e: any) => {
      e.clipboardData.setData('text/plain', text);
      e.preventDefault();
      document.removeEventListener('copy', clipBoardHandler);
      if (callback) {
        callback();
      }
    }

    document.addEventListener('copy', clipBoardHandler);
  }

  document.execCommand('copy');
}
