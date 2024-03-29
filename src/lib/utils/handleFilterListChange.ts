import { settings } from '@/lib/stores';

export function handleFilterListChange(
  ev: Event & { currentTarget: EventTarget & HTMLTextAreaElement },
  urlList?: string
) {
  const value = ev.currentTarget.value;

  const urls = value.match(
    /(\b(https?|ftp|file)|\B\*):\/{2}(\*|(\*\.)?[^*/\s:]*)\/[^\s]*/g
  );

  settings.changeSetting('urlFilterList', urls ? urls : undefined);

  if (urlList) ev.currentTarget.value = urlList;
}
