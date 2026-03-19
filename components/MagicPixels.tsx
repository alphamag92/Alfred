/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { retouchImageAtPoint, transformImage } from '../services/magicPixelsService';

// ─── Types ────────────────────────────────────────────────────────────────────

type EditMode = 'retouch' | 'adjust' | 'filter' | 'crop';
type AspectRatio = 'free' | '1:1' | '16:9';

interface Hotspot {
  x: number; // percentage 0-100
  y: number;
}

interface CropRect {
  x: number; // percentage 0-1
  y: number;
  w: number;
  h: number;
}

interface MagicPixelsProps {
  initialImage?: string | null;
  onBack: () => void;
}

// ─── Preset data ──────────────────────────────────────────────────────────────

const ADJUSTMENT_PRESETS = [
  { key: 'blur_bg',   labelKey: 'mpAdjBlurBg',      prompt: 'Apply a strong depth-of-field blur to the background, keeping the main subject in sharp focus.' },
  { key: 'enhance',   labelKey: 'mpAdjEnhance',      prompt: 'Enhance sharpness, clarity, and fine texture details throughout the entire image.' },
  { key: 'warm',      labelKey: 'mpAdjWarm',         prompt: 'Apply a warm golden-hour lighting effect with soft amber and golden tones.' },
  { key: 'studio',    labelKey: 'mpAdjStudio',       prompt: 'Apply dramatic professional studio lighting with strong highlights and deep controlled shadows.' },
  { key: 'remove_bg', labelKey: 'mpAdjRemoveBg',     prompt: 'Remove the background completely and replace it with full transparency (alpha = 0). Isolate only the main subject with clean, precise edges. Output the result as a PNG image with a transparent background.' },
] as const;

