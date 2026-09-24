/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { HERO_IMAGE } from '../data';

const PRIMARY_KEY = 'rioverde_fachada_banner_url_v2';
const FALLBACK_KEYS = [
  'rioverde_fachada_banner_url_v2',
  'rioverde_fachada_banner_url',
  'rioverde_banner_image',
  'rioverde_fachada_banner',
  'custom_banner_url',
  'hero_banner_image',
];
const BANNER_EVENT = 'rioverde:banner_updated';

/**
 * Checks if the current environment has an active Node.js / Express backend
 * to avoid 404 errors when hosted statically (e.g. tipocrioverde.com on Cloudflare / static CDN).
 */
export function isBackendSupported(): boolean {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1' || host.includes('.run.app');
}

export function getStoredBanner(): string {
  if (typeof window === 'undefined') return HERO_IMAGE;
  
  for (const key of FALLBACK_KEYS) {
    const stored = localStorage.getItem(key);
    if (stored && (stored.startsWith('data:image/') || stored.startsWith('/'))) {
      return stored;
    }
  }

  // Scan localStorage for any base64 image key
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.includes('banner') || k.includes('fachada') || k.includes('rioverde'))) {
        const val = localStorage.getItem(k);
        if (val && val.startsWith('data:image/')) {
          return val;
        }
      }
    }
  } catch (e) {
    // Ignore storage errors
  }

  return HERO_IMAGE;
}

export function findLocalBase64Image(): string | null {
  if (typeof window === 'undefined') return null;
  for (const key of FALLBACK_KEYS) {
    const val = localStorage.getItem(key);
    if (val && val.startsWith('data:image/')) return val;
  }
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k) {
        const val = localStorage.getItem(k);
        if (val && val.startsWith('data:image/')) {
          return val;
        }
      }
    }
  } catch (e) {
    // Ignore storage errors
  }
  return null;
}

/**
 * Triggers a download of banner-rioverde.png directly to the user's computer.
 * Essential for static deployments (tipocrioverde.com) so the user can place
 * the image file directly into their web hosting directory.
 */
export function downloadBannerImage(explicitData?: string) {
  if (typeof window === 'undefined') return;
  const data = explicitData || findLocalBase64Image() || HERO_IMAGE;
  const link = document.createElement('a');
  link.download = 'banner-rioverde.png';
  link.href = data;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function setBannerImage(imageUrl: string, base64Data?: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(PRIMARY_KEY, imageUrl);
    window.dispatchEvent(new CustomEvent(BANNER_EVENT, { detail: imageUrl }));
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const channel = new BroadcastChannel('rioverde_banner_sync');
        channel.postMessage({ url: imageUrl });
        channel.close();
      } catch (e) {}
    }
  }

  // Only attempt server persistence if backend is supported in this environment
  if (isBackendSupported()) {
    const toSend = base64Data || (imageUrl.startsWith('data:image/') ? imageUrl : null);
    if (toSend) {
      try {
        const res = await fetch('/api/upload-banner', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: toSend }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.url && typeof window !== 'undefined') {
            localStorage.setItem(PRIMARY_KEY, data.url);
            window.dispatchEvent(new CustomEvent(BANNER_EVENT, { detail: data.url }));
          }
        }
      } catch (err) {
        // Silently catch server connection errors
      }
    }
  }
}

export async function syncLocalBannerToServer(explicitData?: string): Promise<{ success: boolean; isStatic: boolean }> {
  if (typeof window === 'undefined') return { success: false, isStatic: false };
  const local = explicitData || findLocalBase64Image();
  if (!local || !local.startsWith('data:image/')) {
    return { success: false, isStatic: false };
  }

  // If running on static hosting without Node.js backend
  if (!isBackendSupported()) {
    return { success: false, isStatic: true };
  }

  try {
    const res = await fetch('/api/upload-banner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64: local }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.url) {
        localStorage.setItem(PRIMARY_KEY, data.url);
        window.dispatchEvent(new CustomEvent(BANNER_EVENT, { detail: data.url }));
        if (typeof BroadcastChannel !== 'undefined') {
          try {
            const channel = new BroadcastChannel('rioverde_banner_sync');
            channel.postMessage({ url: data.url });
            channel.close();
          } catch (e) {}
        }
        return { success: true, isStatic: false };
      }
    }
    return { success: false, isStatic: res.status === 404 };
  } catch (err) {
    return { success: false, isStatic: true };
  }
}

export function useBannerImage(): [
  string,
  (file: File) => Promise<void>,
  {
    isLocalDataImage: boolean;
    syncToServer: () => Promise<{ success: boolean; isStatic: boolean }>;
    downloadBanner: () => void;
  }
] {
  const [image, setImage] = useState<string>(() => getStoredBanner());
  const isLocalDataImage = Boolean(image && image.startsWith('data:image/'));

  const syncToServer = useCallback(async () => {
    return await syncLocalBannerToServer();
  }, []);

  const downloadBanner = useCallback(() => {
    downloadBannerImage(image);
  }, [image]);

  useEffect(() => {
    // Only query backend server if backend is supported in this environment
    if (isBackendSupported()) {
      // Auto-sync if this browser currently holds a base64 image in localStorage
      const local = findLocalBase64Image();
      if (local) {
        syncLocalBannerToServer(local).then((result) => {
          if (result.success) {
            console.info('Banner photo synced to server.');
          }
        });
      }

      // Check server status with cache busting
      fetch('/api/banner-status?t=' + Date.now())
        .then((res) => {
          if (res.ok) return res.json();
          return null;
        })
        .then((data) => {
          if (data && data.exists && data.url) {
            setImage(data.url);
          }
        })
        .catch(() => {});
    }

    // Listen to internal custom event when image is updated
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setImage(customEvent.detail);
      }
    };

    // Listen to BroadcastChannel across tabs/windows in the same browser
    let channel: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        channel = new BroadcastChannel('rioverde_banner_sync');
        channel.onmessage = (event) => {
          if (event.data?.url) {
            setImage(event.data.url);
          }
        };
      } catch (e) {}
    }

    window.addEventListener(BANNER_EVENT, handleUpdate);
    return () => {
      window.removeEventListener(BANNER_EVENT, handleUpdate);
      if (channel) {
        channel.close();
      }
    };
  }, []);

  const uploadFile = async (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64 = reader.result as string;
          await setBannerImage(base64, base64);
          setImage(base64);
          resolve();
        } catch (e) {
          reject(e);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return [image, uploadFile, { isLocalDataImage, syncToServer, downloadBanner }];
}
