/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { HERO_IMAGE } from '../data';

const STORAGE_KEY = 'rioverde_fachada_banner_url';
const BANNER_EVENT = 'rioverde:banner_updated';

export function getStoredBanner(): string {
  if (typeof window === 'undefined') return HERO_IMAGE;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return stored;
  return HERO_IMAGE;
}

export async function setBannerImage(imageUrl: string, base64Data?: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, imageUrl);
    window.dispatchEvent(new CustomEvent(BANNER_EVENT, { detail: imageUrl }));
  }

  // If base64 data provided, also persist to server
  if (base64Data) {
    try {
      await fetch('/api/upload-banner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64Data }),
      });
    } catch (err) {
      console.warn('Could not persist banner to server:', err);
    }
  }
}

export function useBannerImage(): [string, (file: File) => Promise<void>] {
  const [image, setImage] = useState<string>(() => getStoredBanner());

  useEffect(() => {
    // 1. Check if server already has the persisted banner file
    fetch('/api/banner-status')
      .then(res => res.json())
      .then(data => {
        if (data.exists && data.url) {
          // If no custom local override or if matching, use server url
          const local = localStorage.getItem(STORAGE_KEY);
          if (!local || local.startsWith('/')) {
            setImage(data.url);
            localStorage.setItem(STORAGE_KEY, data.url);
          }
        }
      })
      .catch(() => {});

    // 2. Listen to custom event when image is updated
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setImage(customEvent.detail);
      }
    };

    window.addEventListener(BANNER_EVENT, handleUpdate);
    return () => window.removeEventListener(BANNER_EVENT, handleUpdate);
  }, []);

  const uploadFile = async (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64 = reader.result as string;
          await setBannerImage(base64, base64);
          resolve();
        } catch (e) {
          reject(e);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return [image, uploadFile];
}