const FILTER_PRESETS = [
  { key: 'synthwave', labelKey: 'mpFilterSynthwave', prompt: 'Apply a retro-futuristic synthwave aesthetic: neon purples, pinks, electric blues, and glowing grid lines.' },
  { key: 'anime',     labelKey: 'mpFilterAnime',     prompt: 'Transform the image into a clean anime illustration with cel-shading, clear outlines and flat vibrant colors.' },
  { key: 'lomo',      labelKey: 'mpFilterLomo',      prompt: 'Apply a lomo photography effect: strong vignetting, high contrast, and analogue cross-processed colors.' },
  { key: 'glitch',    labelKey: 'mpFilterGlitch',    prompt: 'Apply a glitch art effect with digital distortion, RGB channel displacement, and pixelated corruption.' },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

const Spinner: React.FC<{ className?: string }> = ({ className = 'h-8 w-8' }) => (
  <svg className={`animate-spin text-zinc-400 ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const MagicPixels: React.FC<MagicPixelsProps> = ({ initialImage, onBack }) => {
  const { t } = useLanguage();

  // Image history for undo/redo
  const [imageHistory, setImageHistory] = useState<string[]>(initialImage ? [initialImage] : []);
  const [historyIndex, setHistoryIndex] = useState(initialImage ? 0 : -1);

  const currentImage = historyIndex >= 0 ? imageHistory[historyIndex] : null;

  // Editor state
  const [editMode, setEditMode] = useState<EditMode>('retouch');
  const [isProcessing, setIsProcessing] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  // Retouch state
  const [hotspot, setHotspot] = useState<Hotspot | null>(null);
  const [retouchPrompt, setRetouchPrompt] = useState('');

  // Adjust state
  const [customAdjustment, setCustomAdjustment] = useState('');
  const [featherSize, setFeatherSize] = useState(30);

  // Filter state
  const [customFilter, setCustomFilter] = useState('');

  // Crop state
  const [cropStart, setCropStart] = useState<{ x: number; y: number } | null>(null);
  const [cropEnd, setCropEnd] = useState<{ x: number; y: number } | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('free');

  // Drag-and-drop
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Sync initialImage prop
  useEffect(() => {
    if (initialImage) {
      setImageHistory([initialImage]);
      setHistoryIndex(0);
    }
  }, [initialImage]);

  // ── History helpers ────────────────────────────────────────────────────────

  const applyEdit = useCallback((newImageUrl: string) => {
    setImageHistory(prev => {
      const trimmed = prev.slice(0, historyIndex + 1);
      return [...trimmed, newImageUrl];
    });
    setHistoryIndex(prev => prev + 1);
    setEditError(null);
  }, [historyIndex]);

  const undo = () => setHistoryIndex(i => Math.max(0, i - 1));
  const redo = () => setHistoryIndex(i => Math.min(imageHistory.length - 1, i + 1));
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < imageHistory.length - 1;

  // ── File handling ──────────────────────────────────────────────────────────

  const loadFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setImageHistory([dataUrl]);
      setHistoryIndex(0);
      setHotspot(null);
      setCropStart(null);
      setCropEnd(null);
      setEditError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  };

  // ── Download ───────────────────────────────────────────────────────────────

  const downloadImage = () => {
    if (!currentImage) return;
    const a = document.createElement('a');
    a.href = currentImage;
    a.download = 'magic-pixels-edit.png';
    a.click();
  };

  // ── Retouch ────────────────────────────────────────────────────────────────

  // ── Touch / pointer helpers ───────────────────────────────────────────────

  const getTouchPos = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0] || e.changedTouches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: (touch.clientX - rect.left) / rect.width,
      y: (touch.clientY - rect.top) / rect.height,
    };
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (editMode !== 'retouch' || isProcessing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHotspot({ x, y });
  };

  const handleImageTap = (e: React.TouchEvent<HTMLDivElement>) => {
    if (editMode !== 'retouch' || isProcessing) return;
    if (editMode === 'retouch') {
      const pos = getTouchPos(e);
      setHotspot({ x: pos.x * 100, y: pos.y * 100 });
    }
  };

  const handleApplyRetouch = async () => {
    if (!currentImage || !hotspot || !retouchPrompt.trim() || isProcessing) return;
    setIsProcessing(true);
    setEditError(null);
    try {
      const result = await retouchImageAtPoint(currentImage, retouchPrompt.trim(), hotspot.x, hotspot.y);
      applyEdit(result);
      setRetouchPrompt('');
      setHotspot(null);
    } catch (err: any) {
      setEditError(err?.message || t.mpEditFailed);
    } finally {
      setIsProcessing(false);
    }
  };

  // ── Adjust / Filter ────────────────────────────────────────────────────────

  const handleApplyTransform = async (instruction: string) => {
    if (!currentImage || isProcessing) return;
    setIsProcessing(true);
    setEditError(null);
    try {
      const result = await transformImage(currentImage, instruction);
      applyEdit(result);
    } catch (err: any) {
      setEditError(err?.message || t.mpEditFailed);
    } finally {
      setIsProcessing(false);
    }
  };

  // ── Feather Edges (client-side, transparent) ────────────────────────────────

  const handleApplyFeather = async () => {
    if (!currentImage || isProcessing) return;
    setIsProcessing(true);
    setEditError(null);
    try {
      const img = new Image();
      img.src = currentImage;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image'));
      });

      const w = img.width;
      const h = img.height;
      const f = Math.min(featherSize, Math.floor(Math.min(w, h) / 2));

      // Draw original image
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);

      // Build a feather mask on a separate canvas
      const mask = document.createElement('canvas');
      mask.width = w;
      mask.height = h;
      const mc = mask.getContext('2d')!;

      // Start fully transparent (black = 0 alpha when used as mask)
      mc.clearRect(0, 0, w, h);

      // Centre — fully opaque
      mc.fillStyle = '#fff';
      mc.fillRect(f, f, w - 2 * f, h - 2 * f);

      // Edge gradients (top, bottom, left, right)
      const top = mc.createLinearGradient(0, 0, 0, f);
      top.addColorStop(0, 'rgba(255,255,255,0)');
      top.addColorStop(1, 'rgba(255,255,255,1)');
      mc.fillStyle = top;
      mc.fillRect(f, 0, w - 2 * f, f);

      const bottom = mc.createLinearGradient(0, h - f, 0, h);
      bottom.addColorStop(0, 'rgba(255,255,255,1)');
      bottom.addColorStop(1, 'rgba(255,255,255,0)');
      mc.fillStyle = bottom;
      mc.fillRect(f, h - f, w - 2 * f, f);

      const left = mc.createLinearGradient(0, 0, f, 0);
      left.addColorStop(0, 'rgba(255,255,255,0)');
      left.addColorStop(1, 'rgba(255,255,255,1)');
      mc.fillStyle = left;
      mc.fillRect(0, f, f, h - 2 * f);

      const right = mc.createLinearGradient(w - f, 0, w, 0);
      right.addColorStop(0, 'rgba(255,255,255,1)');
      right.addColorStop(1, 'rgba(255,255,255,0)');
      mc.fillStyle = right;
      mc.fillRect(w - f, f, f, h - 2 * f);

      // Corner radial gradients
      const corners: [number, number][] = [[f, f], [w - f, f], [f, h - f], [w - f, h - f]];
      const rects: [number, number][] = [[0, 0], [w - f, 0], [0, h - f], [w - f, h - f]];
      for (let i = 0; i < 4; i++) {
        const [cx, cy] = corners[i];
        const [rx, ry] = rects[i];
        const rg = mc.createRadialGradient(cx, cy, 0, cx, cy, f);
        rg.addColorStop(0, 'rgba(255,255,255,1)');
        rg.addColorStop(1, 'rgba(255,255,255,0)');
        mc.fillStyle = rg;
        mc.fillRect(rx, ry, f, f);
      }

      // Apply mask → transparent feather
      ctx.globalCompositeOperation = 'destination-in';
      ctx.drawImage(mask, 0, 0);

      applyEdit(canvas.toDataURL('image/png'));
    } catch (err: any) {
      setEditError(err?.message || t.mpEditFailed);
    } finally {
      setIsProcessing(false);
    }
  };

  // ── Crop ───────────────────────────────────────────────────────────────────

  const getCropFromState = (): CropRect | null => {
    if (!cropStart || !cropEnd) return null;
    const x = Math.min(cropStart.x, cropEnd.x);
    const y = Math.min(cropStart.y, cropEnd.y);
    const w = Math.abs(cropEnd.x - cropStart.x);
    const h = Math.abs(cropEnd.y - cropStart.y);
    if (w < 0.01 || h < 0.01) return null;
    return { x, y, w, h };
  };

  const handleCropMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (editMode !== 'crop' || isProcessing) return;
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setCropStart({ x, y });
    setCropEnd({ x, y });
    setIsCropping(true);
  };

  const handleCropMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isCropping || !cropStart || editMode !== 'crop') return;
    const rect = e.currentTarget.getBoundingClientRect();
    let x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    let y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    if (aspectRatio === '1:1') {
      const size = Math.min(Math.abs(x - cropStart.x), Math.abs(y - cropStart.y));
      x = cropStart.x + (x >= cropStart.x ? size : -size);
      y = cropStart.y + (y >= cropStart.y ? size : -size);
    } else if (aspectRatio === '16:9') {
      const w = Math.abs(x - cropStart.x);
      const h = w * (9 / 16);
      y = cropStart.y + (y >= cropStart.y ? h : -h);
    }

    setCropEnd({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
  };

  const handleCropMouseUp = () => setIsCropping(false);

  // ── Touch crop handlers ──────────────────────────────────────────────────

  const handleCropTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (editMode !== 'crop' || isProcessing) return;
    e.preventDefault();
    const pos = getTouchPos(e);
    setCropStart({ x: pos.x, y: pos.y });
    setCropEnd({ x: pos.x, y: pos.y });
    setIsCropping(true);
  };

  const handleCropTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isCropping || !cropStart || editMode !== 'crop') return;
    e.preventDefault();
    const pos = getTouchPos(e);
    let x = Math.max(0, Math.min(1, pos.x));
    let y = Math.max(0, Math.min(1, pos.y));

    if (aspectRatio === '1:1') {
      const size = Math.min(Math.abs(x - cropStart.x), Math.abs(y - cropStart.y));
      x = cropStart.x + (x >= cropStart.x ? size : -size);
      y = cropStart.y + (y >= cropStart.y ? size : -size);
    } else if (aspectRatio === '16:9') {
      const w = Math.abs(x - cropStart.x);
      const h = w * (9 / 16);
      y = cropStart.y + (y >= cropStart.y ? h : -h);
    }

    setCropEnd({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
  };

  const handleCropTouchEnd = () => setIsCropping(false);

  const handleApplyCrop = async () => {
    const crop = getCropFromState();
    if (!crop || !currentImage) return;
    setIsProcessing(true);
    setEditError(null);
    try {
      const img = new Image();
      img.src = currentImage;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image'));
      });

      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * crop.w);
      canvas.height = Math.round(img.height * crop.h);
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(
        img,
        img.width * crop.x, img.height * crop.y,
        img.width * crop.w, img.height * crop.h,
        0, 0, canvas.width, canvas.height
      );
      applyEdit(canvas.toDataURL('image/png'));
      setCropStart(null);
      setCropEnd(null);
    } catch (err: any) {
      setEditError(err?.message || t.mpEditFailed);
    } finally {
      setIsProcessing(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Render helpers
  // ─────────────────────────────────────────────────────────────────────────

  const cropRect = getCropFromState();

  const renderStartScreen = () => (
    <div
      className={`flex-1 flex flex-col items-center overflow-y-auto p-6 md:p-12 transition-colors ${isDraggingOver ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
      onDragLeave={() => setIsDraggingOver(false)}
      onDrop={handleDrop}
    >
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
      <div className="max-w-md w-full text-center my-auto">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Magic Pixels</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8 text-sm sm:text-base">{t.mpSubtitle}</p>

        {/* Drop zone */}
        <div
          className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 mb-4 cursor-pointer transition-all ${
            isDraggingOver
              ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
              : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
          onDragLeave={() => setIsDraggingOver(false)}
          onDrop={handleDrop}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-3 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <p className="text-zinc-700 dark:text-zinc-300 font-medium text-sm">{t.mpDropZone}</p>
          <p className="text-zinc-400 dark:text-zinc-500 text-xs mt-1">{t.mpDropZoneHint}</p>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full sm:w-auto px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold rounded-xl hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
        >
          {t.mpChooseFile}
        </button>

        {/* Capability cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          {[
            { icon: '🎯', title: t.mpCapRetouchTitle, desc: t.mpCapRetouchDesc },
            { icon: '✨', title: t.mpCapFilterTitle, desc: t.mpCapFilterDesc },
            { icon: '🌤', title: t.mpCapAdjustTitle, desc: t.mpCapAdjustDesc },
          ].map((card, i) => (
            <div key={i} className="bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4">
              <div className="text-xl mb-1">{card.icon}</div>
              <div className="font-semibold text-xs text-zinc-800 dark:text-zinc-200 mb-0.5">{card.title}</div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRetouchPanel = () => (
    <div className="flex flex-col gap-3 h-full">
      <div className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
        {hotspot ? (
          <span className="text-blue-600 dark:text-blue-400 font-medium">
            {t.mpRetouchPointSelected.replace('{x}', Math.round(hotspot.x).toString()).replace('{y}', Math.round(hotspot.y).toString())}
          </span>
        ) : (
          t.mpRetouchInstruction
        )}
      </div>

      <textarea
        value={retouchPrompt}
        onChange={e => setRetouchPrompt(e.target.value)}
        placeholder={t.mpRetouchPlaceholder}
        disabled={isProcessing}
        rows={3}
        className="w-full border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 resize-none"
      />

      <button
        onClick={handleApplyRetouch}
        disabled={isProcessing || !hotspot || !retouchPrompt.trim()}
        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? <><Spinner className="h-4 w-4" /><span>{t.mpProcessing}</span></> : t.mpApplyRetouch}
      </button>
    </div>
  );

  const renderAdjustPanel = () => (
    <div className="flex flex-col gap-3 overflow-y-auto">
      <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-1 gap-2">
        {ADJUSTMENT_PRESETS.map(preset => (
          <button
            key={preset.key}
            onClick={() => handleApplyTransform(preset.prompt)}
            disabled={isProcessing}
            className="text-left px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 active:bg-zinc-200 dark:active:bg-zinc-600 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {(t as any)[preset.labelKey]}
          </button>
        ))}
      </div>

      {/* Feather Edges */}
      <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700">
        <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">{t.mpAdjFeatherEdges}</p>
        <div className="flex items-center gap-3 mb-2">
          <input
            type="range"
            min={5}
            max={200}
            step={1}
            value={featherSize}
            onChange={e => setFeatherSize(Number(e.target.value))}
            disabled={isProcessing}
            className="flex-1 h-1.5 accent-blue-600 bg-zinc-200 dark:bg-zinc-700 rounded-full appearance-none cursor-pointer disabled:opacity-50"
          />
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 w-14 text-right tabular-nums">{featherSize} {t.mpFeatherSizePx}</span>
        </div>
        <button
          onClick={handleApplyFeather}
          disabled={isProcessing}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? <><Spinner className="h-4 w-4" /><span>{t.mpProcessing}</span></> : t.mpApplyFeather}
        </button>
      </div>

      <div className="pt-1">
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-1.5">{t.mpCustomLabel}</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={customAdjustment}
            onChange={e => setCustomAdjustment(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && customAdjustment.trim()) handleApplyTransform(customAdjustment.trim()); }}
            placeholder={t.mpCustomAdjustPlaceholder}
            disabled={isProcessing}
            className="flex-1 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            onClick={() => { if (customAdjustment.trim()) handleApplyTransform(customAdjustment.trim()); }}
            disabled={isProcessing || !customAdjustment.trim()}
            className="px-3 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold rounded-xl hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? <Spinner className="h-4 w-4" /> : '→'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderFilterPanel = () => (
    <div className="flex flex-col gap-3 overflow-y-auto">
      <div className="grid grid-cols-2 gap-2">
        {FILTER_PRESETS.map(preset => (
          <button
            key={preset.key}
            onClick={() => handleApplyTransform(preset.prompt)}
            disabled={isProcessing}
            className="text-left px-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 active:bg-zinc-200 dark:active:bg-zinc-600 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {(t as any)[preset.labelKey]}
          </button>
        ))}
      </div>

      <div className="pt-1">
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-1.5">{t.mpCustomLabel}</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={customFilter}
            onChange={e => setCustomFilter(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && customFilter.trim()) handleApplyTransform(customFilter.trim()); }}
            placeholder={t.mpCustomFilterPlaceholder}
            disabled={isProcessing}
            className="flex-1 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            onClick={() => { if (customFilter.trim()) handleApplyTransform(customFilter.trim()); }}
            disabled={isProcessing || !customFilter.trim()}
            className="px-3 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold rounded-xl hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? <Spinner className="h-4 w-4" /> : '→'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderCropPanel = () => (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">{t.mpCropAspectLabel}</p>
        <div className="flex gap-2">
          {(['free', '1:1', '16:9'] as AspectRatio[]).map(ar => (
            <button
              key={ar}
              onClick={() => setAspectRatio(ar)}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                aspectRatio === ar
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100'
                  : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700'
              }`}
            >
              {ar === 'free' ? t.mpCropFree : ar}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">{t.mpCropInstruction}</p>

      <button
        onClick={handleApplyCrop}
        disabled={isProcessing || !cropRect}
        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? <><Spinner className="h-4 w-4" /><span>{t.mpProcessing}</span></> : t.mpApplyCrop}
      </button>

      {cropRect && (
        <button
          onClick={() => { setCropStart(null); setCropEnd(null); }}
          className="w-full py-2 text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
        >
          {t.mpCropClear}
        </button>
      )}
    </div>
  );

  const renderEditor = () => {
    const tabs: { key: EditMode; label: string; icon: string }[] = [
      { key: 'retouch', label: t.mpTabRetouch, icon: '🎯' },
      { key: 'adjust',  label: t.mpTabAdjust,  icon: '🌤' },
      { key: 'filter',  label: t.mpTabFilter,  icon: '✨' },
      { key: 'crop',    label: t.mpTabCrop,    icon: '✂️' },
    ];

    return (
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-y-auto lg:overflow-hidden">
        {/* Image area */}
        <div className="shrink-0 lg:shrink lg:flex-1 min-h-0 lg:min-w-0 flex items-center justify-center p-2 sm:p-4 lg:p-5 bg-zinc-100 dark:bg-zinc-950">
          <div
            ref={imageContainerRef}
            className={`relative max-h-full max-w-full inline-block select-none ${
              (editMode === 'crop' || editMode === 'retouch') ? 'touch-none' : ''
            } ${
              editMode === 'retouch' ? 'cursor-crosshair' : editMode === 'crop' ? 'cursor-crosshair' : 'cursor-default'
            }`}
            onClick={handleImageClick}
            onMouseDown={handleCropMouseDown}
            onMouseMove={handleCropMouseMove}
            onMouseUp={handleCropMouseUp}
            onMouseLeave={handleCropMouseUp}
            onTouchStart={editMode === 'crop' ? handleCropTouchStart : undefined}
            onTouchMove={editMode === 'crop' ? handleCropTouchMove : undefined}
            onTouchEnd={editMode === 'crop' ? handleCropTouchEnd : (editMode === 'retouch' ? handleImageTap : undefined)}
            style={{
              backgroundImage: 'repeating-conic-gradient(#d4d4d8 0% 25%, transparent 0% 50%)',
              backgroundSize: '16px 16px',
              borderRadius: '0.5rem',
            }}
          >
            <img
              src={currentImage!}
              alt="Editing canvas"
              className="max-w-full max-h-[40vh] sm:max-h-[45vh] lg:max-h-[75vh] object-contain rounded-lg shadow-lg block pointer-events-none"
              draggable={false}
            />

            {/* Processing overlay */}
            {isProcessing && (
              <div className="absolute inset-0 bg-black/50 rounded-lg flex flex-col items-center justify-center backdrop-blur-sm">
                <Spinner className="h-10 w-10 text-white" />
                <p className="mt-3 text-white text-sm font-medium">{t.mpProcessing}</p>
              </div>
            )}

            {/* Hotspot indicator (retouch) */}
            {editMode === 'retouch' && hotspot && !isProcessing && (
              <div
                className="absolute pointer-events-none"
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="w-6 h-6 rounded-full border-2 border-white shadow-lg bg-blue-500/40 animate-ping absolute inset-0" />
                <div className="w-6 h-6 rounded-full border-2 border-white shadow-lg bg-blue-500" />
              </div>
            )}

            {/* Crop rectangle */}
            {editMode === 'crop' && cropRect && (
              <div
                className="absolute border-2 border-blue-400 bg-blue-400/10 pointer-events-none rounded"
                style={{
                  left: `${cropRect.x * 100}%`,
                  top: `${cropRect.y * 100}%`,
                  width: `${cropRect.w * 100}%`,
                  height: `${cropRect.h * 100}%`,
                }}
              >
                {/* Corner handles */}
                {[
                  'top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'
                ].map((pos, i) => (
                  <div key={i} className={`absolute w-3 h-3 bg-blue-400 rounded-sm -m-1.5 ${pos}`} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Side panel */}
        <div className="w-full lg:w-72 xl:w-80 flex flex-col border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0 lg:shrink lg:min-h-0">
          {/* Mode tabs */}
          <div className="flex border-b border-zinc-200 dark:border-zinc-800 flex-shrink-0">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => { setEditMode(tab.key); setHotspot(null); setCropStart(null); setCropEnd(null); }}
                disabled={isProcessing}
                className={`flex-1 py-3 text-xs font-semibold flex flex-col items-center gap-0.5 transition-colors focus:outline-none disabled:opacity-50 min-h-[44px] ${
                  editMode === tab.key
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 -mb-px bg-white dark:bg-zinc-900'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                }`}
              >
                <span className="text-base leading-none">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Panel content */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto">
            {editMode === 'retouch' && renderRetouchPanel()}
            {editMode === 'adjust'  && renderAdjustPanel()}
            {editMode === 'filter'  && renderFilterPanel()}
            {editMode === 'crop'    && renderCropPanel()}
          </div>

          {/* Error */}
          {editError && (
            <div className="mx-4 mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300">
              {editError}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Root render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-white dark:bg-zinc-900 lg:rounded-xl lg:border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors duration-200">
      {/* Header bar */}
      <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex-shrink-0">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-2.5 py-2.5 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 min-h-[44px] min-w-[44px] justify-center sm:justify-start"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">{t.backToAlfred}</span>
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 flex-1 justify-center">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-50">Magic Pixels</h2>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {currentImage && (
            <>
              {/* Upload new */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 rounded-xl text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
                title={t.mpChooseFile}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </button>
              {/* Undo */}
              <button
                onClick={undo}
                disabled={!canUndo || isProcessing}
                className="p-2.5 rounded-xl text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none disabled:opacity-40 min-h-[44px] min-w-[44px] flex items-center justify-center"
                title={t.mpUndo}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </button>
              {/* Redo */}
              <button
                onClick={redo}
                disabled={!canRedo || isProcessing}
                className="p-2.5 rounded-xl text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none disabled:opacity-40 min-h-[44px] min-w-[44px] flex items-center justify-center"
                title={t.mpRedo}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
                </svg>
              </button>
              {/* Download */}
              <button
                onClick={downloadImage}
                className="p-2.5 rounded-xl text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
                title={t.downloadImage}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </>
          )}
        </div>

        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
      </div>

      {/* Body */}
      {currentImage ? renderEditor() : renderStartScreen()}
    </div>
  );
};

export default MagicPixels;
