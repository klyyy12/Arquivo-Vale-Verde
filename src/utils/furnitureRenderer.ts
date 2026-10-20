/**
 * ARQUIVO VALE VERDE (1983)
 * Retro Vector Furniture & Interior Renderer
 * Renders recognizable 1983 terminal wireframe furniture with strict adherence
 * to the green phosphor and black/green aesthetic.
 */

import { FurnitureItem } from '../data/furniture';

export function renderFurnitureItem(
  ctx: CanvasRenderingContext2D,
  f: FurnitureItem,
  tick: number
) {
  ctx.save();

  switch (f.type) {
    case 'CARPET': {
      // Non-solid floor carpet / rug
      ctx.fillStyle = '#061c0a';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#185022';
      ctx.lineWidth = 1;
      ctx.strokeRect(f.x + 3, f.y + 3, f.w - 6, f.h - 6);

      // Fringe lines along ends
      ctx.setLineDash([2, 3]);
      ctx.beginPath();
      ctx.moveTo(f.x, f.y);
      ctx.lineTo(f.x, f.y + f.h);
      ctx.moveTo(f.x + f.w, f.y);
      ctx.lineTo(f.x + f.w, f.y + f.h);
      ctx.stroke();
      ctx.setLineDash([]);
      break;
    }

    case 'BED': {
      // Bed base
      const isDisarray = f.state === 'DISARRAY';
      const isCovered = f.state === 'COVERED';

      ctx.fillStyle = isCovered ? '#082610' : '#061d09';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Pillow at head
      const pillowH = Math.min(12, f.h * 0.25);
      ctx.fillStyle = '#103816';
      ctx.fillRect(f.x + 3, f.y + 3, f.w - 6, pillowH);
      ctx.strokeStyle = '#55FF6A';
      ctx.lineWidth = 1;
      ctx.strokeRect(f.x + 3, f.y + 3, f.w - 6, pillowH);

      // Blanket
      if (isDisarray) {
        // Wrinkled / messy sheet
        ctx.strokeStyle = '#478C50';
        ctx.beginPath();
        ctx.moveTo(f.x + 4, f.y + f.h * 0.4);
        ctx.lineTo(f.x + f.w * 0.4, f.y + f.h * 0.55);
        ctx.lineTo(f.x + f.w * 0.7, f.y + f.h * 0.35);
        ctx.lineTo(f.x + f.w - 4, f.y + f.h * 0.6);
        ctx.stroke();
      } else if (isCovered) {
        // Ghost sheet over whole bed
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(f.x + 2, f.y + 2);
        ctx.lineTo(f.x + f.w - 2, f.y + f.h - 2);
        ctx.moveTo(f.x + f.w - 2, f.y + 2);
        ctx.lineTo(f.x + 2, f.y + f.h - 2);
        ctx.stroke();
        ctx.setLineDash([]);
      } else {
        // Neat folded sheet line
        ctx.strokeStyle = '#55FF6A';
        ctx.beginPath();
        ctx.moveTo(f.x + 2, f.y + f.h * 0.42);
        ctx.lineTo(f.x + f.w - 2, f.y + f.h * 0.42);
        ctx.stroke();
      }
      break;
    }

    case 'SOFA': {
      const isHorizontal = f.w >= f.h;
      ctx.fillStyle = '#061c0a';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      if (isHorizontal) {
        // Backrest along top edge
        ctx.fillStyle = '#0c3012';
        ctx.fillRect(f.x, f.y, f.w, Math.max(6, f.h * 0.3));
        ctx.strokeRect(f.x, f.y, f.w, Math.max(6, f.h * 0.3));

        // Armrests at left and right
        const armW = Math.max(5, f.w * 0.15);
        ctx.strokeRect(f.x, f.y, armW, f.h);
        ctx.strokeRect(f.x + f.w - armW, f.y, armW, f.h);

        // Center cushion split line
        ctx.beginPath();
        ctx.moveTo(f.x + f.w / 2, f.y + f.h * 0.3);
        ctx.lineTo(f.x + f.w / 2, f.y + f.h);
        ctx.stroke();
      } else {
        // Backrest along left edge
        ctx.fillStyle = '#0c3012';
        ctx.fillRect(f.x, f.y, Math.max(6, f.w * 0.3), f.h);
        ctx.strokeRect(f.x, f.y, Math.max(6, f.w * 0.3), f.h);

        // Armrests at top and bottom
        const armH = Math.max(5, f.h * 0.15);
        ctx.strokeRect(f.x, f.y, f.w, armH);
        ctx.strokeRect(f.x, f.y + f.h - armH, f.w, armH);

        // Center cushion split line
        ctx.beginPath();
        ctx.moveTo(f.x + f.w * 0.3, f.y + f.h / 2);
        ctx.lineTo(f.x + f.w, f.y + f.h / 2);
        ctx.stroke();
      }

      if (f.state === 'COVERED') {
        // White protective sheet covering
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.setLineDash([3, 3]);
        ctx.strokeRect(f.x - 2, f.y - 2, f.w + 4, f.h + 4);
        ctx.setLineDash([]);
      }
      break;
    }

    case 'DINING_TABLE':
    case 'MEETING_TABLE': {
      ctx.fillStyle = '#08250f';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 2;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Inset bevel
      ctx.strokeStyle = '#185022';
      ctx.lineWidth = 1;
      ctx.strokeRect(f.x + 3, f.y + 3, f.w - 6, f.h - 6);

      // Meeting table documents or wood plank marks
      if (f.w > 70) {
        ctx.strokeStyle = '#478C50';
        for (let tx = f.x + 20; tx < f.x + f.w - 15; tx += 30) {
          ctx.strokeRect(tx, f.y + f.h / 2 - 4, 12, 8); // Folders / note pads on table
        }
      }
      break;
    }

    case 'CHAIR': {
      ctx.fillStyle = '#07240c';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Backrest indicator
      ctx.fillStyle = '#103816';
      ctx.fillRect(f.x + 2, f.y + 2, f.w - 4, 4);
      break;
    }

    case 'FRIDGE': {
      ctx.fillStyle = '#092a11';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#55FF6A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Split between freezer and lower fridge
      const splitY = f.y + f.h * 0.35;
      ctx.beginPath();
      ctx.moveTo(f.x, splitY);
      ctx.lineTo(f.x + f.w, splitY);
      ctx.stroke();

      // Handles
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(f.x + f.w - 4, f.y + 6, 2, 8);
      ctx.fillRect(f.x + f.w - 4, splitY + 6, 2, 10);
      break;
    }

    case 'STOVE': {
      ctx.fillStyle = '#07220e';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // 4 burner rings
      const bRad = Math.min(3, f.w * 0.12);
      const bX1 = f.x + f.w * 0.3;
      const bX2 = f.x + f.w * 0.7;
      const bY1 = f.y + f.h * 0.3;
      const bY2 = f.y + f.h * 0.7;

      ctx.strokeStyle = '#55FF6A';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(bX1, bY1, bRad, 0, Math.PI * 2);
      ctx.arc(bX2, bY1, bRad, 0, Math.PI * 2);
      ctx.arc(bX1, bY2, bRad, 0, Math.PI * 2);
      ctx.arc(bX2, bY2, bRad, 0, Math.PI * 2);
      ctx.stroke();

      // Front knobs
      ctx.fillStyle = '#478C50';
      for (let k = 0; k < 4; k++) {
        ctx.fillRect(f.x + 3 + k * (f.w / 4), f.y + f.h - 3, 2, 2);
      }
      break;
    }

    case 'SINK': {
      ctx.fillStyle = '#08250f';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Basin inner cutout
      const basinX = f.x + 4;
      const basinY = f.y + 4;
      const basinW = f.w - 8;
      const basinH = f.h - 8;

      ctx.fillStyle = '#031206';
      ctx.fillRect(basinX, basinY, basinW, basinH);
      ctx.strokeStyle = '#185022';
      ctx.strokeRect(basinX, basinY, basinW, basinH);

      // Drain hole
      ctx.fillStyle = '#26E85A';
      ctx.beginPath();
      ctx.arc(basinX + basinW / 2, basinY + basinH / 2, 2, 0, Math.PI * 2);
      ctx.fill();

      // Faucet
      ctx.strokeStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(basinX + basinW / 2, basinY + 2);
      ctx.lineTo(basinX + basinW / 2, basinY + 6);
      ctx.stroke();
      break;
    }

    case 'BOOKSHELF':
    case 'STORE_SHELF':
    case 'MED_SHELF': {
      ctx.fillStyle = '#07240c';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      const isHorizontal = f.w >= f.h;
      ctx.strokeStyle = '#478C50';
      ctx.lineWidth = 1;

      if (isHorizontal) {
        // Shelf dividers and vertical book lines
        for (let bx = f.x + 6; bx < f.x + f.w - 4; bx += 8) {
          ctx.beginPath();
          ctx.moveTo(bx, f.y + 2);
          ctx.lineTo(bx, f.y + f.h - 2);
          ctx.stroke();
        }
      } else {
        // Shelves along height
        for (let by = f.y + 12; by < f.y + f.h - 8; by += 14) {
          ctx.beginPath();
          ctx.moveTo(f.x + 2, by);
          ctx.lineTo(f.x + f.w - 2, by);
          ctx.stroke();
        }
      }
      break;
    }

    case 'WARDROBE': {
      ctx.fillStyle = '#08250f';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Center split doors
      ctx.strokeStyle = '#185022';
      ctx.beginPath();
      ctx.moveTo(f.x + f.w / 2, f.y + 2);
      ctx.lineTo(f.x + f.w / 2, f.y + f.h - 2);
      ctx.stroke();

      // 2 handles
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(f.x + f.w / 2 - 4, f.y + f.h / 2 - 3, 2, 6);
      ctx.fillRect(f.x + f.w / 2 + 2, f.y + f.h / 2 - 3, 2, 6);
      break;
    }

    case 'OLD_TV': {
      // Wood/Plastic cabinet
      ctx.fillStyle = '#08240f';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // CRT curved screen
      const scrW = Math.max(10, f.w - 8);
      const scrH = f.h - 6;
      ctx.fillStyle = '#020b04';
      ctx.fillRect(f.x + 3, f.y + 3, scrW, scrH);
      ctx.strokeStyle = '#55FF6A';
      ctx.lineWidth = 1;
      ctx.strokeRect(f.x + 3, f.y + 3, scrW, scrH);

      // Rotary channel dial on right
      ctx.fillStyle = '#FFB000';
      ctx.fillRect(f.x + f.w - 4, f.y + 4, 2, 3);
      ctx.fillRect(f.x + f.w - 4, f.y + 9, 2, 3);

      // Antennas sticking out
      ctx.strokeStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(f.x + f.w / 2, f.y);
      ctx.lineTo(f.x + f.w / 2 - 6, f.y - 8);
      ctx.moveTo(f.x + f.w / 2, f.y);
      ctx.lineTo(f.x + f.w / 2 + 6, f.y - 8);
      ctx.stroke();

      if (f.state === 'DISARRAY') {
        // Cracked screen lines
        ctx.strokeStyle = '#FF3B4D';
        ctx.beginPath();
        ctx.moveTo(f.x + 4, f.y + 4);
        ctx.lineTo(f.x + scrW * 0.7, f.y + scrH * 0.8);
        ctx.lineTo(f.x + scrW, f.y + 5);
        ctx.stroke();
      }
      break;
    }

    case 'RADIO': {
      ctx.fillStyle = '#0a2e12';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Tuning dial band
      ctx.fillStyle = '#020e05';
      ctx.fillRect(f.x + 2, f.y + 2, f.w - 4, 4);
      ctx.fillStyle = '#FFB000';
      ctx.fillRect(f.x + 5, f.y + 2, 2, 4); // Tuning needle

      // Speaker grille lines
      ctx.strokeStyle = '#478C50';
      for (let gy = f.y + 8; gy < f.y + f.h - 2; gy += 3) {
        ctx.beginPath();
        ctx.moveTo(f.x + 4, gy);
        ctx.lineTo(f.x + f.w - 4, gy);
        ctx.stroke();
      }
      break;
    }

    case 'LAMP_TABLE':
    case 'NIGHTSTAND': {
      ctx.fillStyle = '#092911';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Small amber/green light halo
      ctx.fillStyle = 'rgba(255, 176, 0, 0.12)';
      ctx.beginPath();
      ctx.arc(f.x + f.w / 2, f.y + f.h / 2, 14, 0, Math.PI * 2);
      ctx.fill();

      // Lamp shade dot
      ctx.fillStyle = '#FFB000';
      ctx.beginPath();
      ctx.arc(f.x + f.w / 2, f.y + f.h / 2, 3, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'PLANT': {
      // Pot
      ctx.fillStyle = '#0e3816';
      ctx.fillRect(f.x + 3, f.y + f.h - 6, f.w - 6, 6);
      ctx.strokeStyle = '#26E85A';
      ctx.strokeRect(f.x + 3, f.y + f.h - 6, f.w - 6, 6);

      // Radiating vector foliage
      const cx = f.x + f.w / 2;
      const cy = f.y + f.h / 2;
      ctx.strokeStyle = '#55FF6A';
      ctx.lineWidth = 1.2;
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 3) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * (f.w / 2), cy + Math.sin(a) * (f.h / 2));
        ctx.stroke();
      }
      break;
    }

    case 'BOXES': {
      ctx.fillStyle = '#0a2a11';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Packing tape cross [X] or seam line
      ctx.strokeStyle = '#FFB000';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(f.x + 2, f.y + f.h / 2);
      ctx.lineTo(f.x + f.w - 2, f.y + f.h / 2);
      ctx.stroke();

      if (f.w > 20 && f.h > 20) {
        ctx.beginPath();
        ctx.moveTo(f.x + f.w / 2, f.y + 2);
        ctx.lineTo(f.x + f.w / 2, f.y + f.h - 2);
        ctx.stroke();
      }
      break;
    }

    case 'COUNTER': {
      ctx.fillStyle = '#082810';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 2;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Wooden rim
      ctx.strokeStyle = '#55FF6A';
      ctx.lineWidth = 1;
      if (f.w >= f.h) {
        ctx.strokeRect(f.x + 2, f.y + 2, f.w - 4, 4);
      } else {
        ctx.strokeRect(f.x + 2, f.y + 2, 4, f.h - 4);
      }
      break;
    }

    case 'WAITING_CHAIRS': {
      // Row of connected clinic chairs
      ctx.fillStyle = '#061a09';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#185022';
      ctx.lineWidth = 1;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      const isVertical = f.h > f.w;
      ctx.fillStyle = '#0e3816';
      ctx.strokeStyle = '#26E85A';

      if (isVertical) {
        const count = Math.max(2, Math.floor(f.h / 24));
        const segH = f.h / count;
        for (let i = 0; i < count; i++) {
          const cy = f.y + i * segH + 2;
          ctx.fillRect(f.x + 3, cy, f.w - 6, segH - 4);
          ctx.strokeRect(f.x + 3, cy, f.w - 6, segH - 4);
        }
      } else {
        const count = Math.max(2, Math.floor(f.w / 24));
        const segW = f.w / count;
        for (let i = 0; i < count; i++) {
          const cx = f.x + i * segW + 2;
          ctx.fillRect(cx, f.y + 3, segW - 4, f.h - 6);
          ctx.strokeRect(cx, f.y + 3, segW - 4, f.h - 6);
        }
      }
      break;
    }

    case 'DESK': {
      ctx.fillStyle = '#08250f';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Desk blotter / pad
      ctx.fillStyle = '#041508';
      ctx.fillRect(f.x + f.w * 0.25, f.y + 4, f.w * 0.5, f.h - 8);
      ctx.strokeStyle = '#478C50';
      ctx.strokeRect(f.x + f.w * 0.25, f.y + 4, f.w * 0.5, f.h - 8);

      // Side drawers
      ctx.strokeStyle = '#185022';
      ctx.strokeRect(f.x + 3, f.y + 4, f.w * 0.2, f.h - 8);
      break;
    }

    case 'STRETCHER': {
      // Hospital stretcher with wheels and white sheet
      ctx.fillStyle = '#07200d';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Pillow / headrest
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(f.x + 4, f.y + 4, f.w - 8, 12);

      // Green medical cross on sheet
      ctx.fillStyle = '#55FF6A';
      const mcx = f.x + f.w / 2;
      const mcy = f.y + f.h * 0.5;
      ctx.fillRect(mcx - 2, mcy - 6, 4, 12);
      ctx.fillRect(mcx - 6, mcy - 2, 12, 4);

      // Corner wheels
      ctx.fillStyle = '#26E85A';
      ctx.fillRect(f.x - 2, f.y - 2, 3, 3);
      ctx.fillRect(f.x + f.w - 1, f.y - 2, 3, 3);
      ctx.fillRect(f.x - 2, f.y + f.h - 1, 3, 3);
      ctx.fillRect(f.x + f.w - 1, f.y + f.h - 1, 3, 3);
      break;
    }

    case 'MED_CABINET': {
      ctx.fillStyle = '#07240d';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#55FF6A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Red / Green medical cross symbol
      ctx.fillStyle = '#55FF6A';
      const cx = f.x + f.w / 2;
      const cy = f.y + f.h / 2;
      ctx.fillRect(cx - 2, cy - 6, 4, 12);
      ctx.fillRect(cx - 6, cy - 2, 12, 4);
      break;
    }

    case 'FILE_CABINET': {
      ctx.fillStyle = '#08250f';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Drawer divisions and handles
      const numDrawers = Math.max(2, Math.floor(f.h / 14));
      const dH = f.h / numDrawers;
      ctx.strokeStyle = '#185022';
      ctx.fillStyle = '#FFFFFF';

      for (let i = 0; i < numDrawers; i++) {
        const dy = f.y + i * dH;
        ctx.strokeRect(f.x + 2, dy + 1, f.w - 4, dH - 2);
        // Handle bar
        ctx.fillRect(f.x + f.w / 2 - 4, dy + dH / 2 - 1, 8, 2);
      }
      break;
    }

    case 'SCALE': {
      // Mechanical clinic scale
      ctx.fillStyle = '#0e3816';
      ctx.fillRect(f.x + 2, f.y + f.h - 6, f.w - 4, 6); // Base platform
      ctx.strokeStyle = '#26E85A';
      ctx.strokeRect(f.x + 2, f.y + f.h - 6, f.w - 4, 6);

      // Center column
      ctx.fillStyle = '#26E85A';
      ctx.fillRect(f.x + f.w / 2 - 2, f.y + 4, 4, f.h - 10);

      // Balance beam top
      ctx.fillStyle = '#FFB000';
      ctx.fillRect(f.x + 2, f.y + 2, f.w - 4, 4);
      break;
    }

    case 'HEALTH_POSTER':
    case 'BLACKBOARD': {
      // Wall poster / blackboard
      ctx.fillStyle = f.type === 'BLACKBOARD' ? '#041607' : '#082810';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      if (f.type === 'BLACKBOARD') {
        // Chalk tray
        ctx.fillStyle = '#478C50';
        ctx.fillRect(f.x, f.y + f.h - 2, f.w, 2);
      }
      break;
    }

    case 'TRASH': {
      // Pedal bin
      ctx.fillStyle = '#092510';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Lid rim and pedal
      ctx.strokeStyle = '#55FF6A';
      ctx.beginPath();
      ctx.moveTo(f.x, f.y + 3);
      ctx.lineTo(f.x + f.w, f.y + 3);
      ctx.stroke();
      break;
    }

    case 'TYPEWRITER': {
      // Olivetti mechanical typewriter
      ctx.fillStyle = '#0c3013';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Paper sheet sticking out
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(f.x + 2, f.y - 4, f.w - 4, 4);
      break;
    }

    case 'CASH_REGISTER': {
      ctx.fillStyle = '#0c3214';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#55FF6A';
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Flag display window
      ctx.fillStyle = '#FFB000';
      ctx.fillRect(f.x + 2, f.y + 2, f.w - 4, 4);
      break;
    }

    case 'BENCHES': {
      ctx.fillStyle = '#08250f';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Wood slats
      ctx.strokeStyle = '#185022';
      ctx.lineWidth = 1;
      if (f.w > f.h) {
        ctx.beginPath();
        ctx.moveTo(f.x + 2, f.y + f.h / 2);
        ctx.lineTo(f.x + f.w - 2, f.y + f.h / 2);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(f.x + f.w / 2, f.y + 2);
        ctx.lineTo(f.x + f.w / 2, f.y + f.h - 2);
        ctx.stroke();
      }
      break;
    }

    case 'SCHOOL_DESK': {
      ctx.fillStyle = '#08250f';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Attached seat
      ctx.fillStyle = '#0e3816';
      ctx.fillRect(f.x + 2, f.y + f.h - 8, f.w - 4, 6);
      ctx.strokeStyle = '#55FF6A';
      ctx.strokeRect(f.x + 2, f.y + f.h - 8, f.w - 4, 6);
      break;
    }

    case 'LAB_BENCH': {
      ctx.fillStyle = '#07240d';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#55FF6A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Test tube rack / chemical glassware indicators
      ctx.fillStyle = '#FFB000';
      ctx.fillRect(f.x + 6, f.y + 4, 12, 6);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(f.x + f.w - 18, f.y + 4, 10, 8); // Microscope / apparatus
      break;
    }

    case 'PHONE_BOOTH': {
      // 1983 Brazilian Orelhão (Acoustical dome)
      const cx = f.x + f.w / 2;
      const cy = f.y + f.h / 2;
      const rad = f.w / 2;

      // Outer acoustical shell dome
      ctx.fillStyle = '#092d13';
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#FFB000'; // Iconic orange/yellow phone shell
      ctx.lineWidth = 2;
      ctx.stroke();

      // Payphone unit on post inside
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(cx - 3, cy - 4, 6, 8);
      break;
    }

    case 'MAILBOX': {
      // Post mounted mailbox in front of houses
      ctx.fillStyle = '#092510';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#55FF6A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Mail slot line
      ctx.fillStyle = '#FFB000';
      ctx.fillRect(f.x + 2, f.y + 3, f.w - 4, 2);
      break;
    }

    case 'DUMPSTER': {
      // Commercial steel dumpster
      ctx.fillStyle = '#061a09';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 2;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Angled lid divider
      ctx.strokeStyle = '#478C50';
      ctx.beginPath();
      ctx.moveTo(f.x, f.y + f.h / 2);
      ctx.lineTo(f.x + f.w, f.y + f.h / 2);
      ctx.stroke();
      break;
    }

    case 'HYDRANT': {
      // Top down fire hydrant
      const cx = f.x + f.w / 2;
      const cy = f.y + f.h / 2;
      const rad = f.w / 2;

      ctx.fillStyle = '#0c3012';
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#FF3B4D'; // Red safety hydrant
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Center valve nut
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(cx - 2, cy - 2, 4, 4);
      break;
    }

    case 'WATER_COOLER': {
      ctx.fillStyle = '#092911';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Inverted water bottle circle
      ctx.fillStyle = '#185022';
      ctx.beginPath();
      ctx.arc(f.x + f.w / 2, f.y + f.h / 2, Math.min(6, f.w * 0.35), 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#55FF6A';
      ctx.stroke();
      break;
    }

    case 'FLAG': {
      // Flagpole pedestal
      const cx = f.x + f.w / 2;
      const cy = f.y + f.h / 2;
      ctx.fillStyle = '#FFB000';
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fill();

      // Draped flag fabric
      ctx.strokeStyle = '#55FF6A';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + 10, cy + 6);
      ctx.lineTo(cx + 6, cy + 12);
      ctx.stroke();
      break;
    }

    case 'PODIUM': {
      ctx.fillStyle = '#08250f';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Microphone stem
      ctx.strokeStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(f.x + f.w / 2, f.y + f.h / 2);
      ctx.lineTo(f.x + f.w / 2, f.y - 4);
      ctx.stroke();
      break;
    }

    case 'MIMEOGRAPH': {
      // Mimeógrafo a álcool 1983
      ctx.fillStyle = '#092911';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Drum cylinder in center
      ctx.fillStyle = '#103816';
      ctx.fillRect(f.x + 4, f.y + 4, f.w - 8, f.h - 10);
      ctx.strokeStyle = '#55FF6A';
      ctx.strokeRect(f.x + 4, f.y + 4, f.w - 8, f.h - 10);

      // Manual crank handle extending on side
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(f.x + f.w - 2, f.y + f.h / 2);
      ctx.lineTo(f.x + f.w + 4, f.y + f.h / 2);
      ctx.lineTo(f.x + f.w + 4, f.y + f.h / 2 + 5);
      ctx.stroke();
      break;
    }

    case 'TELEX_TELEPRINTER': {
      // Teleprinter / Telex Siemens com bobina de papel
      ctx.fillStyle = '#07240d';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Paper roll spool at top
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(f.x + 4, f.y + 2, f.w - 8, 4);

      // Perforated paper sheet feed
      ctx.fillStyle = '#0c3514';
      ctx.fillRect(f.x + 3, f.y + 8, f.w - 6, f.h * 0.4);

      // Keyboard section
      ctx.fillStyle = '#020d04';
      ctx.fillRect(f.x + 3, f.y + f.h * 0.55, f.w - 6, f.h * 0.38);
      ctx.strokeStyle = '#55FF6A';
      ctx.strokeRect(f.x + 3, f.y + f.h * 0.55, f.w - 6, f.h * 0.38);
      break;
    }

    case 'TIME_CLOCK': {
      // Relógio de ponto mecânico de parede
      ctx.fillStyle = '#0a2e12';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Round clock face
      const cx = f.x + f.w / 2;
      const cy = f.y + 7;
      ctx.fillStyle = '#020b04';
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#FFB000';
      ctx.stroke();

      // Card punch slot at bottom
      ctx.fillStyle = '#FFB000';
      ctx.fillRect(f.x + 3, f.y + f.h - 4, f.w - 6, 2);
      break;
    }

    case 'MICROFICHE_READER': {
      // Leitora de microfichas 1983
      ctx.fillStyle = '#08250f';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Glowing phosphor screen hood
      ctx.fillStyle = '#031407';
      ctx.fillRect(f.x + 3, f.y + 3, f.w - 6, f.h * 0.6);
      ctx.strokeStyle = '#55FF6A';
      ctx.strokeRect(f.x + 3, f.y + 3, f.w - 6, f.h * 0.6);

      // Microfiche document lines on screen
      ctx.strokeStyle = '#7CFF8B';
      ctx.lineWidth = 1;
      for (let ly = f.y + 6; ly < f.y + f.h * 0.55; ly += 3) {
        ctx.beginPath();
        ctx.moveTo(f.x + 5, ly);
        ctx.lineTo(f.x + f.w - 5, ly);
        ctx.stroke();
      }

      // Focus knob dial
      ctx.fillStyle = '#FFB000';
      ctx.fillRect(f.x + f.w / 2 - 3, f.y + f.h - 5, 6, 3);
      break;
    }

    case 'OVERHEAD_PROJECTOR': {
      // Retroprojetor escolar com espelho
      ctx.fillStyle = '#08250f';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Fresnel ring concentric circles on projection stage
      const cx = f.x + f.w / 2;
      const cy = f.y + f.h / 2;
      ctx.strokeStyle = '#55FF6A';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.stroke();

      // Top projection head and mirror
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(f.x + 2, f.y - 4, 6, 4);
      break;
    }

    case 'DESK_CALCULATOR': {
      // Calculadora eletrônica com visor VFD verde
      ctx.fillStyle = '#07240c';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // VFD green fluorescent display
      ctx.fillStyle = '#55FF6A';
      ctx.fillRect(f.x + 2, f.y + 2, f.w - 4, 3);

      // Mini key grid
      ctx.fillStyle = '#103816';
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 3; c++) {
          ctx.fillRect(f.x + 2 + c * 3, f.y + 6 + r * 3, 2, 2);
        }
      }
      break;
    }

    case 'VINYL_TURNTABLE': {
      // Toca-discos de vinil
      ctx.fillStyle = '#092810';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Vinyl record circle
      const cx = f.x + f.w * 0.42;
      const cy = f.y + f.h * 0.5;
      const rad = Math.min(6, f.h * 0.4);

      ctx.fillStyle = '#020b04';
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#478C50';
      ctx.stroke();

      // Center record label
      ctx.fillStyle = '#FFB000';
      ctx.beginPath();
      ctx.arc(cx, cy, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Tonearm with needle
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(f.x + f.w - 3, f.y + 3);
      ctx.lineTo(cx + 2, cy - 1);
      ctx.stroke();
      break;
    }

    case 'VINTAGE_BLENDER': {
      // Liquidificador antigo de vidro e base cromada
      ctx.fillStyle = '#061a09';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Glass pitcher
      ctx.fillStyle = '#103816';
      ctx.fillRect(f.x + 2, f.y + 1, f.w - 4, f.h - 4);
      ctx.strokeStyle = '#FFFFFF';
      ctx.strokeRect(f.x + 2, f.y + 1, f.w - 4, f.h - 4);
      break;
    }

    case 'FLOOR_POLISHER': {
      // Enceradeira de assoalho vintage
      const cx = f.x + f.w / 2;
      const cy = f.y + f.h - 5;
      ctx.fillStyle = '#0a2e12';
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Long chrome handle
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(f.x + f.w / 2, f.y);
      ctx.stroke();
      break;
    }

    case 'FREEZER_CHEST': {
      // Freezer horizontal com portas de vidro deslizantes
      ctx.fillStyle = '#082810';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#55FF6A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Glass pane slider divider
      ctx.strokeStyle = '#185022';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(f.x + f.w / 2, f.y + 2);
      ctx.lineTo(f.x + f.w / 2, f.y + f.h - 2);
      ctx.stroke();

      // Frost reflection lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.moveTo(f.x + 8, f.y + 4);
      ctx.lineTo(f.x + 18, f.y + f.h - 4);
      ctx.moveTo(f.x + f.w / 2 + 8, f.y + 4);
      ctx.lineTo(f.x + f.w / 2 + 18, f.y + f.h - 4);
      ctx.stroke();
      break;
    }

    case 'XRAY_VIEWER': {
      // Negatoscópio médico iluminado na parede
      ctx.fillStyle = '#061d09';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#55FF6A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Radiograph silhouette (bones / ribs)
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1;
      const rx = f.x + f.w / 2;
      const ry = f.y + f.h / 2;
      ctx.beginPath();
      ctx.moveTo(rx, f.y + 2);
      ctx.lineTo(rx, f.y + f.h - 2);
      // Ribs
      ctx.moveTo(rx - 6, ry - 2);
      ctx.lineTo(rx + 6, ry - 2);
      ctx.moveTo(rx - 8, ry + 2);
      ctx.lineTo(rx + 8, ry + 2);
      ctx.stroke();
      break;
    }

    case 'LAB_INCUBATOR': {
      // Estufa / Incubadora com display térmico
      ctx.fillStyle = '#08260e';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#55FF6A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Temperature display (37°C)
      ctx.fillStyle = '#FFB000';
      ctx.fillRect(f.x + 3, f.y + 3, f.w - 6, 4);

      // Specimen shelf tiers inside
      ctx.strokeStyle = '#185022';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(f.x + 2, f.y + f.h * 0.45);
      ctx.lineTo(f.x + f.w - 2, f.y + f.h * 0.45);
      ctx.moveTo(f.x + 2, f.y + f.h * 0.75);
      ctx.lineTo(f.x + f.w - 2, f.y + f.h * 0.75);
      ctx.stroke();
      break;
    }

    case 'CARD_INDEX': {
      // Arquivo Kardex com gavetas estreitas de fichas
      ctx.fillStyle = '#092710';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(f.x, f.y, f.w, f.h);

      // Rows of shallow sliding card trays
      const tiers = Math.max(3, Math.floor(f.h / 7));
      const tH = f.h / tiers;
      ctx.strokeStyle = '#185022';
      ctx.fillStyle = '#FFB000';

      for (let t = 0; t < tiers; t++) {
        const ty = f.y + t * tH;
        ctx.strokeRect(f.x + 2, ty + 1, f.w - 4, tH - 1);
        ctx.fillRect(f.x + f.w / 2 - 2, ty + tH / 2, 4, 1.5); // Brass label
      }
      break;
    }

    case 'ROTARY_FAN': {
      // Ventilador oscilante de mesa vintage
      const cx = f.x + f.w / 2;
      const cy = f.y + f.h / 2;
      const rad = f.w / 2;

      // Base
      ctx.fillStyle = '#0c3013';
      ctx.fillRect(f.x + 2, f.y + f.h - 3, f.w - 4, 3);

      // Protective wire cage circle
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, rad - 1, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating fan blades
      const fanAngle = tick * 0.25;
      ctx.strokeStyle = '#55FF6A';
      ctx.lineWidth = 1.5;
      for (let b = 0; b < 3; b++) {
        const a = fanAngle + (b * Math.PI * 2) / 3;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * (rad - 2), cy + Math.sin(a) * (rad - 2));
        ctx.stroke();
      }
      break;
    }

    default: {
      ctx.fillStyle = '#08250f';
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = '#26E85A';
      ctx.strokeRect(f.x, f.y, f.w, f.h);
      break;
    }
  }

  ctx.restore();
}
