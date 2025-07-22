'use client';

import { useEffect, useRef, useState } from 'react';

import styles from './Map.module.css';

interface MapProps {
  mapx: string;
  mapy: string;
  address?: string;
  telNumber?: string;
  name?: string;
}

interface KakaoMapOptions {
  center: KakaoLatLng;
  level: number;
}

interface KakaoLatLng {
  getLat(): number;
  getLng(): number;
}

interface KakaoMap {
  setCenter(latlng: KakaoLatLng): void;
  getLevel(): number;
  setLevel(level: number): void;
}

interface KakaoMarker {
  getPosition(): KakaoLatLng;
  setMap(map: KakaoMap | null): void;
}

interface KakaoCustomOverlay {
  setMap(map: KakaoMap | null): void;
}

interface KakaoMaps {
  load: (callback: () => void) => void;
  Map: new (container: HTMLElement, options: KakaoMapOptions) => KakaoMap;
  LatLng: new (lat: number, lng: number) => KakaoLatLng;
  Marker: new (options: {
    position: KakaoLatLng;
    map: KakaoMap;
  }) => KakaoMarker;
  CustomOverlay: new (options: {
    content: string;
    position: KakaoLatLng;
    map: KakaoMap;
  }) => KakaoCustomOverlay;
  event: {
    addListener: (
      target: KakaoMarker,
      type: string,
      handler: () => void,
    ) => void;
  };
}

declare global {
  interface Window {
    kakao: {
      maps: KakaoMaps;
    };
  }
}

const createOverlayContent = (
  name: string,
  address?: string,
  telNumber?: string,
): string => {
  return `
    <div class="${styles.wrap}">
      <div class="${styles.info}">
        <div class="${styles.title}">
          ${name}
        </div>
        <div class="${styles.mapBody}">
          <div class="${styles.desc}">
            <div class="${styles.ellipsis}">주소: ${address || '주소 정보 없음'}</div>
            <div class="${styles.jibunEllipsis}">연락처: ${telNumber || '연락처 정보 없음'}</div>
          </div>
        </div>
      </div>
    </div>`;
};

const createMapOptions = (lat: number, lng: number): KakaoMapOptions => ({
  center: new window.kakao.maps.LatLng(lat, lng),
  level: 3,
});

const createMarker = (lat: number, lng: number, map: KakaoMap): KakaoMarker => {
  return new window.kakao.maps.Marker({
    position: new window.kakao.maps.LatLng(lat, lng),
    map: map,
  });
};

const createCustomOverlay = (
  content: string,
  position: KakaoLatLng,
  map: KakaoMap,
): KakaoCustomOverlay => {
  return new window.kakao.maps.CustomOverlay({
    content: content,
    position: position,
    map: map,
  });
};

const loadKakaoMapScript = (apiKey: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;

    script.onload = () => resolve();
    script.onerror = (error) => {
      console.error('카카오맵 스크립트 로드 실패:', error);
      reject(error);
    };

    document.head.appendChild(script);
  });
};

const loadKakaoMapScriptFallback = (apiKey: string): Promise<void> => {
  return new Promise<void>((resolve) => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}`;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
};

const useKakaoMap = (apiKey: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeKakaoMap = async () => {
      if (window.kakao && window.kakao.maps) {
        setIsLoaded(true);
        return;
      }

      try {
        await loadKakaoMapScript(apiKey);
        setIsLoaded(true);
      } catch (error) {
        console.error('카카오맵 로드 실패:', error);
        try {
          await loadKakaoMapScriptFallback(apiKey);
          setIsLoaded(true);
        } catch {
          setError('카카오맵을 로드할 수 없습니다.');
        }
      }
    };

    initializeKakaoMap();
  }, [apiKey]);

  return { isLoaded, error };
};

export default function Map({
  mapx,
  mapy,
  address,
  telNumber,
  name,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY || '';
  const { isLoaded, error } = useKakaoMap(apiKey);

  const initializeMap = () => {
    if (!mapRef.current || !isLoaded) return;

    try {
      window.kakao.maps.load(() => {
        const lat = parseFloat(mapx);
        const lng = parseFloat(mapy);

        const options = createMapOptions(lat, lng);
        const map = new window.kakao.maps.Map(mapRef.current!, options);

        const marker = createMarker(lat, lng, map);
        const content = createOverlayContent(name || '', address, telNumber);
        const overlay = createCustomOverlay(content, marker.getPosition(), map);

        overlay.setMap(map);
      });
    } catch (error) {
      console.error('지도 초기화 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      setTimeout(initializeMap, 100);
    }
  }, [isLoaded, mapx, mapy, address, telNumber, name]);

  if (error) {
    return (
      <div className={styles.mapContainer}>
        <div className={styles.errorMessage}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.mapContainer}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
