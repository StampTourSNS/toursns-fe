'use client';

import { useEffect, useRef } from 'react';

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
    closeOverlay?: () => void;
  }
}

export default function Map({
  mapx,
  mapy,
  address,
  telNumber,
  name,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  const initMap = () => {
    if (!mapRef.current) return;

    try {
      window.kakao.maps.load(() => {
        const options: KakaoMapOptions = {
          center: new window.kakao.maps.LatLng(
            parseFloat(mapx),
            parseFloat(mapy),
          ),
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapRef.current!, options);

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(
            parseFloat(mapx),
            parseFloat(mapy),
          ),
          map: map,
        });

        // 커스텀 오버레이 내용
        const content = `
          <div class="${styles.wrap}">
            <div class="${styles.info}">
              <div class="${styles.title}">
                ${name}
                <div class="${styles.close}" onclick="closeOverlay()" title="닫기">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                  </svg>
                </div>
              </div>
              <div class="${styles.mapBody}">
                <div class="${styles.desc}">
                  <div class="${styles.ellipsis}">주소: ${address || '주소 정보 없음'}</div>
                  <div class="${styles.jibunEllipsis}">연락처: ${telNumber || '연락처 정보 없음'}</div>
                </div>
              </div>
            </div>
          </div>`;

        // 커스텀 오버레이 생성
        const overlay = new window.kakao.maps.CustomOverlay({
          content: content,
          position: marker.getPosition(),
          map: map,
        });

        overlay.setMap(map);
      });
    } catch (error) {
      console.error('지도 초기화 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    // API 키 유효성 검사
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

    // 카카오맵 스크립트가 이미 로드되어 있는지 확인
    if (window.kakao && window.kakao.maps) {
      initMap();
      return;
    }

    // 카카오맵 스크립트 로드 - 다른 방식 시도
    const loadKakaoMap = () => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;

        script.onload = () => {
          resolve();
        };

        script.onerror = (error) => {
          console.error('카카오맵 스크립트 로드 실패:', error);
          reject(error);
        };

        document.head.appendChild(script);
      });
    };

    // 스크립트 로드 후 지도 초기화
    loadKakaoMap()
      .then(() => {
        // 약간의 지연 후 초기화
        setTimeout(() => {
          if (window.kakao && window.kakao.maps) {
            window.kakao.maps.load(() => {
              initMap();
            });
          }
        }, 100);
      })
      .catch((error) => {
        console.error('카카오맵 로드 실패:', error);
        const cdnScript = document.createElement('script');
        cdnScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}`;
        cdnScript.onload = () => {
          initMap();
        };
        document.head.appendChild(cdnScript);
      });
  }, [mapx, mapy, address, telNumber, name]);

  return (
    <div className={styles.mapContainer}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
