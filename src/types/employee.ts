/**
 * Employee / Player type definitions
 * Centralized here so all components share one source of truth.
 */

export type PlayerCategory = "Gold" | "Silver" | "Purple" | "Diamond";

export interface PlayerStats {
    pac: number;
    sho: number;
    pas: number;
    dri: number;
    def: number;
    phy: number;
}

export interface PlayerStatLabels {
    pac: string;
    sho: string;
    pas: string;
    dri: string;
    def: string;
    phy: string;
}

export interface Employee {
    id: number;
    fullNameEn: string;
    fullNameAr: string;
    jobTitle: string;
    jobTitleAr: string;
    department: string;
    departmentAr: string;
    email: string;
    mobileNumber: string;
    photoUrl: string;
    orderIndex: number;
    category: PlayerCategory;
    rating: number;
    position: string;
    year: number;
    stats: PlayerStats;
    statLabels?: PlayerStatLabels;
}
