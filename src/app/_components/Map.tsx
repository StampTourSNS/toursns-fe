import { useState } from 'react';

import FestivalModal from './FestivalModal';
import styles from './Map.module.css';

interface Festival {
  id: string;
  name: string;
  image: string;
  address: string;
  startDate: string;
  endDate: string;
  festivalRegion: string;
  active: string;
}

// 색상 상수 정의
const COLORS = {
  DEFAULT: '#f8f9fa',
  ACTIVE_FESTIVAL: '#fcafaf',
  SOON_FESTIVAL: '#73FF78',
  SELECTED: '#e3f2fd',
  STROKE_DEFAULT: '#6c757d',
};

const OPACITY = {
  DEFAULT: '0.8',
  FESTIVAL: '0.53',
};

const STROKE_WIDTH = {
  DEFAULT: '1.5px',
  HIGHLIGHTED: '2px',
};

// 각 지역의 좌표 정의 (viewBox 기준) - 각 지역의 중심점으로 조정
const REGION_COORDINATES = [
  { index: 0, id: 'GeoJea', name: '거제시', x: 2620, y: 532 },
  { index: 1, id: 'GeoChang', name: '거창군', x: 2490, y: 340 },
  { index: 2, id: 'GoSung', name: '고성군', x: 2558, y: 500 },
  { index: 3, id: 'KimHea', name: '김해시', x: 2658, y: 445 },
  { index: 4, id: 'NamHea', name: '남해군', x: 2489, y: 548 },
  { index: 5, id: 'MeelYang', name: '밀양시', x: 2645, y: 395 },
  { index: 6, id: 'SaCheon', name: '사천시', x: 2505, y: 485 },
  { index: 7, id: 'SanCheong', name: '산청군', x: 2490, y: 423 },
  { index: 8, id: 'YangSan', name: '양산시', x: 2690, y: 415 },
  { index: 9, id: 'EuiRyeong', name: '의령군', x: 2558, y: 413 },
  { index: 10, id: 'JinJu', name: '진주시', x: 2530, y: 460 },
  { index: 11, id: 'ChangNyeong', name: '창녕군', x: 2593, y: 390 },
  { index: 12, id: 'ChangWon', name: '창원시', x: 2622, y: 450 },
  { index: 13, id: 'TongYeong', name: '통영시', x: 2585, y: 520 },
  { index: 14, id: 'HaDong', name: '하동군', x: 2472, y: 480 },
  { index: 15, id: 'HamAn', name: '함안군', x: 2580, y: 440 },
  { index: 16, id: 'HamYang', name: '함양군', x: 2460, y: 380 },
  { index: 17, id: 'HapCheon', name: '합천군', x: 2530, y: 383 },
];

