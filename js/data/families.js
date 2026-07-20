/* ============================================================
   families.js — campus course families (Coursera-style IA).
   Trading Literacy is live (existing TRACKS). Four more scaffolds.
   ============================================================ */

import { TRACKS } from './tracks.js';

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
    trackIds: TRACKS.map((t) => t.id),
  },
  {
    id: 'personal-finance',
    name: { en: 'Personal Finance', ur: 'Personal Finance' },
    blurb: {
      en: 'Budgets, debt, emergency fund — coming as full campus courses.',
      ur: 'Budget, debt, emergency fund — jaldi full courses.',
    },
    status: 'scaffold',
    level: 'basic',
    trackIds: [],
  },
  {
    id: 'career-systems',
    name: { en: 'Career Systems', ur: 'Career Systems' },
    blurb: {
      en: 'Interviews, offers, remote work — scaffold only for now.',
      ur: 'Interviews, offers, remote — abhi scaffold.',
    },
    status: 'scaffold',
    level: 'basic',
    trackIds: [],
  },
  {
    id: 'product-builders',
    name: { en: 'Product Builders', ur: 'Product Builders' },
    blurb: {
      en: 'Ship Cap-style products: research → MVP → launch discipline.',
      ur: 'Cap-style products: research → MVP → launch.',
    },
    status: 'scaffold',
    level: 'advanced',
    trackIds: [],
  },
  {
    id: 'wellness-focus',
    name: { en: 'Focus & Wellness', ur: 'Focus & Wellness' },
    blurb: {
      en: 'Sleep, attention, burnout — complementary to market stress.',
      ur: 'Sleep, attention, burnout — market stress ke saath.',
    },
    status: 'scaffold',
    level: 'basic',
    trackIds: [],
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
