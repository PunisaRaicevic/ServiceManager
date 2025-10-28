import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gzlqiaphncnolhyefdxw.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6bHFpYXBobmNub2xoeWVmZHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MDE1NTQsImV4cCI6MjA3NzE3NzU1NH0.0-VdoON5amWU_YaeGwN0NddwGVUxG9Ng3WS5EnAjYN0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadImage(file: File, bucket: 'appliance-photos' | 'report-photos' | 'documents' | 'spare-part-photos'): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = fileName;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function deleteImage(url: string, bucket: 'appliance-photos' | 'report-photos' | 'documents' | 'spare-part-photos'): Promise<void> {
  const fileName = url.split('/').pop();
  if (!fileName) return;

  const { error } = await supabase.storage
    .from(bucket)
    .remove([fileName]);

  if (error) {
    console.error('Failed to delete image:', error);
  }
}
