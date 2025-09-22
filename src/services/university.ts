import { supabase } from "@/integrations/supabase/client";

export interface UniversityData {
  id: string;
  name: string;
  name_en: string;
  city: string;
  established: number;
  description: string;
  logo_url: string;
  banner_url: string;
  website: string;
}

export interface Faculty {
  id: string;
  name: string;
  name_en: string | null;
  type: 'faculty' | 'technical_institute' | 'higher_institute';
  branch_id: string | null;
  majors?: Major[];
}

export interface Major {
  id: string;
  name: string;
  name_en: string | null;
}

export interface Branch {
  id: string;
  name: string;
  city: string;
  faculties: Faculty[];
}

export interface UniversityDetails extends UniversityData {
  faculties: Faculty[];
  branches: Branch[];
}

export const getUniversityDetails = async (universityId: string): Promise<UniversityDetails | null> => {
  try {
    // Get university basic info with all related data in one optimized query
    const { data: university, error: universityError } = await supabase
      .from('universities')
      .select('*')
      .eq('id', universityId)
      .maybeSingle();

    if (universityError) {
      console.error('Error fetching university:', universityError);
      return null;
    }

    if (!university) {
      return null;
    }

    // Get main campus faculties (no branch_id) with optimized query
    const { data: mainFaculties, error: facultiesError } = await supabase
      .from('faculties')
      .select(`
        id,
        name,
        name_en,
        type,
        branch_id,
        majors (
          id,
          name,
          name_en
        )
      `)
      .eq('university_id', universityId)
      .is('branch_id', null)
      .order('type', { ascending: true })
      .order('name', { ascending: true });

    // Get branches with their faculties using optimized query
    const { data: branches, error: branchesError } = await supabase
      .from('branches')
      .select(`
        id,
        name,
        city,
        faculties (
          id,
          name,
          name_en,
          type,
          branch_id,
          majors (
            id,
            name,
            name_en
          )
        )
      `)
      .eq('university_id', universityId)
      .order('name', { ascending: true });

    if (facultiesError) {
      console.error('Error fetching faculties:', facultiesError);
    }

    if (branchesError) {
      console.error('Error fetching branches:', branchesError);
    }

    return {
      ...university,
      faculties: (mainFaculties || []) as Faculty[],
      branches: (branches || []) as Branch[]
    };
  } catch (error) {
    console.error('Error in getUniversityDetails:', error);
    return null;
  }
};