export default function Map({ Festival }: { Festival: Festival[] }) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState<Festival[]>([]);

  function handleClick(e: React.MouseEvent<SVGPathElement>) {
    const regionId = (e.target as SVGPathElement).id;
    const regionIndex = REGION_COORDINATES.findIndex(
      (region) => region.id === regionId,
    );

    // 축제 상태 확인
    const hasActiveFestival = Festival.filter(
      (festival) => festival.active === 'ACTIVE',
    ).some((festival) => festival.festivalRegion === regionIndex.toString());
    const hasSoonActiveFestival = Festival.filter(
      (festival) => festival.active === 'SOON',
    ).some((festival) => festival.festivalRegion === regionIndex.toString());

    // 축제가 있는 지역만 클릭 가능
    if (hasActiveFestival || hasSoonActiveFestival) {
      setSelectedRegion(regionId);
      setSelectedFestival(
        Festival.filter(
          (festival) => festival.festivalRegion === regionIndex.toString(),
        ),
      );
      setOpenModal(true);
    }
  }

  function getRegionStyle(regionId: string) {
    const isSelected = selectedRegion === regionId;
    const regionIndex = REGION_COORDINATES.findIndex(
      (region) => region.id === regionId,
    );

    // 축제 상태 확인
    const hasActiveFestival = Festival.filter(
      (festival) => festival.active === 'ACTIVE',
    ).some((festival) => festival.festivalRegion === regionIndex.toString());
    const hasSoonActiveFestival = Festival.filter(
      (festival) => festival.active === 'SOON',
    ).some((festival) => festival.festivalRegion === regionIndex.toString());

    // 축제가 있는 지역인지 확인
    const hasFestival = hasActiveFestival || hasSoonActiveFestival;

    // 색상 결정 로직
    let fillColor = COLORS.DEFAULT; // 기본색
    let fillOpacity = OPACITY.DEFAULT;

    if (hasActiveFestival) {
      fillColor = COLORS.ACTIVE_FESTIVAL; // 축제 진행중 - 분홍색
      fillOpacity = OPACITY.FESTIVAL;
    } else if (hasSoonActiveFestival) {
      fillColor = COLORS.SOON_FESTIVAL; // 축제 예정 - 초록색
      fillOpacity = OPACITY.FESTIVAL;
    } else if (isSelected) {
      fillColor = COLORS.SELECTED; // 선택됨 - 파란색
    }

    // 테두리 스타일
    const strokeColor = COLORS.STROKE_DEFAULT;
    const strokeWidth =
      isSelected || hasActiveFestival || hasSoonActiveFestival
        ? STROKE_WIDTH.HIGHLIGHTED
        : STROKE_WIDTH.DEFAULT;

    // 그림자 효과
    const filter = isSelected
      ? 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))'
      : 'none';

    // 포인터 이벤트 설정 - 축제가 있는 지역만 클릭 가능
    const pointerEvents: 'visiblePainted' | 'none' = hasFestival
      ? 'visiblePainted'
      : 'none';

    return {
      fill: fillColor,
      fillOpacity,
      stroke: strokeColor,
      strokeWidth,
      filter,
      pointerEvents,
    };
  }

  return (
    <div className={styles.map_container}>
      {/* 지역명 p태그들 */}
      {REGION_COORDINATES.map((region) => (
        <p
          key={region.name}
          className={styles.region_label}
          style={{
            position: 'absolute',
            left: `${((region.x - 2370) / 400) * 100}%`,
            top: `${((region.y - 290) / 300) * 100}%`,
            transform: 'translate(-50%, -50%)',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#333',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {region.name}
        </p>
      ))}

      <svg
        width="100%"
        height="100%"
        viewBox="2370 290 400 300"
        className={styles.map_svg}
      >
        <defs>
          <linearGradient
            id="regionGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              style={{ stopColor: '#ffffff', stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: '#f8f9fa', stopOpacity: 1 }}
            />
          </linearGradient>
          <linearGradient
            id="borderGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              style={{ stopColor: '#6c757d', stopOpacity: 0.8 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: '#495057', stopOpacity: 0.8 }}
            />
          </linearGradient>
        </defs>
        <g>
          <path
            className={styles['sop-interactive']}
            id={REGION_COORDINATES[0].id}
            onClick={handleClick}
            style={getRegionStyle(REGION_COORDINATES[0].id)}
            data-has-festival={
              getRegionStyle(REGION_COORDINATES[0].id).pointerEvents ===
              'visiblePainted'
                ? 'true'
                : 'false'
            }
            strokeOpacity="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            fillOpacity="0.8"
            fillRule="nonzero"
            d="M 2619 572 2619 572 Z M 2619 572 2620 572 Z M 2630 562 2630 560 2630 562 Z M 2636 553 2636 553 Z M 2635 553 2636 553 Z M 2604 549 2603 550 2604 549 Z M 2636 549 2636 549 Z M 2604 546 2602 546 2602 544 2605 541 2605 544 Z M 2643 540 2642 543 2643 540 Z M 2596 541 2597 540 2596 541 Z M 2592 540 2594 542 2591 541 2591 539 2593 540 Z M 2591 539 2589 539 2591 538 Z M 2595 526 2595 526 Z M 2609 522 2609 522 Z M 2638 509 2638 511 2638 509 Z M 2604 510 2601 513 2603 516 2602 519 2599 516 2601 514 2599 511 2601 509 Z M 2620 509 2621 509 Z M 2620 501 2619 501 Z M 2622 500 2622 500 Z M 2623 507 2619 507 2617 509 2616 508 2620 505 2618 503 2621 504 2620 501 2622 501 2623 498 2624 501 Z M 2640 498 2640 500 2640 498 Z M 2627 497 2628 498 2627 497 Z M 2636 494 2636 494 Z M 2626 552 2623 551 2622 554 2625 559 2628 558 2630 560 2621 560 2619 562 2623 565 2622 566 2621 565 2617 568 2615 566 2612 568 2611 567 2613 563 2616 563 2617 561 2611 559 2611 557 2614 554 2616 554 2614 552 2615 551 2611 551 2609 554 2607 554 2607 552 2610 549 2608 549 2605 552 2604 549 2613 547 2614 541 2613 538 2611 537 2613 537 2611 535 2608 540 2603 539 2600 545 2598 539 2596 539 2593 536 2594 535 2592 531 2597 525 2597 523 2598 524 2602 520 2604 520 2608 525 2610 525 2611 522 2615 524 2616 523 2616 525 2617 524 2619 526 2620 525 2618 521 2612 515 2615 513 2616 510 2616 512 2621 512 2621 510 2623 512 2626 507 2624 507 2626 505 2625 504 2630 503 2627 502 2628 497 2630 495 2631 496 2635 496 2636 500 2633 501 2634 504 2632 504 2632 508 2636 512 2636 514 2638 514 2638 516 2636 516 2637 523 2635 523 2636 524 2632 529 2634 529 2634 531 2638 527 2640 528 2642 526 2640 529 2641 531 2639 533 2640 536 2635 536 2633 538 2635 540 2638 539 2636 541 2640 548 2636 548 2634 544 2633 547 2631 547 2632 544 2629 543 2627 545 2629 549 Z"
          />
          <path
            className={styles['sop-interactive']}
            id={REGION_COORDINATES[1].id}
            onClick={handleClick}
            style={getRegionStyle(REGION_COORDINATES[1].id)}
            data-has-festival={
              getRegionStyle(REGION_COORDINATES[1].id).pointerEvents ===
              'visiblePainted'
                ? 'true'
                : 'false'
            }
            strokeOpacity="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            fillOpacity="0.8"
            fillRule="evenodd"
            d="M2486 308L2489 312L2492 311L2495 314L2494 319L2498 317L2502 320L2504 318L2509 325L2513 323L2516 324L2519 322L2523 324L2522 327L2518 330L2517 329L2516 332L2513 333L2514 335L2516 335L2515 341L2518 347L2520 348L2520 352L2524 354L2524 356L2520 358L2518 356L2515 359L2515 361L2507 367L2507 371L2504 373L2504 382L2499 386L2500 391L2496 393L2494 393L2493 390L2491 390L2490 388L2486 390L2486 386L2484 384L2485 381L2483 379L2482 381L2478 378L2485 370L2484 368L2486 366L2486 360L2485 359L2482 362L2480 362L2472 355L2470 351L2469 352L2465 348L2464 345L2461 348L2459 348L2456 345L2455 341L2451 339L2452 335L2458 332L2458 328L2460 328L2462 321L2466 323L2477 316L2479 317L2482 308L2487 307z"
          />
          <path
            className={styles['sop-interactive']}
            id={REGION_COORDINATES[2].id}
            onClick={handleClick}
            style={getRegionStyle(REGION_COORDINATES[2].id)}
            data-has-festival={
              getRegionStyle(REGION_COORDINATES[2].id).pointerEvents ===
              'visiblePainted'
                ? 'true'
                : 'false'
            }
            stroke="#666666"
            strokeOpacity="1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#ffffff"
            fillOpacity="0.5"
            fillRule="evenodd"
            d="M 2552 530 2551 531 2552 530 Z M 2553 530 2552 529 2553 530 Z M 2540 527 2540 529 2540 527 Z M 2553 527 2554 526 2553 527 Z M 2555 522 2555 522 Z M 2545 521 2545 521 Z M 2564 521 2563 520 2564 521 Z M 2555 519 2555 519 Z M 2548 520 2548 518 2548 520 Z M 2553 518 2553 518 Z M 2550 518 2551 517 2550 518 Z M 2566 516 2566 516 Z M 2562 477 2569 476 2571 478 2570 480 2577 481 2578 485 2584 485 2584 489 2582 492 2582 490 2573 494 2576 496 2574 498 2575 499 2573 499 2574 500 2577 499 2576 496 2588 492 2587 489 2588 488 2590 490 2591 487 2594 489 2593 492 2590 493 2592 495 2593 494 2597 500 2591 506 2581 504 2580 507 2586 507 2587 510 2580 510 2577 513 2577 515 2573 515 2568 518 2567 513 2564 512 2565 515 2561 519 2562 522 2556 522 2554 520 2556 518 2552 518 2552 516 2548 517 2548 515 2545 518 2543 518 2544 527 2542 527 2541 524 2541 527 2540 524 2539 527 2536 524 2534 524 2535 525 2533 525 2532 528 2528 524 2526 526 2528 525 2526 522 2529 521 2528 519 2532 513 2532 509 2534 506 2538 506 2536 500 2540 493 2545 488 2542 487 2541 484 2544 482 2543 481 2545 479 2549 479 2552 476 2558 475 Z M 2530 526 2529 525 Z"
          />
          <path
            className={styles['sop-interactive']}
            id={REGION_COORDINATES[3].id}
            onClick={handleClick}
            style={getRegionStyle(REGION_COORDINATES[3].id)}
            data-has-festival={
              getRegionStyle(REGION_COORDINATES[3].id).pointerEvents ===
              'visiblePainted'
                ? 'true'
                : 'false'
            }
            stroke="#666666"
            strokeOpacity="1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#ffffff"
            fillOpacity="0.5"
            fillRule="evenodd"
            d="M 2664 423 2670 424 2675 429 2679 430 2680 435 2688 443 2688 445 2683 453 2675 453 2671 456 2669 454 2669 456 2665 456 2662 459 2664 461 2664 470 2662 469 2662 466 2656 469 2648 469 2644 466 2641 467 2641 459 2636 457 2637 451 2630 437 2635 436 2635 432 2638 435 2639 432 2649 425 2649 423 2652 420 2660 417 2662 419 Z"
          />
          <path
            className={styles['sop-interactive']}
            id={REGION_COORDINATES[4].id}
            onClick={handleClick}
            style={getRegionStyle(REGION_COORDINATES[4].id)}
            data-has-festival={
              getRegionStyle(REGION_COORDINATES[4].id).pointerEvents ===
              'visiblePainted'
                ? 'true'
                : 'false'
            }
            stroke="#666666"
            strokeOpacity="1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#ffffff"
            fillOpacity="0.5"
            fillRule="evenodd"
            d="M 2519 573 2519 573 Z M 2518 571 2519 572 2518 571 Z M 2517 573 2517 571 2517 573 Z M 2514 571 2515 571 Z M 2515 570 2513 570 2515 570 Z M 2512 570 2513 570 Z M 2517 569 2519 570 2517 569 Z M 2520 569 2519 570 2520 569 Z M 2508 568 2508 568 Z M 2518 564 2517 564 Z M 2498 562 2498 564 2497 562 Z M 2520 560 2520 560 Z M 2521 558 2521 558 Z M 2479 556 2479 556 Z M 2513 538 2514 539 2513 538 Z M 2476 529 2477 530 2476 529 Z M 2476 523 2476 523 Z M 2496 523 2496 523 Z M 2510 532 2512 534 2512 530 2514 528 2513 527 2516 526 2517 527 2515 527 2519 529 2518 530 2520 530 2520 534 2518 535 2519 538 2520 537 2524 541 2520 541 2512 537 2512 539 2506 540 2502 536 2501 533 2507 526 2506 525 2509 522 2514 521 Z M 2495 517 2494 518 2496 520 2494 520 2495 527 2490 529 2490 533 2493 537 2493 540 2496 540 2499 546 2501 546 2501 544 2503 544 2506 540 2513 540 2515 542 2520 543 2520 547 2517 548 2519 548 2517 553 2518 560 2514 563 2516 566 2519 567 2518 566 2516 569 2514 567 2512 569 2512 564 2510 564 2510 566 2506 565 2506 567 2500 566 2501 565 2498 560 2500 554 2499 552 2491 555 2493 561 2490 564 2483 563 2482 562 2481 558 2479 558 2482 551 2481 550 2479 550 2478 545 2474 539 2474 535 2478 530 2477 525 2483 525 2481 522 2484 519 2484 517 Z"
          />
          <path
            className={styles['sop-interactive']}
            id={REGION_COORDINATES[5].id}
            onClick={handleClick}
            style={getRegionStyle(REGION_COORDINATES[5].id)}
            data-has-festival={
              getRegionStyle(REGION_COORDINATES[5].id).pointerEvents ===
              'visiblePainted'
                ? 'true'
                : 'false'
            }
            stroke="#666666"
            strokeOpacity="1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#ffffff"
            fillOpacity="0.5"
            fillRule="evenodd"
            d="M 2680 370 2685 368 2688 369 2689 372 2684 379 2679 381 2681 384 2682 383 2684 385 2684 387 2682 389 2683 390 2677 394 2679 396 2678 403 2672 404 2668 407 2671 410 2671 412 2666 412 2662 420 2661 417 2653 420 2645 428 2639 427 2630 421 2622 421 2621 420 2623 412 2620 406 2618 405 2616 407 2610 404 2609 401 2609 395 2612 393 2610 387 2612 387 2611 378 2615 378 2617 376 2620 377 2623 374 2629 374 2630 377 2632 378 2635 377 2642 380 2646 380 2653 373 2657 375 2663 365 2666 366 2668 364 2671 364 2675 366 Z"
          />
          <path
            className={styles['sop-interactive']}
            id={REGION_COORDINATES[6].id}
            onClick={handleClick}
            style={getRegionStyle(REGION_COORDINATES[6].id)}
            data-has-festival={
              getRegionStyle(REGION_COORDINATES[6].id).pointerEvents ===
              'visiblePainted'
                ? 'true'
                : 'false'
            }
            stroke="#666666"
            strokeOpacity="1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#ffffff"
            fillOpacity="0.5"
            fillRule="evenodd"
            d="M 2523 526 2523 526 Z M 2519 525 2518 526 2519 525 Z M 2523 524 2523 524 Z M 2523 525 2521 529 2522 524 Z M 2516 520 2516 520 Z M 2515 522 2515 520 2515 522 Z M 2513 520 2514 519 2513 520 Z M 2514 518 2513 517 2514 518 Z M 2513 517 2514 516 2513 517 Z M 2499 513 2499 512 Z M 2503 512 2503 512 Z M 2501 513 2501 511 2502 513 Z M 2508 509 2507 510 2508 509 Z M 2496 509 2496 509 Z M 2502 507 2505 511 2507 511 2503 512 2501 510 2502 506 Z M 2512 497 2512 497 Z M 2509 496 2509 496 Z M 2510 497 2510 493 2509 494 2505 494 2504 497 2507 496 2510 500 2509 501 2511 502 2511 506 2510 505 2509 508 2508 505 2507 508 2506 506 2505 509 2503 505 2501 505 2501 507 2498 508 2500 508 2499 509 2496 508 2497 503 2494 500 2494 496 2496 494 2494 490 2491 487 2489 487 2489 485 2491 485 2490 480 2492 479 2489 476 2487 476 2486 473 2489 470 2495 473 2500 470 2508 470 2507 473 2509 479 2513 477 2516 478 2516 476 2520 476 2524 478 2524 482 2529 479 2533 479 2538 483 2537 487 2534 487 2539 492 2538 493 2541 493 2536 501 2538 507 2535 506 2532 508 2532 512 2530 514 2528 521 2525 520 2523 522 2523 520 2519 520 2515 517 2513 513 2517 510 2515 505 2517 501 2515 499 2514 500 2515 492 2519 487 2517 486 2516 488 2514 488 2515 489 2512 492 2512 497 Z"
          />
          <path
            className={styles['sop-interactive']}
            id={REGION_COORDINATES[7].id}
            onClick={handleClick}
            style={getRegionStyle(REGION_COORDINATES[7].id)}
            data-has-festival={
              getRegionStyle(REGION_COORDINATES[7].id).pointerEvents ===
              'visiblePainted'
                ? 'true'
                : 'false'
            }
            stroke="#666666"
            strokeOpacity="1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#ffffff"
            fillOpacity="0.5"
            fillRule="evenodd"
            d="M 2484 384 2487 390 2489 388 2494 392 2500 392 2503 397 2505 408 2507 410 2508 409 2509 412 2513 414 2515 413 2519 416 2519 418 2523 422 2523 425 2526 424 2524 429 2528 432 2518 432 2517 437 2510 438 2505 443 2501 451 2499 452 2494 449 2492 452 2492 456 2488 454 2489 450 2485 450 2485 448 2479 455 2478 454 2477 456 2469 457 2464 453 2462 449 2457 448 2453 444 2452 435 2454 436 2461 429 2460 426 2461 423 2464 421 2463 418 2465 414 2468 411 2467 408 2469 408 2470 404 2474 402 2473 399 2476 397 2475 391 2480 385 2480 383 2484 380 Z"
          />
          <path
            className={styles['sop-interactive']}
            id={REGION_COORDINATES[8].id}
            onClick={handleClick}
            style={getRegionStyle(REGION_COORDINATES[8].id)}
            data-has-festival={
              getRegionStyle(REGION_COORDINATES[8].id).pointerEvents ===
              'visiblePainted'
                ? 'true'
                : 'false'
            }
            stroke="#666666"
            strokeOpacity="1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#ffffff"
            fillOpacity="0.5"
            fillRule="evenodd"
            d="M 2695 392 2703 394 2706 402 2713 408 2720 407 2720 409 2724 413 2719 419 2720 422 2716 426 2712 423 2707 422 2709 425 2705 435 2698 439 2696 438 2694 443 2688 443 2682 438 2679 430 2677 430 2670 424 2663 422 2663 417 2666 414 2666 412 2669 413 2671 411 2668 408 2670 405 2675 404 2679 401 2679 397 2677 394 2681 392 2683 388 2694 388 Z"
          />
          <path
            className={styles['sop-interactive']}
            id={REGION_COORDINATES[9].id}
            onClick={handleClick}
            style={getRegionStyle(REGION_COORDINATES[9].id)}
            data-has-festival={
              getRegionStyle(REGION_COORDINATES[9].id).pointerEvents ===
              'visiblePainted'
                ? 'true'
                : 'false'
            }
            stroke="#666666"
            strokeOpacity="1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#ffffff"
            fillOpacity="0.5"
            fillRule="evenodd"
            d="M 2565 394 2567 393 2569 395 2573 395 2574 392 2582 397 2582 401 2577 403 2574 406 2574 408 2578 412 2582 413 2585 418 2582 421 2583 424 2581 426 2578 425 2575 427 2578 430 2577 432 2572 431 2566 425 2563 426 2564 433 2560 435 2559 440 2561 442 2557 445 2556 448 2550 449 2546 446 2543 449 2539 443 2539 433 2535 428 2528 432 2524 430 2524 426 2526 425 2522 424 2528 421 2530 423 2531 420 2540 418 2540 413 2543 410 2544 405 2546 403 2544 403 2543 401 2548 397 2554 396 2555 393 2560 392 Z"
          />
          <path
            className={styles['sop-interactive']}
            id={REGION_COORDINATES[10].id}
            onClick={handleClick}
            style={getRegionStyle(REGION_COORDINATES[10].id)}
            data-has-festival={
              getRegionStyle(REGION_COORDINATES[10].id).pointerEvents ===
              'visiblePainted'
                ? 'true'
                : 'false'
            }
            stroke="#666666"
            strokeOpacity="1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#ffffff"
            fillOpacity="0.5"
            fillRule="evenodd"
            d="M 2539 433 2539 443 2543 449 2546 446 2549 449 2560 449 2562 455 2564 455 2566 459 2570 458 2573 461 2571 474 2566 477 2556 475 2546 479 2541 484 2541 486 2545 488 2541 493 2539 493 2534 487 2538 486 2534 479 2530 479 2524 482 2524 478 2516 476 2516 478 2513 477 2509 480 2507 473 2508 470 2497 471 2496 467 2489 462 2488 458 2489 455 2492 456 2492 452 2494 450 2498 452 2502 451 2503 446 2505 446 2505 442 2507 442 2511 438 2515 438 2519 432 2529 432 2535 428 Z"
          />
          <path
            className={styles['sop-interactive']}
            id={REGION_COORDINATES[11].id}
            onClick={handleClick}
            style={getRegionStyle(REGION_COORDINATES[11].id)}
            data-has-festival={
              getRegionStyle(REGION_COORDINATES[11].id).pointerEvents ===
              'visiblePainted'
                ? 'true'
                : 'false'
            }
            stroke="#666666"
            strokeOpacity="1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#ffffff"
            fillOpacity="0.5"
            fillRule="evenodd"
            d="M 2600 357 2602 362 2602 368 2606 371 2606 373 2608 373 2611 377 2612 376 2612 387 2610 387 2612 393 2609 395 2609 401 2611 405 2616 407 2618 405 2620 409 2622 409 2623 417 2621 419 2623 421 2621 423 2619 423 2614 418 2610 421 2603 421 2598 417 2596 417 2592 421 2588 421 2582 413 2576 411 2574 408 2574 406 2577 403 2579 403 2582 400 2582 398 2579 394 2571 390 2569 385 2571 377 2569 373 2571 371 2574 372 2577 370 2581 370 2583 368 2584 369 2587 365 2597 365 2597 357 2600 355 2601 357 Z"
          />
          <path
            className={styles['sop-interactive']}
            id={REGION_COORDINATES[12].id}
            onClick={handleClick}
            style={getRegionStyle(REGION_COORDINATES[12].id)}
            data-has-festival={
              getRegionStyle(REGION_COORDINATES[12].id).pointerEvents ===
              'visiblePainted'
                ? 'true'
                : 'false'
            }
            stroke="#666666"
            strokeOpacity="1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#ffffff"
            fillOpacity="0.5"
            fillRule="evenodd"
            d="M 2627 490 2628 491 2627 490 Z M 2610 491 2609 490 2610 491 Z M 2645 489 2646 490 2645 489 Z M 2645 489 2645 489 Z M 2622 489 2621 489 Z M 2610 489 2610 489 Z M 2634 489 2634 489 Z M 2611 489 2611 489 Z M 2609 492 2607 492 2604 488 2607 488 Z M 2596 488 2596 488 Z M 2608 488 2606 488 2608 488 Z M 2632 486 2631 487 2632 486 Z M 2595 487 2595 485 2595 487 Z M 2634 485 2635 486 2634 485 Z M 2605 486 2605 486 Z M 2590 484 2590 484 Z M 2637 485 2636 484 2637 485 Z M 2596 484 2595 483 2596 484 Z M 2636 483 2636 483 Z M 2599 483 2599 483 Z M 2601 482 2600 482 Z M 2626 480 2625 483 2622 481 Z M 2624 477 2623 478 2624 477 Z M 2611 464 2612 465 2611 464 Z M 2642 490 2639 484 2635 482 2635 480 2630 481 2630 479 2631 480 2633 478 2630 471 2628 472 2627 477 2625 474 2623 474 2623 471 2619 471 2619 474 2616 473 2617 472 2613 466 2612 461 2620 455 2618 457 2613 458 2609 461 2610 463 2608 463 2612 467 2611 468 2614 473 2610 475 2615 475 2612 478 2615 477 2615 481 2620 485 2615 487 2620 488 2618 490 2611 492 2610 491 2612 489 2608 489 2608 485 2609 486 2612 483 2605 483 2603 479 2600 482 2596 480 2594 480 2594 482 2588 481 2587 482 2593 487 2592 486 2590 488 2586 488 2584 492 2583 484 2578 485 2575 480 2571 480 2570 475 2572 473 2573 462 2579 459 2579 464 2586 468 2589 463 2593 463 2595 460 2592 456 2592 450 2595 444 2603 446 2603 444 2604 445 2606 443 2609 445 2612 444 2609 438 2611 436 2609 435 2607 426 2609 426 2609 423 2613 418 2620 423 2629 421 2643 429 2639 431 2638 435 2635 432 2635 436 2630 437 2633 440 2635 449 2637 451 2636 456 2641 460 2640 467 2643 466 2649 469 2651 473 2657 476 2658 479 2654 482 2654 484 2648 486 2648 478 2647 481 2644 482 2647 483 2645 489 Z"
          />
          <path
            className={styles['sop-interactive']}
            id={REGION_COORDINATES[13].id}
            onClick={handleClick}
            style={getRegionStyle(REGION_COORDINATES[13].id)}
            data-has-festival={
              getRegionStyle(REGION_COORDINATES[13].id).pointerEvents ===
              'visiblePainted'
                ? 'true'
                : 'false'
            }
            stroke="#666666"
            strokeOpacity="1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#ffffff"
            fillOpacity="0.5"
            fillRule="evenodd"
            d="M 2640 603 2640 603 Z M 2586 603 2588 601 2588 603 Z M 2570 598 2571 599 2570 598 Z M 2570 598 2571 597 2570 598 Z M 2542 596 2540 600 2542 596 Z M 2571 596 2571 596 Z M 2565 586 2567 586 2565 586 Z M 2563 586 2564 587 2563 586 Z M 2606 586 2606 584 2608 583 Z M 2593 581 2592 580 2593 581 Z M 2556 581 2558 585 2561 582 2559 586 2556 585 2551 588 2551 583 2549 584 2548 582 2550 582 2550 579 Z M 2572 579 2575 582 2576 580 2577 581 2572 582 2570 581 Z M 2610 583 2609 582 2612 579 2613 580 Z M 2555 577 2555 577 Z M 2611 577 2612 578 2611 577 Z M 2569 577 2571 577 2569 577 Z M 2565 578 2565 578 Z M 2554 576 2552 576 2554 576 Z M 2556 576 2556 576 Z M 2563 576 2562 575 2563 576 Z M 2558 575 2558 575 Z M 2548 574 2548 574 Z M 2548 573 2547 574 2548 573 Z M 2554 575 2550 575 2554 573 Z M 2556 573 2556 573 Z M 2613 572 2611 572 2613 572 Z M 2560 571 2558 572 2560 571 Z M 2580 570 2579 569 2580 570 Z M 2606 569 2605 568 2606 569 Z M 2608 567 2608 567 Z M 2544 568 2543 572 2544 571 2538 569 2540 566 Z M 2579 567 2579 567 Z M 2607 565 2608 564 2609 567 Z M 2585 564 2584 561 2585 564 Z M 2604 561 2601 562 2604 561 Z M 2588 567 2591 564 2591 568 Z M 2580 560 2580 562 2580 560 Z M 2577 560 2578 561 2577 560 Z M 2600 560 2595 561 2591 559 2597 558 Z M 2583 559 2580 558 2583 559 Z M 2581 557 2581 557 Z M 2580 556 2580 558 2579 556 Z M 2583 559 2584 556 2583 559 Z M 2603 556 2603 556 Z M 2562 559 2559 556 2562 556 Z M 2578 555 2578 555 Z M 2608 555 2607 558 2599 554 2603 554 2603 556 Z M 2576 552 2576 552 Z M 2591 552 2591 552 Z M 2575 552 2572 551 2574 551 Z M 2573 550 2573 550 Z M 2601 548 2599 548 2601 548 Z M 2598 546 2598 550 2598 546 Z M 2554 546 2554 546 Z M 2590 545 2590 545 Z M 2572 544 2572 544 Z M 2597 545 2596 544 2597 545 Z M 2572 544 2573 544 Z M 2590 544 2590 544 Z M 2593 544 2595 544 2596 551 2599 551 2596 556 2592 555 2591 546 2592 549 2591 544 2594 543 Z M 2540 543 2540 543 Z M 2570 544 2571 542 2572 544 Z M 2532 540 2534 540 2532 542 2530 540 2532 539 Z M 2565 540 2565 540 Z M 2537 540 2536 539 2537 540 Z M 2551 541 2553 541 2552 542 2556 543 2552 545 2551 548 2544 544 2544 542 2546 543 2547 539 2551 539 Z M 2572 538 2572 540 2577 543 2577 541 2578 542 2581 539 2587 541 2587 545 2585 545 2585 547 2587 547 2584 555 2580 555 2578 549 2573 548 2575 546 2576 547 2575 543 2572 541 2568 543 2569 539 2570 540 2570 538 2571 539 Z M 2572 536 2572 536 Z M 2574 536 2574 536 Z M 2570 536 2569 535 2570 536 Z M 2549 537 2544 538 2542 542 2540 540 2541 539 2538 536 2544 534 Z M 2571 532 2570 533 2571 532 Z M 2592 533 2591 532 2592 533 Z M 2568 532 2568 532 Z M 2584 527 2583 526 2584 527 Z M 2595 522 2594 521 2595 522 Z M 2592 521 2592 524 2592 521 Z M 2566 520 2565 521 2566 520 Z M 2567 520 2568 519 2567 520 Z M 2586 520 2586 520 Z M 2595 519 2595 517 2595 519 Z M 2585 516 2585 516 Z M 2595 513 2595 510 2595 513 Z M 2587 510 2584 513 2586 519 2584 519 2585 522 2583 522 2583 531 2586 529 2585 528 2587 528 2588 522 2590 524 2589 525 2593 527 2590 531 2589 537 2584 537 2579 541 2577 539 2578 538 2574 536 2578 533 2583 534 2582 532 2578 533 2575 527 2576 528 2574 528 2574 532 2572 532 2567 528 2565 530 2561 525 2563 523 2571 524 2570 517 2576 515 2579 510 Z"
          ></path>
          <path
            className={styles['sop-interactive']}
            id={REGION_COORDINATES[14].id}
            onClick={handleClick}
            style={getRegionStyle(REGION_COORDINATES[14].id)}
            data-has-festival={
              getRegionStyle(REGION_COORDINATES[14].id).pointerEvents ===
              'visiblePainted'
                ? 'true'
                : 'false'
            }
            stroke="#666666"
            strokeOpacity="1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#ffffff"
            fillOpacity="0.5"
            fillRule="evenodd"
            d="M 2479 520 2477 520 2479 520 Z M 2480 521 2479 520 2480 521 Z M 2479 519 2479 519 Z M 2478 517 2478 517 Z M 2479 520 2477 519 2478 517 Z M 2469 518 2468 517 2469 518 Z M 2494 511 2493 511 Z M 2493 511 2493 511 Z M 2494 509 2493 509 Z M 2494 508 2494 508 Z M 2450 434 2452 436 2453 444 2457 448 2462 449 2468 457 2480 455 2484 448 2488 450 2489 461 2492 465 2494 465 2497 468 2495 473 2490 470 2486 473 2487 476 2492 478 2490 481 2492 483 2490 484 2491 485 2489 485 2489 487 2491 487 2496 494 2494 496 2493 502 2494 507 2491 508 2492 511 2485 516 2481 516 2480 513 2478 513 2479 514 2473 518 2472 521 2467 511 2465 511 2469 507 2470 503 2467 494 2463 492 2461 488 2454 482 2451 473 2440 464 2439 448 2435 445 2432 440 2432 438 2440 432 2442 434 Z M 2471 519 2473 519 2472 517 Z M 2472 519 2473 520 2472 519 Z"
          ></path>
          <path
            className={styles['sop-interactive']}
            id={REGION_COORDINATES[15].id}
            onClick={handleClick}
            style={getRegionStyle(REGION_COORDINATES[15].id)}
            data-has-festival={
              getRegionStyle(REGION_COORDINATES[15].id).pointerEvents ===
              'visiblePainted'
                ? 'true'
                : 'false'
            }
            stroke="#666666"
            strokeOpacity="1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#ffffff"
            fillOpacity="0.5"
            fillRule="evenodd"
            d="M 2610 422 2610 424 2607 427 2609 430 2609 435 2611 437 2611 443 2613 444 2609 445 2607 443 2603 446 2595 444 2595 446 2592 449 2592 455 2595 459 2592 463 2587 464 2585 468 2579 464 2580 461 2578 459 2574 462 2570 458 2566 459 2565 456 2562 455 2560 451 2561 450 2557 448 2558 444 2561 442 2559 440 2560 435 2564 433 2564 425 2566 425 2572 431 2577 432 2578 431 2575 428 2576 426 2583 425 2584 424 2582 422 2585 418 2588 421 2592 421 2598 416 2603 421 Z"
          ></path>
          <path
            className={styles['sop-interactive']}
            id={REGION_COORDINATES[16].id}
            onClick={handleClick}
            style={getRegionStyle(REGION_COORDINATES[16].id)}
            data-has-festival={
              getRegionStyle(REGION_COORDINATES[16].id).pointerEvents ===
              'visiblePainted'
                ? 'true'
                : 'false'
            }
            stroke="#666666"
            strokeOpacity="1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#ffffff"
            fillOpacity="0.5"
            fillRule="evenodd"
            d="M 2456 342 2459 348 2461 348 2464 345 2465 348 2469 352 2470 351 2476 359 2478 359 2478 361 2482 362 2484 359 2486 360 2486 366 2484 368 2485 369 2478 378 2481 379 2482 382 2475 391 2476 396 2473 398 2474 402 2469 405 2470 408 2467 409 2468 410 2463 419 2464 421 2461 424 2461 428 2454 436 2451 434 2448 435 2446 433 2442 434 2440 432 2441 431 2438 425 2447 415 2450 408 2446 406 2445 407 2443 405 2443 401 2446 398 2441 391 2442 388 2438 388 2434 384 2438 378 2439 373 2442 370 2443 371 2440 363 2442 362 2441 361 2448 347 2447 339 2449 337 Z"
          ></path>
          <path
            className={styles['sop-interactive']}
            id={REGION_COORDINATES[17].id}
            onClick={handleClick}
            style={getRegionStyle(REGION_COORDINATES[17].id)}
            data-has-festival={
              getRegionStyle(REGION_COORDINATES[17].id).pointerEvents ===
              'visiblePainted'
                ? 'true'
                : 'false'
            }
            stroke="#666666"
            strokeOpacity="1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#ffffff"
            fillOpacity="0.5"
            fillRule="evenodd"
            d="M 2529 326 2529 332 2531 334 2536 335 2536 339 2538 339 2541 342 2543 347 2543 355 2537 358 2535 362 2540 361 2545 365 2549 365 2550 362 2554 365 2557 362 2570 364 2572 371 2569 373 2571 377 2571 381 2569 384 2571 389 2575 392 2573 392 2572 395 2559 392 2554 394 2553 397 2544 399 2543 400 2546 404 2544 404 2543 410 2540 413 2541 418 2530 420 2531 423 2528 421 2525 424 2522 423 2523 422 2517 414 2513 414 2505 408 2503 397 2499 390 2499 386 2504 382 2504 374 2507 372 2507 367 2515 360 2518 356 2520 358 2524 356 2524 354 2520 352 2520 348 2515 341 2516 336 2513 334 2517 329 2518 330 2524 324 Z"
          ></path>
        </g>
      </svg>
      {openModal && selectedRegion && (
        <FestivalModal
          setOpenModal={setOpenModal}
          selectedFestival={selectedFestival}
          selectedRegion={selectedRegion}
          regionCoordinates={REGION_COORDINATES}
        />
      )}
    </div>
  );
}
