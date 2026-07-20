/* ============================================================
   families.js — campus course families (Coursera-style IA).
   Trading Literacy + four extension families with starter syllabus.
   ============================================================ */

import { TRADING_TRACK_IDS } from './tracks.js';

/** @typedef {{ id: string, name: {en:string,ur:string}, blurb: {en:string,ur:string}, status: 'live'|'scaffold', level?: 'basic'|'advanced', trackIds: string[] }} CourseFamily */

/** @type {CourseFamily[]} */
export const COURSE_FAMILIES = [
  {
    id: 'trading-literacy',
    name: { en: 'Trading Literacy', ur: 'Trading Literacy' },
    blurb: {
      en: 'School path: foundations → instruments → risk. Basic → Advanced.',
      ur: 'School path: bunyad → instruments → risk. Basic → Advanced.',
    },
    status: 'live',
    level: 'basic',
    trackIds: TRADING_TRACK_IDS,
  },
  {
    id: 'personal-finance',
    name: { en: 'Personal Finance', ur: 'Personal Finance' },
    blurb: {
      en: 'Budgets, debt, emergency fund — literacy not income promises.',
      ur: 'Budget, debt, emergency fund — literacy, income promise nahi.',
    },
    status: 'live',
    level: 'basic',
    trackIds: ['pf-budget', 'pf-debt'],
  },
  {
    id: 'career-systems',
    name: { en: 'Career Systems', ur: 'Career Systems' },
    blurb: {
      en: 'Interviews, offers, remote craft — repeatable systems.',
      ur: 'Interviews, offers, remote — repeatable systems.',
    },
    status: 'live',
    level: 'basic',
    trackIds: ['career-interviews', 'career-remote'],
  },
  {
    id: 'product-builders',
    name: { en: 'Product Builders', ur: 'Product Builders' },
    blurb: {
      en: 'Cap-style products: research → MVP → launch discipline.',
      ur: 'Cap-style products: research → MVP → launch.',
    },
    status: 'live',
    level: 'advanced',
    trackIds: ['pb-research', 'pb-launch'],
  },
  {
    id: 'wellness-focus',
    name: { en: 'Focus & Wellness', ur: 'Focus & Wellness' },
    blurb: {
      en: 'Sleep, attention, burnout — complements market stress.',
      ur: 'Sleep, attention, burnout — market stress ke saath.',
    },
    status: 'live',
    level: 'basic',
    trackIds: ['wellness-sleep', 'wellness-attention'],
  },
];

export function getFamily(id) {
  return COURSE_FAMILIES.find((f) => f.id === id) || COURSE_FAMILIES[0];
}

export function familyForTrack(trackId) {
  return (
    COURSE_FAMILIES.find((f) => f.trackIds.includes(trackId)) ||
    COURSE_FAMILIES[0]
  );
}
