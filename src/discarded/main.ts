const searchParams = new URLSearchParams(new URL(location.href).search);

document.title = decodeURIComponent(searchParams.get('title')!);

const favIcon = decodeURIComponent(searchParams.get('icon')!);

if (favIcon) {
  const link = document.querySelector('link');

  link!.rel = 'icon';
  link!.href = favIcon;
}

document.onvisibilitychange = replaceTab;

function replaceTab() {
  if (document.visibilityState === 'visible')
    location.href = decodeURIComponent(searchParams.get('url')!);
}
