import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getContent(section: string) {
  const { data, error } = await supabase
    .from('website_content')
    .select('*')
    .eq('section', section)

  if (error) {
    console.error('Error fetching content:', error)
    return {}
  }

  return data.reduce((acc: { [key: string]: string }, item) => {
    acc[item.key] = item.value
    return acc
  }, {})
}