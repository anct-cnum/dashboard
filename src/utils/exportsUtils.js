export function downloadFile(exports) {
  const url = window.URL.createObjectURL(new Blob(['\ufeff', exports?.blob], { type: 'text/plain' })); //ufeff pour BOM UTF-8
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${exports?.nameFile}.csv`);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
}

export function scrollTopWindow() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
