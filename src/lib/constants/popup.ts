export const isPopup = !new URL(document.location.href).searchParams.has('tab');
